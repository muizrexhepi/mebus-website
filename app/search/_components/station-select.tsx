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

// Levenshtein distance calculation
const levenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i += 1) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= b.length; j += 1) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }

  return matrix[b.length][a.length];
};

// Improved search algorithm
const calculateSearchScore = (station: Station, searchTerm: string): number => {
  const searchLower = searchTerm.toLowerCase().trim();
  const cityLower = station.city.toLowerCase();
  const countryLower = station.country?.toLowerCase() || "";
  const nameLower = station.name.toLowerCase();

  if (!searchLower) return 0;

  const normalize = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, "")
      .trim();
  };

  const normalizedSearch = normalize(searchLower);
  const normalizedCity = normalize(cityLower);
  const normalizedCountry = normalize(countryLower);
  const normalizedName = normalize(nameLower);

  let bestScore = 0;

  const candidates = [
    { text: cityLower, normalized: normalizedCity, weight: 1.2 },
    { text: nameLower, normalized: normalizedName, weight: 1.0 },
    { text: countryLower, normalized: normalizedCountry, weight: 0.8 },
  ];

  for (const candidate of candidates) {
    if (!candidate.text) continue;

    let score = 0;

    if (
      candidate.text === searchLower ||
      candidate.normalized === normalizedSearch
    ) {
      score = 1000;
    } else if (
      candidate.text.startsWith(searchLower) ||
      candidate.normalized.startsWith(normalizedSearch)
    ) {
      score = 900 - searchLower.length;
    } else if (
      candidate.text.includes(" " + searchLower) ||
      candidate.normalized.includes(" " + normalizedSearch)
    ) {
      score = 800;
    } else if (
      candidate.text.includes(searchLower) ||
      candidate.normalized.includes(normalizedSearch)
    ) {
      score = 700 - candidate.text.indexOf(searchLower);
    } else {
      const distance1 = levenshteinDistance(searchLower, candidate.text);
      const distance2 = levenshteinDistance(
        normalizedSearch,
        candidate.normalized
      );
      const minDistance = Math.min(distance1, distance2);
      const maxLength = Math.max(searchLower.length, candidate.text.length);

      if (minDistance <= Math.max(2, Math.floor(maxLength * 0.4))) {
        const similarity = 1 - minDistance / maxLength;
        score = Math.floor(similarity * 600);
      }
    }

    score = score * candidate.weight;
    bestScore = Math.max(bestScore, score);
  }

  return bestScore;
};

