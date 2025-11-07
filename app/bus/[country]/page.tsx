// app/bus/[country]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Bus, MapPin, CheckCircle2, Clock, Shield } from "lucide-react";
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
type City = { name: string; country: string };

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
async function getCities(countryName: string): Promise<City[]> {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "https://www.gobusly.com";

  const url = `${apiBase}/seo/country/${encodeURIComponent(countryName)}`;
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) return [];

  const data = await res.json();
  const rawCities = data?.data?.cities;
  if (!rawCities || !Array.isArray(rawCities)) return [];

  return rawCities.map((rawName: string) => ({
    name: capitalizeCity(rawName),
    country: countryName,
  }));
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
  const featured = cities
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 24);

  // JSON-LD payloads
  const breadcrumbLD = breadcrumbJsonLd(base, countrySlug, countryName);
  const countryLD = countryJsonLd(base, countryName);
  const faqLD = faqJsonLd(countryName);

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
        {/* Info Section */}
        {/* <section className="bg-white rounded-2xl0 p-8 sm:p-10 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-[#ff284d]/10 to-orange-100/30 rounded-xl">
              <Bus className="w-6 h-6 text-[#ff284d]" />
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">
                Travel by Bus in {countryName}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Find intercity and cross-border routes, check today's departures
                and book tickets online. Start by choosing a city below to see
                domestic and international connections. Whether you're traveling
                for business or leisure, we make bus travel simple and
                affordable.
              </p>
            </div>
          </div>
        </section> */}

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
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No cities available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featured.map((c) => {
                const citySlugged = cityToSlug(c.name);
                return (
                  <Link
                    key={`${c.name}-${c.country}`}
                    prefetch
                    href={`/bus/${countrySlug}/${citySlugged}`}
                    className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:border-[#ff284d] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg group-hover:from-[#ff284d]/10 group-hover:to-orange-100/30 transition-all">
                        <MapPin className="w-5 h-5 text-gray-600 group-hover:text-[#ff284d] transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#ff284d] transition-colors">
                          {c.name}
                        </h3>
                        <p className="text-sm text-gray-500">View routes</p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-[#ff284d] group-hover:translate-x-1 transition-all"
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
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#ff284d] to-orange-500 rounded-2xl p-8 sm:p-12 text-white shadow-xl">
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#ff284d] rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all"
            >
              Search Routes
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
