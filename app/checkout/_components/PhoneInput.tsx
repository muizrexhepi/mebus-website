"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import useIsMobile from "@/components/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { countries, Country } from "@/constants/country";
import CountrySelectDialog from "@/components/dialogs/country-select-dialog";

interface PhoneInputProps {
  label: string;
  placeholder: string;
  value: string;
  countryCode: string;
  onChange: (value: string) => void;
  onCountryChange: (country: Country) => void;
  required?: boolean;
  error?: string;
  onBlur?: () => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  placeholder,
  value,
  countryCode,
  onChange,
  onCountryChange,
  required = false,
  error,
  onBlur,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry =
    countries.find((c) => c.dialCode === countryCode) || countries[0];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/[^\d\s\-\(\)]/g, "");
    onChange(sanitizedValue);
  };

  const handleCountrySelect = (country: Country) => {
    onCountryChange(country);
    setIsDropdownOpen(false);
    setIsDialogOpen(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const CountryButton = ({ className }: { className?: string }) => (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "flex items-center gap-2 px-3 py-2 h-auto rounded-l-lg hover:bg-gray-50",
        className
      )}
      onClick={() => {
        if (isMobile) {
          setIsDialogOpen(true);
        } else {
          setIsDropdownOpen(!isDropdownOpen);
        }
      }}
    >
      <span className="text-lg">{selectedCountry.flag}</span>
      <span className="text-sm font-medium text-gray-700">
        {selectedCountry.dialCode}
      </span>
      <ChevronDown className="h-4 w-4 text-gray-500" />
    </Button>
  );

  if (isMobile) {
    return (
      <div className="space-y-1">
        <p className="font-normal text-sm text-black/70">{label}</p>
        <div
          className={cn(
            "flex items-center h-12 rounded-lg bg-primary-bg/5 border-none transition-colors",
            error ? "border-none bg-red-50" : "border-transparent "
          )}
        >
          <CountryButton />
          <div className="w-px h-6 bg-gray-200" />
          <Input
            ref={inputRef}
            type="tel"
            placeholder={placeholder}
            value={value}
            onChange={handlePhoneChange}
            onBlur={onBlur}
            required={required}
            className="flex-1 border-none bg-transparent h-12 rounded-none rounded-r-lg px-3 focus-visible:ring-0 text-sm placeholder:text-muted-foreground"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <CountrySelectDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSelect={handleCountrySelect}
        />
      </div>
    );
  }

  return (
    <div className="space-y-1 relative" ref={dropdownRef}>
      <p className="font-normal text-sm text-black/70">{label}</p>
      <div
        className={cn(
          "flex items-center h-12 rounded-lg bg-primary-bg/5 border-none transition-colors overflow-hidden relative",
          error ? "border-red-500 bg-red-50" : "border-transparent"
        )}
      >
        <CountryButton />
        <div className="w-px h-6 bg-gray-200" />
        <Input
          ref={inputRef}
          type="tel"
          placeholder={placeholder}
          value={value}
          onChange={handlePhoneChange}
          onBlur={onBlur}
          required={required}
          className="flex-1 border-none bg-transparent h-12 rounded-none rounded-r-lg px-3 font-normal focus-visible:ring-0 text-sm placeholder:text-muted-foreground"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {isDropdownOpen && (
        <div className="absolute top-14 w-[130%] bg-background shadow-lg z-20 left-0 mt-2 rounded-lg border border-border animate-in fade-in-0 zoom-in-95">
          <div className="max-h-80 overflow-y-auto overscroll-contain">
            <div className="bg-muted px-4 py-2 border-b border-border">
              <h3 className="font-medium text-sm text-foreground/70">
                {t("countrySelect.allCountries", "All Countries")}
              </h3>
            </div>
            {countries.map((country) => (
              <Button
                key={country.code}
                variant="ghost"
                className="w-full justify-start text-left h-12 px-4 hover:bg-accent hover:text-accent-foreground rounded-none"
                onClick={() => handleCountrySelect(country)}
                type="button"
              >
                <span className="text-lg mr-2">{country.flag}</span>
                <span className="flex-1 text-sm">{country.name}</span>
                <span className="text-xs text-gray-500">
                  {country.dialCode}
                </span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
