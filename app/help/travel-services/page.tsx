import type { Metadata } from "next";
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
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Travel Service Options
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

        {/* Understanding Section */}
        <Card className="mb-8 shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">
              Understanding Travel Service Options
            </CardTitle>
            <CardDescription>
              Choose the right service level for your journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Our Travel Service Options are designed to give you control over
              your booking and peace of mind during your journey. Select the
              service tier that best matches your travel needs.
            </p>
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Important</p>
                <p className="text-sm text-yellow-700">
                  Service options must be selected at the time of booking and
                  cannot be added later.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Tiers */}
        <Card className="mb-8 shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">Service Tiers</CardTitle>
            <CardDescription>
              Compare our service options to find the best fit for your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {flexFeatures.map((option) => (
                <div
                  key={option.value}
                  className="border border-gray-200 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {option.name}
                    </h3>
                    <span className="text-2xl font-bold text-blue-600">
                      €{option.price}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {option.value === "no_flex" && (
                      <>
                        <li className="flex items-start gap-3">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            Non-refundable booking
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            No modifications allowed
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            Standard support only
                          </span>
                        </li>
                      </>
                    )}
                    <li className="flex items-start gap-3">
                      <HeadphonesIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Customer support assistance
                      </span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Policy */}
        <Card className="mb-8 shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">Service Policy</CardTitle>
            <CardDescription>
              Important details regarding refunds, fees, and limitations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Please review the following policy to understand how your chosen
              service tier affects your booking.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Refund Policy:</strong>
                  <span className="text-gray-700 ml-1">
                    Priority Service offers full refunds, while Standard Service
                    provides partial refunds with a 10% processing fee.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Modification Fees:</strong>
                  <span className="text-gray-700 ml-1">
                    Priority Service changes are complimentary, while Standard
                    Service includes a small processing fee.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Basic Service:</strong>
                  <span className="text-gray-700 ml-1">
                    Basic Service bookings are non-refundable and cannot be
                    modified.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">
                    Service Limitations:
                  </strong>
                  <span className="text-gray-700 ml-1">
                    Service options do not cover delays caused by force majeure,
                    including weather or other unforeseen events.
                  </span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Managing Booking */}
        <Card className="mb-8 shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">Managing Your Booking</CardTitle>
            <CardDescription>
              Follow these steps to modify your eligible booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Log in to your account on our website or mobile app",
                'Navigate to "My Bookings"',
                "Select the booking you wish to modify",
                "Choose your desired action (refund or modification)",
                "Follow the prompts to complete your request",
                "Receive a confirmation email with your updated booking details",
              ].map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Need Assistance */}
        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">Need Assistance?</CardTitle>
            <CardDescription>
              We're here to help with any questions about our service options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              If you need clarification about our service tiers or help managing
              your booking, our support team is ready to assist you.
            </p>
            <Button variant="primary" asChild className="rounded-xl">
              <Link href="/help/contact-support">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TravelServicesPage;
