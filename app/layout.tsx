import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/toaster";
import TranslationProvider from "@/components/providers/TranslationProvider";
import ClientProviders from "@/components/providers/client-providers";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

// CRITICAL: Import Navbar normally. ssr:false was killing your SEO and causing CLS.
import Navbar from "@/components/navbar/Navbar";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-roboto",
});

// Keep these dynamic as they are non-critical for FCP
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
    canonical: "https://www.gobusly.com",
  },
  title: {
    default: "GoBusly - Book Affordable Bus Tickets | Europe to Balkans",
    template: "%s | GoBusly",
  },
  description:
    "Book cheap bus tickets for the winter season! Travel from Germany, Switzerland, and Austria to Kosovo, Albania, and Macedonia. Best prices for Christmas and New Year homecoming.",
  keywords: [
    "bus tickets to Balkans",
    "cheap bus Germany to Kosovo",
    "bus Switzerland to Macedonia",
    "bus Austria to Serbia",
    "Munich to Pristina bus",
    "Zurich to Skopje bus",
    "Vienna to Tirana tickets",
    "Christmas bus travel Europe",
    "winter bus schedules Balkans",
    "homecoming bus travel",
    "Flixbus alternative Balkans",
    "GoBusly booking",
    "bus lines Europe to Kosovo",
  ],
  authors: [{ name: "GoBusly Team" }],
  creator: "GoBusly",
  publisher: "GoBusly",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.gobusly.com",
    siteName: "GoBusly",
    title: "GoBusly - Winter Bus Travel Europe to Balkans",
    description:
      "Save on your trip home this winter. Reliable bus connections from across Europe to the Balkans.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = "G-RLCE6W4KDQ";

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.className} antialiased`}>
        {/* Optimized Google Analytics */}
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />

        {/* JSON-LD Schema - Moved to a cleaner location */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "TravelAgency",
                  "@id": "https://www.gobusly.com#organization",
                  name: "GoBusly",
                  url: "https://www.gobusly.com",
                  image: "https://www.gobusly.com/assets/images/logo.png",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "MK",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.gobusly.com#website",
                  url: "https://www.gobusly.com",
                  name: "GoBusly",
                  potentialAction: {
                    "@type": "SearchAction",
                    target:
                      "https://www.gobusly.com/search?from={departure_city}&to={arrival_city}",
                    "query-input": "required name=departure_city",
                  },
                },
              ],
            }),
          }}
        />

        <Toaster />
        <TranslationProvider>
          <ClientProviders>
            {/* Navbar is now Server-Side Rendered for instant visibility */}
            <Navbar className="paddingX max-w-6xl py-4 mx-auto" />

            {/* Added min-h to prevent footer from jumping up during load */}
            <main className="min-h-[80vh] flex flex-col">{children}</main>

            <CookieConsent />
            <Analytics />
          </ClientProviders>
        </TranslationProvider>
      </body>
    </html>
  );
}
