"use client";

import { Smartphone, Bell, CreditCard, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const MobileAppSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: t("mobileAppSection.features.instantBooking.title"),
      description: t("mobileAppSection.features.instantBooking.description"),
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: t("mobileAppSection.features.smartNotifications.title"),
      description: t(
        "mobileAppSection.features.smartNotifications.description"
      ),
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: t("mobileAppSection.features.securePayments.title"),
      description: t("mobileAppSection.features.securePayments.description"),
    },
  ];

  return (
    <div className="bg-[#f9fafb] py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Illustration with QR */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              {/* Custom Illustration */}
              <div className="relative z-10 w-full max-w-xl">
                <img
                  src="/assets/images/mobileapp.webp"
                  alt="GoBusly Mobile App"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div className="max-w-4xl space-y-2">
              <h1 className="text-left text-3xl font-normal text-primary">
                {t("mobileAppSection.title")}
              </h1>
              <p className="text-left text-sm sm:text-base text-black/60 max-w-2xl">
                {t("mobileAppSection.description")}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-6 max-w-md">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-normal text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-black/60">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://apps.apple.com/za/app/gobusly/id6753230552"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1234567890"
                  alt="Download on the App Store"
                  className="h-12"
                />
              </a>
              {/* <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppSection;
