"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Search, CreditCard, MapPin } from "lucide-react";

const FeaturesSection = () => {
  const { t } = useTranslation();

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

  return (
    <div className="w-full bg-primary-bg/5 py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 bg-white rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <feature.icon className="w-8 h-8 text-primary-bg" />
              </div>
              <h3 className="text-2xl font-bold text-primary-bg mb-4">
                {t(feature.title, feature.defaultTitle)}
              </h3>
              <p className="text-gray-600">
                {t(feature.description, feature.defaultDescription)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
