import React from "react";
import { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { ContactClientPage } from "../_components/ContactClientPage";

export const metadata: Metadata = {
  title: "Contact Support - Professional Assistance | GoBusly",
  description:
    "Connect with GoBusly's professional support team for comprehensive bus booking services. Expert assistance, seamless communication, and dedicated customer care.",
  keywords:
    "GoBusly, Professional Support, Customer Service, Bus Booking, Expert Assistance, Travel Support",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "Contact Support - Professional Assistance | GoBusly",
    description:
      "Experience top-tier customer support with GoBusly. Our professional team ensures a smooth and reliable booking experience.",
    url: "https://www.gobusly.com/help/contact-support",
    type: "website",
    images: [
      {
        url: "https://www.gobusly.com/images/contact-support-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Professional Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Support - Professional Assistance | GoBusly",
    description:
      "Professional bus booking support at your fingertips. Reliable, efficient, and customer-focused.",
  },
};

const Contact: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto paddingX pt-12 md:pt-20 xl:pt-32 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <ContactClientPage />

        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
