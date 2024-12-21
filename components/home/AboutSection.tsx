"use client";

import { useTranslation } from "react-i18next";
import { ArrowRight, Bus, Globe2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AboutSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      value: "500+",
      label: "Bus Operators",
      icon: Bus,
    },
    {
      value: "1000+",
      label: "Destinations",
      icon: MapPin,
    },
    {
      value: "10+",
      label: "Countries",
      icon: Globe2,
    },
  ];

  return (
    <section className="w-full py-20 bg-[#f3f4f5]">
      <div className="max-w-6xl mx-auto paddingX">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex px-4 py-1 bg-primary/5 rounded-full mb-6">
            <span className="text-sm font-medium text-primary">
              About GoBusly
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-6">
            {t("aboutSection.title")}
          </h1>
          <p
            className="text-lg leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{
              __html: t("aboutSection.intro.p1"),
            }}
          >
            {/* {t("aboutSection.intro.p1")} */}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 bg-gray-50/50">
              <stat.icon className="w-6 h-6 text-primary mb-4" />
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {t("aboutSection.intro.p2")}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t("aboutSection.intro.p3")}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("aboutSection.operatorsTitle")}
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  {t("aboutSection.operatorsDescription.p1")}
                </p>
                <p className="text-gray-600">
                  {t("aboutSection.operatorsDescription.p2")}
                </p>
              </div>
              <Button
                variant="link"
                className="mt-4 p-0 h-auto text-primary font-medium hover:no-underline group"
              >
                {t("aboutSection.operatorsDescription.linkText")}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <Card className="p-6 border-primary/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
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
                <div>
                  <h3 className="font-medium text-gray-900">
                    Trusted by Thousands
                  </h3>
                  <p className="text-sm text-gray-600">
                    Join our growing community of satisfied travelers
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
