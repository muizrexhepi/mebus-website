import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import HeroWrapper from "@/components/hero-wrapper";

// 1. Keep trackers client-side (no visual impact)
const AffiliateTracker = dynamic(
  () => import("@/components/affiliate-tracker"),
  { ssr: false }
);

// 2. If the banner pushes content down, it needs a skeleton to prevent CLS.
// If it floats (overlay), ssr: false is fine.
const MobileAppBanner = dynamic(
  () => import("@/components/mobile/mobile-banner"),
  {
    ssr: false,
    // Optional: Add a placeholder if this banner takes up physical space in the document flow
    // loading: () => <div className="h-16 bg-gray-50" />
  }
);

// 3. CRITICAL CHANGE: Remove dynamic imports for static content sections.
// These should be Server Components to improve FCP and SEO.
// Next.js automatically chunks these, so you don't lose much bundle performance.
import PopularBusRoutes from "@/components/home/PopularRoutes";
import FeaturesSection from "@/components/home/InfoSection";
import MobileAppSection from "@/components/home/MobileAppSection";

export default function Home() {
  return (
    <>
      <AffiliateTracker />

      {/* Ideally, MobileAppBanner should use CSS media queries to hide/show 
        instead of JS, just like the HeroWrapper, to avoid hydration mismatch/jumps.
      */}
      <MobileAppBanner />

      {/* Ensure HeroWrapper uses the CSS display:block/hidden trick 
        we discussed previously, NOT useIsMobile hook.
      */}
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
