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
import useIsMobile from "../../../components/hooks/use-mobile";
import PassengerSelectDialog from "../../../components/dialogs/PassengersDialog";
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
        <Button
          variant="outline"
          className="w-full h-12 flex items-center justify-start bg-primary-bg/5 rounded-lg border-none ring-0"
          onClick={() => setIsDialogOpen(true)}
        >
          <User2 className="w-6 h-6 text-primary mr-2" />
          <span className="font-medium">
            {passengers.adults > 1
              ? `${passengers.adults} ${t("orderSummary.adults")}`
              : `${passengers.adults} ${t("passengerInfo.adult")}`}
            {passengers.children > 0 &&
              `, ${passengers.children} ${
                passengers.children > 1
                  ? t("orderSummary.children")
                  : t("passengerInfo.child")
              }`}
          </span>
        </Button>

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
        className="outline-none h-12 hover:bg-accent bg-primary-bg/5 rounded-lg border-none ring-0 transition-colors text-base truncate"
        aria-label="Select number of passengers"
      >
        <div className="flex items-center">
          <User2 className="w-4 h-4 text-primary mr-2" />
          {passengers.adults > 1
            ? `${passengers.adults} ${t("orderSummary.adults")}`
            : `${passengers.adults} ${t("passengerInfo.adult")}`}
          {passengers.children > 0 &&
            `, ${passengers.children} ${
              passengers.children > 1
                ? t("orderSummary.children")
                : t("passengerInfo.child")
            }`}
        </div>
      </SelectTrigger>

      <SelectContent className="w-[320px] p-4">
        <div className="space-y-6">
          {/* Adults Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-base">
                  {t("orderSummary.adults")}
                </h3>
                {/* <p className="text-sm text-gray-500">Aged 16+</p> */}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-gray-200"
                  onClick={() => decrementPassengers("adults")}
                  disabled={passengers.adults <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">
                  {passengers.adults}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-gray-200"
                  onClick={() => incrementPassengers("adults")}
                  disabled={passengers.adults >= 9}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Children Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-base">
                  {t("orderSummary.children")}
                </h3>
                <p className="text-sm text-gray-500">
                  {" "}
                  {t("passengerSelect.aged")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-gray-200"
                  onClick={() => decrementPassengers("children")}
                  disabled={passengers.children <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">
                  {passengers.children}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-gray-200"
                  onClick={() => incrementPassengers("children")}
                  disabled={passengers.children >= 9}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              {t("passengerSelect.description")}
            </p>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
}
