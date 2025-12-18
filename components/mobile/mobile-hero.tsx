"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { SearchFormSkeleton } from "./search-form-skeleton";

const SearchForm = dynamic(
  () => import("../forms/SearchForm").then((mod) => mod.SearchForm),
  {
    ssr: false,
    loading: () => <SearchFormSkeleton />,
  }
);

const MobileHero = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative flex flex-col justify-between md:pb-20 bg-[#f9fafb] md:hidden">
        <div className="relative z-20 w-full">
          <div className="w-full relative aspect-[4/3] h-48">
            <Image
              src="/assets/images/bgmobile.webp"
              fill
              alt="Mobile Hero Background"
              priority
              sizes="(max-width: 768px) 100vw"
              quality={70}
              className="object-cover object-bottom"
            />
          </div>
          <div className="absolute top-36 left-4 z-30">
            <div>
              <h1 className="text-white text-2xl leading-[1.1em] font-semibold drop-shadow-lg">
                {t("hero.title")}
              </h1>
            </div>
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
