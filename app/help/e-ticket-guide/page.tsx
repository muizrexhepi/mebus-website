import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Smartphone, Ticket, ShieldCheck } from "lucide-react";
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
  title: "E-Ticket Guide - Help Center",
  description:
    "Learn how to use your e-ticket for bus travel. Get tips on accessing, presenting, and managing your electronic ticket.",
};

const ETicketGuidePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>
      <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-3xl font-bold mb-8 text-primary">
            E-Ticket Guide
          </h1>
          <Link href="/help">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Understanding E-Tickets</CardTitle>
            <CardDescription>
              What are e-tickets and how do they work?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              An e-ticket (electronic ticket) is a digital version of a
              traditional paper ticket. It contains all the information about
              your bus journey, including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Passenger name</li>
              <li>Bus operator and service details</li>
              <li>Departure and arrival information</li>
              <li>Seat number (if applicable)</li>
              <li>Booking reference or ticket number</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use Your E-Ticket</CardTitle>
            <CardDescription>
              Follow these steps to use your e-ticket for travel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Receive your e-ticket via email after booking</li>
              <li>Download or save the e-ticket on your mobile device</li>
              <li>At the bus station, locate your departure gate or bus</li>
              <li>Present your e-ticket to the staff or driver for scanning</li>
              <li>Board the bus and enjoy your journey</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>E-Ticket Tips</CardTitle>
            <CardDescription>
              Make the most of your e-ticket with these helpful tips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Smartphone className="mr-2 h-5 w-5 mt-1 flex-shrink-0" />
                <span>
                  Keep your device charged to access your e-ticket easily
                </span>
              </li>
              <li className="flex items-start">
                <Ticket className="mr-2 h-5 w-5 mt-1 flex-shrink-0" />
                <span>Take a screenshot of your e-ticket as a backup</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="mr-2 h-5 w-5 mt-1 flex-shrink-0" />
                <span>
                  Ensure your e-ticket details match your ID for verification
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              We&apos;re here to assist you with any e-ticket queries
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-4">
            <p className="text-muted-foreground">
              If you&apos;re experiencing issues with your e-ticket or have any
              questions, our support team is ready to help.
            </p>
            <Button>Contact Support</Button>
          </CardContent>
        </Card>
      </main>
      <SecondaryFooter className="max-w-4xl" />
    </div>
  );
};

export default ETicketGuidePage;