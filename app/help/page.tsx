import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import { Metadata } from "next";
import HelpPageClient from "@/components/help/HelpPageClient";

export const metadata: Metadata = {
  title: "Help Center | GoBusly",
  description:
    "Find answers to your questions and get support for your bus bookings with GoBusly. Access our knowledge base, learn how to use our services, and reach out for assistance.",
  keywords:
    "GoBusly, Help Center, Bus Booking Support, Customer Service, Knowledge Base, FAQs, Assistance, Bus Ticket Booking, Troubleshooting",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "Help Center | GoBusly",
    description:
      "Find answers to your questions and get the support you need for your bus bookings with GoBusly. Browse our knowledge base and reach out for customer assistance.",
    url: "https://www.gobusly.com/help",
    type: "website",
    images: [
      {
        url: "https://www.gobusly.com/images/help-center-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Help Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Center | GoBusly",
    description:
      "Get the help you need for your GoBusly bus bookings. Access FAQs, troubleshooting, and reach customer support.",
  },
};

export default function HelpPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 xl:px-0 pt-32">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-6xl" />
      </div>
      <HelpPageClient />
      <SecondaryFooter />
    </div>
  );
}
