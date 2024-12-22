import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import PartnersSection from "@/components/home/PartnersSection";
import FeaturesSection from "@/components/home/InfoSection";
import PopularBusRoutes from "@/components/home/PopularRoutes";

export default function Home() {
  return (
    <div>
      <Hero />
      <PartnersSection />
      <FeaturesSection />
      <PopularBusRoutes />
      {/* <AboutSection /> */}
      <Footer />
    </div>
  );
}
