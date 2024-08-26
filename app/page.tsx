import { account } from "@/appwrite.config";
import BentoGrid from "@/components/BentoGrid";
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
    </div>
  );
}
