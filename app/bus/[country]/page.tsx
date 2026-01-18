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

export const revalidate = 43200; // 12h

// ----------------------
// Util Helpers
// ----------------------
const toTitleCaseFromSlug = (s: string = "") =>
  s
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

const cityToSlug = (name: string = "") =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const capitalizeCity = (s?: string) =>
  (s ?? "")
    .split(/-| /g)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

// ✅ Updated: params is now a Promise
type PageProps = {
  params: Promise<{ country: string }>;
};

type CityWithStations = {
  cityName: string;
  country: string;
  stations: {
    id: string;
    name: string;
  }[];
};

// ----------------------
// Fetch Cities (SAFE)
// ----------------------
async function getCities(countryName: string): Promise<CityWithStations[]> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://www.gobusly.com"; // much safer fallback

  const url = `${apiBase}/seo/country/${encodeURIComponent(countryName)}`;

  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) return [];

  const data = await res.json();
  const rawCities = data?.data?.cities;

  if (!rawCities || !Array.isArray(rawCities)) return [];

  const cityMap = new Map<string, CityWithStations>();

  rawCities.forEach((station: any) => {
    const cityName = capitalizeCity(station?.city ?? "");
    const stationName = capitalizeCity(station?.station_name ?? "");

    if (!cityName) return; // ignore broken API entries

    if (!cityMap.has(cityName)) {
      cityMap.set(cityName, {
        cityName,
        country: countryName,
        stations: [],
      });
    }

    if (stationName) {
      cityMap.get(cityName)!.stations.push({
        id: station?._id ?? "",
        name: stationName,
      });
    }
  });

  return Array.from(cityMap.values()).filter((c) => c.cityName.trim() !== "");
}

// ----------------------
// Metadata
// ----------------------
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // ✅ Await params
  const { country } = await params;
  const countryName = toTitleCaseFromSlug(country);

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com";
  const canonical = `${base}/bus/${country}`;

  const title = `Bus Tickets in ${countryName} – Routes, Cities & Booking`;
  const description = `GoBusly helps you compare schedules, operators and prices across ${countryName}.`;

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

// ----------------------
// JSON-LD Helpers
// ----------------------
function breadcrumbJsonLd(
  base: string,
  countrySlug: string,
  countryName: string,
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
    description: `Intercity bus travel in ${countryName}.`,
    provider: {
      "@type": "TravelAgency",
      name: "GoBusly",
      url: base,
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
          text: `You can compare schedules and book securely on GoBusly.`,
        },
      },
    ],
  };
}

// ----------------------
// Page Component
// ----------------------
export default async function CountryPage({ params }: PageProps) {
  // ✅ Await params
  const { country: countrySlug } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.gobusly.com";
  const countryName = toTitleCaseFromSlug(countrySlug);

  const cities = await getCities(countryName);

  // avoid hydration mismatch: only use valid cities
  const featured = cities.filter((c) => c.cityName.trim() !== "");

  const breadcrumbLD = breadcrumbJsonLd(base, countrySlug, countryName);
  const countryLD = countryJsonLd(base, countryName);
  const faqLD = faqJsonLd(countryName);

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-20 md:pb-0">
      {/* HERO */}
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

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto paddingX py-12 space-y-12">
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl text-gray-900">
                Cities in {countryName}
              </h2>
              <p className="text-gray-600 mt-2">Choose a city to view routes</p>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-2xl font-bold text-primary-accent">
                {featured.length}
              </span>
              <span className="text-sm text-gray-600">Cities</span>
            </div>
          </div>

          {featured.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center shadow-sm">
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
                    className="group bg-white rounded-lg border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-3">
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <MapPin className="w-4 h-4 text-gray-500" />
                        </div>

                        <div>
                          <h4 className="font-semibold capitalize">
                            {city.cityName}
                          </h4>

                          {/* Show ONLY first station */}
                          {city.stations[0] && (
                            <p className="text-xs text-gray-500 capitalize">
                              {city.stations[0].name}
                            </p>
                          )}

                          {/* Show +X more */}
                          {city.stations.length > 1 && (
                            <p className="text-xs text-gray-400">
                              +{city.stations.length - 1} more
                            </p>
                          )}
                        </div>
                      </div>

                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary-accent transition" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
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

      <Footer />
    </div>
  );
}
