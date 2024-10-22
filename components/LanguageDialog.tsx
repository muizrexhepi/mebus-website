import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "al", label: "Albanian" },
  { code: "mk", label: "Macedonian" },
  { code: "it", label: "Italian" },
  { code: "es", label: "Spanish" },
];

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("language") || "en"
  );

  const handleLanguageSelect = (language: { code: string; label: string }) => {
    localStorage.setItem("language", language.code);
    i18n.changeLanguage(language.code);
    setSelectedLanguage(language.code);
    console.log(`Selected language: ${language.label}`);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="Select language"
            variant={"ghost"}
            className="flex items-center gap-1 rounded-full hover:bg-white/20 px-2.5 transition-colors cursor-pointer"
          >
            <Globe className="w-5 h-5" color="white" />
            <h1 className="uppercase text-white font-medium text-base">
              {selectedLanguage}
            </h1>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageSelect(language)}
            >
              {language.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageDropdown;
