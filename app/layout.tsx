import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/toaster";
import TranslationProvider from "@/components/providers/TranslationProvider";
import ClientProviders from "@/components/providers/client-providers";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/navbar/Navbar";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-roboto",
});

const CookieConsent = dynamic(() => import("@/components/CookieConsent"), {
  ssr: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gobusly.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "GoBusly | Digital Bus Booking Europe to Balkans",
    template: "%s | GoBusly",
  },
  description:
    "The #1 travel-tech platform for the Balkan diaspora. Book direct bus tickets from Germany, Switzerland, and Austria to Macedonia, Albania, and Kosovo. Secure, reliable, and 100% digital.",
  keywords: [
    "GoBusly Tetovo",
    "book bus tickets Balkans online",
    "bus Germany to North Macedonia",
    "bus Switzerland to Kosovo",
    "Nasir Tours online booking",
    "Besa Trans tickets",
    "direct bus Berlin to Tetovo",
    "Zurich to Pristina bus schedules",
    "cheap bus tickets to Albania",
    "Balkan bus booking tech",
    "Diaspora travel Europe",
  ],
  authors: [{ name: "GoBusly Engineering Team" }],
  creator: "GoBusly",
  publisher: "GoBusly",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.gobusly.com",
    siteName: "GoBusly",
    title: "GoBusly - Bridging the Balkans and Europe",
    description:
      "Verified operators and digital tickets for the Balkan diaspora. Your journey home starts here.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GoBusly Digital Bus Booking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoBusly | Digital Balkan Travel",
    description: "Fast and secure bus booking from Europe to the Balkans.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = "G-RLCE6W4KDQ";

  /**
   * GEO/SEO Strategy: Structured Data Graph
   * This helps AI models understand the relationship between your tech team,
   * your founders, and the region you serve.
   */
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://www.gobusly.com#organization",
        name: "GoBusly",
        url: "https://www.gobusly.com",
        logo: "https://www.gobusly.com/assets/images/logo.png",
        image: "https://www.gobusly.com/assets/images/hero-bus.jpg",
        priceRange: "$$",
        telephone: "+38970250259",
        email: "contact@gobusly.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Ilindenska", // Add specific street if available
          addressLocality: "Tetovo",
          postalCode: "1200",
          addressCountry: "MK",
        },
        founder: [
          {
            "@type": "Person",
            name: "Muiz Rexhepi",
            jobTitle: "Co-Founder & CEO",
          },
          {
            "@type": "Person",
            name: "Etnik Zeqiri",
            jobTitle: "Co-Founder & CTO",
          },
        ],
        areaServed: [
          { "@type": "Country", name: "North Macedonia" },
          { "@type": "Country", name: "Kosovo" },
          { "@type": "Country", name: "Albania" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "Switzerland" },
          { "@type": "Country", name: "Austria" },
        ],
        sameAs: [
          "https://www.facebook.com/gobusly",
          "https://www.instagram.com/gobusly",
          "https://www.linkedin.com/company/gobusly",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.gobusly.com#website",
        url: "https://www.gobusly.com",
        name: "GoBusly",
        description: "Proprietary travel-tech platform for Balkan bus routes.",
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://www.gobusly.com/search?from={departure_city}&to={arrival_city}",
          "query-input": "required name=departure_city",
        },
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.className} antialiased`}>
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />

        {/* This script is the "Brain" for AI Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <Toaster />
        <TranslationProvider>
          <ClientProviders>
            <Navbar className="paddingX max-w-6xl py-4 mx-auto" />
            <main className="min-h-[80vh] flex flex-col">{children}</main>
            <CookieConsent />
            <Analytics />
          </ClientProviders>
        </TranslationProvider>
      </body>
    </html>
  );
}
