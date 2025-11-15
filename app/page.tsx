"use client";

import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import HeroWrapper from "@/components/hero-wrapper";
import useIsMobile from "@/components/hooks/use-mobile";
import PartnersSection from "@/components/home/PartnersSection";

const AffiliateTracker = dynamic(
  () => import("@/components/affiliate-tracker"),
  { ssr: false }
);

const MobileAppBanner = dynamic(
  () => import("@/components/mobile/mobile-banner"),
  { ssr: false }
);

const PopularBusRoutes = dynamic(
  () => import("@/components/home/PopularRoutes"),
  { ssr: false }
);

const FeaturesSection = dynamic(() => import("@/components/home/InfoSection"), {
  ssr: false,
});

const MobileAppSection = dynamic(
  () => import("@/components/home/MobileAppSection"),
  { ssr: false }
);

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <>
      <AffiliateTracker />
      <MobileAppBanner />
      <HeroWrapper />
      {!isMobile && (
        <>
          <MobileAppSection />
          <PartnersSection />
          <FeaturesSection />
          <PopularBusRoutes />
          <Footer />
        </>
      )}
    </>
  );
}
