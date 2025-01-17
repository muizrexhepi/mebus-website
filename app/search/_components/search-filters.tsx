"use client";

import { useEffect, useState } from "react";
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
import { Ticket } from "@/models/ticket";
import moment from "moment-timezone";

interface SearchFiltersProps {
  tickets: Ticket[];
  onFiltersChange: (filteredTickets: Ticket[]) => void;
  totalTrips: number;
}

export default function SearchFilters({
  tickets,
  onFiltersChange,
  totalTrips,
}: SearchFiltersProps) {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState("departure");
  const [transfers, setTransfers] = useState<string[]>([]);
  const [departureRange, setDepartureRange] = useState([0, 24]);
  const [arrivalRange, setArrivalRange] = useState([0, 24]);

  const formatTime = (hour: number) => {
    return `${String(hour).padStart(2, "0")}:00`;
  };

  const isTimeInRange = (time: moment.Moment, range: number[]) => {
    const hour = time.hour();
    const minute = time.minute();
    const timeInHours = hour + minute / 60;

    return timeInHours >= range[0] && timeInHours <= range[1];
  };

  const filterAndSortTickets = () => {
    let filteredTickets = [...tickets];

    filteredTickets = filteredTickets.filter((ticket) => {
      if (!ticket.stops || ticket.stops.length === 0) return false;

      const departureTime = moment.utc(ticket.stops[0].departure_date);
      const isDepartureInRange = isTimeInRange(departureTime, departureRange);

      const lastStop = ticket.stops[ticket.stops.length - 1];
      const arrivalTime = moment.utc(lastStop.arrival_time);
      const isArrivalInRange = isTimeInRange(arrivalTime, arrivalRange);

      return isDepartureInRange && isArrivalInRange;
    });

    if (transfers.length > 0) {
      filteredTickets = filteredTickets.filter((ticket) => {
        const stopCount = Math.max(0, ticket.stops.length - 1);
        if (transfers.includes("direct") && stopCount === 0) return true;
        if (transfers.includes("one") && stopCount === 1) return true;
        if (transfers.includes("twoPlus") && stopCount >= 2) return true;
        return false;
      });
    }

    filteredTickets.sort((a, b) => {
      switch (sortBy) {
        case "departure": {
          const aDeparture = moment.utc(a.stops[0].departure_date);
          const bDeparture = moment.utc(b.stops[0].departure_date);
          return aDeparture.valueOf() - bDeparture.valueOf();
        }
        case "duration": {
          const aDeparture = moment.utc(a.stops[0].departure_date);
          const aArrival = moment.utc(a.stops[a.stops.length - 1].arrival_time);
          const aDuration = aArrival.diff(aDeparture);

          const bDeparture = moment.utc(b.stops[0].departure_date);
          const bArrival = moment.utc(b.stops[b.stops.length - 1].arrival_time);
          const bDuration = bArrival.diff(bDeparture);

          return aDuration - bDuration;
        }
        default:
          return 0;
      }
    });

    return filteredTickets;
  };

  const [previousFilters, setPreviousFilters] = useState({
    sortBy,
    transfers,
    departureRange,
    arrivalRange,
  });

  const handleApplyFilters = () => {
    const filteredTickets = filterAndSortTickets();
    onFiltersChange(filteredTickets);
    setPreviousFilters({
      sortBy,
      transfers,
      departureRange,
      arrivalRange,
    });
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filteredTickets = filterAndSortTickets();
      onFiltersChange(filteredTickets);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [sortBy, transfers, departureRange, arrivalRange, tickets]);

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
      setSortBy(previousFilters.sortBy);
      setTransfers(previousFilters.transfers);
      setDepartureRange(previousFilters.departureRange);
      setArrivalRange(previousFilters.arrivalRange);
      const filteredTickets = filterAndSortTickets();
      onFiltersChange(filteredTickets);
    }
  };
  return (
    <Sheet onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 w-fit">
          <SlidersHorizontal className="h-4 w-4" />
          {t("filters.title", "Filters")}
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 w-full sm:rounded-l-xl overflow-y-auto">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-xl font-semibold">
            {t("filters.title", "Filters")}
          </SheetTitle>
        </SheetHeader>
        <div className=" h-full">
          <div className="space-y-6 p-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {t("filters.sortBy", "Sort by")}
              </h3>
              <RadioGroup
                value={sortBy}
                onValueChange={setSortBy}
                className="space-y-2"
              >
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
                    {t("filters.price", "Price")} (
                    {t("filters.lowest", "Lowest")})
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
              <h3 className="text-lg font-semibold">
                {t("filters.transfers", "Transfers")}
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
              <h3 className="text-lg font-semibold">
                {t("filters.departureTime", "Departure time")}
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

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {t("filters.arrivalTime", "Arrival time")}
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
        </div>
        <div className="border-t p-4 sticky bottom-0 bg-white">
          <SheetTrigger asChild>
            <Button
              className="w-full bg-primary-bg hover:bg-primary-bg h-12"
              onClick={handleApplyFilters}
            >
              {t("filters.showTrips", "Show trips")} ({totalTrips})
            </Button>
          </SheetTrigger>
        </div>
      </SheetContent>
    </Sheet>
  );
}
