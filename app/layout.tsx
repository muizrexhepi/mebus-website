import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "../components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import CookieConsent from "@/components/CookieConsent";
import TranslationProvider from "@/components/providers/TranslationProvider";
import { Analytics } from "@vercel/analytics/react";
import ClientProviders from "@/components/providers/client-providers";
import Navbar from "@/components/navbar/Navbar";
import DiscountBanner from "@/components/discount-banner";
import Script from "next/script";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "GoBusly - Book Affordable Bus Tickets in Europe & the Balkans",
  description:
    "Book cheap bus tickets across Europe and the Balkans with GoBusly. Find reliable routes, compare fares, and travel comfortably to your destination.",
  keywords: [
    "bus tickets",
    "GoBusly",
    "bus travel Europe",
    "cheap bus tickets",
    "FlixBus alternative",
    "Balkan bus routes",
    "bus booking online",
    "Macedonia to Europe bus",
    "Balkan travel by bus",
    "Serbia bus routes",
    "Kosovo bus travel",
    "Croatia bus tickets",
    "Montenegro buses",
    "Albania to Europe bus",
    "affordable bus travel",
    "fast bus booking",
    "best bus deals",
    "long-distance bus travel",
  ],
  openGraph: {
    title: "GoBusly - Book Affordable Bus Tickets in Europe & the Balkans",
    description:
      "Find the best bus routes across Europe and the Balkans. Book affordable tickets online and enjoy seamless travel with GoBusly.",
    url: "https://www.gobusly.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoBusly - Book Affordable Bus Tickets in Europe & the Balkans",
    description:
      "Book cheap bus tickets online with GoBusly. Travel conveniently across Europe and the Balkans at the best prices.",
    creator: "@GoBusly",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script type="application/ld+json" id="structured-data">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "GoBusly",
          url: "https://www.gobusly.com",
          potentialAction: {
            "@type": "SearchAction",
            target:
              "https://www.gobusly.com/search/{search_term_string}?departureStation={departureStation}&arrivalStation={arrivalStation}&departureDate={departureDate}&adult={adult}&children={children}",
            "query-input": [
              "required name=search_term_string",
              "required name=departureStation",
              "required name=arrivalStation",
              "required name=departureDate",
              "required name=adult",
              "required name=children",
            ],
          },
        })}
      </Script>

      <body className={roboto.className}>
        <Analytics />
        <ReactQueryProvider>
          <Toaster />
          <TranslationProvider>
            <ClientProviders>
              {/* <DiscountBanner /> */}
              <Navbar className="paddingX max-w-6xl py-4 mx-auto" />
              {children}
              {/* <CookieConsent /> */}
            </ClientProviders>
          </TranslationProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
