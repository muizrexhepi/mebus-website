import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default async function Home() {
  return (
    <div>
      <Hero />
      <div className="paddingX">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
}