interface GroupedStations {
  city: string;
  country: string;
  stations: Station[];
}

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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [displayOptions, setDisplayOptions] = useState<Station[]>([]);
  const [groupedStations, setGroupedStations] = useState<GroupedStations[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    if (departure === "from" && fromCity) {
      setSearchTerm(decodeURIComponent(fromCity));
    } else if (departure === "to" && toCity) {
      setSearchTerm(decodeURIComponent(toCity));
    }
  }, [departure, fromCity, toCity]);

  // Filter stations
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStations(stations);
      return;
    }

    const stationsWithScores = stations
      .map((station) => ({
        station,
        score: calculateSearchScore(station, searchTerm),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (a.station.city.length !== b.station.city.length) {
          return a.station.city.length - b.station.city.length;
        }
        return a.station.city.localeCompare(b.station.city);
      })
      .slice(0, 50)
      .map((item) => item.station);

    setFilteredStations(stationsWithScores);
  }, [searchTerm, stations]);

  // Group stations by city when searching
  useEffect(() => {
    if (searchTerm.trim()) {
      const grouped = filteredStations.reduce(
        (acc: GroupedStations[], station) => {
          const existingGroup = acc.find(
            (g) => g.city.toLowerCase() === station.city.toLowerCase()
          );

          if (existingGroup) {
            existingGroup.stations.push(station);
          } else {
            acc.push({
              city: station.city,
              country: station.country || "",
              stations: [station],
            });
          }

          return acc;
        },
        []
      );

      setGroupedStations(grouped);
    } else {
      setGroupedStations([]);
    }
  }, [filteredStations, searchTerm]);

  // Prepare display options
  useEffect(() => {
    const recentStations = JSON.parse(
      Cookies.get(
        departure === "from" ? "recentFromStations" : "recentToStations"
      ) || "[]"
    );

    if (searchTerm === "") {
      const groupedOptions: Station[] = [];

      if (recentStations.length > 0) {
        groupedOptions.push(...recentStations);
      }

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
      sortedCountries.forEach((country) => {
        groupedOptions.push(...stationsByCountry[country]);
      });

      setDisplayOptions(groupedOptions);
    } else {
      // Flatten grouped stations for keyboard navigation
      const flatOptions: Station[] = [];
      groupedStations.forEach((group) => {
        // Add first station as representative for "All Stops"
        flatOptions.push(group.stations[0]);
        // Add all individual stations
        flatOptions.push(...group.stations);
      });
      setDisplayOptions(flatOptions);
    }

    setHighlightedIndex(-1);
  }, [searchTerm, filteredStations, stations, departure, groupedStations]);

  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex]);

  // Helper function to get all station IDs for a city
  const getAllStationIdsForCity = useCallback(
    (city: string): string => {
      const cityStations = stations.filter(
        (s) => s.city.toLowerCase() === city.toLowerCase()
      );
      const ids = cityStations.map((s) => s._id).join(",");
      console.log("getAllStationIdsForCity for", city, ":", ids);
      return ids;
    },
    [stations]
  );

  const handleSelect = useCallback(
    (station: Station, isAllStops: boolean = false) => {
      const label = station.city;
      const name = station.name;
      const country = station.country || "";

      // If "All Stops" is selected, get all station IDs for this city
      const value = isAllStops
        ? getAllStationIdsForCity(station.city)
        : station._id!;

      console.log("handleSelect called:", {
        city: label,
        isAllStops,
        value,
        departure,
      });

      setSearchTerm(label);
      setIsTouched(true);

      if (departure === "from") {
        setFromCity(label);
        setFrom(value);
        console.log("Set FROM:", value);
      } else {
        setToCity(label);
        setTo(value);
        console.log("Set TO:", value);
      }

      updateRecentStations(
        departure === "from" ? "recentFromStations" : "recentToStations",
        {
          _id: station._id!,
          city: label,
          name: name,
          country: country,
        }
      );

      setOpenOptions(false);
      setHighlightedIndex(-1);
      inputRef.current?.focus();

      if (updateUrl) {
        const currentParams = new URLSearchParams(searchParams.toString());

        // Update the appropriate station parameter with the value (single ID or comma-separated IDs)
        const paramName =
          departure === "from" ? "departureStation" : "arrivalStation";
        currentParams.set(paramName, value);

        console.log("Updating URL param:", paramName, "=", value);
        console.log("Full params:", currentParams.toString());

        const pathParts = pathname.split("/");
        if (departure === "from") {
          pathParts[2] = `${label.toLowerCase()}-${pathParts[2].split("-")[1]}`;
        } else {
          pathParts[2] = `${pathParts[2].split("-")[0]}-${label.toLowerCase()}`;
        }

        const newPathname = pathParts.join("/");
        const newUrl = `${newPathname}?${currentParams.toString()}`;

        console.log("Pushing new URL:", newUrl);

        // Force router push to update URL
        router.push(newUrl, { scroll: false });
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
      getAllStationIdsForCity,
    ]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!openOptions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < displayOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : displayOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && displayOptions[highlightedIndex]) {
          handleSelect(displayOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpenOptions(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
      case "Tab":
        setOpenOptions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleFocus = () => {
    setOpenOptions(true);
    setIsTouched(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOpenOptions(false);
      setHighlightedIndex(-1);
    }, 200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsTouched(true);
    setHighlightedIndex(-1);
  };

  const updateRecentStations = (
    cookieName: string,
    newStation: { _id: string; city: string; name: string; country: string }
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
              "w-full h-12 flex items-center justify-start bg-primary-bg/5 rounded-lg border text-base transition-colors",
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
          "flex items-center h-12 rounded-lg bg-primary-bg/5 px-4 border-2 transition-all duration-200",
          shouldShowError
            ? "border-red-500 bg-red-50 shadow-sm shadow-red-100"
            : openOptions
            ? "border-primary-accent shadow-sm shadow-primary-accent/20"
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
          onKeyDown={handleKeyDown}
          autoComplete="off"
          role="combobox"
          aria-expanded={openOptions}
          aria-haspopup="listbox"
          aria-owns={`${departure}-options`}
          aria-activedescendant={
            highlightedIndex >= 0
              ? `${departure}-option-${highlightedIndex}`
              : undefined
          }
          className="flex-1 rounded-lg h-12 border-none ring-0 bg-transparent text-base capitalize px-0 placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      {shouldShowError && showError && (
        <p className="text-red-500 text-xs mt-1 animate-in slide-in-from-top-1">
          {departure === "from"
            ? t("validation.fromRequired", "Please select departure city")
            : t("validation.toRequired", "Please select arrival city")}
        </p>
      )}

      {openOptions && (
        <div
          ref={dropdownRef}
          className="absolute top-14 w-[170%] bg-background shadow-xl z-50 left-0 mt-2 rounded-lg border border-border animate-in fade-in-0 zoom-in-95 duration-200"
          role="listbox"
          id={`${departure}-options`}
        >
          <div className="max-h-80 overflow-y-auto overscroll-contain">
            {searchTerm === "" ? (
              <>
                {recentStations.length > 0 && (
                  <>
                    <div className="px-4 py-3 border-b border-border/50">
                      <h3 className="font-semibold text-sm text-foreground">
                        {t("searchForm.recentSearches")}
                      </h3>
                    </div>
                    {recentStations.map((station: Station, index: number) => {
                      const isLast = index === recentStations.length - 1;
                      return (
                        <React.Fragment key={station._id}>
                          <Button
                            ref={(el: any) => (optionRefs.current[index] = el)}
                            variant="ghost"
                            className={cn(
                              "w-full justify-start text-left h-auto py-3 px-4 rounded-none transition-all duration-200 border-l-2 border-transparent",
                              index === highlightedIndex
                                ? "bg-primary-accent/10 text-primary-accent border-primary-accent"
                                : "hover:bg-accent/50 hover:text-accent-foreground"
                            )}
                            onClick={() => handleSelect(station)}
                            type="button"
                            role="option"
                            aria-selected={index === highlightedIndex}
                            id={`${departure}-option-${index}`}
                          >
                            {departure === "from" ? (
                              <IoMdLocate className="size-4 mr-2 text-primary-accent" />
                            ) : (
                              <HiMapPin className="size-4 mr-2 text-primary-accent" />
                            )}
                            <div className="flex flex-col items-start gap-0.5 w-full">
                              <span className="capitalize font-medium text-base">
                                {station.city}
                              </span>
                              <span className="text-muted-foreground text-xs capitalize">
                                {station.country}
                              </span>
                            </div>
                          </Button>
                          {!isLast && <div className="" />}
                        </React.Fragment>
                      );
                    })}
                    <div className=" " />
                  </>
                )}

                {(() => {
                  // Group stations by country and city
                  const groupedByCountry = stations.reduce(
                    (
                      acc: Record<string, Record<string, Station[]>>,
                      station: Station
                    ) => {
                      const country = station.country || "Other";
                      const city = station.city;

                      if (!acc[country]) {
                        acc[country] = {};
                      }
                      if (!acc[country][city]) {
                        acc[country][city] = [];
                      }
                      acc[country][city].push(station);
                      return acc;
                    },
                    {}
                  );

                  const sortedCountries = Object.keys(groupedByCountry).sort();
                  let optionIndex = recentStations.length;

                  return sortedCountries.map((country, countryIdx) => {
                    const cities = groupedByCountry[country];
                    const isLastCountry =
                      countryIdx === sortedCountries.length - 1;

                    return (
                      <React.Fragment key={country}>
                        {Object.entries(cities).map(
                          ([city, cityStations], cityIdx) => {
                            const hasMultipleStations = cityStations.length > 1;
                            const isLastCity =
                              cityIdx === Object.keys(cities).length - 1;

                            return (
                              <React.Fragment key={`${country}-${city}`}>
                                {hasMultipleStations ? (
                                  <>
                                    {/* "All Stops" option */}
                                    <Button
                                      ref={(el: any) =>
                                        (optionRefs.current[optionIndex] = el)
                                      }
                                      variant="ghost"
                                      className={cn(
                                        "w-full justify-start text-left h-auto py-3 px-4 rounded-none transition-all duration-200 border-l-2 border-transparent",
                                        optionIndex === highlightedIndex
                                          ? "bg-primary-accent/10 text-primary-accent border-primary-accent"
                                          : "hover:bg-accent/50 hover:text-accent-foreground"
                                      )}
                                      onClick={() =>
                                        handleSelect(cityStations[0], true)
                                      }
                                      type="button"
                                      role="option"
                                      aria-selected={
                                        optionIndex === highlightedIndex
                                      }
                                      id={`${departure}-option-${optionIndex++}`}
                                    >
                                      {departure === "from" ? (
                                        <IoMdLocate className="size-4 mr-2 text-primary-accent" />
                                      ) : (
                                        <HiMapPin className="size-4 mr-2 text-primary-accent" />
                                      )}
                                      <div className="flex flex-col items-start gap-0.5 w-full">
                                        <span className="font-medium text-base capitalize">
                                          {city} (All Stops)
                                        </span>
                                        <span className="text-muted-foreground text-xs lowercase">
                                          {city}, {country}
                                        </span>
                                      </div>
                                    </Button>
                                    <div className="" />

                                    {/* Individual stations */}
                                    {cityStations.map((station, stationIdx) => {
                                      const currentIndex = optionIndex++;
                                      const isLastStation =
                                        stationIdx === cityStations.length - 1;
                                      return (
                                        <React.Fragment key={station._id}>
                                          <Button
                                            ref={(el: any) =>
                                              (optionRefs.current[
                                                currentIndex
                                              ] = el)
                                            }
                                            variant="ghost"
                                            className={cn(
                                              "w-full justify-start text-left h-auto py-2.5 px-4 rounded-none transition-all duration-200 border-l-2 border-transparent",
                                              currentIndex === highlightedIndex
                                                ? "bg-primary-accent/10 text-primary-accent border-primary-accent"
                                                : "hover:bg-accent/50 hover:text-accent-foreground"
                                            )}
                                            onClick={() =>
                                              handleSelect(station)
                                            }
                                            type="button"
                                            role="option"
                                            aria-selected={
                                              currentIndex === highlightedIndex
                                            }
                                            id={`${departure}-option-${currentIndex}`}
                                          >
                                            <div className="flex items-center w-full pl-6">
                                              {departure === "from" ? (
                                                <IoMdLocate className="size-3.5 mr-2 shrink-0 text-primary-accent" />
                                              ) : (
                                                <HiMapPin className="size-3.5 mr-2 shrink-0 text-primary-accent" />
                                              )}
                                              <span className="text-sm text-foreground/90">
                                                {station.name}
                                              </span>
                                            </div>
                                          </Button>
                                          {!isLastStation && (
                                            <div className="" />
                                          )}
                                        </React.Fragment>
                                      );
                                    })}
                                    {!(isLastCity && isLastCountry) && (
                                      <div className=" " />
                                    )}
                                  </>
                                ) : (
                                  /* Single station */
                                  <React.Fragment>
                                    <Button
                                      ref={(el: any) =>
                                        (optionRefs.current[optionIndex] = el)
                                      }
                                      variant="ghost"
                                      className={cn(
                                        "w-full justify-start text-left h-auto py-3 px-4 rounded-none transition-all duration-200 border-l-2 border-transparent",
                                        optionIndex === highlightedIndex
                                          ? "bg-primary-accent/10 text-primary-accent border-primary-accent"
                                          : "hover:bg-accent/50 hover:text-accent-foreground"
                                      )}
                                      onClick={() =>
                                        handleSelect(cityStations[0])
                                      }
                                      type="button"
                                      role="option"
                                      aria-selected={
                                        optionIndex === highlightedIndex
                                      }
                                      id={`${departure}-option-${optionIndex++}`}
                                    >
                                      {" "}
                                      {departure === "from" ? (
                                        <IoMdLocate className="size-4 mr-2 text-primary-accent" />
                                      ) : (
                                        <HiMapPin className="size-4 mr-2 text-primary-accent" />
                                      )}
                                      <div className="flex flex-col items-start gap-0.5 w-full">
                                        <span className="font-medium text-base capitalize">
                                          {city}
                                        </span>
                                        <span className="text-muted-foreground text-xs capitalize">
                                          {country}
                                        </span>
                                      </div>
                                    </Button>
                                    {!(isLastCity && isLastCountry) && (
                                      <div className="" />
                                    )}
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                            );
                          }
                        )}
                      </React.Fragment>
                    );
                  });
                })()}
              </>
            ) : (
              <>
                {groupedStations.length > 0 ? (
                  (() => {
                    let optionIndex = 0;
                    return groupedStations.map((group, groupIdx) => {
                      const hasMultipleStations = group.stations.length > 1;
                      const isLastGroup =
                        groupIdx === groupedStations.length - 1;

                      return (
                        <React.Fragment key={`${group.city}-${group.country}`}>
                          {hasMultipleStations ? (
                            <>
                              {/* "All Stops" option - only show when multiple stations */}
                              <Button
                                ref={(el: any) =>
                                  (optionRefs.current[optionIndex] = el)
                                }
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start text-left h-auto py-3 px-4 rounded-none transition-all duration-200",
                                  optionIndex === highlightedIndex
                                    ? "bg-primary-accent/10 text-primary-accent border-l-2 border-primary-accent"
                                    : "hover:bg-accent/50 hover:text-accent-foreground"
                                )}
                                onClick={() =>
                                  handleSelect(group.stations[0], true)
                                }
                                type="button"
                                role="option"
                                aria-selected={optionIndex === highlightedIndex}
                                id={`${departure}-option-${optionIndex++}`}
                              >
                                {" "}
                                {departure === "from" ? (
                                  <IoMdLocate className="size-3.5 mr-2 shrink-0 text-primary-accent" />
                                ) : (
                                  <HiMapPin className="size-3.5 mr-2 shrink-0 text-primary-accent" />
                                )}
                                <div className="flex flex-col items-start gap-0.5 w-full">
                                  <span className="font-medium text-base capitalize">
                                    {group.city} (All Stops)
                                  </span>
                                  <span className="text-muted-foreground text-xs lowercase">
                                    {group.city}, {group.country}
                                  </span>
                                </div>
                              </Button>

                              {/* Individual stations */}
                              {group.stations.map((station, stationIdx) => {
                                const currentIndex = optionIndex++;
                                const isLastStation =
                                  stationIdx === group.stations.length - 1;
                                return (
                                  <Button
                                    key={station._id}
                                    ref={(el: any) =>
                                      (optionRefs.current[currentIndex] = el)
                                    }
                                    variant="ghost"
                                    className={cn(
                                      "w-full justify-start text-left h-auto py-2.5 px-4 rounded-none transition-all duration-200 border-l-2 border-transparent",
                                      currentIndex === highlightedIndex
                                        ? "bg-primary-accent/10 text-primary-accent border-primary-accent"
                                        : "hover:bg-accent/50 hover:text-accent-foreground",
                                      !isLastStation && ""
                                    )}
                                    onClick={() => handleSelect(station)}
                                    type="button"
                                    role="option"
                                    aria-selected={
                                      currentIndex === highlightedIndex
                                    }
                                    id={`${departure}-option-${currentIndex}`}
                                  >
                                    <div className="flex items-center w-full pl-4">
                                      {departure === "from" ? (
                                        <IoMdLocate className="size-3.5 mr-2 shrink-0 text-primary-accent" />
                                      ) : (
                                        <HiMapPin className="size-3.5 mr-2 shrink-0 text-primary-accent" />
                                      )}
                                      <span className="text-sm text-foreground/90 capitalize truncate">
                                        {station.name}
                                      </span>
                                    </div>
                                  </Button>
                                );
                              })}

                              {/* Separator between city groups */}
                              {!isLastGroup && <div className=" " />}
                            </>
                          ) : (
                            /* Single station - show city name directly */
                            <>
                              <Button
                                ref={(el: any) =>
                                  (optionRefs.current[optionIndex] = el)
                                }
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start text-left h-auto py-3 px-4 rounded-none transition-all duration-200 border-l-2 border-transparent",
                                  optionIndex === highlightedIndex
                                    ? "bg-primary-accent/10 text-primary-accent border-primary-accent"
                                    : "hover:bg-accent/50 hover:text-accent-foreground"
                                )}
                                onClick={() => handleSelect(group.stations[0])}
                                type="button"
                                role="option"
                                aria-selected={optionIndex === highlightedIndex}
                                id={`${departure}-option-${optionIndex++}`}
                              >
                                {" "}
                                {departure === "from" ? (
                                  <IoMdLocate className="size-3.5 mr-2 shrink-0 text-primary-accent" />
                                ) : (
                                  <HiMapPin className="size-3.5 mr-2 shrink-0 text-primary-accent" />
                                )}
                                <div className="flex flex-col items-start gap-0.5 w-full">
                                  <span className="font-medium text-base capitalize">
                                    {group.city}
                                  </span>
                                  <span className="text-muted-foreground text-xs capitalize">
                                    {group.country}
                                  </span>
                                </div>
                              </Button>

                              {/* Separator between city groups */}
                              {!isLastGroup && <div className="" />}
                            </>
                          )}
                        </React.Fragment>
                      );
                    });
                  })()
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-muted-foreground text-sm">
                      {t("searchForm.noResults", "No results found")}
                    </p>
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
