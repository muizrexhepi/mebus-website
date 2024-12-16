"use client";

import { useTranslation } from "react-i18next";
import Navbar from "@/components/navbar/Navbar";
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
      handleOauthCallback();
    }
  }, [searchParams]);

  return (
    <div className="relative flex flex-col justify-between pb-12 ">
      {/* <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 200L48 185.2C96 170.3 192 140.7 288 133.3C384 126 480 141 576 160C672 179 768 200 864 192.7C960 185.3 1056 149.7 1152 138.7C1248 127.7 1344 141.3 1392 148.2L1440 155V200H1392C1344 200 1248 200 1152 200C1056 200 960 200 864 200C768 200 672 200 576 200C480 200 384 200 288 200C192 200 96 200 48 200H0Z"
            fill="#f3f4f6"
          />
        </svg>
      </div> */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-orange-100 to-red-100 blur-3xl opacity-20" />
        <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 blur-3xl opacity-20" />
        <Bus className="absolute bottom-10 left-10 w-24 h-24 text-gray-200 opacity-30" />
        <MapPin className="absolute top-20 right-10 w-16 h-16 text-gray-200 opacity-30" />
      </div>

      <div className="relative z-20 w-full">
        <div className="max-w-6xl mx-auto paddingX">
          <Navbar className="py-4" />

          <div className="space-y-6 pt-8 sm:pt-16 md:pt-20">
            <div className="max-w-4xl">
              <h1 className="text-center sm:text-left text-2xl sm:text-4xl sm:font-medium text-transparent button-gradient bg-clip-text mb-2">
                {t("hero.title")}
              </h1>
              <p className="text-center sm:text-left text-sm sm:text-base text-black/70 max-w-2xl">
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
