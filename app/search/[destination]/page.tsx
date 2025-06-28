import type { Metadata } from "next";
import { Suspense } from "react";
import SecondaryFooter from "@/components/SecondaryFooter";
import SearchSection from "../_components/SearchSection";
import SearchedTickets from "../_components/SearchedTickets";
import { Loader2 } from "lucide-react";
import { MobileSearchBlock } from "../_components/MobileSearchBlock";
import { generateSEOKeywords } from "@/lib/keywords";

type GenerateMetadataProps = {
  params: { destination: string };
  searchParams: { [key: string]: string | undefined };
};

// Optimized metadata generation with memoization
const formatCityName = (cityEncoded: string) => {
  return decodeURIComponent(cityEncoded)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatDateForParams = (dateString: string) => {
  const [day, month, year] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

export async function generateMetadata({
  params,
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const { destination } = params;
  const [departureCityEncoded, arrivalCityEncoded] = destination.split("-");

  const departureCity = formatCityName(departureCityEncoded);
  const arrivalCity = formatCityName(arrivalCityEncoded);

  const title = `Bus from ${departureCity} to ${arrivalCity} | GoBusly`;
  const description = `Compare and book bus tickets from ${departureCity} to ${arrivalCity} at the best prices. Daily departures, comfortable buses with WiFi, and luggage included. Secure your seat online with GoBusly.`;

  const keywords = generateSEOKeywords({
    fromCity: departureCity,
    toCity: arrivalCity,
  });

  // Optimize search params formatting
  const formattedSearchParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (value) {
      if (key === "departureDate") {
        formattedSearchParams[key] = formatDateForParams(value);
      } else {
        formattedSearchParams[key] = value;
      }
    }
  }

  const canonicalUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/search/${destination}?${new URLSearchParams(
    formattedSearchParams
  ).toString()}`;

  const imagePathSegment = `${encodeURIComponent(
    departureCity.toLowerCase()
  )}-${encodeURIComponent(arrivalCity.toLowerCase())}.jpg`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: "index, follow",
    openGraph: {
      title: `Bus from ${departureCity} to ${arrivalCity} | Book Cheap Tickets`,
      description: `Compare bus fares from ${departureCity} to ${arrivalCity} and travel comfortably. Book online with GoBusly for the best prices and reliable service.`,
      url: canonicalUrl,
      siteName: "GoBusly",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/routes/${imagePathSegment}`,
          width: 1200,
          height: 630,
          alt: `Bus from ${departureCity} to ${arrivalCity}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Bus from ${departureCity} to ${arrivalCity} - Compare & Book Online`,
      description: `Find and book bus tickets from ${departureCity} to ${arrivalCity}. Compare prices, check schedules, and travel comfortably with GoBusly.`,
      images: [
        `${process.env.NEXT_PUBLIC_BASE_URL}/images/routes/${imagePathSegment}`,
      ],
    },
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
    },
  };
}

// Optimized loading component
const TicketsLoading = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

// Optimized structured data generation
const generateStructuredData = (
  departureCity: string,
  arrivalCity: string,
  destination: string,
  departureDate?: string
) => {
  const formatDateForSchema = (dateString?: string) => {
    if (!dateString) return new Date().toISOString().split("T")[0];
    try {
      const [day, month, year] = dateString.split("-");
      return `${year}-${month}-${day}`;
    } catch {
      return new Date().toISOString().split("T")[0];
    }
  };

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
      departureTime: formatDateForSchema(departureDate),
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
          urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL}/search/{from}-{to}?departureDate={departure_date}`,
        },
        "query-input": [
          "required name=from",
          "required name=to",
          "required name=departure_date",
        ],
      },
    },
  ];
};

export default async function SearchPage({ params, searchParams }: any) {
  const { destination } = params;

  // Optimized city name extraction
  const [departureCityEncoded, arrivalCityEncoded] = destination.split("-");
  const departureCity = formatCityName(departureCityEncoded);
  const arrivalCity = formatCityName(arrivalCityEncoded);

  const departureDate = searchParams?.departureDate;
  const structuredData = generateStructuredData(
    departureCity,
    arrivalCity,
    destination,
    departureDate
  );

  return (
    <div className="min-h-screen bg-primary-bg/5">
      <MobileSearchBlock />
      <SearchSection />

      <div className="px-4 sm:px-8 max-w-6xl mx-auto py-4 space-y-4 xl:px-0 min-h-screen">
        <h1 className="sr-only">
          Bus from {departureCity} to {arrivalCity}
        </h1>

        <div className="w-full max-w-2xl mx-auto">
          <Suspense fallback={<TicketsLoading />}>
            <SearchedTickets />
          </Suspense>
        </div>
      </div>

      <SecondaryFooter />

      {/* Optimized structured data injection */}
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
