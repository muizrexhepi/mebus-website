// app/bus/[country]/[city]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Bus,
  Clock,
  Info,
  Sparkles,
  Navigation,
} from "lucide-react";
import Footer from "@/components/Footer";

// =====================
// Config (Next.js 15.15)
// =====================
export const revalidate = 60 * 60 * 12; // ISR: 12h

// ============
// Util helpers
// ============
const toTitleCaseFromSlug = (s: string) =>
  s
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

const cityToSlug = (name: string | undefined) => {
  if (!name) return "";
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const capitalizeCity = (s: string) =>
  s
    .split(/-| /g)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

type PageProps = {
  params: {
    country: string;
    city: string;
  };
};

type CityRelation = {
  _id: string;
  name?: string; // Optional since API returns 'city' instead
  city?: string; // API actually returns this
  country?: string;
};

type CityData = {
  city: {
    _id: string;
    name: string;
    country: string;
  };
  relations: CityRelation[];
};

// Helper to get city name from relation (handles both 'name' and 'city' properties)
const getRelationName = (rel: CityRelation): string => {
  return rel.name || rel.city || "";
};

// =====================
// Dynamic Metadata (RSC)
// =====================
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const countryName = toTitleCaseFromSlug(params.country);
  const cityName = toTitleCaseFromSlug(params.city);
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com";
  const canonical = `${base}/bus/${params.country}/${params.city}`;

  const title = `Bus from ${cityName} – Routes, Schedules & Tickets`;
  const description =
    `Book bus tickets from ${cityName}, ${countryName}. ` +
    `Compare schedules, operators and prices. Find domestic and international routes.`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: "index, follow",
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "GoBusly",
      title,
      description,
      images: [
        {
          url: `${base}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "GoBusly – Bus Tickets & Schedules",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${base}/og-image.png`],
    },
  };
}

// =========================
// Data fetch (API)
// =========================
async function getCityRelations(citySlug: string): Promise<CityData | null> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "https://www.gobusly.com";

  const url = `${apiBase}/seo/city/relations/${encodeURIComponent(citySlug)}`;

  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    const data = await res.json();
    console.log({ relations: data.relations });
    return data ?? null;
  } catch (error) {
    console.error("Error fetching city relations:", error);
    return null;
  }
}

// =========================
// Build search URL
// =========================
function buildSearchUrl(
  base: string,
  fromCity: { name: string; _id: string },
  toCity: { name: string; _id: string }
): string {
  console.log({ fromCity, toCity });
  const fromSlug = cityToSlug(fromCity.name);
  const toSlug = cityToSlug(toCity.name);

  // Get tomorrow's date in DD-MM-YYYY format
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const day = String(tomorrow.getDate()).padStart(2, "0");
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const year = tomorrow.getFullYear();
  const dateStr = `${day}-${month}-${year}`;

  return `${base}/search/${fromSlug}-${toSlug}?departureStation=${fromCity._id}&arrivalStation=${toCity._id}&departureDate=${dateStr}&adult=1&children=0`;
}

