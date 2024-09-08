import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TopBusRoutes from "@/components/TopBusRoutes";
import TravelToSection from "@/components/TravelToSection";

export default async function Home() {
  // const user = await account.get();
  // console.log({ user });
  return (
    <div>
      <Hero />
      <TopBusRoutes />
      <TravelToSection />
      <BentoGrid />
      <Footer />
    </div>
  );
}
