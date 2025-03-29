import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/InfoSection";
import PopularBusRoutes from "@/components/home/PopularRoutes";

export default function Home() {
  return (
    <div>
      <Hero />
      {/* <PartnersSection />*/}
      <FeaturesSection />
      <PopularBusRoutes />
      {/* <NewsletterCTA /> */}
      <Footer />
    </div>
  );
}
