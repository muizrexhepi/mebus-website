import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { Station } from "@/models/station";
import { ScrollArea } from "../ui/scroll-area";
import { IoMdLocate, IoMdSearch } from "react-icons/io";
import { HiMapPin } from "react-icons/hi2";
import { MdHistory } from "react-icons/md";
import { useTranslation } from "react-i18next";

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

    // Sort countries alphabetically and stations within each country
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

    // Calculate both exact matches and Levenshtein distance matches
    const exactMatches = stations.filter(
      (station) =>
        station.city.toLowerCase().includes(searchTermLower) ||
        station.country?.toLowerCase().includes(searchTermLower)
    );

    // For fuzzy matching
    const stationsWithDistance = stations.map((station) => {
      const cityNameLower = station.city.toLowerCase();
      const countryNameLower = station.country?.toLowerCase() || "";
      const cityDistance = levenshteinDistance(searchTermLower, cityNameLower);
      const countryDistance = levenshteinDistance(
        searchTermLower,
        countryNameLower
      );
      const distance = Math.min(cityDistance, countryDistance);

      return { station, distance, cityNameLower, countryNameLower };
    });

    // Adjust threshold based on search term length
    const maxDistance = Math.min(3, searchTermLower.length);

    // Get fuzzy matches that aren't already in exact matches
    const fuzzyMatches = stationsWithDistance
      .filter(
        (item) =>
          item.distance <= maxDistance &&
          !exactMatches.some((exact) => exact._id === item.station._id)
      )
      .sort((a, b) => a.distance - b.distance)
      .map((item) => item.station);

    // Combine exact and fuzzy matches
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
      <DialogContent className="sm:max-w-[425px] py-20 h-full sm:h-auto flex flex-col px-0">
        {/* Header */}
        <DialogHeader className="space-y-4 h-fit px-4">
          <DialogTitle className="text-lg font-semibold">
            {departure === "from"
              ? "Select departure city"
              : "Select destination city"}
          </DialogTitle>
          <div className="relative">
            <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder={t(
                "searchForm.stationPlaceholder",
                "Search cities or countries..."
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-none ring-0 font-medium bg-primary-bg/5"
            />
          </div>
        </DialogHeader>

        {/* Content */}
        <ScrollArea>
          <div className="mt-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Recent Searches */}
            {showRecent && recentStations.length > 0 && (
              <>
                <div className="bg-muted px-4 py-2 border-b border-border mb-2">
                  <h3 className="font-medium text-sm text-foreground/70">
                    {t("searchForm.recentSearches")}
                  </h3>
                </div>
                {recentStations.map((station: Station) => (
                  <Button
                    key={station._id}
                    variant="ghost"
                    className="w-full justify-start text-left mb-2"
                    onClick={() => handleStationSelect(station)}
                    type="button"
                  >
                    {departure === "from" ? (
                      <IoMdLocate className="size-5 mr-2 text-primary-accent" />
                    ) : (
                      <HiMapPin className="size-5 mr-2 shrink-0 text-primary-accent" />
                    )}
                    <div className="flex flex-col items-start">
                      <span className="capitalize font-medium">
                        {station.city}
                      </span>
                      {station.country && (
                        <span className="text-sm text-muted-foreground capitalize">
                          {getCountryFlag(station.country)} {station.country}
                        </span>
                      )}
                    </div>
                  </Button>
                ))}
                <div className="mt-2 mb-4 border-t border-gray-200" />
              </>
            )}

            {/* Search Results or All Cities */}
            {searchTerm !== "" && (
              <div className="bg-muted px-4 py-2 border-b border-border mb-2">
                <h3 className="font-medium text-sm text-foreground/70">
                  {t("searchForm.searchResult")}
                </h3>
              </div>
            )}

            {Object.keys(groupedStations).length > 0
              ? Object.entries(groupedStations).map(
                  ([country, countryStations]) => (
                    <div key={country} className="mb-4">
                      {/* Country Header */}
                      <div className="bg-muted/50 px-4 py-2 mb-2">
                        <h4 className="font-medium text-sm text-foreground/80 flex items-center gap-2">
                          <span>{getCountryFlag(country)}</span>
                          <span className="capitalize">{country}</span>
                          <span className="text-muted-foreground">
                            ({countryStations.length})
                          </span>
                        </h4>
                      </div>

                      {/* Cities in Country */}
                      {countryStations.map((station) => (
                        <Button
                          key={station._id}
                          variant="ghost"
                          className="w-full justify-start text-left mb-2"
                          onClick={() => handleStationSelect(station)}
                          type="button"
                        >
                          {departure === "from" ? (
                            <IoMdLocate className="size-5 mr-2 text-primary-accent" />
                          ) : (
                            <HiMapPin className="size-5 mr-2 shrink-0 text-primary-accent" />
                          )}
                          <div className="flex flex-col items-start">
                            <span className="capitalize font-medium">
                              {station.city}
                            </span>
                            {station.name &&
                              station.name !==
                                `${station.city} bus station` && (
                                <span className="text-sm text-muted-foreground">
                                  {station.name}
                                </span>
                              )}
                          </div>
                        </Button>
                      ))}
                    </div>
                  )
                )
              : searchTerm !== "" && (
                  <div className="px-4 py-3 text-muted-foreground text-sm">
                    {t("searchForm.noResults", "No results found")}
                  </div>
                )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CitySelectDialog;
