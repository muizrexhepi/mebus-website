"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Main Title */}
      <h1 className="text-4xl font-bold text-primary-bg mb-8">
        {t("aboutSection.title")}
      </h1>

      {/* Introduction */}
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

      {/* Operators and Features Section */}
      <h2 className="text-3xl font-bold text-primary-bg mb-6">
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
