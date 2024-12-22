"use client";

import { useTranslation } from "react-i18next";
import { Bus, Globe2, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    value: "500+",
    label: "Bus Operators",
    icon: Bus,
  },
  {
    value: "1000+",
    label: "Destinations",
    icon: MapPin,
  },
  {
    value: "10+",
    label: "Countries",
    icon: Globe2,
  },
];

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="inline-block text-sm font-medium text-primary mb-6">
            About GoBusly
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-6">
            Simplifying Bus Travel Across Europe and the Balkans
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to GoBusly, your go-to platform for seamless bus travel
            across Europe and the Balkans. Whether you're traveling between
            bustling cities or heading to charming towns and villages, GoBusly
            connects you to the region's most reliable bus operators.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-8 bg-gray-50 border-0">
              <stat.icon className="w-6 h-6 text-primary mb-4" />
              <div className="space-y-2">
                <h3 className="text-3xl font-semibold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <p className="text-lg text-gray-600">
              Our platform offers access to a wide network of trusted operators,
              ensuring coverage for both popular routes and off-the-beaten-path
              destinations. From modern coaches with premium amenities to
              budget-friendly options, GoBusly caters to every traveler's needs.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Connecting You to Trusted Bus Operators
              </h2>
              <p className="text-gray-600">
                GoBusly collaborates with leading bus operators across Europe
                and the Balkans, offering user-friendly search tools with
                accurate schedules and competitive prices to find the perfect
                bus that fits your schedule and budget.
              </p>
            </div>

            <Card className="p-6 border-primary/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Trusted by Thousands
                  </h3>
                  <p className="text-sm text-gray-600">
                    Join our growing community of satisfied travelers
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
