"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { SlidersHorizontal } from "lucide-react";

interface Stop {
  id: string;
  name: string;
  count: number;
}

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
  totalTrips: number;
}

export default function SearchFilters({
  onFiltersChange,
  totalTrips,
}: SearchFiltersProps) {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState("departure");
  const [transfers, setTransfers] = useState<string[]>([]);
  const [departureRange, setDepartureRange] = useState([0, 24]);
  const [arrivalRange, setArrivalRange] = useState([0, 24]);
  const [selectedStops, setSelectedStops] = useState<string[]>([]);

  const stops: Stop[] = [
    { id: "berlin-sudkreuz", name: "Berlin Südkreuz", count: 5 },
    { id: "berlin-alt-tegel", name: "Berlin Alt-Tegel", count: 2 },
    { id: "berlin-zoo", name: "Berlin Zoo", count: 1 },
  ];

  const formatTime = (hour: number) => {
    return `${String(hour).padStart(2, "0")}:00`;
  };

  const handleFiltersChange = () => {
    onFiltersChange({
      sortBy,
      transfers,
      departureRange,
      arrivalRange,
      selectedStops,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 w-fit">
          <SlidersHorizontal className="h-4 w-4" />
          {t("filters.title", "Filters")}
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 rounded-tl-xl rounded-bl-xl h-full flex flex-col justify-start">
        <SheetHeader className="border-b p-4 shadow-sm">
          <SheetTitle className="font-medium">
            {t("filters.title", "Filters")}
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-6 p-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">
              {t("filters.sortBy", "Sort by")}
            </h3>
            <RadioGroup value={sortBy} onValueChange={setSortBy}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="departure" id="departure" />
                <Label htmlFor="departure">
                  {t("filters.departure", "Departure")} (
                  {t("filters.earliest", "Earliest")})
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price" id="price" />
                <Label htmlFor="price">
                  {t("filters.price", "Price")} ({t("filters.lowest", "Lowest")}
                  )
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="duration" id="duration" />
                <Label htmlFor="duration">
                  {t("filters.duration", "Duration")} (
                  {t("filters.shortest", "Shortest")})
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">
              {t("filters.filterBy", "Filter by")}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="direct"
                  checked={transfers.includes("direct")}
                  onCheckedChange={(checked) => {
                    setTransfers(
                      checked
                        ? [...transfers, "direct"]
                        : transfers.filter((t) => t !== "direct")
                    );
                  }}
                />
                <Label htmlFor="direct">
                  {t("filters.direct", "Direct trip")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="one-transfer"
                  checked={transfers.includes("one")}
                  onCheckedChange={(checked) => {
                    setTransfers(
                      checked
                        ? [...transfers, "one"]
                        : transfers.filter((t) => t !== "one")
                    );
                  }}
                />
                <Label htmlFor="one-transfer">
                  1 {t("filters.transfer", "Transfer")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="two-plus-transfers"
                  checked={transfers.includes("twoPlus")}
                  onCheckedChange={(checked) => {
                    setTransfers(
                      checked
                        ? [...transfers, "twoPlus"]
                        : transfers.filter((t) => t !== "twoPlus")
                    );
                  }}
                />
                <Label htmlFor="two-plus-transfers">
                  2+ {t("filters.transfers", "Transfers")}
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                {t("filters.departureFrom", "Departure from")}
              </h3>
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={24}
                  step={1}
                  value={departureRange}
                  onValueChange={setDepartureRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(departureRange[0])}</span>
                  <span>{formatTime(departureRange[1])}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                {t("filters.arrivalIn", "Arrival in")}
              </h3>
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={24}
                  step={1}
                  value={arrivalRange}
                  onValueChange={setArrivalRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(arrivalRange[0])}</span>
                  <span>{formatTime(arrivalRange[1])}</span>
                </div>
              </div>
            </div>
          </div>
          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">
              {t("filters.stops", "Stops")}
            </h3>
            <div className="space-y-2">
              {stops.map((stop) => (
                <div key={stop.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={stop.id}
                    checked={selectedStops.includes(stop.id)}
                    onCheckedChange={(checked) => {
                      setSelectedStops(
                        checked
                          ? [...selectedStops, stop.id]
                          : selectedStops.filter((s) => s !== stop.id)
                      );
                    }}
                  />
                  <Label htmlFor={stop.id} className="flex-1">
                    {stop.name}{" "}
                    <span className="text-muted-foreground">
                      ({stop.count})
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
          <Button
            className="w-full h-12 button-gradient rounded-lg"
            onClick={handleFiltersChange}
          >
            {t("filters.showTrips", "Show trips")} ({totalTrips})
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
