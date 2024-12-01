"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrency } from "../providers/currency-provider";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "al", label: "Shqip" },
  { code: "mk", label: "Македонски" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
];

const currencies = [
  { code: "EUR", symbol: "€", label: "Euro", rate: 1 },
  { code: "USD", symbol: "$", label: "US Dollar", rate: 1.12 },
  { code: "GBP", symbol: "£", label: "British Pound", rate: 0.86 },
  { code: "JPY", symbol: "¥", label: "Japanese Yen", rate: 157.61 },
  { code: "CHF", symbol: "Fr", label: "Swiss Franc", rate: 0.96 },
  { code: "ALL", symbol: "L", label: "Albanian Lek", rate: 101.15 },
  { code: "MKD", symbol: "ден", label: "Macedonian Denar", rate: 61.62 },
];

const LanguageCurrencySelector = () => {
  const { i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("language", selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);

  const handleCurrencyChange = (currencyCode: string) => {
    const newCurrency = currencies.find((c) => c.code === currencyCode);
    if (newCurrency) {
      setCurrency(newCurrency);
      localStorage.setItem("currency", currencyCode);
    }
  };

  const handleSave = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 rounded-full hover:bg-primary/10"
        >
          <Globe className="h-5 w-5" color="white" />
          <span className="font-medium text-white">
            {selectedLanguage.toUpperCase()} | {currency.code}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-screen sm:h-fit flex flex-col justify-center items-center">
        <DialogHeader>
          <DialogTitle className="font-medium text-xl">
            Language and Currency
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="language" className="text-right font-medium">
              Language
            </label>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger className="col-span-3 bg-primary-bg/5 border-none">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="currency" className="text-right font-medium">
              Currency
            </label>
            <Select value={currency.code} onValueChange={handleCurrencyChange}>
              <SelectTrigger className="col-span-3 bg-primary-bg/5 border-none">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.label} ({curr.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              variant={"primary"}
              className="w-full sm:w-auto"
            >
              <Check className="mr-2 h-4 w-4" /> Save Preferences
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageCurrencySelector;
