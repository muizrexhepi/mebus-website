"use client";

import { useTranslation } from "react-i18next";
import { Search, CreditCard, MapPin, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Search,
    title: "infoSection.feature1.title",
    description: "infoSection.feature1.description",
    defaultTitle: "Compare bus prices across providers",
    defaultDescription:
      "Find the best deals by comparing prices from multiple bus operators in one place. Save time and money on your journey.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: CreditCard,
    title: "infoSection.feature2.title",
    description: "infoSection.feature2.description",
    defaultTitle: "Book tickets instantly",
    defaultDescription:
      "Easy and secure booking process with instant confirmation. Get your e-tickets delivered right to your phone.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: MapPin,
    title: "infoSection.feature3.title",
    description: "infoSection.feature3.description",
    defaultTitle: "Track your journey",
    defaultDescription:
      "Real-time updates on bus location, arrival times, and any schedule changes. Stay informed throughout your trip.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const FeatureCard = ({ icon: Icon, title, description, color, bg }: any) => {
  const { t } = useTranslation();

  return (
    <Card className="relative overflow-hidden group">
      <div className="p-8">
        <div className={`inline-flex p-3 rounded-lg ${bg} ${color} mb-6`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{t(title)}</h3>
        <p className="text-gray-600 leading-relaxed mb-6">{t(description)}</p>
        <Button
          variant="ghost"
          className={`${color} p-0 h-auto font-semibold hover:bg-transparent group-hover:underline`}
        >
          Learn more
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto paddingX">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex px-4 py-1 bg-primary/5 rounded-full mb-6">
            <span className="text-sm font-medium text-primary">
              Why Choose Us
            </span>
          </div>
          <h1 className=" text-3xl sm:text-5xl font-medium tracking-tight text-gray-900  mb-4">
            The smartest way to travel by bus
          </h1>
          <p className="text-lg text-gray-600">
            Experience seamless bus travel with our comprehensive platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 p-4 rounded-2xl bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
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
              <div className="text-left">
                <p className="font-medium text-gray-900">Trusted by millions</p>
                <p className="text-sm text-gray-600">
                  Over 5M+ happy travelers
                </p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Secure booking</p>
                <p className="text-sm text-gray-600">100% secure payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
