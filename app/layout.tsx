import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import CookieConsent from "@/components/CookieConsent";
import TranslationProvider from "@/components/TranslationProvider";
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin-ext"],
});
export const metadata: Metadata = {
  title: "GoBusly | Travel Europe & Balkans",
  description:
    "GoBusly is your go-to platform for affordable, convenient, and fast bus travel across Europe and the Balkans. Discover and book bus tickets to your favorite destinations with ease.",
  keywords: [
    "bus ticket booking",
    "GoBusly",
    "Europe travel",
    "Flixbus alternative",
    "cheap bus tickets",
    "travel Europe by bus",
    "online bus booking",
    "bus routes Europe",
    "bus travel deals",
    "GoBusly travel app",
    "Balkans bus operators",
    "Balkan travel",
    "bus routes Balkans",
    "cheap bus tickets Balkans",
    "Balkan bus booking",
    "Balkan travel by bus",
    "Balkan bus deals",
    "BalkanExpress",
    "Autoprevoz",
    "Jugotrans",
    "Albania travel",
    "Serbia bus routes",
    "Bosnia bus tickets",
    "Macedonia bus travel",
    "Kosovo bus routes",
    "Croatia bus travel",
    "Montenegro bus travel",
  ],
  openGraph: {
    title: "GoBusly | Travel Europe & Balkans",
    description:
      "Discover the most affordable and convenient bus routes across Europe and the Balkans with GoBusly. Book your bus tickets online for seamless travel to top destinations.",
    url: "https://www.gobusly.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoBusly | Travel Europe & Balkans",
    description:
      "Find and book bus tickets across Europe and the Balkans at the best prices. Experience seamless bus travel with GoBusly.",
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
      <body className={roboto.className}>
        <Analytics />
        <ReactQueryProvider>
          <Toaster />
          <TranslationProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <CookieConsent />
            </ThemeProvider>
          </TranslationProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
