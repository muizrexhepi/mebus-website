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
  display: "swap", // Better font loading performance
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gobusly.com"),
  title: {
    default: "GoBusly - Book Affordable Bus Tickets in Europe & the Balkans",
    template: "%s | GoBusly - Bus Tickets Europe & Balkans",
  },
  description:
    "Book cheap bus tickets across Europe and the Balkans with GoBusly. Find reliable routes, compare fares, and travel comfortably to your destination. Best FlixBus alternative for Macedonia, Serbia, Kosovo, Croatia, Montenegro, Albania.",
  keywords: [
    // Primary keywords
    "bus tickets Europe",
    "cheap bus tickets Balkans",
    "GoBusly bus booking",
    "FlixBus alternative",
    "Macedonia bus to Europe",
    "Balkan bus routes",

    // Location-specific long-tail keywords
    "Skopje to Vienna bus",
    "Belgrade to Munich bus tickets",
    "Pristina to Germany bus",
    "Zagreb to Ljubljana bus",
    "Podgorica to Belgrade bus",
    "Tirana to Skopje bus",

    // Service keywords
    "online bus booking platform",
    "compare bus ticket prices",
    "affordable bus travel Europe",
    "comfortable bus journey Balkans",
    "reliable bus transportation",
    "bus tickets with WiFi",

    // Competitor keywords
    "better than FlixBus",
    "FlixBus competitor",
    "bus booking website",
    "European bus network",

    // Local SEO keywords
    "bus from Macedonia",
    "Serbia bus connections",
    "Kosovo to Europe bus",
    "Croatia bus travel",
    "Montenegro bus service",
    "Albania bus routes",

    // Intent-based keywords
    "book bus tickets online",
    "cheap international bus travel",
    "bus schedule Europe Balkans",
    "student bus discounts",
    "group bus bookings",
  ],
  authors: [{ name: "GoBusly Team" }],
  creator: "GoBusly",
  publisher: "GoBusly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.gobusly.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.gobusly.com",
    siteName: "GoBusly",
    title: "GoBusly - Book Affordable Bus Tickets in Europe & the Balkans",
    description:
      "Compare and book bus tickets across Europe and the Balkans. Best prices, comfortable buses, reliable service. Your FlixBus alternative for Balkan routes.",
    images: [
      {
        url: "https://www.gobusly.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly - Bus Booking Platform for Europe and Balkans",
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
      "Book cheap bus tickets online with GoBusly. Travel conveniently across Europe and the Balkans at the best prices. FlixBus alternative.",
    images: ["https://www.gobusly.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Enhanced viewport for better mobile experience */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#fff" />
        <meta name="msapplication-TileColor" content="#1e40af" />

        {/* Apple specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GoBusly" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      {/* Enhanced Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "@id": "https://www.gobusly.com#organization",
            name: "GoBusly",
            alternateName: "GoBusly Bus Booking",
            url: "https://www.gobusly.com",
            logo: {
              "@type": "ImageObject",
              url: "https://www.gobusly.com/logo.png",
              width: 400,
              height: 400,
            },
            description:
              "Leading bus ticket booking platform for comfortable and affordable travel across Europe and the Balkans. Compare prices, book online, travel reliably.",
            areaServed: [
              {
                "@type": "Country",
                name: "Macedonia",
              },
              {
                "@type": "Country",
                name: "Serbia",
              },
              {
                "@type": "Country",
                name: "Kosovo",
              },
              {
                "@type": "Country",
                name: "Croatia",
              },
              {
                "@type": "Country",
                name: "Montenegro",
              },
              {
                "@type": "Country",
                name: "Albania",
              },
              {
                "@type": "Country",
                name: "Germany",
              },
              {
                "@type": "Country",
                name: "Austria",
              },
              {
                "@type": "Country",
                name: "Slovenia",
              },
            ],
            serviceType: "Bus Transportation Booking",
            priceRange: "€5-€100",
            telephone: "+389-70-250-259",
            address: {
              "@type": "PostalAddress",
              addressCountry: "MK",
              addressLocality: "Tetovo",
              addressRegion: "Tetovo",
              streetAddress: "Tetovo, 1200",
            },
            openingHours: "Mo-Su 00:00-23:59",
            sameAs: [
              "https://www.facebook.com/gobusly",
              "https://www.instagram.com/gobusly",
              "https://twitter.com/gobusly",
            ],
          }),
        }}
      />

      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://www.gobusly.com#website",
            name: "GoBusly",
            alternateName: "GoBusly Bus Booking Platform",
            url: "https://www.gobusly.com",
            description: "Book cheap bus tickets across Europe and the Balkans",
            inLanguage: ["en", "mk", "al", "es", "fr", "de"],
            potentialAction: [
              {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://www.gobusly.com/search?from={departure_city}&to={arrival_city}&date={departure_date}&adults={adults}",
                },
                "query-input": [
                  "required name=departure_city",
                  "required name=arrival_city",
                  "required name=departure_date",
                  "required name=adults",
                ],
              },
            ],
            publisher: {
              "@id": "https://www.gobusly.com#organization",
            },
          }),
        }}
      />

      {/* Service Schema */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://www.gobusly.com#service",
            name: "Online Bus Ticket Booking",
            description:
              "Compare and book bus tickets online for routes across Europe and the Balkans",
            serviceType: "Transportation Booking Service",
            provider: {
              "@id": "https://www.gobusly.com#organization",
            },
            areaServed: {
              "@type": "Place",
              name: "Europe and Balkans",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Bus Ticket Offers",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Trip",
                    name: "Macedonia to Europe Bus Routes",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Trip",
                    name: "Balkan Bus Connections",
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* FAQ Schema for common questions */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is GoBusly cheaper than FlixBus?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GoBusly offers competitive prices for bus routes across Europe and the Balkans, often with better deals than FlixBus for regional routes from Macedonia, Serbia, Kosovo, and other Balkan countries.",
                },
              },
              {
                "@type": "Question",
                name: "Which countries does GoBusly serve?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GoBusly connects Macedonia, Serbia, Kosovo, Croatia, Montenegro, Albania with major European destinations including Germany, Austria, Slovenia, and more.",
                },
              },
              {
                "@type": "Question",
                name: "How can I book bus tickets online?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Simply search for your route on GoBusly, compare available buses, select your preferred departure time, and book securely online with instant confirmation.",
                },
              },
            ],
          }),
        }}
      />

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
