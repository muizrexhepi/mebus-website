"use client";

import { Station } from "@/models/station";
import useSearchStore from "@/store";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CitySelectDialog from "../dialogs/CitySelectDialog";
import useIsMobile from "../hooks/use-mobile";

interface CustomSelectProps {
  stations?: Station[];
  departure?: string;
}

const StationSelect: React.FC<CustomSelectProps> = ({
  stations = [],
  departure,
}) => {
  const { setFrom, setTo, setFromCity, setToCity, from, to } = useSearchStore();
  const [showRecent, setShowRecent] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadSavedLocations = (
      cityKey: string,
      valueKey: string,
      setCity: (city: string) => void,
      setValue: (value: string) => void
    ) => {
      const savedCity = localStorage.getItem(cityKey);
      const savedValue = localStorage.getItem(valueKey);

      if (savedCity && savedValue) {
        setCity(savedCity);
        setValue(savedValue);
        setSearchTerm(savedCity);
      }
    };

    if (departure === "from") {
      loadSavedLocations("fromCity", "fromValue", setFromCity, setFrom);
    } else if (departure === "to") {
      loadSavedLocations("toCity", "toValue", setToCity, setTo);
    }
  }, [departure, setFromCity, setFrom, setToCity, setTo]);

  const handleFocus = () => {
    setOpenOptions(true);
    setTempSearchTerm(searchTerm);
    setSearchTerm("");
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOpenOptions(false);
      setSearchTerm(tempSearchTerm);
      setTempSearchTerm("");
    }, 100);
  };

  const handleSelect = (station: Station) => {
    const value = station._id;
    const label = station.city;

    setSearchTerm(label);

    if (departure === "from") {
      setFromCity(label);
      setFrom(value!);
      localStorage.setItem("fromCity", label);
      localStorage.setItem("fromValue", value!);
      updateRecentStations("recentFromStations", { _id: value!, city: label });
    } else {
      setToCity(label);
      setTo(value!);
      localStorage.setItem("toCity", label);
      localStorage.setItem("toValue", value!);
      updateRecentStations("recentToStations", { _id: value!, city: label });
    }

    setOpenOptions(false);
  };

  const updateRecentStations = (
    cookieName: string,
    newStation: { _id: string; city: string }
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
        <div
          className="h-14 px-4 flex items-center border border-input bg-background text-sm ring-offset-background cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <MapPin className="w-6 h-6 text-primary mr-2" />
          <span className="capitalize">{searchTerm}</span>
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
      <div className="relative">
        <MapPin className="absolute w-5 h-5 text-primary left-3 top-1/2 transform -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Search for a city"
          value={searchTerm}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-14 pl-10 capitalize text-base"
        />
      </div>
      {openOptions && (
        <div className="absolute top-14 w-full bg-white z-20 left-0 mt-4 h-fit max-h-80 overflow-y-auto rounded-lg">
          {showRecent && recentStations.length > 0 && (
            <>
              <h3 className="font-semibold mb-2 bg-muted p-2 px-4">
                Recent Searches
              </h3>
              {recentStations.map((station: Station) => (
                <Button
                  key={station._id}
                  variant="ghost"
                  className="w-full justify-start text-left mb-2"
                  onClick={() => handleSelect(station)}
                  type="button"
                >
                  <MapPin className="w-5 h-5 text-primary mr-2" />
                  <span className="capitalize">{station.city}</span>
                </Button>
              ))}
              <div className="mb-2 border-t border-gray-200" />
            </>
          )}
          {filteredStations.map((station: Station) => (
            <Button
              key={station._id}
              variant="ghost"
              className="w-full justify-start text-left mb-2"
              onClick={() => handleSelect(station)}
              type="button"
            >
              <MapPin className="w-6 h-6 text-primary mr-2" />
              <span className="capitalize">{station.city}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StationSelect;
