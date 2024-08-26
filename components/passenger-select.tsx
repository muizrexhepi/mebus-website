"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSearchStore, { Passengers } from "@/store";

export default function PassengerSelect() {
  const { passengers, setPassengers } = useSearchStore();

  const incrementPassengers = (type: "adults" | "children") => {
    const updatedPassengers = { ...passengers };
    if (type === "adults") {
      updatedPassengers.adults = Math.min(passengers.adults + 1, 9);
    } else {
      updatedPassengers.children = Math.min(passengers.children + 1, 9);
    }
    setPassengers(updatedPassengers);
  };

  const decrementPassengers = (type: "adults" | "children") => {
    const updatedPassengers = { ...passengers };
    if (type === "adults") {
      updatedPassengers.adults = Math.max(passengers.adults - 1, 1);
    } else {
      updatedPassengers.children = Math.max(passengers.children - 1, 0);
    }
    setPassengers(updatedPassengers);
  };

  return (
    <Select>
      <SelectTrigger className="outline-none h-14 hover:bg-accent transition-colors text-base truncate">
        {passengers.adults > 1
          ? passengers.adults + " Adults"
          : passengers.adults + " Adult"}
        {passengers.children === 1
          ? ", " + passengers.children + " Child"
          : passengers.children > 1
          ? ", " + passengers.children + " Children"
          : ""}
        <SelectValue>
          Adults ({passengers.adults}), Children ({passengers.children})
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <div className="px-2">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm font-medium">Adults</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => decrementPassengers("adults")}
                disabled={passengers.adults <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2 w-8 text-center">{passengers.adults}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => incrementPassengers("adults")}
                disabled={passengers.adults >= 9}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">Children</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => decrementPassengers("children")}
                disabled={passengers.children <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2 w-8 text-center">
                {passengers.children}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => incrementPassengers("children")}
                disabled={passengers.children >= 9}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
}
