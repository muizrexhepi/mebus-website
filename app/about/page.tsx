import { Metadata } from "next";
import AboutPageClient from "./about-page-client";

export const metadata: Metadata = {
  title: "About GoBusly | Balkan Travel-Tech Leaders",
  description:
    "Learn about Muiz Rexhepi and Etnik Zeqiri's vision to digitize travel for the Balkan diaspora with a team of 20+ engineers.",
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "GoBusly",
    url: "https://gobusly.com",
    logo: "https://gobusly.com/logo.png",
    founder: [
      {
        "@type": "Person",
        name: "Muiz Rexhepi",
        jobTitle: "CEO",
      },
      {
        "@type": "Person",
        name: "Etnik Zeqiri",
        jobTitle: "CTO",
      },
    ],
    description:
      "GoBusly is a travel-tech platform with 20+ engineers digitizing Balkan bus travel for the diaspora.",
    areaServed: [
      "North Macedonia",
      "Albania",
      "Kosovo",
      "Germany",
      "Switzerland",
      "Austria",
    ],
    knowsAbout: ["Travel Tech", "Balkan Logistics", "Bus Booking Systems"],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPageClient />;
    </>
  );
}
