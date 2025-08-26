import { Metadata } from "next";
import axios from "axios";
import Link from "next/link";
import { ChevronLeft, Bus } from "lucide-react";
import { Route } from "@/models/route";
import Navbar from "@/components/navbar/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import RoutesList from "@/app/help/_components/RoutesList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Routes and Stops - Bus Booking",
  description: "Explore available routes and stops for bus bookings.",
};

export default async function RoutesAndStopsPage() {
  let routes: Route[] = [];

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/route`);
    routes = res.data.data || [];
  } catch (error) {}

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>
      <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-3xl font-bold md:mb-8 text-primary">
            Routes and Stops
          </h1>
          <Link href="/help">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
          </Link>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available Routes</CardTitle>
            <CardDescription>
              Explore our extensive network of bus routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {routes.length > 0 ? (
              <RoutesList routes={routes} />
            ) : (
              <p>No routes available at the moment.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Assistance?</CardTitle>
            <CardDescription>
              We&apos;re here to help with your route inquiries
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-4">
            <p className="text-muted-foreground">
              If you have any questions about our routes or need help planning
              your journey, our support team is ready to assist you.
            </p>
            <Link href={"/help/contact-support"}>
              <Button>Contact Support</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
      <SecondaryFooter className="max-w-4xl" />
    </div>
  );
}
