"use client";

import React from "react";
import useSearchStore from "@/store";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import { ArrowRight, ChevronLeft, X } from "lucide-react";

import { SearchForm } from "@/components/forms/SearchForm";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const MobileSearchBlock = () => {
  const { fromCity, toCity } = useSearchStore();
  const { t } = useTranslation();

  return (
    <div className="w-full py-4 sticky top-0 bg-white z-10 md:hidden paddingX border-b">
      <div className="flex justify-between items-center gap-4">
        <Link href={"/"} className="p-2 rounded-lg border">
          <ChevronLeft color="black" size={20} />
        </Link>
        <Drawer>
          <DrawerTrigger className="flex flex-1 justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="font-medium text-black capitalize">{fromCity}</p>
              <ArrowRight size={20} />
              <p className="font-medium text-black capitalize">{toCity}</p>
            </div>
            <button className="py-2 px-3 rounded-lg border flex items-center gap-2">
              <span>{t("personalInfo.edit")}</span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="px-4 py-8">
            <DrawerClose className="absolute top-4 right-4">
              <X color="gray" />
            </DrawerClose>
            <SearchForm updateUrl={false} />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
