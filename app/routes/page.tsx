import { Metadata } from "next";
import axios from "axios";
import { environment } from "@/environment";
import { Route } from "@/models/route";
import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import BusRoutesClient from "@/components/routes/BusRoutesClient";

export const metadata: Metadata = {
  title: "Explore Bus Routes | Mebus",
  description:
    "Find and book bus routes across the country. Plan your journey with ease using our interactive map and search features.",
  keywords: "bus routes, book bus, travel, transportation",
};

async function getRoutes() {
  try {
    const res = await axios.get(`${environment.apiurl}/route/map-display`);
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
      <div className="bg-primary paddingX w-full py-4">
        <Navbar className="max-w-7xl mx-auto" />
      </div>
      <main className="flex-grow w-full mx-auto">
        <BusRoutesClient initialRoutes={routes} />
      </main>
      <SecondaryFooter className="max-w-7xl" />
    </div>
  );
}
