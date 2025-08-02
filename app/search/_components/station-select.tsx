"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import type { Station } from "@/models/station";
import useSearchStore from "@/store";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CitySelectDialog from "@/components/dialogs/CitySelectDialog";
import useIsMobile from "@/components/hooks/use-mobile";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { HiMapPin } from "react-icons/hi2";
import { IoMdLocate } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

// Levenshtein distance function
const levenshteinDistance = (str1: string, str2: string) => {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return track[str2.length][str1.length];
};

interface CustomSelectProps {
  stations?: Station[];
  departure?: string;
  updateUrl?: boolean;
  hasError?: boolean;
  showError?: boolean;
}

const StationSelect: React.FC<CustomSelectProps> = ({
  stations = [],
  departure,
  updateUrl = false,
  hasError = false,
  showError = false,
}) => {
  const { setFrom, setTo, setFromCity, setToCity, from, to, fromCity, toCity } =
    useSearchStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [isTouched, setIsTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    if (departure === "from" && fromCity) {
      setSearchTerm(fromCity);
    } else if (departure === "to" && toCity) {
      setSearchTerm(toCity);
    }
  }, [departure, fromCity, toCity]);

  // Filter stations based on search term using Levenshtein distance
  useEffect(() => {
    if (!searchTerm) {
      setFilteredStations(stations);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const stationsWithDistance = stations.map((station) => {
      const cityNameLower = station.city.toLowerCase();
      const distance = levenshteinDistance(searchTermLower, cityNameLower);
      return { station, distance, cityNameLower };
    });

    const maxDistance = Math.min(3, searchTermLower.length);
    const sortedFilteredStations = stationsWithDistance
      .filter(
        (item) =>
          item.distance <= maxDistance ||
          item.cityNameLower.includes(searchTermLower)
      )
      .sort((a, b) => a.distance - b.distance)
      .map((item) => item.station);

    const exactMatches = stations.filter((station) =>
      station.city.toLowerCase().includes(searchTermLower)
    );

    const result = [...exactMatches];
    for (const station of sortedFilteredStations) {
      if (!result.some((s) => s._id === station._id)) {
        result.push(station);
      }
    }

    setFilteredStations(result);
  }, [searchTerm, stations]);

  const handleSelect = useCallback(
    (station: Station) => {
      const value = station._id;
      const label = station.city;
      const name = station.name;

      setSearchTerm(label);
      setIsTouched(true);

      if (departure === "from") {
        setFromCity(label);
        setFrom(value!);
      } else {
        setToCity(label);
        setTo(value!);
      }

      updateRecentStations(
        departure === "from" ? "recentFromStations" : "recentToStations",
        {
          _id: value!,
          city: label,
          name: name,
        }
      );

      setOpenOptions(false);

      if (updateUrl) {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set(
          departure === "from" ? "departureStation" : "arrivalStation",
          value!
        );

        const pathParts = pathname.split("/");
        if (departure === "from") {
          pathParts[2] = `${label.toLowerCase()}-${pathParts[2].split("-")[1]}`;
        } else {
          pathParts[2] = `${pathParts[2].split("-")[0]}-${label.toLowerCase()}`;
        }

        const newPathname = pathParts.join("/");
        const newUrl = `${newPathname}?${currentParams.toString()}`;
        router.push(newUrl);
      }
    },
    [
      departure,
      setFromCity,
      setFrom,
      setToCity,
      setTo,
      updateUrl,
      searchParams,
      pathname,
      router,
    ]
  );

  const handleFocus = () => {
    setOpenOptions(true);
    setIsTouched(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOpenOptions(false);
    }, 200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsTouched(true);
  };

  const updateRecentStations = (
    cookieName: string,
    newStation: { _id: string; city: string; name: string }
  ) => {
    const recentStations = JSON.parse(Cookies.get(cookieName) || "[]");
    const updatedRecentStations = [
      newStation,
      ...recentStations.filter(
        (station: { _id: string }) => station._id !== newStation._id
      ),
    ].slice(0, 5);

    Cookies.set(cookieName, JSON.stringify(updatedRecentStations), {
      expires: 7,
    });
  };

  const handleDialogSelect = (station: Station) => {
    handleSelect(station);
    setIsDialogOpen(false);
  };

  const recentStations = JSON.parse(
    Cookies.get(
      departure === "from" ? "recentFromStations" : "recentToStations"
    ) || "[]"
  );

  const placeholder =
    departure === "from"
      ? t("searchForm.fromPlaceholder")
      : t("searchForm.toPlaceholder");
  const shouldShowError = hasError && isTouched;

  if (isMobile) {
    return (
      <>
        <div className="space-y-1">
          <Button
            variant="outline"
            className={cn(
              "w-full h-12 flex items-center justify-start bg-primary-bg/5 rounded-lg border-2 ring-0 text-base transition-colors",
              shouldShowError
                ? "border-red-500 bg-red-50"
                : "border-transparent hover:border-gray-200"
            )}
            onClick={() => setIsDialogOpen(true)}
          >
            {departure === "from" ? (
              <IoMdLocate className="size-4 mr-2 text-primary-accent" />
            ) : (
              <HiMapPin className="size-4 mr-2 text-primary-accent" />
            )}
            <span
              className={cn(
                "capitalize font-normal",
                !searchTerm && "text-muted-foreground"
              )}
            >
              {searchTerm || placeholder}
            </span>
          </Button>
          {shouldShowError && showError && (
            <p className="text-red-500 text-xs animate-in slide-in-from-top-1">
              {departure === "from"
                ? t("validation.fromRequired", "Please select departure city")
                : t("validation.toRequired", "Please select arrival city")}
            </p>
          )}
        </div>
        <CitySelectDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          stations={stations}
          departure={departure}
          onSelect={handleDialogSelect}
        />
      </>
    );
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center h-12 rounded-lg bg-primary-bg/5 px-4 border-2 transition-colors",
          shouldShowError
            ? "border-red-500 bg-red-50"
            : "border-transparent hover:border-gray-200 focus-within:border-primary-accent"
        )}
      >
        {departure === "from" ? (
          <IoMdLocate className="size-4 mr-2 shrink-0 text-primary-accent" />
        ) : (
          <HiMapPin className="size-4 mr-2 shrink-0 text-primary-accent" />
        )}
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          className="flex-1 rounded-lg h-12 border-none ring-0 bg-transparent text-base capitalize px-0 placeholder:text-muted-foreground"
        />
      </div>

      {openOptions && (
        <div className="absolute top-14 w-[130%] bg-background shadow-lg z-20 left-0 mt-2 rounded-lg border border-border animate-in fade-in-0 zoom-in-95">
          <div className="max-h-80 overflow-y-auto overscroll-contain">
            {searchTerm === "" ? (
              <>
                {recentStations.length > 0 && (
                  <>
                    <div className="bg-muted px-4 py-2 border-b border-border">
                      <h3 className="font-medium text-sm text-foreground/70">
                        {t("searchForm.recentSearches")}
                      </h3>
                    </div>
                    {recentStations.map((station: Station) => (
                      <Button
                        key={station._id}
                        variant="ghost"
                        className="w-full justify-start text-left h-15 px-4 hover:bg-accent hover:text-accent-foreground rounded-none"
                        onClick={() => handleSelect(station)}
                        type="button"
                      >
                        {departure === "from" ? (
                          <IoMdLocate className="size-4 mr-2 shrink-0 text-primary-accent" />
                        ) : (
                          <HiMapPin className="size-4 mr-2 shrink-0 text-primary-accent" />
                        )}
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="capitalize font-medium text-sm">
                            {station.city}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {station.name}
                          </span>
                        </div>
                      </Button>
                    ))}
                    <div className="border-t border-border" />
                  </>
                )}

                {(() => {
                  const stationsByCountry = stations.reduce(
                    (acc: Record<string, Station[]>, station: Station) => {
                      const country = station.country || "Other";
                      if (!acc[country]) {
                        acc[country] = [];
                      }
                      acc[country].push(station);
                      return acc;
                    },
                    {}
                  );

                  const sortedCountries = Object.keys(stationsByCountry).sort();

                  return sortedCountries.map((country) => (
                    <React.Fragment key={country}>
                      <div className="bg-muted px-4 py-2 border-b border-border">
                        <h3 className="font-medium text-sm text-foreground/70 capitalize">
                          {country}
                        </h3>
                      </div>
                      {stationsByCountry[country].map((station: Station) => (
                        <Button
                          key={station._id}
                          variant="ghost"
                          className="w-full justify-start text-left h-15 px-4 hover:bg-accent hover:text-accent-foreground rounded-none"
                          onClick={() => handleSelect(station)}
                          type="button"
                        >
                          {departure === "from" ? (
                            <IoMdLocate className="size-4 mr-2 shrink-0 text-primary-accent" />
                          ) : (
                            <HiMapPin className="size-4 mr-2 shrink-0 text-primary-accent" />
                          )}
                          <div className="flex flex-col items-start gap-0.5">
                            <span className="capitalize font-medium text-sm">
                              {station.city}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {station.name}
                            </span>
                          </div>
                        </Button>
                      ))}
                    </React.Fragment>
                  ));
                })()}
              </>
            ) : (
              <>
                <div className="bg-muted px-4 py-2 border-b border-border">
                  <h3 className="font-medium text-sm text-foreground/70">
                    {t("searchForm.searchResult")}
                  </h3>
                </div>
                {filteredStations.length > 0 ? (
                  filteredStations.map((station: Station) => (
                    <Button
                      key={station._id}
                      variant="ghost"
                      className="w-full justify-start text-left h-15 px-4 hover:bg-accent hover:text-accent-foreground rounded-none"
                      onClick={() => handleSelect(station)}
                      type="button"
                    >
                      {departure === "from" ? (
                        <IoMdLocate className="size-4 mr-2 shrink-0 text-primary-accent" />
                      ) : (
                        <HiMapPin className="size-4 mr-2 shrink-0 text-primary-accent" />
                      )}
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="capitalize font-medium text-sm">
                          {station.city}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {station.name}
                        </span>
                      </div>
                    </Button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-muted-foreground text-sm">
                    {t("searchForm.noResults", "No results found")}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StationSelect;
