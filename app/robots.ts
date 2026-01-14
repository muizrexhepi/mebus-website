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
    ],
    sitemap: "https://www.gobusly.com/sitemap.xml",
  };
}
