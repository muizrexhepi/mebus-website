import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import HeroWrapper from "@/components/hero-wrapper";

const AffiliateTracker = dynamic(
  () => import("@/components/affiliate-tracker"),
  { ssr: false }
);

const MobileAppBanner = dynamic(
  () => import("@/components/mobile/mobile-banner"),
  {
    ssr: false,
  }
);

import PopularBusRoutes from "@/components/home/PopularRoutes";
import FeaturesSection from "@/components/home/InfoSection";
import MobileAppSection from "@/components/home/MobileAppSection";

export default function Home() {
  return (
    <>
      <AffiliateTracker />

      <MobileAppBanner />

      <HeroWrapper />

      <main>
        <MobileAppSection />
        <FeaturesSection />
        <PopularBusRoutes />
      </main>

      <Footer />
    </>
  );
}
