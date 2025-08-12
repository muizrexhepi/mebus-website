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

  const { fromCity, toCity, fromStation, toStation } = routeData;

  return {
    title: `Bus Tickets from ${fromCity} to ${toCity} – Affordable & Fast Booking | GoBusly`,
    description: `Book bus tickets from ${fromCity} to ${toCity}. Compare prices, schedules, and operators. Easy online booking with instant confirmation. Starting from €${routeData.minPrice}.`,
    keywords: `bus tickets ${fromCity} ${toCity}, ${fromCity} to ${toCity} bus, book bus ${fromCity} ${toCity}, cheap bus tickets ${fromCity} ${toCity}`,
    openGraph: {
      title: `Bus Tickets from ${fromCity} to ${toCity} | GoBusly`,
      description: `Book your bus journey from ${fromCity} to ${toCity}. Compare operators and find the best deals.`,
      type: "website",
      url: `https://gobusly.com/route/${params.slug}`,
      images: [
        {
          url: "/og-route-image.jpg",
          width: 1200,
          height: 630,
          alt: `Bus route from ${fromCity} to ${toCity}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Bus Tickets from ${fromCity} to ${toCity} | GoBusly`,
      description: `Book your bus journey from ${fromCity} to ${toCity}. Compare operators and find the best deals.`,
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
