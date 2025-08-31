"use client";

import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import HeroWrapper from "@/components/hero-wrapper";
import useIsMobile from "@/components/hooks/use-mobile";

const AffiliateTracker = dynamic(
  () => import("@/components/affiliate-tracker"),
  {
    ssr: false,
  }
);
const PopularBusRoutes = dynamic(
  () => import("@/components/home/PopularRoutes"),
  {
    ssr: false,
  }
);
const FeaturesSection = dynamic(() => import("@/components/home/InfoSection"), {
  ssr: false,
});

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <>
      <AffiliateTracker />
      <HeroWrapper />
      {!isMobile && (
        <>
          <FeaturesSection />
          <PopularBusRoutes />
          <Footer />
        </>
      )}
    </>
  );
}
