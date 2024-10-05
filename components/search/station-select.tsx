import React, { useEffect, useState } from "react";
import { Station } from "@/models/station";
import useSearchStore from "@/store";
import { MapPin } from "lucide-react";
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
  const { setFrom, setTo, setFromCity, setToCity, from, to, fromCity, toCity } =
    useSearchStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (from && to) {
      if (departure === "from") {
        setSearchTerm(fromCity);
      } else if (departure === "to") {
        setSearchTerm(toCity);
      }
    }
  }, [departure, setFromCity, setFrom, setToCity, setTo]);

  const handleFocus = () => {
    setOpenOptions(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOpenOptions(false);
    }, 100);
  };

  const handleSelect = (station: Station) => {
    const value = station._id;
    const label = station.city;

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
      { _id: value!, city: label }
    );
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
          className="h-14 px-4 flex items-center border border-input bg-background text-sm ring-offset-background cursor-pointer rounded-lg"
          onClick={() => setIsDialogOpen(true)}
        >
          <MapPin className="w-6 h-6 text-primary mr-2" />
          <span className="capitalize">{searchTerm || "Select a city"}</span>
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
        <div className="absolute top-14 w-[calc(100%+100px)] bg-white z-20 left-0 mt-4 shadow-sm h-fit max-h-80 overflow-y-auto rounded-lg">
          {recentStations.length > 0 && searchTerm == "" && (
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
