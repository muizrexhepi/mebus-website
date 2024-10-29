import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  AlertCircle,
  Trash2,
  Clock,
  Shield,
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
  title: "Data Deletion Instructions - Help Center",
  description:
    "Learn how to request the deletion of your personal data from our systems and understand our data retention policies.",
};

const DataDeletionPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>
      <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-3xl font-bold md:mb-8 text-primary">
            Data Deletion Instructions
          </h1>
          <Link href="/help">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Deletion Policy</CardTitle>
            <CardDescription>
              Understanding your rights and our process for data deletion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We respect your right to control your personal data. This page
              explains how you can request the deletion of your data from our
              systems. Please note that some data may be retained for legal or
              operational purposes.
            </p>
            <div className="flex items-start mb-4">
              <AlertCircle className="mr-2 h-5 w-5 mt-1 flex-shrink-0 text-yellow-500" />
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> Deleting your data will result in
                the permanent loss of your account and all associated
                information. This action cannot be undone.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Request Data Deletion</CardTitle>
            <CardDescription>
              Follow these steps to submit a data deletion request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Log in to your account on our website or mobile app</li>
              <li>Navigate to &quot;Account Settings&quot;</li>
              <li>Select &quot;Privacy and Data&quot;</li>
              <li>Click on the &quot;Request Data Deletion&quot; button</li>
              <li>Confirm your request by entering your password</li>
              <li>Receive a confirmation email about your deletion request</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What Data Will Be Deleted</CardTitle>
            <CardDescription>
              Understanding which information will be removed from our systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                Personal information (name, email, phone number)
              </li>
              <li className="flex items-center">
                <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                Booking history and preferences
              </li>
              <li className="flex items-center">
                <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                Payment information
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-blue-500" />
                Anonymized usage data (retained for analytics)
              </li>
              <li className="flex items-center">
                <Shield className="mr-2 h-4 w-4 text-green-500" />
                Legal records (retained as required by law)
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Assistance?</CardTitle>
            <CardDescription>
              We&apos;re here to help with any questions about data deletion or
              privacy concerns
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-4">
            <p className="text-muted-foreground">
              If you need further clarification on our data deletion process or
              have any privacy-related concerns, our support team is ready to
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

export default DataDeletionPage;
