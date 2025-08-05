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

export const metadata: Metadata = {
  title: "Travel Advisory - Help Center | GoBusly",
  description:
    "Stay informed with the latest travel advisories from GoBusly. Learn about safety tips, travel restrictions, and essential advice for a safe journey.",
  keywords:
    "GoBusly, Travel Advisory, Travel Restrictions, Safety Tips, Travel Advice, Bus Travel, Travel Updates, Journey Safety",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
};

export default function TravelAdvisoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Travel Advisory & Safety Information
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

        {/* Current Travel Alerts */}
        <Card className="mb-8 shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">Current Travel Alerts</CardTitle>
            <CardDescription>
              Stay up-to-date with the latest travel advisories and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Weather Advisories:</strong>
                  <span className="text-gray-700 ml-1">
                    Severe weather conditions are expected in certain regions.
                    Check the forecast before traveling.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Political Unrest:</strong>
                  <span className="text-gray-700 ml-1">
                    Be cautious while traveling to areas currently experiencing
                    political unrest or demonstrations.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Health Warnings:</strong>
                  <span className="text-gray-700 ml-1">
                    Consult the latest health advisories for outbreaks or
                    required vaccinations.
                  </span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Safety Tips Section */}
        <Card className="mb-8 shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">Travel Safety Tips</CardTitle>
            <CardDescription>
              Follow these essential safety tips to ensure a smooth and secure
              journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Always keep copies of your important documents, such as passport and identification, in a separate place.",
                "Stay informed about the local laws and customs of your travel destination.",
                "Avoid carrying large amounts of cash. Use credit cards or other electronic payment methods whenever possible.",
                "Be aware of your surroundings, especially in crowded or unfamiliar areas.",
                "Purchase travel insurance to cover unexpected events such as cancellations, health emergencies, or lost luggage.",
                "Always let someone know your travel itinerary, including where you'll be staying and your expected return date.",
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Emergency Contact Section */}
        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl">
              Emergency Contact Information
            </CardTitle>
            <CardDescription>
              In case of emergencies, use these contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              For immediate assistance during your travels, reach out to the
              appropriate authorities or use the following contacts:
            </p>
            <ul className="space-y-2">
              {[
                "Local Embassy/Consulate",
                "Emergency Services (Police, Ambulance)",
                "Travel Insurance Helpline",
                "Nearest Hospital or Medical Facility",
              ].map((contact, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{contact}</span>
                </li>
              ))}
            </ul>
            <Button variant="primary" className="rounded-xl">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
