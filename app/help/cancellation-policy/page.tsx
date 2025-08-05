import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Cancellation Policy - Help Center | GoBusly",
  description:
    "Understand GoBusly's cancellation policy and learn about the benefits of our travel flex options for more flexible booking terms.",
  keywords:
    "GoBusly, Cancellation Policy, Travel Flex Options, Flexible Booking, Bus Ticket Cancellation, Customer Support, Travel Terms, Booking Changes",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
};

const CancellationPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Cancellation Policy
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

        {/* General Cancellation Policy */}
        <Card className="mb-8 shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">
              General Cancellation Policy
            </CardTitle>
            <CardDescription>
              Understanding our cancellation terms and travel flex options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Our cancellation policy is designed to provide flexibility while
              ensuring operational efficiency. Please note that the ability to
              cancel, edit, or reschedule your booking depends on the{" "}
              <Link
                href="/help/travel-flex"
                className="text-blue-600 hover:underline"
              >
                travel flex
              </Link>{" "}
              option you choose at the time of booking.
            </p>
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Important</p>
                <p className="text-sm text-yellow-700">
                  Cancellations are only possible if you have purchased either
                  the Premium or Basic travel flex option. Bookings made without
                  a flex option cannot be cancelled.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Cancel Your Booking */}
        <Card className="mb-8 shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">
              How to Cancel Your Booking
            </CardTitle>
            <CardDescription>
              Follow these steps to cancel your eligible booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Log in to your account on our website or mobile app",
                'Navigate to "My Bookings"',
                "Select the booking you wish to cancel",
                'Click on the "Cancel Booking" button',
                "Confirm your cancellation",
                "Receive a confirmation email with refund details (if applicable)",
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
              We're here to help with any questions about cancellations or flex
              options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              If you need further clarification on our cancellation policy or
              help with cancelling your booking, our support team is ready to
              assist you.
            </p>
            <Button variant="primary" asChild className="rounded-xl">
              <Link href="/help/contact-support">Contact support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CancellationPolicyPage;
