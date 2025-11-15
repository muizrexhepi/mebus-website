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
    <section className="w-full py-16 sm:py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-12 space-y-2">
          <h2 className="text-left text-3xl font-normal text-primary">
            {t("partnersSection.heading")}
          </h2>
          <p className="text-left text-sm sm:text-base text-black/60 max-w-2xl">
            {t("partnersSection.description")}
          </p>
        </div>

        {/* Partner Logos Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className="group relative bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-16 flex items-center justify-center">
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain p-2 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        {/* <div>
          <Button variant={"primary"} asChild>
            <Link href={"/bus"}>{t("partnersSection.buttonText")}</Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default PartnersSection;
