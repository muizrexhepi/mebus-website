import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import PartnersSection from "@/components/PartnersSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <InfoSection />
      <PartnersSection />
      <div className=" bg-primary-bg/5">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
}
