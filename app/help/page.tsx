import React from "react";
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
import Link from "next/link";
import { QUICK_LINKS } from "@/lib/data";
import HelpForm from "@/components/forms/HelpForm";
import InfoTabs from "@/components/help/InfoTabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | Busly - Your Reliable Bus Booking Service",
  description:
    "Find answers to your questions and get support for your bus bookings with Busly. Access our knowledge base, learn how to use our services, and reach out for assistance.",
};

export default function HelpPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 xl:px-0 pt-32">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-6xl" />
      </div>
      <h1 className="text-4xl font-bold text-center mb-8 text-neutral-900">
        Help Center
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Welcome to our Help Center. Find answers to common questions, learn how
        to use our services, and get the support you need for a smooth bus
        booking experience.
      </p>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">How can we help you today?</CardTitle>
          <CardDescription>
            Search our knowledge base or browse topics below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HelpForm />
        </CardContent>
      </Card>

      <InfoTabs />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Quick Links</CardTitle>
          <CardDescription>
            Quickly access important information and tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUICK_LINKS.map((link) => (
              <Link href={`/help/${link.name}`} key={link.name}>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 w-full"
                >
                  <link.icon className="h-6 w-6 mb-2" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      <SecondaryFooter />
    </div>
  );
}
