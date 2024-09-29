import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPinIcon,
  PiggyBankIcon,
  LeafIcon,
  SmartphoneIcon,
  ClockIcon,
  HeartIcon,
  GlobeIcon,
} from "lucide-react";

export default function AboutSection() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Why Travel with Mebus?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <PiggyBankIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">
              Budget-Friendly Journeys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Discover unbeatable fares on our extensive network. Mebus makes
              travel accessible without breaking the bank.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <MapPinIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">
              Expansive Route Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Connect to over 2,000 destinations across 30 countries. Your next
              adventure is just a bus ride away.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <SmartphoneIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">
              Seamless Booking Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Book your tickets in seconds with our user-friendly app. Your
              journey, at your fingertips.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <ClockIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">
              Punctual Departures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Time is precious. Count on Mebus for reliable schedules and
              on-time performance.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <HeartIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">
              Comfort is Key
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Enjoy spacious seating, onboard entertainment, and complimentary
              Wi-Fi for a relaxing journey.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <LeafIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">
              Eco-Conscious Travel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Choose green with our fuel-efficient fleet and carbon offset
              initiatives. Travel responsibly with Mebus.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">
          Ready to Embark on Your Next Adventure?
        </h3>
        <p className="text-gray-600 mb-6">
          Join thousands of satisfied travelers who choose Mebus for reliable,
          affordable, and comfortable journeys. Whether you're planning a
          weekend getaway or a cross-country expedition, we've got you covered.
        </p>
        <Button
          size="lg"
          className="bg-primary text-white hover:bg-primary-dark"
        >
          <GlobeIcon className="mr-2 h-5 w-5" />
          Explore Mebus Routes
        </Button>
      </div>
    </div>
  );
}
