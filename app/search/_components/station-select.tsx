"use client";

import React, { useEffect, useRef, useState } from "react";
import { Station } from "@/models/station";
import useSearchStore from "@/store";
import { Locate, MapPin, X } from "lucide-react";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CitySelectDialog from "@/components/dialogs/CitySelectDialog";
import useIsMobile from "@/components/hooks/use-mobile";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface CustomSelectProps {
  stations?: Station[];
  departure?: string;
  updateUrl?: boolean;
}

const StationSelect: React.FC<CustomSelectProps> = ({
  stations = [],
  departure,
  updateUrl = false,
}) => {
  const { setFrom, setTo, setFromCity, setToCity, from, to, fromCity, toCity } =
    useSearchStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (from && to) {
      if (departure === "from") {
        setSearchTerm(fromCity);
      } else if (departure === "to") {
        setSearchTerm(toCity);
      }
      return;
    } else {
      if (departure === "from") {
        setSearchTerm(stations[0]?.city || "");
        setFromCity(stations[0]?.city || "");
        setFrom(stations[0]?._id || "");
      } else if (departure === "to") {
        setSearchTerm(stations[1]?.city || "");
        setToCity(stations[1]?.city || "");
        setTo(stations[1]?._id || "");
      }
    }
  }, [departure, setFromCity, setFrom, setToCity, setTo]);

  const handleSelect = (station: Station) => {
    const value = station._id;
    const label = station.city;
    const name = station.name;

    setSearchTerm(label);

    if (departure === "from") {
      setFromCity(label);
      setFrom(value!);
    } else {
      setToCity(label);
      setTo(value!);
    }

    updateRecentStations(
      departure === "from" ? "recentFromStations" : "recentToStations",
      { _id: value!, city: label, name: name }
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
  };
  const handleFocus = () => {
    setOpenOptions(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOpenOptions(false);
    }, 100);
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

  const filteredStations = stations.filter((station) =>
    station.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isMobile) {
    return (
      <>
        <Button
          variant={"outline"}
          className="w-full h-12 flex items-center justify-start bg-primary-bg/5 rounded-lg border-none ring-0"
          onClick={() => setIsDialogOpen(true)}
        >
          {departure === "from" ? (
            <Locate className="w-5 h-5 text-primary mr-2" />
          ) : (
            <MapPin className="w-5 h-5 text-primary mr-2" />
          )}
          <span className="capitalize font-normal text-base">
            {searchTerm || "Select a city"}
          </span>
        </Button>
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
      <div className="relative">
        {departure === "from" ? (
          <Locate className="absolute w-5 h-5 text-primary left-3 top-1/2 transform -translate-y-1/2" />
        ) : (
          <MapPin className="absolute w-5 h-5 text-primary left-3 top-1/2 transform -translate-y-1/2" />
        )}
        <Input
          type="text"
          placeholder="Search for a city"
          value={searchTerm}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-12 pl-10 hover:bg-accent bg-primary-bg/5 rounded-lg border-none ring-0 capitalize text-base"
        />
      </div>

      {openOptions && (
        <div className="absolute top-14 w-[130%] bg-background shadow-lg z-20 left-0 mt-2 rounded-lg border border-border animate-in fade-in-0 zoom-in-95">
          <div className="max-h-80 overflow-y-auto overscroll-contain">
            {recentStations.length > 0 && searchTerm == "" && (
              <>
                <div className="bg-muted px-4 py-2 border-b border-border">
                  <h3 className="font-medium text-sm text-foreground/70">
                    Recent searches
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
                    <MapPin className="w-5 h-5 text-primary mr-3 shrink-0" />
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
            {searchTerm !== "" && (
              <>
                <div className="bg-muted px-4 py-2 border-b border-border">
                  <h3 className="font-medium text-sm text-foreground/70">
                    Search results
                  </h3>
                </div>
                {filteredStations.map((station: Station) => (
                  <Button
                    key={station._id}
                    variant="ghost"
                    className="w-full justify-start text-left h-15 px-4 hover:bg-accent hover:text-accent-foreground rounded-none"
                    onClick={() => handleSelect(station)}
                    type="button"
                  >
                    <MapPin className="w-5 h-5 text-primary mr-3 shrink-0" />
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StationSelect;
