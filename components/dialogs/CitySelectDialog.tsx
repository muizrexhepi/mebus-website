"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
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
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  return track[str2.length][str1.length];
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
  const { t } = useTranslation();

  const recentStations = JSON.parse(
    Cookies.get(
      departure === "from" ? "recentFromStations" : "recentToStations"
    ) || "[]"
  );

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
    if (!searchTerm) {
      setFilteredStations(stations);
      setShowRecent(true);
      return;
    }

    setShowRecent(false);
    const searchTermLower = searchTerm.toLowerCase();

    const exactMatches = stations.filter(
      (station) =>
        station.city.toLowerCase().includes(searchTermLower) ||
        station.country?.toLowerCase().includes(searchTermLower)
    );

    const stationsWithDistance = stations.map((station) => {
      const cityNameLower = station.city.toLowerCase();
      const countryNameLower = station.country?.toLowerCase() || "";
      const cityDistance = levenshteinDistance(searchTermLower, cityNameLower);
      const countryDistance = levenshteinDistance(
        searchTermLower,
        countryNameLower
      );
      const distance = Math.min(cityDistance, countryDistance);
      return { station, distance };
    });

    const maxDistance = Math.min(3, searchTermLower.length);
    const fuzzyMatches = stationsWithDistance
      .filter(
        (item) =>
          item.distance <= maxDistance &&
          !exactMatches.some((exact) => exact._id === item.station._id)
      )
      .sort((a, b) => a.distance - b.distance)
      .map((item) => item.station);

    setFilteredStations([...exactMatches, ...fuzzyMatches]);
  }, [searchTerm, stations]);

  const handleStationSelect = (station: Station) => {
    onSelect(station);
    setSearchTerm("");
  };

  const getCountryFlag = (country: string) => {
    const flagMap: { [key: string]: string } = {
      kosovo: "🇽🇰",
      albania: "🇦🇱",
      "north macedonia": "🇲🇰",
      macedonia: "🇲🇰",
      serbia: "🇷🇸",
      montenegro: "🇲🇪",
      bosnia: "🇧🇦",
      croatia: "🇭🇷",
      slovenia: "🇸🇮",
      germany: "🇩🇪",
      switzerland: "🇨🇭",
      austria: "🇦🇹",
    };
    return flagMap[country.toLowerCase()] || "🌍";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <DialogTitle className="text-lg font-medium text-gray-900">
              {departure === "from"
                ? "Select departure city"
                : "Select destination city"}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Search Bar */}
        <div className="px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={t(
                "searchForm.stationPlaceholder",
                "Search cities or countries..."
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
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
                          className="w-full justify-between text-left p-0 h-auto py-4 hover:bg-gray-50 rounded-none"
                          onClick={() => handleStationSelect(station)}
                          type="button"
                        >
                          <div className="flex items-center gap-4">
                            <Clock className="w-5 h-5 text-gray-500" />
                            <span className="text-lg font-normal text-black capitalize">
                              {station.city}
                            </span>
                          </div>
                          <span className="text-sm text-gray-400">Route</span>
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
                    : "Popular Cities"}
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
                                <span className="text-lg font-normal text-black capitalize">
                                  {station.city}
                                </span>
                              </Button>
                              {/* Add divider line except for last item */}
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
                        Try searching with different keywords
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
