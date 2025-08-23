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
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[b.length][a.length];
};

// Improved search algorithm with multiple scoring strategies
const calculateSearchScore = (station: Station, searchTerm: string): number => {
  const searchLower = searchTerm.toLowerCase().trim();
  const cityLower = station.city.toLowerCase();
  const countryLower = station.country?.toLowerCase() || "";

  if (!searchLower) return 0;

  // Helper function to normalize strings (remove diacritics, etc.)
  const normalize = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters
      .trim();
  };

  const normalizedSearch = normalize(searchLower);
  const normalizedCity = normalize(cityLower);
  const normalizedCountry = normalize(countryLower);

  let bestScore = 0;

  // Check both city and country for all scoring methods
  const candidates = [
    { text: cityLower, normalized: normalizedCity, isCity: true },
    { text: countryLower, normalized: normalizedCountry, isCity: false },
  ];

  for (const candidate of candidates) {
    if (!candidate.text) continue;

    let score = 0;

    // 1. Exact match (highest priority)
    if (
      candidate.text === searchLower ||
      candidate.normalized === normalizedSearch
    ) {
      score = 1000;
    }
    // 2. Starts with match (very high priority)
    else if (
      candidate.text.startsWith(searchLower) ||
      candidate.normalized.startsWith(normalizedSearch)
    ) {
      score = 900 - searchLower.length; // Prefer longer matches
    }
    // 3. Word boundary match (high priority)
    else if (
      candidate.text.includes(" " + searchLower) ||
      candidate.normalized.includes(" " + normalizedSearch)
    ) {
      score = 800;
    }
    // 4. Contains match (medium-high priority)
    else if (
      candidate.text.includes(searchLower) ||
      candidate.normalized.includes(normalizedSearch)
    ) {
      score = 700 - candidate.text.indexOf(searchLower); // Prefer matches closer to start
    }
    // 5. Fuzzy match using Levenshtein distance
    else {
      const distance1 = levenshteinDistance(searchLower, candidate.text);
      const distance2 = levenshteinDistance(
        normalizedSearch,
        candidate.normalized
      );
      const minDistance = Math.min(distance1, distance2);
      const maxLength = Math.max(searchLower.length, candidate.text.length);

      // Only consider if similarity is reasonable
      if (minDistance <= Math.max(2, Math.floor(maxLength * 0.4))) {
        const similarity = 1 - minDistance / maxLength;
        score = Math.floor(similarity * 600); // Max 600 for fuzzy matches
      }
    }

    // Boost city matches slightly over country matches
    if (candidate.isCity && score > 0) {
      score += 10;
    }

    bestScore = Math.max(bestScore, score);
  }

  return bestScore;
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

  // Filter stations using improved search algorithm
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStations(stations);
      return;
    }

    // Calculate scores for all stations
    const stationsWithScores = stations
      .map((station) => ({
        station,
        score: calculateSearchScore(station, searchTerm),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => {
        // Sort by score (descending), then by city name length (ascending), then alphabetically
        if (b.score !== a.score) return b.score - a.score;
        if (a.station.city.length !== b.station.city.length) {
          return a.station.city.length - b.station.city.length;
        }
        return a.station.city.localeCompare(b.station.city);
      })
      .slice(0, 30) // Limit results for performance
      .map((item) => item.station);

    setFilteredStations(stationsWithScores);
  }, [searchTerm, stations]);

  const handleSelect = useCallback(
    (station: Station) => {
      const value = station._id;
      const label = station.city;
      const name = station.name;
      const country = station.country || "";

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
          country: country,
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
