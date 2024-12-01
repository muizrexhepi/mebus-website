"use client";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/navbar/Navbar";
import SearchBlock from "../../app/search/_components/SearchBlock";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { handleOauthCallback } from "@/actions/oauth";
import Image from "next/image";

const Hero = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("oauth") === "true") {
      handleOauthCallback();
    }
  }, [searchParams]);

  return (
    <div className="relative flex flex-col justify-between pb-12">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/assets/images/mainBG.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-bg/90 via-primary-bg/80 to-primary-bg/95" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full">
        <div className="max-w-7xl mx-auto paddingX">
          <Navbar className="py-4" />

          <div className="space-y-6 sm:pt-16 md:pt-20">
            <div className="max-w-3xl hidden sm:block">
              <h1 className="text-4xl sm:text-5xl font-medium text-white mb-2">
                {t("hero.title")}
                <span className="text-primary-accent text-6xl">.</span>
              </h1>
            </div>

            <div className="mt-8 relative z-30">
              <SearchBlock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
