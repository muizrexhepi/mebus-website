"use client";

import SearchBlock from "@/app/search/_components/SearchBlock";
import { Bus, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col justify-between md:pb-20 bg-[#f9fafb]">
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-6xl mx-auto paddingX">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-red-100 to-orange-100 blur-3xl opacity-30" />
        <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 blur-3xl opacity-30" />
        <Bus className="absolute -bottom-6 left-10 w-32 h-32 text-gray-200 opacity-40 transform -rotate-12" />
        <MapPin className="absolute top-20 right-10 w-20 h-20 text-gray-200 opacity-40 transform rotate-12" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </div> */}
      <div className="relative z-20 w-full">
        <div className="max-w-6xl mx-auto paddingX">
          <div className="space-y-8 pt-8 sm:pt-16 md:pt-20">
            <div className="max-w-4xl space-y-2">
              <h1 className="text-left text-3xl sm:text-4xl text-primary-accent font-normal">
                {t("hero.title")}
              </h1>
              <p className="text-left text-base sm:text-lg text-black/60 max-w-2xl">
                {t("hero.desc")}
              </p>
            </div>

            <SearchBlock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
