import React from "react";
import PassengerRightsPage from "./passenger-rights-client";

export const metadata = {
  title: "GoBusly - Privacy Policy",
  description:
    "GoBusly's GDPR-compliant privacy policy detailing how we process, protect, and manage your personal data when using our bus ticket booking service.",
  keywords:
    "GoBusly, Privacy Policy, GDPR Compliance, Data Protection, Personal Data Processing, Bus Booking",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "GoBusly - Privacy Policy",
    description:
      "Learn how GoBusly processes and protects your personal data in compliance with GDPR regulations.",
    url: "https://www.gobusly.com/legal/privacy-policy",
    type: "website",
    images: [
      {
        url: "https://www.gobusly.com/images/privacy-policy-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Privacy Policy",
      },
    ],
  },
};

export default function PassengerRights() {
  return <PassengerRightsPage />;
}
