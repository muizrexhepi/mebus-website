import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  AlertCircle,
  HeadphonesIcon,
  CheckCircle,
  XCircle,
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
  title: "Travel Service Options - Help Center | GoBusly",
  description:
    "Learn about our travel service options and choose the right level of service for your journey with GoBusly. Discover how to manage your booking and the benefits of each service tier.",
  keywords:
    "GoBusly, Travel Services, Booking Management, Bus Booking Options, Change Booking, Travel Options, Customer Support",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "Travel Service Options - Help Center | GoBusly",
    description:
      "Learn about our travel service options and choose the right level of service for your journey with GoBusly. Get tips on managing your booking and benefit from our service tiers.",
    url: "https://www.gobusly.com/help/travel-services",
    type: "article",
    images: [
      {
        url: "https://www.gobusly.com/images/travel-services-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Travel Service Options",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Service Options - Help Center | GoBusly",
    description:
      "Explore GoBusly's travel service options and how to manage your bookings with different service tiers.",
  },
};

interface FlexFeature {
  name: string;
  value: string;
  price: number;
  features: string[];
}

const flexFeatures: FlexFeature[] = [
  {
    name: "Priority Service",
    value: "premium",
    price: 4,
    features: [
      "Full refund when cancelling up to 48 hours before departure",
      "Modify your trip details up to 24 hours before departure",
      "Priority support for booking changes",
    ],
  },
  {
    name: "Standard Service",
    value: "basic",
    price: 2,
    features: [
      "Partial refund when cancelling up to 5 days before departure",
      "Modify your trip details up to 3 days before departure",
    ],
  },
  {
    name: "Basic Service",
    value: "no_flex",
    price: 0,
    features: [],
  },
];

const TravelServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-12">
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-3xl font-bold md:mb-8 text-primary">
            Travel Service Options
          </h1>
          <Link href="/help">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Understanding Travel Service Options</CardTitle>
            <CardDescription>
              Choose the right service level for your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our Travel Service Options are designed to give you control over
              your booking and peace of mind during your journey. Select the
              service tier that best matches your travel needs.
            </p>
            <div className="flex items-start mb-4">
              <AlertCircle className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-yellow-500" />
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> Service options must be selected at
                the time of booking and cannot be added later.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Service Tiers</CardTitle>
            <CardDescription>
              Compare our service options to find the best fit for your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {flexFeatures.map((option) => (
                <div key={option.value}>
                  <h3 className="text-lg font-semibold mb-2">
                    {option.name}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      (€{option.price})
                    </span>
                  </h3>
                  <ul className="space-y-2">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                    {option.value === "no_flex" && (
                      <>
                        <li className="flex items-center">
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          Non-refundable booking
                        </li>
                        <li className="flex items-center">
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          No modifications allowed
                        </li>
                        <li className="flex items-center">
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          Standard support only
                        </li>
                      </>
                    )}
                    <li className="flex items-center">
                      <HeadphonesIcon className="mr-2 h-4 w-4 text-green-500" />
                      Customer support assistance
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Service Policy</CardTitle>
            <CardDescription>
              Important details regarding refunds, fees, and limitations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Please review the following policy to understand how your chosen
              service tier affects your booking.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Refund Policy:</strong> Priority Service offers full
                refunds, while Standard Service provides partial refunds with a
                10% processing fee.
              </li>
              <li>
                <strong>Modification Fees:</strong> Priority Service changes are
                complimentary, while Standard Service includes a small
                processing fee.
              </li>
              <li>
                <strong>Basic Service:</strong> Basic Service bookings are
                non-refundable and cannot be modified.
              </li>
              <li>
                <strong>Service Limitations:</strong> Service options do not
                cover delays caused by force majeure, including weather or other
                unforeseen events.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Managing Your Booking</CardTitle>
            <CardDescription>
              Follow these steps to modify your eligible booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Log in to your account on our website or mobile app</li>
              <li>Navigate to &quot;My Bookings&quot;</li>
              <li>Select the booking you wish to modify</li>
              <li>Choose your desired action (refund or modification)</li>
              <li>Follow the prompts to complete your request</li>
              <li>
                Receive a confirmation email with your updated booking details
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Assistance?</CardTitle>
            <CardDescription>
              We&apos;re here to help with any questions about our service
              options
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-4">
            <p className="text-muted-foreground">
              If you need clarification about our service tiers or help managing
              your booking, our support team is ready to assist you.
            </p>
            <Button asChild className="rounded-lg button-gradient">
              <Link href={"/help/contact-support"}>Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TravelServicesPage;
