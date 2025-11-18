import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/toaster";
import TranslationProvider from "@/components/providers/TranslationProvider";
import ClientProviders from "@/components/providers/client-providers";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin-ext"],
  display: "swap",
});

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), {
  ssr: false,
});
const MobileTabs = dynamic(() => import("@/components/mobile/mobile-tabs"), {
  ssr: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gobusly.com"),
  title: {
    default: "GoBusly - Book Affordable Bus Tickets in Europe & the Balkans",
    template: "%s | GoBusly - Bus Tickets Europe & Balkans",
  },
  description:
    "Book cheap bus tickets across Europe and the Balkans with GoBusly. Find reliable routes, compare fares, and travel comfortably to your destination.",
  keywords: [
    "bus tickets Europe",
    "cheap bus tickets Balkans",
    "GoBusly bus booking",
    "FlixBus alternative",
    "online bus booking platform",
  ],
  authors: [{ name: "GoBusly Team" }],
  creator: "GoBusly",
  publisher: "GoBusly",
  formatDetection: { email: false, address: false, telephone: false },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.gobusly.com",
    siteName: "GoBusly",
    title: "GoBusly - Book Affordable Bus Tickets in Europe & the Balkans",
    description:
      "Compare and book bus tickets across Europe and the Balkans. Best prices, comfortable buses, reliable service.",
    images: [
      {
        url: "https://www.gobusly.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "GoBusly - Bus Booking Platform",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GoBusly",
    creator: "@GoBusly",
    title: "GoBusly - Book Affordable Bus Tickets in Europe & the Balkans",
    description:
      "Book cheap bus tickets online with GoBusly. Travel conveniently across Europe and the Balkans.",
    images: ["https://www.gobusly.com/og-image.png"],
  },
};

const GA_MEASUREMENT_ID = "G-RLCE6W4KDQ";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {/* Use @next/third-parties/google for optimized script loading */}
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />

        {/* Combined JSON-LD schema (keep as-is, it's fine) */}
        <Script
          id="combined-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "TravelAgency",
                  "@id": "https://www.gobusly.com#organization",
                  name: "GoBusly",
                  url: "https://www.gobusly.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.gobusly.com/assets/images/logo.png",
                    width: 400,
                    height: 400,
                  },
                  description:
                    "Leading bus ticket booking platform for comfortable and affordable travel across Europe and the Balkans.",
                  areaServed: [
                    { "@type": "Country", name: "North Macedonia" },
                    { "@type": "Country", name: "Serbia" },
                    { "@type": "Country", name: "Kosovo" },
                    { "@type": "Country", name: "Albania" },
                    { "@type": "Country", name: "Italy" },
                    { "@type": "Country", name: "Germany" },
                    { "@type": "Country", name: "Switzerland" },
                    { "@type": "Country", name: "Austria" },
                    { "@type": "Country", name: "Croatia" },
                    { "@type": "Country", name: "Slovenia" },
                    { "@type": "Country", name: "Slovakia" },
                    { "@type": "Country", name: "Hungary" },
                    { "@type": "Country", name: "Czech Republic" },
                  ],
                  serviceType: "Bus Transportation Booking",
                  priceRange: "€5-€120",
                  telephone: "+389-70-250-259",
                  openingHours: "Mo-Su 00:00-23:59",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.gobusly.com#website",
                  name: "GoBusly",
                  url: "https://www.gobusly.com",
                  potentialAction: {
                    "@type": "SearchAction",
                    target:
                      "https://www.gobusly.com/search?from={departure_city}&to={arrival_city}&date={departure_date}&adults={adults}",
                    "query-input":
                      "required name=departure_city, required name=arrival_city, required name=departure_date, required name=adults",
                  },
                },
                {
                  "@type": "Service",
                  "@id": "https://www.gobusly.com#service",
                  name: "Online Bus Ticket Booking",
                  serviceType: "Transportation Booking Service",
                },
              ],
            }),
          }}
        />

        <Toaster />
        <TranslationProvider>
          <ClientProviders>
            <Navbar className="paddingX max-w-6xl py-4 mx-auto" />
            {children}
            {/* <MobileTabs /> */}
            <CookieConsent />
            <Analytics />
          </ClientProviders>
        </TranslationProvider>
      </body>
    </html>
  );
}
