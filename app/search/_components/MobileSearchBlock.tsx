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
import { MobileDateSelectBlock } from "./MobileDateSelectBlock";

export const MobileSearchBlock = () => {
  const { fromCity, toCity } = useSearchStore();

  return (
    <div className="w-full py-3 sticky top-0 bg-white z-10 md:hidden paddingX border-b">
      {/* <Drawer> */}
      <div className="flex justify-between items-center gap-4">
        <Link href={"/"} className="">
          <ChevronLeft color="black" size={25} />
        </Link>
        {/* <DrawerTrigger className="flex flex-col items-center gap-0"> */}
        <div className="flex items-center text-black gap-2 font-medium text-base">
          <span className="capitalize">
            {fromCity} <span className="lowercase">to</span> {toCity}
          </span>
        </div>
        {/* </DrawerTrigger> */}
        <Edit3 size={20} color="black" className="invisible" />
        {/* <DrawerTrigger>
          </DrawerTrigger> */}
      </div>
      {/* <DrawerContent className="px-4 py-8 max-h-[50vh] overflow-y-auto">
          <DrawerClose className="absolute top-4 right-4">
            <X color="gray" />
          </DrawerClose>
          <div className="h-full">
            <SearchForm updateUrl={false} />
          </div>
        </DrawerContent> */}
      {/* </Drawer> */}
      <MobileDateSelectBlock />
    </div>
  );
};
