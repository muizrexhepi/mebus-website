// app/bus/[country]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  Bus,
  MapPin,
  CheckCircle2,
  Clock,
  Shield,
  ArrowRight,
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

const cityToSlug = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const capitalizeCity = (s: string) =>
  s
    .split(/-| /g)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

type PageProps = { params: { country: string } };

// Updated City type to include station info
type CityWithStations = {
  cityName: string;
  country: string;
  stations: {
    id: string;
    name: string;
  }[];
};

// =====================
// Dynamic Metadata (RSC)
// =====================
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const countryName = toTitleCaseFromSlug(params.country);
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com";
  const canonical = `${base}/bus/${params.country}`;

  const title = `Bus Tickets in ${countryName} – Routes, Cities & Booking`;
  const description =
    `GoBusly is a Balkan intercity bus search & booking platform. ` +
    `Compare schedules, operators and prices across ${countryName}. ` +
    `Find popular routes, city connections and book securely online.`;

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
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
    },
  };
}

// =========================
// Data fetch (API shape fix)
// =========================
async function getCities(countryName: string): Promise<CityWithStations[]> {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "https://www.gobusly.com";

  const url = `${apiBase}/seo/country/${encodeURIComponent(countryName)}`;
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) return [];

  const data = await res.json();
  console.log({ qytetet: data.data.cities });

  const rawCities = data?.data?.cities;
  if (!rawCities || !Array.isArray(rawCities)) return [];

  // Group stations by city
  const cityMap = new Map<string, CityWithStations>();

  rawCities.forEach((station: any) => {
    const cityName = capitalizeCity(station.city);
    const stationName = capitalizeCity(station.name);

    if (!cityMap.has(cityName)) {
      cityMap.set(cityName, {
        cityName,
        country: countryName,
        stations: [],
      });
    }

    cityMap.get(cityName)!.stations.push({
      id: station._id,
      name: stationName,
    });
  });

  return Array.from(cityMap.values()).sort((a, b) =>
    a.cityName.localeCompare(b.cityName)
  );
}

// ======================
// Schema JSON-LD helpers
// ======================
function breadcrumbJsonLd(
  base: string,
  countrySlug: string,
  countryName: string
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
    ],
  };
}

function countryJsonLd(base: string, countryName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: countryName,
    description: `Intercity bus travel in ${countryName}: routes, schedules and booking via GoBusly.`,
    touristType: "Bus travel",
    url: base,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${base}/bus/${countryName.toLowerCase().replace(/\s+/g, "-")}`,
    },
    provider: {
      "@type": "TravelAgency",
      name: "GoBusly",
      url: base,
      alternateName: ["Go Busly", "GoBusly.com"],
      serviceType: "Bus Transportation Booking",
      areaServed: [{ "@type": "Country", name: countryName }],
      description:
        "GoBusly is a Balkan intercity bus search & booking platform. Compare schedules, operators and prices across Europe and the Balkans.",
      logo: {
        "@type": "ImageObject",
        url: `${base}/assets/images/logo.png`,
        width: 400,
        height: 400,
      },
    },
  };
}

function faqJsonLd(countryName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Where can I book bus tickets in ${countryName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can compare schedules, operators and prices and book securely on GoBusly.`,
        },
      },
      {
        "@type": "Question",
        name: `What are the most popular bus routes in ${countryName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Popular routes vary by season. Browse the city list on this page and open any city to see domestic and international connections.`,
        },
      },
      {
        "@type": "Question",
        name: `Does GoBusly cover international routes from ${countryName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes—GoBusly covers cross-border routes across Europe and the Balkans when available.`,
        },
      },
    ],
  };
}

// ===============
// Page (RSC)
// ===============
export default async function CountryPage({ params }: PageProps) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com";
  const countrySlug = params.country;
  const countryName = toTitleCaseFromSlug(countrySlug);

  const cities = await getCities(countryName);
  const featured = cities.slice(0, 24);

  // JSON-LD payloads
  const breadcrumbLD = breadcrumbJsonLd(base, countrySlug, countryName);
  const countryLD = countryJsonLd(base, countryName);
  const faqLD = faqJsonLd(countryName);

  console.log({ cities });

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-20 md:pb-0">
      {/* Hero Section with Gradient Background */}
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
            <span className="text-gray-900 font-medium">{countryName}</span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <MapPin className="w-4 h-4 text-[#ff284d]" />
              <span className="text-sm font-medium text-gray-700">
                Explore {countryName}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-gray-900 leading-tight">
              Bus Tickets in{" "}
              <span className="text-primary-accent capitalize">
                {countryName}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
              <strong className="text-gray-900">GoBusly</strong> is your trusted
              Balkan intercity{" "}
              <strong className="text-gray-900">bus search & booking</strong>{" "}
              platform. Compare schedules, operators and prices across{" "}
              {countryName} and beyond.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">Secure Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">Real-time Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-700">Best Prices</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto paddingX py-12 space-y-12">
        {/* Cities Grid Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-normal text-gray-900">
                Cities in {countryName}
              </h2>
              <p className="text-gray-600 mt-2">
                Select a city to view available routes and book your journey
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
              <span className="text-2xl font-bold text-[#ff284d]">
                {featured.length}
              </span>
              <span className="text-sm text-gray-600">Cities</span>
            </div>
          </div>

          {featured.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
              <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No cities available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featured.map((city) => {
                const citySlugged = cityToSlug(city.cityName);
                return (
                  <Link
                    key={`${city.cityName}-${city.country}`}
                    prefetch
                    href={`/bus/${countrySlug}/${citySlugged}`}
                    className="group bg-white rounded-lg border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-gray-200 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="p-2 bg-gray-50 rounded-lg mt-0.5">
                          <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-1 capitalize">
                            {city.cityName}
                          </h4>
                          <div className="space-y-0.5">
                            {city.stations.slice(0, 2).map((station) => (
                              <p
                                key={station.id}
                                className="text-xs text-gray-500 truncate capitalize"
                              >
                                {station.name}
                              </p>
                            ))}
                            {city.stations.length > 2 && (
                              <p className="text-xs text-gray-400">
                                +{city.stations.length - 2} more
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary-accent group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary-accent to-orange-500 rounded-2xl p-8 sm:p-12 text-white shadow-lg">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Book Your Journey?
            </h2>
            <p className="text-lg text-white/90">
              Find the best bus routes, compare prices, and book your tickets in
              seconds. Travel across {countryName} with confidence.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-accent rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              Search Routes
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(countryLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
      />
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}
