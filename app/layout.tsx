import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import CookieConsent from "@/components/CookieConsent";
import TranslationProvider from "@/components/TranslationProvider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin-ext"],
});
export const metadata: Metadata = {
  title: "Busly | Travel Europe & Balkans",
  description:
    "Busly is your go-to platform for affordable, convenient, and fast bus travel across Europe and the Balkans. Discover and book bus tickets to your favorite destinations with ease.",
  keywords: [
    "bus ticket booking",
    "Busly",
    "Europe travel",
    "Flixbus alternative",
    "cheap bus tickets",
    "travel Europe by bus",
    "online bus booking",
    "bus routes Europe",
    "bus travel deals",
    "Busly travel app",
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
    title: "Busly | Travel Europe & Balkans",
    description:
      "Discover the most affordable and convenient bus routes across Europe and the Balkans with Busly. Book your bus tickets online for seamless travel to top destinations.",
    url: "https://www.busly.eu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Busly | Travel Europe & Balkans",
    description:
      "Find and book bus tickets across Europe and the Balkans at the best prices. Experience seamless bus travel with Busly.",
    creator: "@Busly",
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
