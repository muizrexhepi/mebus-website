import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SecondaryFooter from "@/components/SecondaryFooter";
import SearchSection from "../_components/SearchSection";
import SearchedTickets from "../_components/SearchedTickets";
import { MobileSearchBlock } from "../_components/MobileSearchBlock";
import { generateSEOKeywords } from "@/lib/keywords";
import axios from "axios";

type GenerateMetadataProps = {
  params: { destination: string };
  searchParams: { [key: string]: string | undefined };
};

const formatCityName = (cityEncoded: string) => {
  return decodeURIComponent(cityEncoded)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Validate route exists (add your actual route validation logic)
async function validateRoute(
  departureStationId: string,
  arrivalStationId: string
): Promise<boolean> {
  try {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BASE_URL;
    const { data } = await axios.get(`${apiBase}/seo/validate-route`, {
      params: {
        departureStation: departureStationId.toLowerCase(),
        arrivalStation: arrivalStationId.toLowerCase(),
      },
    });
    return data?.data?.exists === true;
  } catch (err) {
    return false;
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const { destination } = params;
  const [departureCityEncoded, arrivalCityEncoded] = destination.split("-");
  const departureCity = formatCityName(departureCityEncoded);
  const arrivalCity = formatCityName(arrivalCityEncoded);

  // Validate route
  const routeExists = await validateRoute(departureCity, arrivalCity);
  if (!routeExists) {
    return {
      title: "Route Not Found",
      robots: "noindex, nofollow",
    };
  }

  const title = `Bus from ${departureCity} to ${arrivalCity} | GoBusly`;
  const description = `Compare and book bus tickets from ${departureCity} to ${arrivalCity} at the best prices. Daily departures, comfortable buses with WiFi, and luggage included. Secure your seat online with GoBusly.`;

  const keywords = generateSEOKeywords({
    fromCity: departureCity,
    toCity: arrivalCity,
  });

  // CRITICAL: Canonical always points to clean URL (no parameters)
  // This tells Google "this is the main version, ignore parameter variations"
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/search/${destination}`;

  // CRITICAL: If URL has parameters, tell Google not to index this specific variation
  const hasParameters = Object.keys(searchParams).length > 0;
  const robotsDirective = hasParameters
    ? "noindex, follow" // Don't index parameterized URLs, but follow links
    : "index, follow"; // Index only the clean URL

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl, // Always canonical to clean URL
    },
    robots: robotsDirective, // Dynamic based on parameters
    openGraph: {
      title: `Bus from ${departureCity} to ${arrivalCity} | Book Cheap Tickets`,
      description: `Compare bus fares from ${departureCity} to ${arrivalCity} and travel comfortably. Book online with GoBusly for the best prices and reliable service.`,
      url: canonicalUrl,
      siteName: "GoBusly",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/search/${destination}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Bus from ${departureCity} to ${arrivalCity} - Compare & Book Online`,
      description: `Find and book bus tickets from ${departureCity} to ${arrivalCity}. Compare prices, check schedules, and travel comfortably with GoBusly.`,
    },
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
    },
  };
}

const generateStructuredData = (
  departureCity: string,
  arrivalCity: string,
  destination: string
) => {
  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/search/${destination}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BusTrip",
      name: `${departureCity} to ${arrivalCity}`,
      description: `Bus service from ${departureCity} to ${arrivalCity}`,
      departureStation: {
        "@type": "BusStation",
        name: `${departureCity} Bus Station`,
        address: {
          "@type": "PostalAddress",
          addressLocality: departureCity,
        },
      },
      arrivalStation: {
        "@type": "BusStation",
        name: `${arrivalCity} Bus Station`,
        address: {
          "@type": "PostalAddress",
          addressLocality: arrivalCity,
        },
      },
      provider: {
        "@type": "Organization",
        name: "GoBusly",
        url: process.env.NEXT_PUBLIC_BASE_URL,
        logo: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: currentUrl,
        validFrom: new Date().toISOString(),
        seller: {
          "@type": "Organization",
          name: "GoBusly",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "GoBusly",
      url: process.env.NEXT_PUBLIC_BASE_URL,
      logo: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
      description:
        "Compare and book bus tickets across Europe and the Balkans at the best prices.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English", "Albanian", "Serbian"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "GoBusly",
      url: process.env.NEXT_PUBLIC_BASE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL}/search/{from}-{to}`,
        },
        "query-input": ["required name=from", "required name=to"],
      },
    },
  ];
};

export default async function SearchPage({ params, searchParams }: any) {
  const { destination } = params;

  const [departureCityEncoded, arrivalCityEncoded] = destination.split("-");
  const departureCity = formatCityName(departureCityEncoded);
  const arrivalCity = formatCityName(arrivalCityEncoded);

  // Validate route exists

  const structuredData = generateStructuredData(
    departureCity,
    arrivalCity,
    destination
  );

  // Import SearchInitializer dynamically (client component)
  const { SearchInitializer } = await import(
    "@/app/search/_components/search-initializer"
  );

  return (
    <div className="min-h-screen bg-primary-bg/5">
      {/* Initialize search from URL if parameters are missing */}
      <SearchInitializer />

      <MobileSearchBlock />
      <SearchSection />
      <div className="px-4 sm:px-8 max-w-6xl mx-auto space-y-4 xl:px-0 min-h-screen">
        <h1 className="sr-only">
          Bus from {departureCity} to {arrivalCity}
        </h1>
        <div className="w-full max-w-2xl mx-auto">
          {/* SearchedTickets will use searchParams to fetch tickets */}
          <SearchedTickets />
        </div>
      </div>
      <SecondaryFooter />

      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      ))}
    </div>
  );
}
