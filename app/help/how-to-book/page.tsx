import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
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
  title: "How to Book - Help Center",
  description:
    "Learn how to book your bus ticket step by step. Get tips for a smooth booking process and find answers to common questions.",
};

export default function HowToBookPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>
      <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center  justify-between">
          <h1 className="text-3xl font-bold md:mb-8 text-primary">
            How to Book Your Trip
          </h1>
          <Link href="/help">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
          </Link>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Booking Process</CardTitle>
            <CardDescription>
              Follow these steps to book your bus ticket
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Visit our website or launch our mobile application</li>
              <li>Input your departure and destination locations</li>
              <li>Select your preferred travel date</li>
              <li>Choose your desired bus service and seat</li>
              <li>Provide passenger information</li>
              <li>Add any optional services (e.g., extra luggage allowance)</li>
              <li>Verify your booking details</li>
              <li>Complete the payment process</li>
              <li>Receive your electronic ticket via email</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Booking Tips</CardTitle>
            <CardDescription>
              Maximize your booking experience with these helpful tips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Book early to secure preferred seats and potentially lower fares
              </li>
              <li>Check for current promotions or seasonal discounts</li>
              <li>Consider flexible travel dates for better deals</li>
              <li>Review the cancellation and refund policies</li>
              <li>
                Ensure all booking details are accurate before confirmation
              </li>
              <li>Sign up for our newsletter to receive exclusive offers</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Support</CardTitle>
            <CardDescription>
              We&apos;re here to assist you with your booking
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-4">
            <p className="text-muted-foreground">
              If you need any assistance or have questions about your booking,
              our dedicated support team is ready to help.
            </p>
            <Button>Contact Support</Button>
          </CardContent>
        </Card>
      </main>
      <SecondaryFooter className="max-w-4xl" />
    </div>
  );
}
