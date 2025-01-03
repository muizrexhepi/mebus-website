"use client";

import React from "react";
import useSearchStore from "@/store";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { ChevronLeft, Edit3, X } from "lucide-react";
import { SearchForm } from "@/components/forms/SearchForm";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { format, parse, isValid } from "date-fns";
import { MobileDateSelectBlock } from "./MobileDateSelectBlock";
import { LOCALE_MAP } from "@/lib/data";
import i18n from "@/lib/i18next";
import { enUS } from "date-fns/locale";

export const MobileSearchBlock = () => {
  const { fromCity, toCity, departureDate } = useSearchStore();
  const { t } = useTranslation();
  const currentLocale =
    LOCALE_MAP[i18n.language as keyof typeof LOCALE_MAP] || enUS;

  const formattedDate = React.useMemo(() => {
    if (!departureDate) return null;

    const parsedDate = parse(departureDate, "dd-MM-yyyy", new Date());
    return isValid(parsedDate)
      ? format(parsedDate, "E, LLL dd", { locale: currentLocale })
      : null;
  }, [departureDate]);

  return (
    <div className="w-full py-3 sticky top-0 bg-white z-10 md:hidden paddingX border-b">
      <Drawer>
        <div className="flex justify-between items-center gap-4">
          <Link href={"/"} className="">
            <ChevronLeft color="black" size={25} />
          </Link>
          <DrawerTrigger className="flex flex-col items-center gap-0">
            <div className="flex items-center text-black gap-2 font-medium text-sm">
              <span className="capitalize">
                {fromCity} <span className="lowercase">to</span> {toCity}
              </span>
            </div>
            {formattedDate && (
              <span className="text-sm font-medium text-black/60">
                {formattedDate}
              </span>
            )}
          </DrawerTrigger>
          <DrawerTrigger>
            <Edit3 size={20} color="black" />
          </DrawerTrigger>
        </div>
        <DrawerContent className="px-4 py-8 h-[50vh] max-h-[50vh] overflow-y-auto">
          <DrawerClose className="absolute top-4 right-4">
            <X color="gray" />
          </DrawerClose>
          <div className="h-full">
            <SearchForm updateUrl={false} />
          </div>
        </DrawerContent>
      </Drawer>
      <MobileDateSelectBlock />
    </div>
  );
};
