import React from "react";
import { Metadata } from "next";
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
import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";

export const metadata: Metadata = {
  title: "Travel Duration - Help Center | GoBusly",
  description:
    "Understand the factors affecting bus journey durations and get tips for comfortable long-distance travel with GoBusly. Learn how to manage your travel time efficiently.",
  keywords:
    "GoBusly, Travel Duration, Bus Journey Time, Long-Distance Travel, Travel Tips, Bus Travel Efficiency, Customer Support",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "Travel Duration - Help Center | GoBusly",
    description:
      "Learn about factors that affect bus journey durations and discover tips for making long-distance travel more comfortable with GoBusly.",
    url: "https://www.gobusly.com/help/travel-duration",
    type: "article",
    images: [
      {
        url: "https://www.gobusly.com/images/travel-duration-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Travel Duration Tips",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Duration - Help Center | GoBusly",
    description:
      "Discover how different factors influence bus journey times and learn tips for comfortable long-distance travel with GoBusly.",
  },
};

const TravelDurationPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>
      <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-3xl font-bold md:mb-8 text-primary">
            Travel Duration Guide
          </h1>
          <Link href="/help">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Understanding Travel Duration</CardTitle>
            <CardDescription>
              Factors that influence the length of your bus journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Travel duration can vary based on several factors. While we strive
              to provide accurate estimates, actual travel times may differ due
              to:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 mt-1 flex-shrink-0 text-blue-500" />
                <span>Distance between departure and arrival points</span>
              </li>
              <li className="flex items-start">
                <Clock className="mr-2 h-5 w-5 mt-1 flex-shrink-0 text-blue-500" />
                <span>Time of day and expected traffic conditions</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="mr-2 h-5 w-5 mt-1 flex-shrink-0 text-yellow-500" />
                <span>Number and duration of scheduled stops</span>
              </li>
              <li className="flex items-start">
                <Sun className="mr-2 h-5 w-5 mt-1 flex-shrink-0 text-yellow-500" />
                <span>Weather conditions and seasonal variations</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Estimated Travel Times</CardTitle>
            <CardDescription>
              General guidelines for common routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              While exact travel times can vary, here are some estimated
              durations for popular routes:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>New York to Boston</span>
                <span className="font-semibold">4-5 hours</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Los Angeles to San Francisco</span>
                <span className="font-semibold">7-8 hours</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Chicago to Detroit</span>
                <span className="font-semibold">5-6 hours</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Miami to Orlando</span>
                <span className="font-semibold">3-4 hours</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Note: These are approximate times and may vary based on the
              factors mentioned above.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tips for Long-Distance Travel</CardTitle>
            <CardDescription>
              Make your journey more comfortable with these suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Moon className="mr-2 h-5 w-5 mt-1 flex-shrink-0 text-indigo-500" />
                <span>
                  Bring a travel pillow and blanket for overnight trips
                </span>
              </li>
              <li className="flex items-start">
                <Coffee className="mr-2 h-5 w-5 mt-1 flex-shrink-0 text-brown-500" />
                <span>Pack snacks and water for the journey</span>
              </li>
              <li className="flex items-start">
                <BatteryCharging className="mr-2 h-5 w-5 mt-1 flex-shrink-0 text-green-500" />
                <span>Carry a portable charger for your devices</span>
              </li>
              <li className="flex items-start">
                <Clock className="mr-2 h-5 w-5 mt-1 flex-shrink-0 text-blue-500" />
                <span>Plan for breaks and stretch your legs when possible</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need More Information?</CardTitle>
            <CardDescription>
              We&apos;re here to help with any questions about travel durations
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-4">
            <p className="text-muted-foreground">
              If you need specific information about a particular route or have
              any other questions about travel duration, our support team is
              ready to assist you.
            </p>
            <Button>Contact Support</Button>
          </CardContent>
        </Card>
      </main>
      <SecondaryFooter className="max-w-4xl" />
    </div>
  );
};

export default TravelDurationPage;
