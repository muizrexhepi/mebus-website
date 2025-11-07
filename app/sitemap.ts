import { getStations } from "@/actions/station";
import { MetadataRoute } from "next";
import { NAV_LINKS, FOOTER_LINKS, QUICK_LINKS } from "@/lib/data";

const BASE_URL = "https://www.gobusly.com";
const revalidate = 60 * 60 * 12; // 12h revalidation

// =====================
// Types
// =====================
interface Station {
  _id: string;
  city: string;
  country: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}

type Country = {
  country: string;
  slug: string; // Ensure slug is always present after getCountries
  stationCount: number;
};

type City = {
  name: string;
  country: string;
  slug: string;
};

// =====================
// Helper Functions
// =====================

const cityToSlug = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const capitalizeCity = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const generateCrossCountryCityPairs = (stations: Station[]) => {
  const pairs = [];
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const today = formatDate(new Date());

  for (let i = 0; i < stations.length; i++) {
    for (let j = 0; j < stations.length; j++) {
      if (i !== j && stations[i].country !== stations[j].country) {
        const fromCity = stations[i].city.toLowerCase();
        const toCity = stations[j].city.toLowerCase();
        const departureStationId = stations[i]._id;
        const arrivalStationId = stations[j]._id;
        const queryString =
          `departureStation=${departureStationId}` +
          `&amp;arrivalStation=${arrivalStationId}` +
          `&amp;departureDate=${today}` +
          `&amp;adult=1` +
          `&amp;children=0`;
        pairs.push(`${fromCity}-${toCity}?${queryString}`);
      }
    }
  }
  return pairs;
};

const extractLinksFromArray = (linksArray: any[]) => {
  return linksArray.map((item) => ({
    url: `${BASE_URL}${item.url || item.link}`,
    lastModified: new Date().toISOString(),
  }));
};

const extractQuickLinks = (quickLinks: any[]) => {
  return quickLinks.map((item) => ({
    url: `${BASE_URL}/help/${item.name}`,
    lastModified: new Date().toISOString(),
  }));
};

const removeDuplicateUrls = (urls: { url: string; lastModified: string }[]) => {
  const uniqueUrls = new Map();
  urls.forEach((urlObject) => {
    uniqueUrls.set(urlObject.url, urlObject);
  });
  return Array.from(uniqueUrls.values());
};

// =====================
// Data Fetch (Countries & Cities)
// =====================
async function getCountries(): Promise<Country[]> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "https://www.gobusly.com";
  const url = `${apiBase}/seo/countries/get-all`;

  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return [];
    const response = await res.json();
    const countries = (response?.data || []).map((country: any) => ({
      ...country,
      slug: country.slug || cityToSlug(country.country),
    }));
    return countries;
  } catch (error) {
    console.error("Error fetching countries for sitemap:", error);
    return [];
  }
}

async function getCities(countrySlug: string): Promise<City[]> {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "https://www.gobusly.com";

  // Use the slug (which is what the original function's encodeURIComponent(countryName) likely achieves)
  const url = `${apiBase}/seo/country/${countrySlug}`;
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return [];

    const data = await res.json();
    const rawCities = data?.data?.cities;
    if (!rawCities || !Array.isArray(rawCities)) return [];

    return rawCities.map((rawName: string) => ({
      name: capitalizeCity(rawName),
      country: countrySlug, // We'll use the country's slug for the URL
      slug: cityToSlug(rawName),
    }));
  } catch (error) {
    console.error(`Error fetching cities for ${countrySlug}:`, error);
    return [];
  }
}

// =====================
// Sitemap Generation
// =====================
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Fetch stations and countries
  const [stations, countries] = await Promise.all([
    getStations(),
    getCountries(),
  ]);

  // 2. Fetch all cities for all countries in parallel
  const allCityPromises = countries.map((country) => getCities(country.slug));
  const allCitiesNested = await Promise.all(allCityPromises);
  const allCities = allCitiesNested.flat(); // Flatten the [[]] into []

  // 3. Generate city pair search URLs
  const cityPairs = generateCrossCountryCityPairs(stations);

  // 4. Generate all URL lists
  const staticUrls = ["/", "/bus", "/account/bookings"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date().toISOString(),
  }));

  // Generate /bus/[country] URLs
  const countryUrls = countries.map((country) => ({
    url: `${BASE_URL}/bus/${country.slug}`,
    lastModified: new Date().toISOString(),
  }));

  // Generate /bus/[country]/[city] URLs
  const cityUrls = allCities.map((city) => ({
    url: `${BASE_URL}/bus/${city.country}/${city.slug}`, // city.country is already the slug
    lastModified: new Date().toISOString(),
  }));

  // Generate /search/[from]-[to]?... URLs
  const dynamicUrls = cityPairs.map((pair) => ({
    url: `${BASE_URL}/search/${pair}`,
    lastModified: new Date().toISOString(),
  }));

  const navUrls = extractLinksFromArray(NAV_LINKS);
  const footerUrls = FOOTER_LINKS.flatMap((section) =>
    extractLinksFromArray(section.links)
  );
  const quickLinks = extractQuickLinks(QUICK_LINKS);

  // 5. Combine and deduplicate
  const allUrls = [
    ...staticUrls,
    ...countryUrls,
    ...cityUrls, // <-- Added city URLs
    ...navUrls,
    ...footerUrls,
    ...quickLinks,
    ...dynamicUrls,
  ];

  const uniqueUrls = removeDuplicateUrls(allUrls);

  return uniqueUrls;
}
