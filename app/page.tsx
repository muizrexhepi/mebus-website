import BentoGrid from "@/components/BentoGrid";
import Hero from "@/components/Hero";
import TopBusRoutes from "@/components/TopBusRoutes";
import TravelToSection from "@/components/TravelToSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <TopBusRoutes />
      <TravelToSection />
      <BentoGrid />
    </div>
  );
}
