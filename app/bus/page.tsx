import type { Metadata } from "next";
import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { SearchForm } from "@/components/forms/SearchForm";
import PopularBusRoutes from "@/components/home/PopularRoutes";

// =====================
// Config (Next.js 15)
// =====================
export const revalidate = 60 * 60 * 12; // ISR: 12h

// =====================
// Types
// =====================
type Country = {
  country: string;
  slug?: string;
  stationCount: number;
};

// =====================
// Helper Functions
// =====================
const cityToSlug = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

// =====================
// Data Fetch
// =====================
async function getCountries(): Promise<Country[]> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "https://www.gobusly.com";
  const url = `${apiBase}/seo/countries/get-all`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 12 } });
    if (!res.ok) return [];
    const response = await res.json();
    console.log({ response });
    const countries = (response?.data || []).map((country: Country) => ({
      ...country,
      slug: country.slug || cityToSlug(country.country),
    }));
    console.log({ countries });
    return countries.sort((a: Country, b: Country) =>
      a.country.localeCompare(b.country)
    );
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}

// =====================
// Metadata
// =====================
export const metadata: Metadata = {
  title: "Bus Tickets – Find Routes, Schedules & Book Online | GoBusly",
  description:
    "Search and compare bus tickets across 45+ countries. Find the best routes, schedules, and prices for domestic and international bus travel. Book your journey today.",
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com"
    }/bus`,
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com"}/bus`,
    siteName: "GoBusly",
    title: "Bus Tickets – Find Routes, Schedules & Book Online | GoBusly",
    description:
      "Search and compare bus tickets across 45+ countries. Find the best routes, schedules, and prices for domestic and international bus travel.",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com"
        }/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GoBusly – Bus Tickets & Schedules",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bus Tickets – Find Routes, Schedules & Book Online | GoBusly",
    description:
      "Search and compare bus tickets across 45+ countries. Find the best routes, schedules, and prices.",
    images: [
      `${
        process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com"
      }/og-image.png`,
    ],
  },
};

// =====================
// JSON-LD Schemas
// =====================
function getStructuredData(countries: Country[]) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com";

  return [
    // Breadcrumb
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: base,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Bus Tickets",
          item: `${base}/bus`,
        },
      ],
    },
    // Organization
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "GoBusly",
      description:
        "Global bus ticket booking platform connecting travelers with bus operators across 45+ countries.",
      url: base,
      logo: `${base}/logo.png`,
      sameAs: [
        // Add your social media links here
      ],
      areaServed: countries.map((c) => ({
        "@type": "Country",
        name: c.country,
      })),
      serviceType: [
        "Bus Transportation Booking",
        "Intercity Bus Services",
        "International Bus Travel",
      ],
    },
    // WebSite
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "GoBusly",
      url: base,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${base}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    // ItemList for Countries
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Countries with Bus Services",
      description:
        "List of countries where bus tickets can be booked through GoBusly",
      numberOfItems: countries.length,
      itemListElement: countries.map((country, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristDestination",
          name: country.country,
          url: `${base}/bus/${country.slug}`,
        },
      })),
    },
  ];
}

