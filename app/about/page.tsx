import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, TrendingUp } from "lucide-react";
import SecondaryFooter from "@/components/SecondaryFooter";

export const metadata: Metadata = {
  title: "About GoBusly | Simplifying Bus Travel in the Balkans",
  description:
    "Learn about GoBusly's mission to revolutionize bus travel across the Balkans with easy online booking and a vast network of routes.",
};

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow w-full mx-auto px-4 py-12 max-w-4xl">
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">About GoBusly</h1>
          <p className="text-xl text-gray-600 mb-8">
            Simplifying bus travel across the Balkans
          </p>
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="GoBusly bus network"
            width={800}
            height={400}
            className="rounded-lg shadow-md mx-auto"
          />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-4">
            At GoBusly, we're on a mission to transform bus travel in the
            Balkans. We believe that exploring this beautiful region should be
            easy, affordable, and comfortable for everyone.
          </p>
          <p className="text-gray-600">
            By connecting passengers with a vast network of bus operators, we're
            making it simpler than ever to discover new destinations, visit
            loved ones, or commute for work across borders.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Why Choose GoBusly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-primary mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Extensive Network</h3>
                <p className="text-gray-600">
                  Access hundreds of routes across the Balkans, connecting major
                  cities and hidden gems.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-primary mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Easy Booking</h3>
                <p className="text-gray-600">
                  Book your tickets in minutes with our user-friendly platform,
                  available 24/7.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-6 w-6 text-primary mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Trusted by Thousands</h3>
                <p className="text-gray-600">
                  Join our community of satisfied travelers who rely on GoBusly
                  for their journeys.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <TrendingUp className="h-6 w-6 text-primary mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Constantly Improving</h3>
                <p className="text-gray-600">
                  We're always expanding our services and enhancing our
                  technology to serve you better.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center bg-gray-50 py-12 px-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Ready to Explore?</h2>
          <p className="text-gray-600 mb-6">
            Discover the ease of bus travel with GoBusly. Whether you're
            planning a weekend getaway or a cross-country adventure, we've got
            you covered.
          </p>
          <Link href="/search">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              Search Routes
            </Button>
          </Link>
        </section>
      </main>
      <SecondaryFooter />
    </div>
  );
}
