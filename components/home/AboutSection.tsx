"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto paddingX py-12">
      <h1 className="text-left text-2xl sm:text-4xl font-medium text-primary-bg mb-8">
        {t("aboutSection.title")}
      </h1>

      <div className="space-y-6 text-gray-700 mb-12">
        <p
          dangerouslySetInnerHTML={{
            __html: t("aboutSection.intro.p1"),
          }}
        />
        <p
          dangerouslySetInnerHTML={{
            __html: t("aboutSection.intro.p2"),
          }}
        />
        <p
          dangerouslySetInnerHTML={{
            __html: t("aboutSection.intro.p3"),
          }}
        />
      </div>

      <h2 className="text-left text-2xl sm:text-3xl font-medium text-primary-bg/90 mb-6">
        {t("aboutSection.operatorsTitle")}
      </h2>

      <div className="space-y-6 text-gray-700">
        <p>{t("aboutSection.operatorsDescription.p1")}</p>
        <p>{t("aboutSection.operatorsDescription.p2")}</p>
        <p className="text-blue-800 hover:text-blue-700 cursor-pointer">
          {t("aboutSection.operatorsDescription.linkText")}
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
