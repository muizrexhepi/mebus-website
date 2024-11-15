"use client";

import { Minus, Plus, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSearchStore from "@/store";
import { useState } from "react";
import useIsMobile from "./hooks/use-mobile";
import PassengerSelectDialog from "./dialogs/PassengersDialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

interface PassengerSelectProps {
  updateUrl?: boolean;
}

export default function PassengerSelect({
  updateUrl = false,
}: PassengerSelectProps) {
  const { passengers, setPassengers } = useSearchStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const updatePassengers = (updatedPassengers: typeof passengers) => {
    setPassengers(updatedPassengers);

    if (updateUrl) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("adult", updatedPassengers.adults.toString());
      currentParams.set("children", updatedPassengers.children.toString());
      const newPathname = `${
        window.location.pathname
      }?${currentParams.toString()}`;
      router.push(newPathname, { scroll: false });
    }
  };

  const incrementPassengers = (type: "adults" | "children") => {
    const updatedPassengers = { ...passengers };
    if (type === "adults") {
      updatedPassengers.adults = Math.min(passengers.adults + 1, 9);
    } else {
      updatedPassengers.children = Math.min(passengers.children + 1, 9);
    }
    updatePassengers(updatedPassengers);
  };

  const decrementPassengers = (type: "adults" | "children") => {
    const updatedPassengers = { ...passengers };
    if (type === "adults") {
      updatedPassengers.adults = Math.max(passengers.adults - 1, 1);
    } else {
      updatedPassengers.children = Math.max(passengers.children - 1, 0);
    }
    updatePassengers(updatedPassengers);
  };

  if (isMobile) {
    return (
      <>
        <div
          className="h-14 px-4 flex items-center border border-input bg-background text-sm ring-offset-background cursor-pointer rounded-lg"
          onClick={() => setIsDialogOpen(true)}
        >
          <User2 className="w-4 h-4 text-primary mr-2" />
          <span className="capitalize">
            {t("orderSummary.adults")} ({passengers.adults}),{" "}
            {t("orderSummary.children")} ({passengers.children})
          </span>
        </div>
        <PassengerSelectDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </>
    );
  }

  return (
    <Select>
      <SelectTrigger
        className="outline-none h-14 hover:bg-accent transition-colors text-base truncate"
        aria-label="Select number of passengers"
      >
        {passengers.adults > 1
          ? `${passengers.adults} ${t("orderSummary.adults")}`
          : `${passengers.adults} ${t("passengerInfo.adult")}`}
        {passengers.children > 0 &&
          `, ${passengers.children} ${
            passengers.children > 1
              ? t("orderSummary.children")
              : t("passengerInfo.child")
          }`}
      </SelectTrigger>

      <SelectContent>
        <div className="px-2">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm font-medium">
              {t("orderSummary.adults")}
            </span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => decrementPassengers("adults")}
                disabled={passengers.adults <= 1}
                aria-label="Decrease number of adults"
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
                aria-label="Increase number of adults"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">
              {t("orderSummary.children")}
            </span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => decrementPassengers("children")}
                disabled={passengers.children <= 0}
                aria-label="Decrease number of children"
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
                aria-label="Increase number of children"
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
