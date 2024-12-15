"use client";

import { useTranslation } from "react-i18next";
import Navbar from "@/components/navbar/Navbar";
import SearchBlock from "../../app/search/_components/SearchBlock";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { handleOauthCallback } from "@/actions/oauth";

const Hero = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("oauth") === "true") {
      handleOauthCallback();
    }
  }, [searchParams]);

  return (
    <div className="relative flex flex-col justify-between pb-12 bg-gradient-to-b from-primary-bg/85 to-primary-bg/90">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#f3f4f6"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-primary-accent/40 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-20 h-20 bg-primary-accent/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-primary-accent/40 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-20 w-full">
        <div className="max-w-6xl mx-auto paddingX">
          <Navbar className="py-4" />

          <div className="space-y-6 sm:pt-16 md:pt-20">
            <div className="max-w-4xl hidden sm:block">
              <h1 className="text-4xl sm:text-5xl font-medium text-white mb-4">
                {t("hero.title")} <span className="text-primary-accent">.</span>
              </h1>
            </div>

            <SearchBlock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
