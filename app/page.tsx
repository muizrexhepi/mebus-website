import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import InfoSection from "@/components/home/InfoSection";
import PartnersSection from "@/components/home/PartnersSection";

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
