import { Metadata } from "next";
import axios from "axios";
import { Route } from "@/models/route";
import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import { environment } from "@/environment";
import RoutesList from "@/components/help/RoutesList";

export const metadata: Metadata = {
  title: "Routes and Stops - Bus Booking",
  description: "Explore available routes and stops for bus bookings.",
};

// Server-side data fetching
export default async function RoutesAndStopsPage() {
  let routes: Route[] = [];

  try {
    const res = await axios.get(`${environment.apiurl}/route`);
    routes = res.data.data;
  } catch (error) {
    console.error("Failed to fetch routes", error);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>
      <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-primary">
          Routes and Stops
        </h1>

        {/* Pass the routes to the client-side component */}
        <RoutesList routes={routes} />
      </main>
      <SecondaryFooter className="max-w-4xl" />
    </div>
  );
}