// =====================
// Page Component
// =====================
export default async function BusPage() {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com";
  const countries = await getCountries();
  console.log({ countries });

  // Group countries by first letter
  const groupedCountries = countries.reduce((acc, country) => {
    const firstLetter = country.country[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(country);
    return acc;
  }, {} as Record<string, Country[]>);

  console.log({ groupedCountries });

  const structuredData = getStructuredData(countries);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="w-full bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <SearchForm />
        </div>
      </div>

      {/* Main Content: Header + Countries Grid */}
      <div className="max-w-6xl mx-auto paddingX py-10 pb-20 md:pb-10">
        {/* SEO Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-3">
            Bus Tickets <span className="text-primary-accent">Worldwide</span>
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-3xl">
            Search and compare bus tickets across {countries.length}+ countries.
            Find the best routes, schedules, and prices for domestic and
            international bus travel. Book your journey in minutes.
          </p>
        </div>

        {/* Countries Grid */}
        {countries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Loading Countries...
            </h3>
            <p className="text-gray-500 text-sm">
              We're fetching available destinations.
            </p>
          </div>
        ) : (
          <section className="space-y-10">
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-6">
                Choose Your Country
              </h2>

              {/* Alphabetical Sections */}
              <div className="space-y-8">
                {Object.entries(groupedCountries).map(
                  ([letter, countryList]) => (
                    <div key={letter} className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-400 px-1">
                        {letter}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {countryList.map((country) => (
                          <Link
                            key={country.slug}
                            href={`/bus/${country.slug}`}
                            className="group bg-white rounded-lg shadow-sm p-4 hover:shadow transition-all duration-200"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 truncate capitalize">
                                    {country.country}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {country.stationCount}{" "}
                                    {country.stationCount === 1
                                      ? "city"
                                      : "cities"}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary-accent group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* <-- ADDED DYNAMIC POPULAR ROUTES SECTION --> */}

      {/* <-- REFACTORED SEO CONTENT SECTION --> */}
      <section className="max-w-6xl mx-auto paddingX">
        <div className="space-y-16">
          {/* --- Why Book With Us? --- */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow p-6">
            <h2 className="text-2xl font-medium text-gray-900 mb-6 mt-0">
              Why Book Bus Tickets with{" "}
              <span className="text-primary-accent">GoBusly</span>?
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8 text-sm text-gray-600 leading-relaxed">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  Global Coverage
                </h3>
                <p>
                  Access bus routes across {countries.length}+ countries
                  worldwide. From local city connections to international
                  journeys, find all your bus travel options in one place.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  Best Prices
                </h3>
                <p>
                  Compare prices from multiple bus operators instantly. We help
                  you find the most affordable tickets without compromising on
                  quality or comfort.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  Easy Booking
                </h3>
                <p>
                  Book your bus tickets in just a few clicks. Our streamlined
                  booking process makes it simple to secure your seat and get
                  your confirmation instantly.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  Real-Time Schedules
                </h3>
                <p>
                  Access up-to-date bus schedules and availability. Plan your
                  journey with confidence knowing you have the latest departure
                  and arrival information.
                </p>
              </div>
            </div>
          </div>

          {/* --- How to Book (Cleaner UI) --- */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow p-6">
            <h2 className="text-2xl font-medium text-gray-900 mb-6 mt-0">
              How to Book Your Bus Ticket
            </h2>
            <ol className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <li className="flex items-start">
                <strong className="text-base font-semibold text-primary-accent w-6 flex-shrink-0">
                  1.
                </strong>
                <span className="flex-1">
                  <strong className="text-gray-900">Search:</strong> Enter your
                  departure and arrival cities, select your travel date, and
                  number of passengers.
                </span>
              </li>
              <li className="flex items-start">
                <strong className="text-base font-semibold text-primary-accent w-6 flex-shrink-0">
                  2.
                </strong>
                <span className="flex-1">
                  <strong className="text-gray-900">Compare:</strong> Browse
                  through available bus operators, departure times, and ticket
                  prices to find the best option.
                </span>
              </li>
              <li className="flex items-start">
                <strong className="text-base font-semibold text-primary-accent w-6 flex-shrink-0">
                  3.
                </strong>
                <span className="flex-1">
                  <strong className="text-gray-900">Select:</strong> Choose your
                  preferred bus service based on departure time, price,
                  amenities, and reviews.
                </span>
              </li>
              <li className="flex items-start">
                <strong className="text-base font-semibold text-primary-accent w-6 flex-shrink-0">
                  4.
                </strong>
                <span className="flex-1">
                  <strong className="text-gray-900">Book:</strong> Complete your
                  booking securely and receive your ticket confirmation
                  instantly via email.
                </span>
              </li>
              <li className="flex items-start">
                <strong className="text-base font-semibold text-primary-accent w-6 flex-shrink-0">
                  5.
                </strong>
                <span className="flex-1">
                  <strong className="text-gray-900">Travel:</strong> Show your
                  ticket (digital or printed) at the departure point and enjoy
                  your journey!
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>
      <PopularBusRoutes />

      {/* Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* JSON-LD Structured Data */}
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
