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
  slug: string;
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

// FIXED: Generate CLEAN route URLs without any parameters
const generateCleanSearchRoutes = (stations: Station[]) => {
  const routes = new Set<string>(); // Use Set to prevent duplicates

  for (let i = 0; i < stations.length; i++) {
    for (let j = 0; j < stations.length; j++) {
      // Only cross-country routes
      if (i !== j && stations[i].country !== stations[j].country) {
        const fromSlug = cityToSlug(stations[i].city);
        const toSlug = cityToSlug(stations[j].city);

        // Create clean route URL: /search/pristina-munich
        routes.add(`${fromSlug}-${toSlug}`);
      }
    }
  }

  return Array.from(routes);
};

const extractLinksFromArray = (linksArray: any[]) => {
  return linksArray.map((item) => ({
    url: `${BASE_URL}${item.url || item.link}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
};

const extractQuickLinks = (quickLinks: any[]) => {
  return quickLinks.map((item) => ({
    url: `${BASE_URL}/help/${item.name}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
};

const removeDuplicateUrls = (urls: any[]) => {
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

  const url = `${apiBase}/seo/country/${countrySlug}`;
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return [];

    const data = await res.json();
    const rawCities = data?.data?.cities;
    if (!rawCities || !Array.isArray(rawCities)) return [];

    return rawCities.map((rawName: string) => ({
      name: capitalizeCity(rawName),
      country: countrySlug,
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
  const allCities = allCitiesNested.flat();

  // 3. Generate CLEAN search route URLs (NO parameters!)
  const cleanSearchRoutes = generateCleanSearchRoutes(stations);

  // 4. Static pages with priorities
  const staticUrls = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/bus`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/account/bookings`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.3,
    },
  ];

  // 5. Country hub pages
  const countryUrls = countries.map((country) => ({
    url: `${BASE_URL}/bus/${country.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 6. City landing pages
  const cityUrls = allCities.map((city) => ({
    url: `${BASE_URL}/bus/${city.country}/${city.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 7. ADDED: Clean search route URLs (your money pages!)
  const searchRouteUrls = cleanSearchRoutes.map((route) => ({
    url: `${BASE_URL}/search/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.9, // High priority - these drive conversions
  }));

  // 8. Extract navigation and footer links
  const navUrls = extractLinksFromArray(NAV_LINKS);
  const footerUrls = FOOTER_LINKS.flatMap((section) =>
    extractLinksFromArray(section.links)
  );
  const quickLinks = extractQuickLinks(QUICK_LINKS);

  // 9. Combine all URLs
  const allUrls = [
    ...staticUrls,
    ...countryUrls,
    ...cityUrls,
    ...searchRouteUrls, // ✅ ADDED: Clean search routes
    ...navUrls,
    ...footerUrls,
    ...quickLinks,
  ];

  // 10. Remove duplicates
  const uniqueUrls = removeDuplicateUrls(allUrls);

  // Log for debugging (remove in production)
  console.log(`📊 Sitemap generated with ${uniqueUrls.length} unique URLs`);
  console.log(`   - ${searchRouteUrls.length} search routes`);
  console.log(`   - ${countryUrls.length} countries`);
  console.log(`   - ${cityUrls.length} cities`);

  return uniqueUrls;
}
