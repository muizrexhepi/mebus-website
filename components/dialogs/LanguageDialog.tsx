"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  getLanguageFromCookies,
  setLanguageCookie,
  type SupportedLanguage,
} from "@/lib/i18next";

export const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
  { code: "mk", label: "Македонски" },
  { code: "al", label: "Shqip" },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>("en");

  useEffect(() => {
    const cookieLanguage = getLanguageFromCookies();
    setSelectedLanguage(cookieLanguage);
  }, []);

  const handleLanguageChange = async (languageCode: SupportedLanguage) => {
    setSelectedLanguage(languageCode);
    setLanguageCookie(languageCode);
    await i18n.changeLanguage(languageCode);
  };

  const selectedLang = languages.find((lang) => lang.code === selectedLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-2">
          <Image
            src={`/assets/flags/${selectedLang?.code}.svg`}
            alt={selectedLang?.label || ""}
            width={24}
            height={24}
            className="rounded-sm"
          />
          <ChevronDown size={20} color="grey" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 rounded-lg mt-2 px-0">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleLanguageChange(lang.code as SupportedLanguage)}
          >
            <div className="flex items-center justify-between w-full px-2">
              <div className="flex items-center gap-2">
                <Check
                  className={cn("size-4", {
                    invisible: selectedLanguage !== lang.code,
                  })}
                />
                <span>{lang.label}</span>
              </div>
              <Image
                src={`/assets/flags/${lang.code}.svg`}
                alt={lang.label}
                width={24}
                height={24}
                className="rounded-sm"
              />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
