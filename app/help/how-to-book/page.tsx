import type { Metadata } from "next";
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

const HowToBookContent = () => (
  <>
    <Card className="mb-8 shadow-sm border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Step-by-Step Booking Guide
        </CardTitle>
        <CardDescription className="text-gray-600 text-base">
          Follow these simple steps to book your bus ticket
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ol className="space-y-5">
          {[
            "Visit our website or open the mobile app.",
            "Enter your departure and destination cities, and select your travel date(s).",
            "Click 'Search' to view available bus services.",
            "Browse through the list of buses, filter by price, time, or operator.",
            "Select your preferred bus and choose your seats.",
            "Enter passenger details and contact information.",
            "Review your booking summary and proceed to payment.",
            "Complete the payment using your preferred method.",
            "Receive your e-ticket via email and SMS.",
          ].map((step, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className="flex items-center justify-center w-7 h-7 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-800 text-base leading-relaxed">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>

    <Card className="mb-8 shadow-sm border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Helpful Booking Tips
        </CardTitle>
        <CardDescription className="text-gray-600 text-base">
          Make your booking process even smoother
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-800 text-base leading-relaxed">
              Book in advance for better prices and seat availability.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-800 text-base leading-relaxed">
              Check bus amenities and reviews before selecting.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-800 text-base leading-relaxed">
              Double-check all passenger details before confirming.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-800 text-base leading-relaxed">
              Keep your booking reference handy for future reference.
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>

    <Card className="shadow-sm border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Need Assistance?
        </CardTitle>
        <CardDescription className="text-gray-600 text-base">
          We're here to help with your booking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        <p className="text-gray-700 leading-relaxed">
          If you encounter any issues during the booking process or have
          questions, our support team is ready to assist you.
        </p>
        <Button
          variant="primary"
          asChild
          className="rounded-xl h-12 px-6 text-base font-semibold"
        >
          <Link href="/help/contact-support">Contact Support</Link>
        </Button>
      </CardContent>
    </Card>
  </>
);

export const metadata: Metadata = {
  title: "How to Book - Help Center | GoBusly",
  description:
    "Learn how to book your bus ticket step by step with GoBusly. Get tips for a smooth booking process and find answers to common questions to make your travel easier.",
  keywords:
    "GoBusly, How to Book, Bus Ticket Booking, Step-by-Step Guide, Booking Process, Customer Support, Travel Tips, Common Questions",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
};

export default function HowToBookPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            How to Book
          </h1>
          <Link href="/help">
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-xl bg-transparent text-gray-700 hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Help Center
            </Button>
          </Link>
        </div>
        <HowToBookContent />
      </main>
    </div>
  );
}
