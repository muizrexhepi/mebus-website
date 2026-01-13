"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Station } from "@/models/station";
import { cn } from "@/lib/utils";
import { HiMapPin } from "react-icons/hi2";
import { IoMdLocate } from "react-icons/io";

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

interface CitySelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stations: Station[];
  departure: string | undefined;
  onSelect: (station: Station) => void;
}

interface GroupedStations {
  city: string;
  country: string;
  stations: Station[];
}

const CitySelectDialog: React.FC<CitySelectDialogProps> = ({
  isOpen,
  onClose,
  stations,
  departure,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [groupedStations, setGroupedStations] = useState<GroupedStations[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const recentStations = JSON.parse(
    Cookies.get(
      departure === "from" ? "recentFromStations" : "recentToStations"
    ) || "[]"
  );

  // Autofocus when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  const handleStationSelect = (station: Station) => {
    onSelect(station);
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
              className="h-10 w-10 rounded-full hover:bg-accent transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-lg font-semibold">
              {departure === "from"
                ? t("searchForm.selectDepartureCity", "Select departure city")
                : t(
                    "searchForm.selectDestinationCity",
                    "Select destination city"
                  )}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Search Bar */}
        <div className="px-4 py-4 border-b border-border flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              ref={inputRef}
              type="text"
              placeholder={t(
                "searchForm.stationPlaceholder",
                "Search cities or countries..."
              )}
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 h-12 bg-gray-50 border-border rounded-xl focus:ring-2 focus:ring-primary-accent focus:border-transparent text-base"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="pb-6">
              {searchTerm === "" ? (
                <>
                  {/* Recent Searches */}
                  {recentStations.length > 0 && (
                    <>
                      <div className="px-4 py-3 border-b border-border/50">
                        <h3 className="font-semibold text-sm">
                          {t("searchForm.recentSearches", "Recent searches")}
                        </h3>
                      </div>
                      {recentStations.map((station: Station, index: number) => {
                        const isLast = index === recentStations.length - 1;
                        return (
                          <React.Fragment key={station._id || index}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-left h-auto py-3 px-4 rounded-none hover:bg-accent/50"
                              onClick={() => handleStationSelect(station)}
                              type="button"
                            >
                              <div className="flex flex-col items-start gap-0.5 w-full">
                                <span className="capitalize font-semibold text-base">
                                  {station.city}
                                </span>
                                <span className="text-muted-foreground text-xs capitalize">
                                  {station.country}
                                </span>
                              </div>
                            </Button>
                            {!isLast && (
                              <div className="border-b border-border/30" />
                            )}
                          </React.Fragment>
                        );
                      })}
                      <div className="border-t-2 border-border/50 my-1" />
                    </>
                  )}

                  {/* All Stations grouped by country and city */}
                  {(() => {
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

                    const sortedCountries =
                      Object.keys(groupedByCountry).sort();

                    return sortedCountries.map((country, countryIdx) => {
                      const cities = groupedByCountry[country];
                      const isLastCountry =
                        countryIdx === sortedCountries.length - 1;

                      return (
                        <React.Fragment key={country}>
                          {Object.entries(cities).map(
                            ([city, cityStations], cityIdx) => {
                              const hasMultipleStations =
                                cityStations.length > 1;
                              const isLastCity =
                                cityIdx === Object.keys(cities).length - 1;

                              return (
                                <React.Fragment key={`${country}-${city}`}>
                                  {hasMultipleStations ? (
                                    <>
                                      <Button
                                        variant="ghost"
                                        className="w-full justify-start text-left h-auto py-3 px-4 rounded-none hover:bg-accent/50"
                                        onClick={() =>
                                          handleStationSelect(cityStations[0])
                                        }
                                        type="button"
                                      >
                                        <div className="flex flex-col items-start gap-0.5 w-full">
                                          <span className="font-semibold text-base capitalize">
                                            {city} (All Stops)
                                          </span>
                                          <span className="text-muted-foreground text-xs lowercase">
                                            {city}, {country}
                                          </span>
                                        </div>
                                      </Button>
                                      <div className="border-b border-border/30" />

                                      {cityStations.map(
                                        (station, stationIdx) => {
                                          const isLastStation =
                                            stationIdx ===
                                            cityStations.length - 1;
                                          return (
                                            <React.Fragment key={station._id}>
                                              <Button
                                                variant="ghost"
                                                className="w-full justify-start text-left h-auto py-2.5 px-4 rounded-none hover:bg-accent/50"
                                                onClick={() =>
                                                  handleStationSelect(station)
                                                }
                                                type="button"
                                              >
                                                <div className="flex items-center w-full pl-6">
                                                  {departure === "from" ? (
                                                    <IoMdLocate className="size-3.5 mr-2 shrink-0 text-muted-foreground" />
                                                  ) : (
                                                    <HiMapPin className="size-3.5 mr-2 shrink-0 text-muted-foreground" />
                                                  )}
                                                  <span className="text-sm text-foreground/90">
                                                    {station.name}
                                                  </span>
                                                </div>
                                              </Button>
                                              {!isLastStation && (
                                                <div className="border-b border-border/30" />
                                              )}
                                            </React.Fragment>
                                          );
                                        }
                                      )}
                                      {!(isLastCity && isLastCountry) && (
                                        <div className="border-t-2 border-border/50 my-1" />
                                      )}
                                    </>
                                  ) : (
                                    <React.Fragment>
                                      <Button
                                        variant="ghost"
                                        className="w-full justify-start text-left h-auto py-3 px-4 rounded-none hover:bg-accent/50"
                                        onClick={() =>
                                          handleStationSelect(cityStations[0])
                                        }
                                        type="button"
                                      >
                                        <div className="flex flex-col items-start gap-0.5 w-full">
                                          <span className="font-semibold text-base capitalize">
                                            {city}
                                          </span>
                                          <span className="text-muted-foreground text-xs capitalize">
                                            {country}
                                          </span>
                                        </div>
                                      </Button>
                                      {!(isLastCity && isLastCountry) && (
                                        <div className="border-b border-border/30" />
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
                  {/* Search Results Header */}
                  <div className="px-4 py-3 border-b border-border/50">
                    <h3 className="font-semibold text-sm">
                      {t("searchForm.searchResult", "Search results")}
                    </h3>
                  </div>

                  {groupedStations.length > 0 ? (
                    groupedStations.map((group, groupIdx) => {
                      const hasMultipleStations = group.stations.length > 1;
                      const isLastGroup =
                        groupIdx === groupedStations.length - 1;

                      return (
                        <React.Fragment key={`${group.city}-${group.country}`}>
                          {hasMultipleStations ? (
                            <>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-left h-auto py-3 px-4 rounded-none hover:bg-accent/50"
                                onClick={() =>
                                  handleStationSelect(group.stations[0])
                                }
                                type="button"
                              >
                                <div className="flex flex-col items-start gap-0.5 w-full">
                                  <span className="font-semibold text-base capitalize">
                                    {group.city} (All Stops)
                                  </span>
                                  <span className="text-muted-foreground text-xs lowercase">
                                    {group.city}, {group.country}
                                  </span>
                                </div>
                              </Button>
                              <div className="border-b border-border/30" />

                              {group.stations.map((station, stationIdx) => {
                                const isLastStation =
                                  stationIdx === group.stations.length - 1;
                                return (
                                  <React.Fragment key={station._id}>
                                    <Button
                                      variant="ghost"
                                      className="w-full justify-start text-left h-auto py-2.5 px-4 rounded-none hover:bg-accent/50"
                                      onClick={() =>
                                        handleStationSelect(station)
                                      }
                                      type="button"
                                    >
                                      <div className="flex items-center w-full pl-6">
                                        {departure === "from" ? (
                                          <IoMdLocate className="size-3.5 mr-2 shrink-0 text-muted-foreground" />
                                        ) : (
                                          <HiMapPin className="size-3.5 mr-2 shrink-0 text-muted-foreground" />
                                        )}
                                        <span className="text-sm text-foreground/90">
                                          {station.name}
                                        </span>
                                      </div>
                                    </Button>
                                    {!isLastStation && (
                                      <div className="border-b border-border/30" />
                                    )}
                                  </React.Fragment>
                                );
                              })}
                              {!isLastGroup && (
                                <div className="border-t-2 border-border/50 my-1" />
                              )}
                            </>
                          ) : (
                            <React.Fragment>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-left h-auto py-3 px-4 rounded-none hover:bg-accent/50"
                                onClick={() =>
                                  handleStationSelect(group.stations[0])
                                }
                                type="button"
                              >
                                <div className="flex flex-col items-start gap-0.5 w-full">
                                  <span className="font-semibold text-base capitalize">
                                    {group.city}
                                  </span>
                                  <span className="text-muted-foreground text-xs capitalize">
                                    {group.country}
                                  </span>
                                </div>
                              </Button>
                              {!isLastGroup && (
                                <div className="border-b border-border/30" />
                              )}
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <div className="px-4 py-12 text-center">
                      <p className="text-muted-foreground text-base">
                        {t("searchForm.noResults", "No results found")}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {t(
                          "searchForm.tryDifferentKeywords",
                          "Try searching with different keywords"
                        )}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CitySelectDialog;
