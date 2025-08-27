import React from "react";
import TermsOfServiceClient from "./tos-client";

export const metadata = {
  title: "GoBusly - Terms of Service",
  description:
    "Legal terms and conditions governing the use of GoBusly's bus ticket booking platform in compliance with EU regulations.",
  keywords:
    "GoBusly, Terms of Service, Legal Agreement, Bus Booking Terms, EU Compliance, User Rights",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "GoBusly - Terms of Service",
    description:
      "Understanding your rights and obligations when using GoBusly's bus ticket booking platform.",
    url: "https://www.gobusly.com/legal/terms-of-service",
    type: "website",
    images: [
      {
        url: "https://www.gobusly.com/images/terms-of-service-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Terms of Service",
      },
    ],
  },
};

export default function TermsOfService() {
  return <TermsOfServiceClient />;
}
