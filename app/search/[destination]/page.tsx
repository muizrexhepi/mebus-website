import { Metadata } from "next";
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

export async function generateMetadata({
  params,
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const { destination } = params;

  const [departureCityEncoded, arrivalCityEncoded] = destination.split("-");
  const departureCity = decodeURIComponent(departureCityEncoded)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const arrivalCity = decodeURIComponent(arrivalCityEncoded)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const title = `Bus from ${departureCity} to ${arrivalCity}`;
  const description = `Compare and book bus tickets from ${departureCity} to ${arrivalCity} at the best prices. Daily departures, comfortable buses with WiFi, and luggage included. Secure your seat online with GoBusly.`;

  const keywords = generateSEOKeywords({
    fromCity: departureCity,
    toCity: arrivalCity,
  });

  const formattedSearchParams: Record<string, string> = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => {
      if (key === "departureDate" && value) {
        const [day, month, year] = value.split("-");
        const newDate = `${day}-${month}-${year}`;
        return [key, newDate];
      }
      return [key, value];
    }) as [string, string][]
  );

  const canonicalUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/search/${destination}?${new URLSearchParams(
    formattedSearchParams
  ).toString()}`;

  const departureCityLower = departureCity.toLowerCase();
  const arrivalCityLower = arrivalCity.toLowerCase();
  const imagePathSegment = `${encodeURIComponent(
    departureCityLower
  )}-${encodeURIComponent(arrivalCityLower)}.jpg`;

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

const TicketsLoading = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

export default async function SearchPage({ params, searchParams }: any) {
  const { destination } = params;

  // Decode the URL-encoded cities in the page component too
  const [departureCityEncoded, arrivalCityEncoded] = destination.split("-");
  const departureCity = decodeURIComponent(departureCityEncoded)
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const arrivalCity = decodeURIComponent(arrivalCityEncoded)
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/search/${destination}`;

  // Get departure date from search params for dynamic structured data
  const departureDate = searchParams?.departureDate;
  const formatDateForSchema = (dateString?: string) => {
    if (!dateString) return new Date().toISOString().split("T")[0];
    try {
      const [day, month, year] = dateString.split("-");
      return `${year}-${month}-${day}`;
    } catch {
      return new Date().toISOString().split("T")[0];
    }
  };

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

      {/* Focused Structured Data - Similar to FlixBus approach */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BusTrip",
            name: `${departureCity} to ${arrivalCity}`,
            departureStation: {
              "@type": "BusStation",
              name: departureCity,
              address: {
                "@type": "PostalAddress",
                addressLocality: departureCity,
              },
            },
            arrivalStation: {
              "@type": "BusStation",
              name: arrivalCity,
              address: {
                "@type": "PostalAddress",
                addressLocality: arrivalCity,
              },
            },
            provider: {
              "@type": "Organization",
              name: "GoBusly",
              url: process.env.NEXT_PUBLIC_BASE_URL,
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
          }),
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "GoBusly",
            url: process.env.NEXT_PUBLIC_BASE_URL,
            logo: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
            description:
              "Compare and book bus tickets across Europe and the Balkans at the best prices.",
            sameAs: [
              // Add your social media URLs here when available
            ],
          }),
        }}
      />

      {/* WebSite Schema with Search Action */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "GoBusly",
            url: process.env.NEXT_PUBLIC_BASE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL}/search?from={search_term_string}&to={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </div>
  );
}
