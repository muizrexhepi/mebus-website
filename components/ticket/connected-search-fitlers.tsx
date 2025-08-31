"use client";

import { useEffect, useState, useMemo } from "react";
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
import moment from "moment-timezone";
import { ConnectedTicket } from "@/models/connected-ticket";

interface ConnectedSearchFiltersProps {
  tickets: ConnectedTicket[];
  onFiltersChange: (filteredTickets: ConnectedTicket[]) => void;
  totalTrips: number;
}

export default function ConnectedSearchFilters({
  tickets,
  onFiltersChange,
  totalTrips,
}: ConnectedSearchFiltersProps) {
  const { t } = useTranslation();

  const [sortBy, setSortBy] = useState("departure");
  const [transfers, setTransfers] = useState<string[]>([]);
  const [departureRange, setDepartureRange] = useState([0, 24]);
  const [arrivalRange, setArrivalRange] = useState([0, 24]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);

  // Calculate price range and operators from tickets without conversion
  const [ticketPriceRange, operators] = useMemo(() => {
    if (tickets.length === 0) return [[0, 1000], []];

    const prices = tickets.map((ticket) => ticket.total_price);
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));
    const operatorSet = new Set<string>();
    tickets.forEach((ticket) => {
      ticket.legs.forEach((leg) => {
        operatorSet.add(leg.operator.name);
      });
    });

    return [[minPrice, maxPrice], Array.from(operatorSet)];
  }, [tickets]);

  useEffect(() => {
    setPriceRange(ticketPriceRange as [number, number]);
  }, [ticketPriceRange]);

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
      if (!ticket.legs || ticket.legs.length === 0) return false;

      const firstLeg = ticket.legs[0];
      const lastLeg = ticket.legs[ticket.legs.length - 1];

      const departureTime = moment.utc(firstLeg.departure_date);
      const arrivalTime = moment.utc(lastLeg.arrival_time);

      const isDepartureInRange = isTimeInRange(departureTime, departureRange);
      const isArrivalInRange = isTimeInRange(arrivalTime, arrivalRange);

      return isDepartureInRange && isArrivalInRange;
    });

    if (transfers.length > 0) {
      filteredTickets = filteredTickets.filter((ticket) => {
        const transferCount = Math.max(0, ticket.legs.length - 1);

        if (transfers.includes("direct") && transferCount === 0) return true;
        if (transfers.includes("one") && transferCount === 1) return true;
        if (transfers.includes("twoPlus") && transferCount >= 2) return true;

        return false;
      });
    }

    // Price filtering now uses ticket.total_price directly (assumed EUR)
    filteredTickets = filteredTickets.filter((ticket) => {
      const price = ticket.total_price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (selectedOperators.length > 0) {
      filteredTickets = filteredTickets.filter((ticket) => {
        return ticket.legs.some((leg) =>
          selectedOperators.includes(leg.operator.name)
        );
      });
    }

    filteredTickets.sort((a, b) => {
      switch (sortBy) {
        case "departure": {
          const aDeparture = moment.utc(a.legs[0].departure_date);
          const bDeparture = moment.utc(b.legs[0].departure_date);
          return aDeparture.valueOf() - bDeparture.valueOf();
        }
        case "price": {
          const aPrice = a.total_price;
          const bPrice = b.total_price;
          return aPrice - bPrice;
        }
        case "duration": {
          const aDuration = Math.abs(a.total_duration);
          const bDuration = Math.abs(b.total_duration);
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
    priceRange,
    selectedOperators,
  });

  const handleApplyFilters = () => {
    const filteredTickets = filterAndSortTickets();
    onFiltersChange(filteredTickets);
    setPreviousFilters({
      sortBy,
      transfers,
      departureRange,
      arrivalRange,
      priceRange,
      selectedOperators,
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filteredTickets = filterAndSortTickets();
      onFiltersChange(filteredTickets);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    sortBy,
    transfers,
    departureRange,
    arrivalRange,
    priceRange,
    selectedOperators,
    tickets,
  ]);

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
      setSortBy(previousFilters.sortBy);
      setTransfers(previousFilters.transfers);
      setDepartureRange(previousFilters.departureRange);
      setArrivalRange(previousFilters.arrivalRange);
      setPriceRange(previousFilters.priceRange);
      setSelectedOperators(previousFilters.selectedOperators);
      const filteredTickets = filterAndSortTickets();
      onFiltersChange(filteredTickets);
    }
  };

  return (
    <Sheet onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 w-fit">
          <SlidersHorizontal className="h-4 w-4" />
          {t("filters.title", "Connected Filters")}
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 rounded-tl-xl rounded-bl-xl overflow-y-auto">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-lg font-medium">
            Connected Route Filters
          </SheetTitle>
        </SheetHeader>
        <div className="h-full">
          <div className="space-y-6 p-4">
            {/* Sort By */}
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

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  min={ticketPriceRange[0]}
                  max={ticketPriceRange[1]}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Transfers */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {t("filters.transfers", "Transfers")}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="direct-connected"
                    checked={transfers.includes("direct")}
                    onCheckedChange={(checked) => {
                      setTransfers(
                        checked
                          ? [...transfers, "direct"]
                          : transfers.filter((t) => t !== "direct")
                      );
                    }}
                  />
                  <Label htmlFor="direct-connected">
                    Direct connection (no transfers)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="one-transfer-connected"
                    checked={transfers.includes("one")}
                    onCheckedChange={(checked) => {
                      setTransfers(
                        checked
                          ? [...transfers, "one"]
                          : transfers.filter((t) => t !== "one")
                      );
                    }}
                  />
                  <Label htmlFor="one-transfer-connected">
                    1 {t("filters.transfer", "Transfer")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="two-plus-transfers-connected"
                    checked={transfers.includes("twoPlus")}
                    onCheckedChange={(checked) => {
                      setTransfers(
                        checked
                          ? [...transfers, "twoPlus"]
                          : transfers.filter((t) => t !== "twoPlus")
                      );
                    }}
                  />
                  <Label htmlFor="two-plus-transfers-connected">
                    2+ {t("filters.transfers", "Transfers")}
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Operators */}
            {operators.length > 0 && (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Operators</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {operators.map((operator) => (
                      <div
                        key={operator}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`operator-${operator}`}
                          checked={selectedOperators.includes(operator)}
                          onCheckedChange={(checked) => {
                            setSelectedOperators(
                              checked
                                ? [...selectedOperators, operator]
                                : selectedOperators.filter(
                                    (op) => op !== operator
                                  )
                            );
                          }}
                        />
                        <Label
                          htmlFor={`operator-${operator}`}
                          className="text-sm"
                        >
                          {operator}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Departure Time */}
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

            {/* Arrival Time */}
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
              className="w-full button-gradient rounded-lg hover:bg-primary-bg h-12"
              onClick={handleApplyFilters}
            >
              {t("filters.showTrips", "Show connected trips")} ({totalTrips})
            </Button>
          </SheetTrigger>
        </div>
      </SheetContent>
    </Sheet>
  );
}
