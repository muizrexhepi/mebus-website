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
        <h3 className="text-xl font-medium text-gray-900 mb-3">{t(title)}</h3>
        <p className="text-gray-600 leading-relaxed mb-6">{t(description)}</p>
        {/* <Button
          variant="ghost"
          className={`${color} p-0 h-auto font-semibold hover:bg-transparent group-hover:underline`}
        >
          Learn more
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button> */}
      </div>
    </Card>
  );
};

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto paddingX">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-gray-900 mb-4">
            {t("infoSection.heading")}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("infoSection.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
