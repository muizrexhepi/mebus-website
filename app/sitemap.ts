import { getStations } from "@/actions/station";
import { MetadataRoute } from "next";
import { NAV_LINKS, FOOTER_LINKS, QUICK_LINKS } from "@/lib/data";

const BASE_URL = "https://www.gobusly.com";

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

const generateCrossCountryCityPairs = (stations: Station[]) => {
  const pairs = [];

  // Function to format date as DD-MM-YYYY
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const today = formatDate(new Date());

  for (let i = 0; i < stations.length; i++) {
    for (let j = 0; j < stations.length; j++) {
      // Skip if same city or same country
      if (i !== j && stations[i].country !== stations[j].country) {
        const fromCity = stations[i].city.toLowerCase();
        const toCity = stations[j].city.toLowerCase();
        const departureStationId = stations[i]._id;
        const arrivalStationId = stations[j]._id;

        // Manually construct and escape the query string
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stations = await getStations();
  const cityPairs = generateCrossCountryCityPairs(stations);

  const staticUrls = [""].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date().toISOString(),
  }));

  const dynamicUrls = cityPairs.map((pair) => ({
    url: `${BASE_URL}/search/${pair}`,
    lastModified: new Date().toISOString(),
  }));

  const navUrls = extractLinksFromArray(NAV_LINKS);
  const footerUrls = FOOTER_LINKS.flatMap((section) =>
    extractLinksFromArray(section.links)
  );
  const quickLinks = extractQuickLinks(QUICK_LINKS);

  const allUrls = [
    ...staticUrls,
    ...navUrls,
    ...footerUrls,
    ...quickLinks,
    ...dynamicUrls,
  ];

  const uniqueUrls = removeDuplicateUrls(allUrls);

  return uniqueUrls;
}
