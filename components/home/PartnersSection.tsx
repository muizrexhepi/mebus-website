"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import Link from "next/link";

const partners = [
  { name: "Hak Bus", src: "/assets/images/hakbus.png" },
  { name: "Ido Tours", src: "/assets/images/idotours.png" },
  { name: "Kabashi Tours", src: "/assets/images/kabashilogo.png" },
  { name: "Tosa Reiserburo", src: "/assets/images/tosa.png" },
  { name: "Euro Turist", src: "/assets/images/euroturist.png" },
  { name: "Euro Bus", src: "/assets/images/eurobus.png" },
  { name: "Hafet Tours", src: "/assets/images/hafet.jpg" },
  { name: "Hisar Turizam", src: "/assets/images/hisar.png" },
];

const PartnersSection = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-normal text-primary leading-tight">
              {t("partnersSection.heading")}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-xl">
              {t("partnersSection.description")}
            </p>
            <Button variant={"primary"} asChild>
              <Link href={"/bus"}>{t("partnersSection.buttonText")}</Link>
            </Button>
          </div>

          {/* Right - Partner Logos */}
          <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="relative h-16 sm:h-20 flex items-center justify-center"
                >
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain p-2"
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
