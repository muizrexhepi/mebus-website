import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  AlertCircle,
  Clock,
  Edit,
  Repeat,
  HeadphonesIcon,
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
  title: "Cancellation Policy - Help Center",
  description:
    "Understand our cancellation policy and learn about the benefits of our travel flex options for more flexible booking terms.",
};

const CancellationPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>
      <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-3xl font-bold md:mb-8 text-primary">
            Cancellation Policy
          </h1>
          <Link href="/help">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>General Cancellation Policy</CardTitle>
            <CardDescription>
              Understanding our cancellation terms and travel flex options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our cancellation policy is designed to provide flexibility while
              ensuring operational efficiency. Please note that the ability to
              cancel, edit, or reschedule your booking depends on the{" "}
              <a
                href="/help/travel-flex"
                className="hover:underline text-indigo-500"
              >
                travel flex
              </a>{" "}
              option you choose at the time of booking.
            </p>
            <div className="flex items-start mb-4">
              <AlertCircle className="mr-2 h-5 w-5 mt-1 flex-shrink-0 text-yellow-500" />
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> Cancellations are only possible if
                you have purchased either the Premium or Basic travel flex
                option. Bookings made without a flex option cannot be cancelled.
              </p>
            </div>
          </CardContent>
        </Card>

        {/*  */}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Cancel Your Booking</CardTitle>
            <CardDescription>
              Follow these steps to cancel your eligible booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Log in to your account on our website or mobile app</li>
              <li>Navigate to &quot;My Bookings&quot;</li>
              <li>Select the booking you wish to cancel</li>
              <li>Click on the &quot;Cancel Booking&quot; button</li>
              <li>Confirm your cancellation</li>
              <li>
                Receive a confirmation email with refund details (if applicable)
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Assistance?</CardTitle>
            <CardDescription>
              We&apos;re here to help with any questions about cancellations or
              flex options
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-4">
            <p className="text-muted-foreground">
              If you need further clarification on our cancellation policy or
              help with cancelling your booking, our support team is ready to
              assist you.
            </p>
            <Button>Contact Support</Button>
          </CardContent>
        </Card>
      </main>
      <SecondaryFooter className="max-w-4xl" />
    </div>
  );
};

export default CancellationPolicyPage;
