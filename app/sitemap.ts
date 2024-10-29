import { getStationsByOperatorId } from "@/actions/station";
import { MetadataRoute } from "next";
import { NAV_LINKS, FOOTER_LINKS, QUICK_LINKS } from "@/lib/data";

const operator_id = "66cba19d1a6e55b32932c59b";

const BASE_URL = "https://www.busly.eu";

const generateCityPairs = (stations: { city: string }[]) => {
  const pairs = [];
  for (let i = 0; i < stations.length; i++) {
    for (let j = 0; j < stations.length; j++) {
      if (i !== j) {
        const fromCity = stations[i].city.toLowerCase();
        const toCity = stations[j].city.toLowerCase();
        pairs.push(`${fromCity}-${toCity}`);
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
  const stations = await getStationsByOperatorId(operator_id);
  const cityPairs = generateCityPairs(stations);

  const staticUrls = [
    "", 
    "/contact",
    '/login',
    '/register',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date().toISOString(),
  }));

  const dynamicUrls = cityPairs.map((pair) => ({
    url: `${BASE_URL}/search/${pair}`,
    lastModified: new Date().toISOString(),
  }));

  const navUrls = extractLinksFromArray(NAV_LINKS);
  const footerUrls = FOOTER_LINKS.flatMap((section) => extractLinksFromArray(section.links));
  const quickLinks = extractQuickLinks(QUICK_LINKS); 

  const allUrls = [...staticUrls, ...navUrls, ...footerUrls, ...quickLinks, ...dynamicUrls];

  const uniqueUrls = removeDuplicateUrls(allUrls);

  return uniqueUrls;
}
