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
  title: "Travel Advisory - Help Center | GoBusly",
  description:
    "Stay informed with the latest travel advisories from GoBusly. Learn about safety tips, travel restrictions, and essential advice for a safe journey.",
  keywords:
    "GoBusly, Travel Advisory, Travel Restrictions, Safety Tips, Travel Advice, Bus Travel, Travel Updates, Journey Safety",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "Travel Advisory - Help Center | GoBusly",
    description:
      "Get the latest travel advisories, including safety tips and restrictions. Stay informed with GoBusly for a safe and smooth journey.",
    url: "https://www.gobusly.com/help/travel-advisory",
    type: "article",
    images: [
      {
        url: "https://www.gobusly.com/images/travel-advisory-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Travel Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Advisory - Help Center | GoBusly",
    description:
      "Stay up-to-date with GoBusly's travel advisories. Get the latest safety tips, travel restrictions, and important travel advice.",
  },
};

export default function TravelAdvisoryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>
      <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-3xl font-bold md:mb-8 text-primary">
            Travel Advisory & Safety Information
          </h1>
          <Link href="/help">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Travel Alerts</CardTitle>
            <CardDescription>
              Stay up-to-date with the latest travel advisories and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Weather Advisories:</strong> Severe weather conditions
                are expected in certain regions. Check the forecast before
                traveling.
              </li>
              <li>
                <strong>Political Unrest:</strong> Be cautious while traveling
                to areas currently experiencing political unrest or
                demonstrations.
              </li>
              <li>
                <strong>Health Warnings:</strong> Consult the latest health
                advisories for outbreaks or required vaccinations.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Safety Tips Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Travel Safety Tips</CardTitle>
            <CardDescription>
              Follow these essential safety tips to ensure a smooth and secure
              journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Always keep copies of your important documents, such as passport
                and identification, in a separate place.
              </li>
              <li>
                Stay informed about the local laws and customs of your travel
                destination.
              </li>
              <li>
                Avoid carrying large amounts of cash. Use credit cards or other
                electronic payment methods whenever possible.
              </li>
              <li>
                Be aware of your surroundings, especially in crowded or
                unfamiliar areas.
              </li>
              <li>
                Purchase travel insurance to cover unexpected events such as
                cancellations, health emergencies, or lost luggage.
              </li>
              <li>
                Always let someone know your travel itinerary, including where
                you&apos;ll be staying and your expected return date.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Emergency Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact Information</CardTitle>
            <CardDescription>
              In case of emergencies, use these contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-4">
            <p className="text-muted-foreground">
              For immediate assistance during your travels, reach out to the
              appropriate authorities or use the following contacts:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Local Embassy/Consulate</li>
              <li>Emergency Services (Police, Ambulance)</li>
              <li>Travel Insurance Helpline</li>
              <li>Nearest Hospital or Medical Facility</li>
            </ul>
            <Button>Contact Support</Button>
          </CardContent>
        </Card>
      </main>
      <SecondaryFooter className="max-w-4xl" />
    </div>
  );
}
