import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, MapPin } from "lucide-react";
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
  onSelect: (station: Station) => void; // New prop
}

const CitySelectDialog: React.FC<CitySelectDialogProps> = ({
  isOpen,
  onClose,
  stations,
  departure,
  onSelect, // Destructure the new prop
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
              className="w-full"
            />
          </div>
        </DialogHeader>
        <ScrollArea>
          <div className="mt-4 max-h-[calc(100vh-200px)] overflow-y-auto">
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
                    onClick={() => onSelect(station)}
                    type="button"
                  >
                    <MapPin className="w-6 h-6 text-primary mr-2" />
                    <span className="capitalize">{station.city}</span>
                  </Button>
                ))}
                <div className="mt-2 mb-4 border-t border-gray-200" />
              </>
            )}
            {filteredStations.map((station: Station) => (
              <Button
                key={station._id}
                variant="ghost"
                className="w-full justify-start text-left mb-2"
                onClick={() => onSelect(station)}
                type="button"
              >
                <MapPin className="w-6 h-6 text-primary mr-2" />
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
