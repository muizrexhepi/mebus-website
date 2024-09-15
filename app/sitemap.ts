import { getStationsByOperatorId } from "@/actions/station";
import { MetadataRoute } from "next";

const operator_id = "66cba19d1a6e55b32932c59b";

const BASE_URL = "https://mebus.com";

// const generateCityPairs = (stations: { city: string }[]) => {
//   const pairs = [];
//   for (let i = 0; i < stations.length; i++) {
//     for (let j = 0; j < stations.length; j++) {
//       if (i !== j) {
//         const fromCity = stations[i].city.toLowerCase();
//         const toCity = stations[j].city.toLowerCase();
//         pairs.push(`${fromCity}-${toCity}`);
//       }
//     }
//   }
//   return pairs;
// };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const stations = await getStationsByOperatorId(operator_id);

  // const cityPairs = generateCityPairs(stations);
  const staticUrls = [
    "",
    "/about",
    "/search",
    "/contact",
    "/help",
    "/bookings",
    "/privacy-policy",
    "/terms-of-service",
    "/services/book-tickets",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date().toISOString(),
  }));

  // const dynamicUrls = cityPairs.map((pair) => ({
  //   url: `${BASE_URL}/search/${pair}`,
  //   lastModified: new Date().toISOString(),
  // }));

  return [...staticUrls,];
}
