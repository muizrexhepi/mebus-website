import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/home/InfoSection";
import HeroWrapper from "@/components/hero-wrapper";

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

export default function Home() {
  return (
    <>
      <AffiliateTracker />
      <HeroWrapper />
      <div className="hidden md:block">
        <FeaturesSection />
        <PopularBusRoutes />
        <Footer />
      </div>
    </>
  );
}
