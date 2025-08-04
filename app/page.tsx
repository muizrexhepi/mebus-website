import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/InfoSection";
import PopularBusRoutes from "@/components/home/PopularRoutes";
import MobileHero from "@/components/mobile/mobile-hero";
import dynamic from "next/dynamic";

const AffiliateTracker = dynamic(
  () => import("@/components/affiliate-tracker"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <AffiliateTracker />
      <MobileHero />
      <div className="hidden md:block">
        <Hero />
        <FeaturesSection />
        <PopularBusRoutes />
        <Footer />
      </div>
    </>
  );
}
