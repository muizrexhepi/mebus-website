"use client";

import SearchBlock from "@/app/search/_components/SearchBlock";
import { Bus, MapPin, Users, Calendar, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  // Option 1: Keep as features but with cleaner design
  const features = [
    {
      icon: <Users className="w-6 h-6 text-[#ff284d]" />,
      title: t("hero.features.comfortable", "Comfortable Travel"),
      description: t(
        "hero.features.comfortableDesc",
        "Experience comfort with our modern bus fleet"
      ),
    },
    {
      icon: <Calendar className="w-6 h-6 text-[#ff284d]" />,
      title: t("hero.features.flexible", "Flexible Booking"),
      description: t(
        "hero.features.flexibleDesc",
        "Easy scheduling with multiple departure options"
      ),
    },
    {
      icon: <Shield className="w-6 h-6 text-[#ff284d]" />,
      title: t("hero.features.secure", "Secure Booking"),
      description: t(
        "hero.features.secureDesc",
        "Safe and secure online booking system"
      ),
    },
  ];

  return (
    <div className="relative flex flex-col justify-between md:pb-20 bg-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-6xl mx-auto paddingX">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-red-100 to-orange-100 blur-3xl opacity-30" />
        <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 blur-3xl opacity-30" />
        <Bus className="absolute -bottom-6 left-10 w-32 h-32 text-gray-200 opacity-40 transform -rotate-12" />
        <MapPin className="absolute top-20 right-10 w-20 h-20 text-gray-200 opacity-40 transform rotate-12" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className="relative z-20 w-full">
        <div className="max-w-6xl mx-auto paddingX">
          <div className="space-y-8 pt-8 sm:pt-16 md:pt-20">
            <div className="max-w-4xl space-y-2">
              <h1 className="text-left text-3xl sm:text-4xl text-transparent font-normal button-gradient bg-clip-text">
                {t("hero.title")}
              </h1>
              <p className="text-left text-base sm:text-lg text-black/60 max-w-2xl">
                {t("hero.desc")}
              </p>
            </div>

            <SearchBlock />

            {/* OPTION 1: Cleaner features section */}
            <div className="pt-16 hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-4">
                    {/* <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full button-gradient"></div> */}
                    {feature.icon}
                  </div>
                  <h3 className="font-medium text-lg text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 max-w-xs">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
