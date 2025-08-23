"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import useSearchStore from "@/store";
import { useState } from "react";
import useIsMobile from "../../../components/hooks/use-mobile";
import PassengerSelectDialog from "../../../components/dialogs/PassengersDialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";

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

  const getPassengerText = () => {
    const adultText =
      passengers.adults > 1
        ? `${passengers.adults} ${t("orderSummary.adults")}`
        : `${passengers.adults} ${t("passengerInfo.adult")}`;

    const childText =
      passengers.children > 0
        ? `, ${passengers.children} ${
            passengers.children > 1
              ? t("orderSummary.children")
              : t("passengerInfo.child")
          }`
        : "";

    return adultText + childText;
  };

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          className="w-full h-14 flex items-center justify-start bg-primary-bg/5 rounded-lg text-base border-none ring-0"
          onClick={() => setIsDialogOpen(true)}
        >
          <FaUser className="size-4 mr-2 text-primary-accent" />
          <span className="font-normal truncate">{getPassengerText()}</span>
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
        className="outline-none h-12 hover:bg-accent bg-primary-bg/5 rounded-lg border-none ring-0 transition-colors text-base truncate px-4"
        aria-label="Select number of passengers"
      >
        <div className="flex items-center min-w-0 flex-1">
          <FaUser className="size-4 mr-2 text-primary-accent shrink-0" />
          <span className="font-normal text-base truncate">
            {getPassengerText()}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent className="w-[320px] p-4">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-base">
                  {t("orderSummary.adults")}
                </h3>
                <p className="text-sm text-gray-500">
                  {t("passengerSelect.adultAge", "Age 12+")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-gray-200 bg-transparent"
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
                  className="h-10 w-10 rounded-lg border-gray-200 bg-transparent"
                  onClick={() => incrementPassengers("adults")}
                  disabled={passengers.adults >= 9}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-base">
                  {t("orderSummary.children")}
                </h3>
                <p className="text-sm text-gray-500">
                  {t("passengerSelect.aged", "Age 2-11")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-gray-200 bg-transparent"
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
                  className="h-10 w-10 rounded-lg border-gray-200 bg-transparent"
                  onClick={() => incrementPassengers("children")}
                  disabled={passengers.children >= 9}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-sm text-gray-500">
              {t(
                "passengerSelect.description",
                "Children under 2 travel free and don't need a separate seat."
              )}
            </p>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
}
