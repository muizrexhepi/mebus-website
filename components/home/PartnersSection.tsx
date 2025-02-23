"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";

const partners = [
  { name: "Hak Bus", src: "/assets/images/hakbus.png" },
  { name: "Ido Tours", src: "/assets/images/idotours.png" },
  { name: "Kabashi Tours", src: "/assets/images/kabashilogo.png" },
  { name: "Tosa Reiserburo", src: "/assets/images/tosa.png" },
  // { name: "Euro Turist", src: "/assets/images/euroturist.png" },
  // { name: "Nasir Tours", src: "/assets/images/nasiri.png" },
  // { name: "Bashkim Tours", src: "/assets/images/bashkimi.png" },
  // { name: "Hisar Turizam", src: "/assets/images/hisar.png" },
];

const PartnersSection = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto paddingX">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex px-4 py-1 bg-primary/5 rounded-full">
              <span className="text-sm font-medium text-primary">
                {t("partnersSection.tag", "Trusted Partners")}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-primary-bg">
              {t("partnersSection.heading")}
            </h1>
            <p className="text-lg leading-relaxed text-gray-600 max-w-xl">
              {t("partnersSection.description")}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">100+</span> bus
                operators trust us
              </p>
            </div>
          </div>

          <div className="flex-1 w-full p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="relative aspect-[3/2] transition-transform hover:scale-105 hover:filter-none group"
                >
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 group-hover:filter-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
