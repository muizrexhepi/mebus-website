"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { countries, Country, searchCountries } from "@/constants/country";

interface CountrySelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
}

const CountrySelectDialog: React.FC<CountrySelectDialogProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(countries);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  // Autofocus when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Update filtered countries when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCountries(countries);
      return;
    }

    const filtered = searchCountries(searchTerm);
    setFilteredCountries(filtered);
  }, [searchTerm]);

  const handleCountrySelect = (country: Country) => {
    onSelect(country);
    setSearchTerm("");
  };

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        hideCloseButton={true}
        className="sm:max-w-[425px] h-full sm:h-[90vh] max-h-[100vh] flex flex-col p-0 gap-0 rounded-none sm:rounded-2xl"
      >
        {/* Header */}
        <DialogHeader className="bg-gray-50 px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-10 w-10 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <DialogTitle className="text-lg font-medium text-gray-900">
              {t("countrySelect.selectCountry", "Select Country")}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Search Bar */}
        <div className="px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              ref={inputRef}
              type="text"
              placeholder={t(
                "countrySelect.searchPlaceholder",
                "Search countries or dial codes..."
              )}
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="pb-6">
              <div className="px-4 py-6">
                <h3 className="font-medium text-lg text-gray-900 mb-4">
                  {t("countrySelect.searchResults", "Search Results")}
                </h3>

                <div className="space-y-0">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <div key={country.code}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left p-0 h-auto py-4 hover:bg-gray-50 rounded-none"
                          onClick={() => handleCountrySelect(country)}
                          type="button"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{country.flag}</span>
                            <div className="flex flex-col items-start">
                              <span className="text-lg font-normal text-black">
                                {country.name}
                              </span>
                              <span className="text-sm text-gray-700 font-normal">
                                {country.dialCode}
                              </span>
                            </div>
                          </div>
                        </Button>
                        <div className="border-b border-gray-200" />
                      </div>
                    ))
                  ) : searchTerm !== "" ? (
                    <div className="py-12 text-center">
                      <p className="text-gray-500 text-base">
                        {t("countrySelect.noResults", "No results found")}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {t(
                          "countrySelect.tryDifferentKeywords",
                          "Try searching with different keywords"
                        )}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CountrySelectDialog;
