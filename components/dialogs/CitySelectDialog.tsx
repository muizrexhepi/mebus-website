import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, MapPin, Locate } from "lucide-react";
import Cookies from "js-cookie";
import { Station } from "@/models/station";
import { ScrollArea } from "../ui/scroll-area";

interface CitySelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stations: Station[];
  departure: string | undefined;
}

interface CitySelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stations: Station[];
  departure: string | undefined;
  onSelect: (station: Station) => void;
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

  const recentStations = JSON.parse(
    Cookies.get(
      departure === "from" ? "recentFromStations" : "recentToStations"
    ) || "[]"
  );

  const filteredStations = stations.filter((station) =>
    station.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setShowRecent(!searchTerm);
  }, [searchTerm]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] py-20 h-full sm:h-auto flex flex-col px-0">
        <DialogHeader className="space-y-4 h-fit px-4">
          <DialogTitle>
            Select a {departure === "from" ? "departure" : "arrival"} city
          </DialogTitle>
          <div className="">
            <Input
              type="text"
              placeholder="Search for a city"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 border-none ring-0 font-medium bg-primary-bg/5"
            />
          </div>
        </DialogHeader>
        <ScrollArea>
          <div className="mt-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {showRecent && recentStations.length > 0 && (
              <>
                <div className="bg-muted px-4 py-2 border-b border-border mb-2">
                  <h3 className="font-medium text-sm text-foreground/70">
                    Recent Searches
                  </h3>
                </div>
                {recentStations.map((station: Station) => (
                  <Button
                    key={station._id}
                    variant="ghost"
                    className="w-full justify-start text-left mb-2"
                    onClick={() => onSelect(station)}
                    type="button"
                  >
                    {departure === "from" ? (
                      <Locate className="w-6 h-6 text-primary mr-2" />
                    ) : (
                      <MapPin className="w-6 h-6 text-primary mr-2" />
                    )}
                    <span className="capitalize">{station.city}</span>
                  </Button>
                ))}
                <div className="mt-2 mb-4 border-t border-gray-200" />
              </>
            )}
            {searchTerm !== "" && (
              <div className="bg-muted px-4 py-2 border-b border-border mb-2">
                <h3 className="font-medium text-sm text-foreground/70">
                  Search results
                </h3>
              </div>
            )}
            {filteredStations.map((station: Station) => (
              <Button
                key={station._id}
                variant="ghost"
                className="w-full justify-start text-left mb-2"
                onClick={() => onSelect(station)}
                type="button"
              >
                {departure === "from" ? (
                  <Locate className="w-6 h-6 text-primary mr-2" />
                ) : (
                  <MapPin className="w-6 h-6 text-primary mr-2" />
                )}
                <span className="capitalize">{station.city}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CitySelectDialog;
