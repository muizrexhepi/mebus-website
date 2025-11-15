"use client";

import Image from "next/image";
import { SearchForm } from "../forms/SearchForm";
const LanguageSelector = dynamic(() => import("../dialogs/LanguageDialog"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const MobileHero = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative flex flex-col justify-between md:pb-20 bg-primary-bg/5 h-screen md:hidden">
        <div className="relative z-20 w-full">
          <div className="w-full relative aspect-[4/3] h-48">
            <Image
              src="/assets/images/bgmobile.webp"
              alt="Bus and Train Illustration"
              fill
              priority
              sizes="100vw"
              className="object-cover object-bottom brightness-75"
            />
          </div>
          <div className="absolute top-36 left-4 z-30">
            <div>
              <h1
                className="text-white text-2xl leading-[1.1em] font-semibold drop-shadow-lg"
                // style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
              >
                {t("hero.title")}
              </h1>
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-white/70 pt-2 px-2 border-black/10 border rounded-xl">
            <LanguageSelector />
          </div>

          <div className="p-4">
            <SearchForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHero;
