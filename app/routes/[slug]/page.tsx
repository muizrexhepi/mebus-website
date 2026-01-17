import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoutePageContent from "./(components)/route-page-content";
import { getRouteData } from "@/lib/route-data";

/**
 * In Next.js 15+, params is a Promise.
 * We define the type to reflect this async nature.
 */
interface RoutePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: RoutePageProps): Promise<Metadata> {
  // ✅ NEXT.JS 16 FIX: Await the params object
  const { slug } = await params;
  const routeData = await getRouteData(slug);

  if (!routeData) {
    return {
      title: "Route Not Found | GoBusly",
      description: "The requested bus route could not be found.",
    };
  }

  const { fromCity, toCity, minPrice } = routeData;
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com";
  const canonical = `${base}/routes/${slug}`;

  const title = `Bus from ${fromCity} to ${toCity} | Prices & Tickets – GoBusly`;
  const description = `Book a bus from ${fromCity} to ${toCity}. Compare prices, schedules, travel time and reserve tickets online with GoBusly from €${minPrice}.`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: "index, follow",
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "GoBusly",
      title: `Bus from ${fromCity} to ${toCity} | GoBusly`,
      description,
      images: [
        {
          url: `${base}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `Bus route from ${fromCity} to ${toCity}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Bus from ${fromCity} to ${toCity} | GoBusly`,
      description,
      images: [`${base}/og-image.png`],
    },
  };
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { slug } = await params;
  const routeData = await getRouteData(slug);

  if (!routeData) {
    notFound();
  }

  return <RoutePageContent routeData={routeData} />;
}
