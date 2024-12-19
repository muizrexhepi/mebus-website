"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const PartnersSection = () => {
  const { t } = useTranslation();

  const partners = [
    { name: "Hak Bus", src: "/assets/images/hakbus.png" },
    { name: "Ido Tours", src: "/assets/images/idotours.png" },
    { name: "Kabashi Tours", src: "/assets/images/kabashilogo.png" },
    { name: "Euro Turist", src: "/assets/images/euroturist.png" },
    { name: "Nasir Tours", src: "/assets/images/nasiri.png" },
    { name: "Bashkim Tours", src: "/assets/images/bashkimi.png" },
    { name: "Hisar Turizam", src: "/assets/images/hisar.png" },
    { name: "Amr Tours", src: "/assets/images/amr.png" },
  ];

  return (
    <div className="w-full bg-primary-bg/5 py-12">
      <div className="max-w-6xl mx-auto paddingX">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6 max-w-xl">
            <h2 className="text-left text-2xl sm:text-4xl font-medium text-primary-bg">
              {t("partnersSection.heading")}
            </h2>
            <p className="text-gray-600 text-base">
              {t("partnersSection.description")}
            </p>
            <button className="button-gradient text-white font-medium text-sm px-8 py-3 rounded-lg transition-colors">
              {t("partnersSection.buttonText")}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center group"
              >
                <div className="relative w-full aspect-[3/1]">
                  <Image
                    width={300}
                    height={120}
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    className="object-contain w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-primary-bg/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
