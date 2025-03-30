"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/InfoSection";
import PopularBusRoutes from "@/components/home/PopularRoutes";

export default function Home() {
  const searchParams = useSearchParams();
  const affiliateCode = searchParams.get("affiliate_code");

  useEffect(() => {
    if (affiliateCode) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 30); 

      const affiliateData = {
        code: affiliateCode,
        expires: expires.getTime(),
      };

      localStorage.setItem("affiliate", JSON.stringify(affiliateData));
      console.log("Affiliate Code Saved:", affiliateData);
    }
  }, [affiliateCode]);

  return (
    <div>
      <Hero />
      {/* <PartnersSection /> */}
      <FeaturesSection />
      <PopularBusRoutes />
      {/* <NewsletterCTA /> */}
      <Footer />
    </div>
  );
}