// ======================
// Schema JSON-LD helpers
// ======================
function breadcrumbJsonLd(
  base: string,
  countrySlug: string,
  countryName: string,
  citySlug: string,
  cityName: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Bus Tickets",
        item: `${base}/bus`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: countryName,
        item: `${base}/bus/${countrySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityName,
        item: `${base}/bus/${countrySlug}/${citySlug}`,
      },
    ],
  };
}

function cityJsonLd(
  base: string,
  cityName: string,
  countryName: string,
  relations: CityRelation[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: cityName,
    description: `Bus routes from ${cityName}, ${countryName}. Book tickets online.`,
    touristType: "Bus travel",
    url: base,
    containedInPlace: {
      "@type": "Country",
      name: countryName,
    },
    provider: {
      "@type": "TravelAgency",
      name: "GoBusly",
      url: base,
      serviceType: "Bus Transportation Booking",
    },
    ...(relations.length > 0 && {
      offers: relations.slice(0, 5).map((rel) => ({
        "@type": "Offer",
        name: `Bus from ${cityName} to ${getRelationName(rel)}`,
        category: "Bus Transportation",
      })),
    }),
  };
}

// ===============
// Page (RSC)
// ===============
export default async function CityPage({ params }: PageProps) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com";
  const countrySlug = params.country;
  const citySlug = params.city;
  const countryName = toTitleCaseFromSlug(countrySlug);
  const cityName = toTitleCaseFromSlug(citySlug);

  const cityData = await getCityRelations(citySlug);
  console.log({ cityData });
  // JSON-LD payloads
  const breadcrumbLD = breadcrumbJsonLd(
    base,
    countrySlug,
    countryName,
    citySlug,
    cityName
  );
  const cityLD = cityJsonLd(
    base,
    cityData?.city?.name ?? cityName,
    countryName,
    cityData?.relations ?? []
  );

  // Group relations by country for better organization
  const relationsByCountry = (cityData?.relations ?? []).reduce((acc, rel) => {
    const country = rel.country || "Other";
    if (!acc[country]) acc[country] = [];
    acc[country].push(rel);
    return acc;
  }, {} as Record<string, CityRelation[]>);

  // Domestic routes first, then international
  const domesticRoutes = relationsByCountry[countryName] ?? [];
  const internationalCountries = Object.keys(relationsByCountry)
    .filter((c) => c !== countryName)
    .sort();

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-20 md:pb-0">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#ff284d]/5 via-white to-orange-50/30 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-[#ff284d]/10 to-orange-100/20 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-blue-100/20 to-purple-100/20 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto paddingX py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8 text-gray-600">
            <Link href="/" className="hover:text-[#ff284d] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/bus"
              className="hover:text-[#ff284d] transition-colors"
            >
              Bus
            </Link>
            <span>/</span>
            <Link
              href={`/bus/${countrySlug}`}
              className="hover:text-[#ff284d] transition-colors"
            >
              {countryName}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium capitalize">
              {cityData?.city?.name ?? cityName}
            </span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Navigation className="w-4 h-4 text-[#ff284d]" />
              <span className="text-sm font-medium text-gray-700">
                {countryName}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-gray-900 leading-tight">
              Bus from{" "}
              <span className="text-primary-accent capitalize">
                {cityData?.city?.name ?? cityName}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Find all available bus routes from{" "}
              {cityData?.city?.name ?? cityName}. Compare schedules, operators
              and prices across domestic and international destinations.
            </p>

            {cityData && cityData.relations.length > 0 && (
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-lg backdrop-blur-sm border border-gray-200">
                  <Bus className="w-5 h-5 text-[#ff284d]" />
                  <span className="text-sm font-semibold text-gray-900">
                    {cityData.relations.length}
                  </span>
                  <span className="text-sm text-gray-600">
                    {cityData.relations.length === 1 ? "Route" : "Routes"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto paddingX py-12 space-y-12">
        {!cityData || cityData.relations.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
            <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Routes Available Yet
            </h3>
            <p className="text-gray-600">
              We're currently updating our route database for {cityName}.
            </p>
          </div>
        ) : (
          <>
            {/* Domestic Routes */}
            {domesticRoutes.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Domestic Routes
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Travel within {countryName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {domesticRoutes.map((rel) => {
                    const relName = getRelationName(rel);
                    console.log({ rel, relName });
                    const searchUrl = buildSearchUrl(
                      base,
                      { name: cityData.city.name, _id: cityData.city._id },
                      { name: relName, _id: rel._id }
                    );

                    return (
                      <Link
                        key={rel._id}
                        href={searchUrl}
                        className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-[#ff284d] hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-gray-400" />
                              <span className="font-semibold text-gray-900">
                                {cityData.city.name}
                              </span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-[#ff284d]" />
                            <div className="flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-gray-400" />
                              <span className="font-semibold text-gray-900">
                                {capitalizeCity(relName)}
                              </span>
                            </div>
                          </div>
                          <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-[#ff284d] group-hover:translate-x-1 transition-all flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* International Routes */}
            {internationalCountries.map((country) => {
              const routes = relationsByCountry[country];

              return (
                <section key={country} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Routes to {country}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        International connections
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {routes.map((rel) => {
                      const relName = getRelationName(rel);
                      const searchUrl = buildSearchUrl(
                        base,
                        { name: cityData.city.name, _id: cityData.city._id },
                        { name: relName, _id: rel._id }
                      );

                      return (
                        <Link
                          key={rel._id}
                          href={searchUrl}
                          className="group bg-white rounded-xl shadow-sm p-5 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <span className="font-semibold text-gray-900 capitalize">
                                  {cityData.city.name}
                                </span>
                              </div>
                              <ArrowRight className="w-5 h-5 text-primary-accent" />
                              <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <span className="font-semibold text-gray-900">
                                  {capitalizeCity(relName)}
                                </span>
                              </div>
                            </div>
                            <svg
                              className="w-5 h-5 text-gray-400 group-hover:text-primary-accent group-hover:translate-x-1 transition-all flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {/* CTA Section */}
            {/* <section className="bg-gradient-to-r from-[#ff284d] to-orange-500 rounded-2xl p-8 sm:p-12 text-white shadow-xl">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Ready to Travel?
                </h2>
                <p className="text-lg text-white/90">
                  Book your bus tickets from {cityData.city.name} now. Compare
                  prices and find the best deals.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#ff284d] rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Search All Routes
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </section> */}
          </>
        )}
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityLD) }}
      />

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}
