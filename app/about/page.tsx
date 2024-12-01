import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import { Button } from "@/components/ui/button";
import { GlobeIcon, BusFront, Users, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | GoBusly",
  description:
    "Discover the GoBusly story: from serving HakBus to revolutionizing bus travel across the Balkans. Learn about our mission, values, and commitment to connecting people and places.",
  keywords:
    "GoBusly, bus ticketing, Balkans, online booking, transportation, travel innovation",
};

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-primary paddingX w-full py-4">
        <Navbar className="max-w-7xl mx-auto" />
      </div>
      <main className="flex-grow w-full mx-auto px-4 py-12 max-w-7xl">
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-center mb-8">Our Journey</h1>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            From a single partnership to a region-wide revolution in bus travel,
            GoBusly has been on an incredible journey of growth and innovation.
          </p>

          <div className="space-y-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <BusFront className="h-6 w-6 text-primary mr-2" />
                  The HakBus Beginning
                </h2>
                <p className="text-gray-600">
                  Our story began with HakBus, the Balkans' most renowned bus
                  operator. We developed a cutting-edge online ticketing system
                  that revolutionized their operations, making it easier for
                  passengers to book and manage their travel.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="HakBus partnership"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  Birth of GoBusly
                </h2>
                <p className="text-gray-600">
                  Inspired by our success with HakBus, we identified a gap in
                  the market. Many bus operators in the Balkans lacked online
                  sales capabilities, limiting their reach and inconveniencing
                  passengers. This realization led to the creation of GoBusly, a
                  platform designed to serve the entire region.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="GoBusly launch"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-6 w-6 text-primary mr-2" />
                  Expanding Horizons
                </h2>
                <p className="text-gray-600">
                  Today, GoBusly is more than just a ticketing system; it's a
                  platform that connects bus operators across the Balkans with
                  their passengers. We're bridging the digital divide, bringing
                  the convenience of online booking to a region where it was
                  once a rarity.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="GoBusly expansion"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-white py-12 px-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-4">
              At GoBusly, we're committed to modernizing bus travel throughout
              the Balkan region. Our platform empowers small and large operators
              alike to offer online ticketing, expanding their customer base and
              streamlining operations.
            </p>
            <p className="text-gray-600 mb-4">
              For passengers, we provide a one-stop-shop for comparing routes,
              prices, and booking tickets with ease. We're not just selling bus
              tickets; we're opening up new possibilities for exploration,
              connection, and growth across this beautiful and diverse region.
            </p>
            <p className="text-gray-600">
              From our humble beginnings with HakBus to our growing network of
              operators, GoBusly is transforming the way people travel in the
              Balkans.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Ready to Explore the Balkans?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who choose GoBusly for
            reliable, affordable, and comfortable journeys. Whether you're
            planning a weekend getaway or a cross-country expedition, we've got
            you covered.
          </p>
          <Link href="/routes">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary-dark"
            >
              <GlobeIcon className="mr-2 h-5 w-5" />
              Discover GoBusly Routes
            </Button>
          </Link>
        </section>
      </main>
      <SecondaryFooter className="max-w-7xl" />
    </div>
  );
}
