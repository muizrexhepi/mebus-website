"use client";

import type React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
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
import { ArrowLeft, Search, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Station } from "@/models/station";

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

interface CitySelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stations: Station[];
  departure: string | undefined;
  onSelect: (station: Station) => void;
}

interface GroupedStations {
  [country: string]: Station[];
}

const CitySelectDialog: React.FC<CitySelectDialogProps> = ({
  isOpen,
  onClose,
  stations,
  departure,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showRecent, setShowRecent] = useState(true);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
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
      // Use setTimeout to ensure the dialog is fully rendered
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Group stations by country
  const groupedStations = useMemo(() => {
    const grouped: GroupedStations = {};
    filteredStations.forEach((station) => {
      const country = station.country || "Other";
      if (!grouped[country]) {
        grouped[country] = [];
      }
      grouped[country].push(station);
    });

    const sortedGrouped: GroupedStations = {};
    Object.keys(grouped)
      .sort()
      .forEach((country) => {
        sortedGrouped[country] = grouped[country].sort((a, b) =>
          a.city.localeCompare(b.city)
        );
      });
    return sortedGrouped;
  }, [filteredStations]);

  // Update filtered stations when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStations(stations); // Show all stations when no search
      setShowRecent(true);
      return;
    }

    setShowRecent(false);

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
              className="h-10 w-10 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <DialogTitle className="text-lg font-medium text-gray-900">
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
        <div className="px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
              className="pl-11 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="pb-6">
              {/* Recent Searches */}
              {showRecent && recentStations.length > 0 && (
                <div className="px-4 py-6 border-b border-gray-100">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    {t("searchForm.recentSearches", "Recent searches")}
                  </h3>
                  <div className="space-y-0">
                    {recentStations.map((station: Station, index: number) => (
                      <div key={station._id || index}>
                        <Button
                          variant="ghost"
                          className="w-full justify-between items-center text-left p-0 h-auto py-4 hover:bg-gray-50 rounded-none"
                          onClick={() => handleStationSelect(station)}
                          type="button"
                        >
                          <span className="text-lg font-normal text-black capitalize">
                            {station.city}
                          </span>{" "}
                          <span className="text-sm text-gray-500 capitalize">
                            {station.country}
                          </span>
                          <Clock className="w-5 h-5 text-gray-500" />
                        </Button>
                        <div className="border-b border-gray-200" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results or Popular Cities */}
              <div className="px-4 py-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  {searchTerm
                    ? t("searchForm.searchResult", "Search Results")
                    : t("searchForm.popularCities", "Popular Cities")}
                </h3>

                <div className="space-y-0">
                  {Object.keys(groupedStations).length > 0 ? (
                    Object.entries(groupedStations).map(
                      ([country, countryStations]) => (
                        <div key={country}>
                          {countryStations.map((station, index) => (
                            <div key={station._id || `${country}-${index}`}>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-left p-0 h-auto py-4 hover:bg-gray-50 rounded-none"
                                onClick={() => handleStationSelect(station)}
                                type="button"
                              >
                                <div className="flex flex-col items-start">
                                  <span className="text-lg font-normal text-black capitalize">
                                    {station.city}
                                  </span>
                                  <span className="text-sm text-gray-500 capitalize">
                                    {station.country}
                                  </span>
                                </div>
                              </Button>
                              <div className="border-b border-gray-200" />
                            </div>
                          ))}
                        </div>
                      )
                    )
                  ) : searchTerm !== "" ? (
                    <div className="py-12 text-center">
                      <p className="text-gray-500 text-base">
                        {t("searchForm.noResults", "No results found")}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {t(
                          "searchForm.tryDifferentKeywords",
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

export default CitySelectDialog;
