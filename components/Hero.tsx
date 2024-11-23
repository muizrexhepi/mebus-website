"use client";

import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import SearchBlock from "./SearchBlock";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { handleOauthCallback } from "@/actions/oauth";

const Hero = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("oauth") == "true") {
      handleOauthCallback();
    } else {
      console.log("falch");
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col justify-between gap-12 pb-12 pt-8 relative paddingX bg-gradient-to-tr from-primary-bg/95 via-primary-bg to-primary-bg/95 z-[0]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-white/5 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-xl" />
      </div>

      {/* <div className="py-6 absolute top-0 left-0 w-full"> */}
      <Navbar className="max-w-6xl mx-auto z-20" />
      {/* </div> */}
      <div className="space-y-4 sm:space-y-8 sm:py-0 w-full max-w-6xl md:mx-auto z-20">
        {/* <h1 className="text-3xl sm:text-4xl font-medium text-white hidden sm:block">
          {t("hero.title")}
        </h1> */}
        <SearchBlock />
      </div>
    </div>
  );
};

export default Hero;
