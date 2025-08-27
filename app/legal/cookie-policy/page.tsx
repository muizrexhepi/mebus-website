import React from "react";
import CookiePolicyClient from "../cookie-settings/cookie-client";

export const metadata = {
  title: "GoBusly - Cookie Policy",
  description:
    "Learn about how GoBusly uses cookies and similar technologies to provide, enhance, and improve the functionality of our bus ticket booking service.",
  keywords:
    "GoBusly, Cookie Policy, Cookies, Privacy, Tracking, Web Technologies, GDPR, Cookie Consent",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "GoBusly - Cookie Policy",
    description:
      "GoBusly uses cookies and similar technologies to enhance your experience. Read our Cookie Policy to understand how we use and manage cookies.",
    url: "https://www.gobusly.com/legal/cookie-policy",
    type: "website",
    images: [
      {
        url: "https://www.gobusly.com/images/cookie-policy-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Cookie Policy",
      },
    ],
  },
};

export default function MebusCookiePolicy() {
  return <CookiePolicyClient />;
}
