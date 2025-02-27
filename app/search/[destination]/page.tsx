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

  const title = `Bus from ${departureCity} to ${arrivalCity} | Compare & Book Cheap Tickets - GoBusly`;
  const description = `Compare and book bus tickets from ${departureCity} to ${arrivalCity} at the best prices. Daily departures, comfortable buses with WiFi, and luggage included. Secure your seat online with GoBusly.`;
  const keywords = `bus tickets, ${departureCity} to ${arrivalCity}, book bus ${departureCity} ${arrivalCity}, cheap bus tickets ${departureCity}, best bus deals ${departureCity}, coach travel, direct bus ${departureCity} ${arrivalCity}, long-distance bus ${departureCity}, ${departureCity} to ${arrivalCity} bus schedule`;

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
      title: `Bus from ${departureCity} to ${arrivalCity} | Book Cheap Tickets`,
      description: `Compare bus fares from ${departureCity} to ${arrivalCity} and travel comfortably. Book online with GoBusly for the best prices and reliable service.`,
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
      title: `Bus from ${departureCity} to ${arrivalCity} - Compare & Book Online`,
      description: `Find and book bus tickets from ${departureCity} to ${arrivalCity}. Compare prices, check schedules, and travel comfortably with GoBusly.`,
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
      {/* <div className="mt-6 text-center text-gray-600">
        <h2 className="text-lg font-semibold mb-2">Popular Bus Routes</h2>
        <ul className="flex flex-wrap justify-center gap-4">
          <li>
            <a
              href="/search/skopje-belgrade"
              className="text-primary hover:underline"
            >
              Bus from Skopje to Belgrade
            </a>
          </li>
          <li>
            <a
              href="/search/tirana-pristina"
              className="text-primary hover:underline"
            >
              Bus from Tirana to Pristina
            </a>
          </li>
          <li>
            <a
              href="/search/sarajevo-zagreb"
              className="text-primary hover:underline"
            >
              Bus from Sarajevo to Zagreb
            </a>
          </li>
        </ul>
      </div> */}
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
              address: {
                "@type": "PostalAddress",
                addressLocality: departureCity,
                addressCountry: "MK", // Adjust country code dynamically if needed
              },
            },
            arrivalStation: {
              "@type": "BusStation",
              name: `${arrivalCity} Bus Station`,
              address: {
                "@type": "PostalAddress",
                addressLocality: arrivalCity,
                addressCountry: "EU", // Adjust dynamically
              },
            },
            provider: {
              "@type": "Organization",
              name: "GoBusly",
              url: "https://www.gobusly.com",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              price: "XX.XX", // Dynamically insert price if available
              availability: "https://schema.org/InStock",
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/search/${destination}`,
              validFrom: new Date().toISOString(),
            },
            departureTime: "TBD", // Add dynamic time if available
            arrivalTime: "TBD",
          }),
        }}
      />
    </div>
  );
}
