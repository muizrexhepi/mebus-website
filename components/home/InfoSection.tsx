"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Search, CreditCard, MapPin } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "infoSection.feature1.title",
    description: "infoSection.feature1.description",
    defaultTitle: "Compare bus prices across providers",
    defaultDescription:
      "Find the best deals by comparing prices from multiple bus operators in one place. Save time and money on your journey.",
  },
  {
    icon: CreditCard,
    title: "infoSection.feature2.title",
    description: "infoSection.feature2.description",
    defaultTitle: "Book tickets instantly",
    defaultDescription:
      "Easy and secure booking process with instant confirmation. Get your e-tickets delivered right to your phone.",
  },
  {
    icon: MapPin,
    title: "infoSection.feature3.title",
    description: "infoSection.feature3.description",
    defaultTitle: "Track your journey",
    defaultDescription:
      "Real-time updates on bus location, arrival times, and any schedule changes. Stay informed throughout your trip.",
  },
];

const FeatureItem = ({ icon: Icon, title, description }: any) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="p-2 bg-primary-bg/10 rounded-full">
          <Icon className="w-6 h-6 text-primary-bg" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{t(title)}</h3>
        <p className="text-gray-600">{t(description)}</p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto paddingX">
        <div className="">
          <dl className="space-y-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <FeatureItem {...feature} />
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
