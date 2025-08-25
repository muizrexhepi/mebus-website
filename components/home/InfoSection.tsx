"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";

const features = [
  {
    title: "infoSection.feature1.title",
    description: "infoSection.feature1.description",
    defaultTitle: "Compare prices instantly",
    defaultDescription:
      "Search through hundreds of bus operators and find the best deals for your journey in seconds.",
    image: "/assets/icons/feature1.svg",
  },
  {
    title: "infoSection.feature2.title",
    description: "infoSection.feature2.description",
    defaultTitle: "Secure booking guaranteed",
    defaultDescription:
      "Your payment is protected with bank-level security. Get instant confirmation and digital tickets.",
    image: "/assets/icons/feature2.svg",
  },
  {
    title: "infoSection.feature3.title",
    description: "infoSection.feature3.description",
    defaultTitle: "Travel made simple",
    defaultDescription:
      "Real-time updates, digital tickets, and 24/7 customer support. Everything in your pocket.",
    image: "/assets/icons/feature3.svg",
  },
];

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="relative w-auto h-64 mx-auto mb-8">
                <Image
                  src={feature.image}
                  alt={feature.defaultTitle}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 leading-tight">
                {t(feature.title, feature.defaultTitle)}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base max-w-sm mx-auto">
                {t(feature.description, feature.defaultDescription)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
