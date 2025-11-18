"use client";

import { Smartphone, Bell, CreditCard } from "lucide-react";
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
    <div className="bg-[#f9fafb] py-12 sm:py-20 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto paddingX">
        <div className="grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left side - Content */}

          {/* Right side - Image */}
          <div className="relative lg:order-2 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-200 to-orange-200 rounded-3xl blur-2xl opacity-40"></div>
              <div className="relative w-full max-w-xl hidden lg:block">
                <img
                  src="/assets/images/mobileapp.webp"
                  alt="GoBusly Mobile App"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
          <div className="space-y-8 lg:order-1">
            <div className="max-w-4xl space-y-2">
              <h1 className="text-left text-3xl font-normal text-primary">
                {t("mobileAppSection.title")}
              </h1>
              <p className="text-left text-sm sm:text-base text-black/60 max-w-2xl">
                {t("mobileAppSection.description")}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-5 p-5 bg-white rounded-2xl transition-shadow shadow-sm"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-accent rounded-xl flex items-center justify-center text-white shadow-lg">
                    {feature.icon}
                  </div>
                  <div className="flex-1 pt-1">
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
            <div className="flex flex-wrap gap-4">
              <a
                href="https://apps.apple.com/za/app/gobusly/id6753230552"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-all hover:scale-105 hover:-translate-y-1 duration-200"
              >
                <img
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1234567890"
                  alt="Download on the App Store"
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppSection;
