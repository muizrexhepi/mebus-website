// app/bus-operators/page.tsx
import React from "react";
import axios from "axios";
import { Metadata } from "next";
import Script from "next/script";
import ActiveOperators from "../partners/_components/active-operators";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gobusly.com";

export const metadata: Metadata = {
  title: "Bus Operators - Compare Routes, Reviews & Prices",
  description:
    "Explore active bus operators on GoBusly. Compare routes, amenities, reviews, and book affordable bus tickets across Europe and the Balkans.",
  openGraph: {
    title: "Bus Operators",
    description:
      "Find trusted bus companies, browse routes, and book tickets with confidence on GoBusly.",
    url: `${SITE_URL}/bus-operators`,
    siteName: "GoBusly",
    images: [
      {
        url: `${SITE_URL}/images/bus-operators-cover.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/bus-operators`,
  },
};

async function fetchOperators() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/operator`);
    return res.data?.data ?? [];
  } catch (e) {
    return [];
  }
}

export default async function BusOperatorsPage() {
  const operators = await fetchOperators();

  // Basic JSON-LD for page (Organization + list)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bus Operators — GoBusly",
    url: `${SITE_URL}/bus-operators`,
    description: "List of active bus operators on GoBusly",
  };

  return (
    <main className="bg-[#f9fafb] min-h-screen">
      <Script id="bus-operators-schema" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="max-w-6xl mx-auto paddingX py-6 md:py-12 space-y-6">
        <header className="space-y-3 sr-only">
          <h1 className="text-3xl md:text-4xl font-bold">
            Bus Operators — Compare Companies & Book Tickets
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Discover all active bus operators partnered with GoBusly. Browse
            operator profiles, compare ratings and routes, and find the best
            option for your trip. Use the filters to narrow by country or
            operator name.
          </p>

          <section className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-2">Popular searches</h2>
            <div className="flex gap-3 flex-wrap text-sm">
              <a href="/routes/skopje-tirana" className="chip">
                Skopje → Tirana
              </a>
              <a href="/routes/hamburg-skopje" className="chip">
                Hamburg → Skopje
              </a>
              <a href="/routes/tetovo-berlin" className="chip">
                Tetovo → Berlin
              </a>
            </div>
          </section>
        </header>

        <ActiveOperators operators={operators} />
      </div>
    </main>
  );
}
