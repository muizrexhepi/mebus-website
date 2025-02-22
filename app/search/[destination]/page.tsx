import { Metadata } from "next";
import { Suspense } from "react";
import SecondaryFooter from "@/components/SecondaryFooter";
import SearchSection from "../_components/SearchSection";
import SearchedTickets from "../_components/SearchedTickets";
import { Loader2 } from "lucide-react";
import { MobileSearchBlock } from "../_components/MobileSearchBlock";

type GenerateMetadataProps = {
  params: { destination: string };
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const { destination } = params;
  const [departureCity, arrivalCity] = destination
    .split("-")
    .map((city) => city.charAt(0).toUpperCase() + city.slice(1));

  const title = `Bus from ${departureCity} to ${arrivalCity} | Cheap Tickets | GoBusly`;
  const description = `Book bus tickets from ${departureCity} to ${arrivalCity}. Daily departures, comfortable buses with WiFi, luggage included. Compare prices & book online with GoBusly.`;
  const keywords = `bus tickets, ${departureCity} to ${arrivalCity}, cheap bus, ${departureCity} ${arrivalCity} bus, coach travel, ${departureCity} to ${arrivalCity} bus tickets, book bus from ${departureCity} to ${arrivalCity}, bus travel ${departureCity} ${arrivalCity}, long-distance bus ${departureCity} to ${arrivalCity}, best bus routes ${departureCity} ${arrivalCity}, bus schedule ${departureCity} to ${arrivalCity}`;

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
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: "index, follow",
    openGraph: {
      title: `Bus from ${departureCity} to ${arrivalCity}`,
      description: `Find the best bus deals from ${departureCity} to ${arrivalCity}.`,
      url: canonicalUrl,
      siteName: "GoBusly",
      images: [
        {
          url: `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/images/routes/${departureCity.toLowerCase()}-${arrivalCity.toLowerCase()}.jpg`,
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
      title: `Bus from ${departureCity} to ${arrivalCity}`,
      description: `Book your journey from ${departureCity} to ${arrivalCity}. Compare & book tickets online.`,
      images: [
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/images/routes/${departureCity.toLowerCase()}-${arrivalCity.toLowerCase()}.jpg`,
      ],
    },
  };
}

const TicketsLoading = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

export default async function SearchPage({ params }: any) {
  const { destination } = params;
  const [departureCity, arrivalCity] = destination
    .split("-")
    .map((city: string) => city.charAt(0).toUpperCase() + city.slice(1));

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

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BusTrip",
            name: `Bus from ${departureCity} to ${arrivalCity}`,
            departureStation: {
              "@type": "BusStation",
              name: `${departureCity} Bus Station`,
            },
            arrivalStation: {
              "@type": "BusStation",
              name: `${arrivalCity} Bus Station`,
            },
            provider: {
              "@type": "Organization",
              name: "GoBusly",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/search/${destination}`,
            },
          }),
        }}
      />
    </div>
  );
}
