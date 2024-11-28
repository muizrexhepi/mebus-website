import { Metadata } from "next";
import axios from "axios";
import { Route } from "@/models/route";
import Navbar from "@/components/Navbar";
import BusRoutesClient from "@/components/routes/BusRoutesClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Explore Bus Routes | GoBusly",
  description:
    "Find and book bus routes across the country. Plan your journey with ease using our interactive map and search features.",
  keywords: "bus routes, book bus, travel, transportation",
};

async function getRoutes() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/route/map-display`
    );
    return res.data.data || [];
  } catch (error) {
    console.error("Failed to fetch routes", error);
    return [];
  }
}

export default async function BusRoutes() {
  const routes: Route[] = await getRoutes();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-primary-bg paddingX w-full py-4">
        <Navbar className="max-w-6xl mx-auto" />
      </div>
      <main className="flex-grow w-full mx-auto">
        <BusRoutesClient initialRoutes={routes} />
      </main>
      <Footer />
    </div>
  );
}
