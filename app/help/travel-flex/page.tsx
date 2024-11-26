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
  title: "Travel Flex Options - Help Center | GoBusly",
  description:
    "Learn about our travel flex options and choose the right flexibility for your journey with GoBusly. Discover how to make changes to your booking and the benefits of flexible travel.",
  keywords:
    "GoBusly, Travel Flex Options, Flexible Travel, Bus Booking Flexibility, Change Booking, Travel Options, Customer Support",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "Travel Flex Options - Help Center | GoBusly",
    description:
      "Learn about our travel flex options and choose the right flexibility for your journey with GoBusly. Get tips on how to make booking changes and benefit from flexible travel.",
    url: "https://www.gobusly.com/help/travel-flex",
    type: "article",
    images: [
      {
        url: "https://www.gobusly.com/images/travel-flex-options-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Travel Flex Options",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Flex Options - Help Center | GoBusly",
    description:
      "Explore GoBusly's travel flex options and how to make changes to your bookings for more flexible travel.",
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
    name: "Premium Flex",
    value: "premium",
    price: 4,
    features: [
      "Cancel your trip up to 48 hours before departure",
      "Change trip details up to 24 hours before departure",
      "Reschedule your booking up to 3 days before departure",
    ],
  },
  {
    name: "Basic Flex",
    value: "basic",
    price: 2,
    features: [
      "Cancel your trip up to 5 days before departure",
      "Change trip details up to 3 days before departure",
    ],
  },
  {
    name: "No Flexibility",
    value: "no_flex",
    price: 0,
    features: [],
  },
];

const TravelFlexOptionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-12">
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-3xl font-bold md:mb-8 text-primary">
            Travel Flex Options
          </h1>
          <Link href="/help">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Understanding Travel Flex Options</CardTitle>
            <CardDescription>
              Choose the right level of flexibility for your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our Travel Flex Options are designed to give you peace of mind and
              flexibility when booking your trip. Choose the option that best
              suits your needs and travel plans.
            </p>
            <div className="flex items-start mb-4">
              <AlertCircle className="mr-2 h-5 w-5 mt-1 flex-shrink-0 text-yellow-500" />
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> Travel Flex Options must be selected
                at the time of booking and cannot be added later.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Travel Flex Options</CardTitle>
            <CardDescription>
              Compare our flex options to find the best fit for your travel
              needs
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
                          No cancellations allowed
                        </li>
                        <li className="flex items-center">
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          No changes allowed
                        </li>
                        <li className="flex items-center">
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          No rescheduling allowed
                        </li>
                      </>
                    )}
                    <li className="flex items-center">
                      <HeadphonesIcon className="mr-2 h-4 w-4 text-green-500" />
                      Unlimited customer support
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Travel Flex Policy Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Travel Flex Policy</CardTitle>
            <CardDescription>
              Important details regarding refunds, fees, and limitations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Please review the following policy to understand how your chosen
              Flex Option may affect your booking.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Refund Eligibility:</strong> Premium Flex and Basic Flex
                allow partial refunds, subject to a 10% processing fee if
                canceled within the eligible timeframe.
              </li>
              <li>
                <strong>Change Fees:</strong> Premium Flex changes are free of
                charge, while Basic Flex incurs a minor fee for each
                modification.
              </li>
              <li>
                <strong>Non-refundable Options:</strong> No Flexibility is
                non-refundable and does not permit any changes or cancellations.
              </li>
              <li>
                <strong>Other Conditions:</strong> Travel Flex Options do not
                cover delays caused by force majeure, including weather or other
                unforeseen events.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use Your Flex Option</CardTitle>
            <CardDescription>
              Follow these steps to modify your eligible booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Log in to your account on our website or mobile app</li>
              <li>Navigate to &quot;My Bookings&quot;</li>
              <li>Select the booking you wish to modify</li>
              <li>
                Choose the action you want to take (cancel, change, or
                reschedule)
              </li>
              <li>Follow the prompts to complete your request</li>
              <li>
                Receive a confirmation email with the details of your
                modification
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Assistance?</CardTitle>
            <CardDescription>
              We&apos;re here to help with any questions about our Travel Flex
              Options
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-4">
            <p className="text-muted-foreground">
              If you need further clarification on our Travel Flex Options or
              help with modifying your booking, our support team is ready to
              assist you.
            </p>
            <Button asChild className="rounded-xl button-gradient">
              <Link href={"/help/contact-support"}>Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TravelFlexOptionsPage;
