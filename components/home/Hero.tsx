"use client";

import { useTranslation } from "react-i18next";
import SearchBlock from "../../app/search/_components/SearchBlock";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { handleOauthCallback } from "@/actions/oauth";
import { Bus, MapPin } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("oauth") === "true") {
      console.log("true");
      handleOauthCallback();
    }
  }, [searchParams]);

  return (
    <div className="relative flex flex-col justify-between pb-12 ">
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-orange-100 to-red-100 blur-3xl opacity-20" />
        <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 blur-3xl opacity-20" />
        <Bus className="absolute bottom-10 left-10 w-24 h-24 text-gray-200 opacity-30" />
        <MapPin className="absolute top-20 right-10 w-16 h-16 text-gray-200 opacity-30" />
      </div> */}

      <div className="relative z-20 w-full">
        <div className="max-w-6xl mx-auto paddingX">
          <div className="space-y-6 pt-8 sm:pt-16 md:pt-20">
            <div className="max-w-4xl">
              <h1 className="text-left text-2xl sm:text-4xl font-medium text-transparent button-gradient bg-clip-text mb-1 sm:mb-2">
                {t("hero.title")}
              </h1>
              <p className="text-left text-sm sm:text-base text-black/70 max-w-2xl">
                Book your bus tickets for a comfortable journey
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
