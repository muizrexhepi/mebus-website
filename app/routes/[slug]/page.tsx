import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoutePageContent from "./(components)/route-page-content";
import { getRouteData } from "@/lib/route-data";

interface RoutePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: RoutePageProps): Promise<Metadata> {
  const routeData = await getRouteData(params.slug);

  if (!routeData) {
    return {
      title: "Route Not Found | GoBusly",
      description: "The requested bus route could not be found.",
    };
  }

  const { fromCity, toCity, minPrice } = routeData;
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com";
  const canonical = `${base}/routes/${params.slug}`;

  // ✅ SEO-OPTIMIZED: 60 char max title
  const title = `Bus from ${fromCity} to ${toCity} | Prices & Tickets – GoBusly`;

  // ✅ SEO-OPTIMIZED: 140-160 chars, includes key elements
  const description = `Book a bus from ${fromCity} to ${toCity}. Compare prices, schedules, travel time and reserve tickets online with GoBusly from €${minPrice}.`;

  return {
    title,
    description,
    // ✅ CRITICAL: Canonical URL (fixes duplicate content)
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
  const routeData = await getRouteData(params.slug);

  if (!routeData) {
    notFound();
  }

  return <RoutePageContent routeData={routeData} />;
}
