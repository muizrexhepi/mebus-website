"use client";

import SearchBlock from "@/app/search/_components/SearchBlock";
import { Bus, MapPin, Users, Calendar, Clock, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: t("hero.features.comfortable", "Comfortable Travel"),
      description: t(
        "hero.features.comfortableDesc",
        "Experience comfort with our modern bus fleet"
      ),
    },
    {
      icon: <Calendar className="w-6 h-6 text-white" />,
      title: t("hero.features.flexible", "Flexible Booking"),
      description: t(
        "hero.features.flexibleDesc",
        "Easy scheduling with multiple departure options"
      ),
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: t("hero.features.reliable", "Reliable Service"),
      description: t(
        "hero.features.reliableDesc",
        "On-time departures and arrivals"
      ),
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: t("hero.features.secure", "Secure Booking"),
      description: t(
        "hero.features.secureDesc",
        "Safe and secure online booking system"
      ),
    },
  ];

  return (
    <div className="relative flex flex-col justify-between pb-20">
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

            <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-2xl transition-all duration-200 border border-gray-200"
                >
                  <div className="flex flex-col space-y-3">
                    <div className="p-2 rounded-lg bg-primary-bg w-fit transition-colors duration-200">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-primary-bg/5 to-primary-accent/5 rounded-2xl p-6">
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold mb-2">
                  {t("hero.download", "Download Our Mobile App")}
                </h2>
                <p className="text-gray-600">
                  {t(
                    "hero.downloadDesc",
                    "Book tickets anytime, anywhere with our mobile app"
                  )}
                </p>
              </div>
              <div className="flex gap-4">
                <img
                  src="/assets/icons/appstore.svg"
                  alt="App Store"
                  className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
                />
                <img
                  src="/assets/icons/googleplay.svg"
                  alt="Google Play"
                  className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
