"use client";

import { useTranslation } from "react-i18next";

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      title: t("howItWorks.steps.search.title"),
      description: t("howItWorks.steps.search.description"),
    },
    {
      number: "02",
      title: t("howItWorks.steps.choose.title"),
      description: t("howItWorks.steps.choose.description"),
    },
    {
      number: "03",
      title: t("howItWorks.steps.travel.title"),
      description: t("howItWorks.steps.travel.description"),
    },
  ];

  return (
    <div className="bg-white py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 font-normal mb-6 leading-tight">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("howItWorks.description")}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 sm:space-y-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-start"
            >
              {/* Number */}
              <div className="flex-shrink-0">
                <div className="text-6xl sm:text-7xl font-light text-gray-200 leading-none">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <h3 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>

              {/* Divider */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block w-full sm:w-px h-px sm:h-24 bg-gray-200 self-stretch sm:mt-8" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-normal text-gray-900 mb-2">
                {t("howItWorks.cta.title")}
              </h3>
              <p className="text-base text-gray-600">
                {t("howItWorks.cta.description")}
              </p>
            </div>
            <a
              href="/search"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              {t("howItWorks.cta.button")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
