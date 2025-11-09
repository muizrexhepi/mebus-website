import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // API endpoints
          "/account/", // User-specific pages
          "/*?adult=*", // Optional: specific problematic params
          "/*?children=*", // Optional: specific problematic params
        ],
      },
      {
        userAgent: "GPTBot", // OpenAI's crawler
        disallow: "/",
      },
      {
        userAgent: "CCBot", // Common Crawl
        disallow: "/",
      },
    ],
    sitemap: "https://www.gobusly.com/sitemap.xml",
  };
}
