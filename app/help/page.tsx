import type { Metadata } from "next";
import HelpPageClient from "@/app/help/_components/HelpPageClient";

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
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <HelpPageClient />
      </div>
    </div>
  );
}
