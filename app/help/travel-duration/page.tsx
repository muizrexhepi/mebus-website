import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  Clock,
  MapPin,
  AlertTriangle,
  Sun,
  Moon,
  Coffee,
  BatteryCharging,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Travel Duration - Help Center | GoBusly",
  description:
    "Understand the factors affecting bus journey durations and get tips for comfortable long-distance travel with GoBusly. Learn how to manage your travel time efficiently.",
  keywords:
    "GoBusly, Travel Duration, Bus Journey Time, Long-Distance Travel, Travel Tips, Bus Travel Efficiency, Customer Support",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
};

const TravelDurationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Travel Duration Guide
          </h1>
          <Link href="/help">
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-xl bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Help Center
            </Button>
          </Link>
        </div>

        {/* Understanding Travel Duration */}
        <Card className="mb-8 shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">
              Understanding Travel Duration
            </CardTitle>
            <CardDescription>
              Factors that influence the length of your bus journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Travel duration can vary based on several factors. While we strive
              to provide accurate estimates, actual travel times may differ due
              to:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Distance between departure and arrival points
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Time of day and expected traffic conditions
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Number and duration of scheduled stops
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Sun className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Weather conditions and seasonal variations
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Estimated Travel Times */}
        <Card className="mb-8 shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">Estimated Travel Times</CardTitle>
            <CardDescription>
              General guidelines for common routes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              While exact travel times can vary, here are some estimated
              durations for popular routes:
            </p>
            <div className="space-y-3">
              {[
                { route: "New York to Boston", time: "4-5 hours" },
                { route: "Los Angeles to San Francisco", time: "7-8 hours" },
                { route: "Chicago to Detroit", time: "5-6 hours" },
                { route: "Miami to Orlando", time: "3-4 hours" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-700 font-medium">
                    {item.route}
                  </span>
                  <span className="text-blue-600 font-semibold">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Note: These are approximate times and may vary based on the
              factors mentioned above.
            </p>
          </CardContent>
        </Card>

        {/* Tips for Long-Distance Travel */}
        <Card className="mb-8 shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">
              Tips for Long-Distance Travel
            </CardTitle>
            <CardDescription>
              Make your journey more comfortable with these suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Moon className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Bring a travel pillow and blanket for overnight trips
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Coffee className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Pack snacks and water for the journey
                </span>
              </li>
              <li className="flex items-start gap-3">
                <BatteryCharging className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Carry a portable charger for your devices
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Plan for breaks and stretch your legs when possible
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Need More Information */}
        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">Need More Information?</CardTitle>
            <CardDescription>
              We're here to help with any questions about travel durations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              If you need specific information about a particular route or have
              any other questions about travel duration, our support team is
              ready to assist you.
            </p>
            <Button variant="primary" className="rounded-xl">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TravelDurationPage;
