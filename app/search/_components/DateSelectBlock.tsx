"use client";

import React, { useState, useEffect } from "react";
import { format, addDays, subDays, parse, isValid, Locale } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import useSearchStore, { useCheckoutStore, useLoadingStore } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";
import { enUS } from "date-fns/locale";
import { LOCALE_MAP } from "@/lib/data";
import { useTranslation } from "react-i18next";

interface DateButtonProps {
  date: Date;
  isSelected: boolean;
  onClick: () => void;
  departureDate: Date;
  outboundTicket: any;
  currentLocale: Locale;
  tripType: string;
}

const DateButton: React.FC<DateButtonProps> = ({
  date,
  isSelected,
  onClick,
  departureDate,
  outboundTicket,
  currentLocale,
  tripType,
}) => (
  <Button
    variant={isSelected ? "default" : "outline"}
    className={`flex-1 py-2 px-4 h-14 rounded-lg ${
      isSelected
        ? "bg-primary-bg text-primary-foreground pointer-events-none"
        : ""
    }`}
    disabled={
      tripType === "round-trip" && outboundTicket && date < departureDate
    }
    onClick={onClick}
  >
    <div className="flex flex-col items-center">
      <span className="text-sm sm:text-base md:text-lg font-medium sm:font-bold">
        {format(date, "E, LLL dd", { locale: currentLocale })}
      </span>
      {/* <span className="text-sm hidden sm:block sm:text-base md:text-lg font-medium sm:font-bold">
        {format(date, "PP")}
      </span>
      <span className="text-sm sm:text-base sm:hidden md:text-lg font-medium sm:font-bold">
        {format(date, "P")}
      </span> */}
    </div>
  </Button>
);

export function DateSelectBlock() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    tripType,
  } = useSearchStore();
  const { outboundTicket } = useCheckoutStore();
  const { i18n } = useTranslation();
  const { isLoading } = useLoadingStore();
  const parsedDepartureDate = departureDate
    ? parse(departureDate, "dd-MM-yyyy", new Date())
    : new Date();

  const [selectedDate, setSelectedDate] = useState<Date>(
    tripType === "round-trip" && outboundTicket
      ? returnDate
        ? parse(returnDate, "dd-MM-yyyy", new Date())
        : parsedDepartureDate
      : parsedDepartureDate
  );

  const dates = [
    subDays(selectedDate, 1),
    selectedDate,
    addDays(selectedDate, 1),
  ];

  const currentLocale =
    LOCALE_MAP[i18n.language as keyof typeof LOCALE_MAP] || enUS;

  useEffect(() => {
    if (departureDate) {
      const parsedDate = parse(departureDate, "dd-MM-yyyy", new Date());
      if (
        isValid(parsedDate) &&
        parsedDate.getTime() !== selectedDate.getTime()
      ) {
        setSelectedDate(parsedDate);
      }
    }
  }, [departureDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "dd-MM-yyyy");
    const currentParams = new URLSearchParams(searchParams.toString());

    if (tripType === "round-trip" && outboundTicket) {
      setReturnDate(formattedDate);
      currentParams.set("returnDate", formattedDate);
    } else {
      setDepartureDate(formattedDate);
      currentParams.set("departureDate", formattedDate);
    }

    const newPathname = window.location.pathname.split("?")[0];
    const newURL = `${newPathname}?${currentParams.toString()}`;

    router.push(newURL, { scroll: false });
  };

  return (
    <div className="flex flex-col space-y-2 max-w-3xl mx-auto mt-4 w-full">
      <div className="flex justify-between items-center">
        <div className="flex justify-between flex-1 space-x-2 px-4 sm:px-8 md:px-0">
          {dates.map((date) =>
            isLoading ? (
              <Skeleton className="h-14 w-full bg-white border rounded-lg py-2 px-4">
                <div className="flex flex-col justify-center items-center h-full gap-2">
                  <Skeleton className="h-5 w-20 sm:w-32" />
                </div>
              </Skeleton>
            ) : (
              <DateButton
                key={date.toISOString()}
                outboundTicket={outboundTicket}
                tripType={tripType || "one-way"}
                date={date}
                currentLocale={currentLocale}
                isSelected={date.toDateString() === selectedDate.toDateString()}
                onClick={() => handleDateSelect(date)}
                departureDate={parsedDepartureDate}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
