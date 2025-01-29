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
import { cn } from "@/lib/utils";

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
    variant={"ghost"}
    className={cn("flex-1 h-10 rounded-none", {
      "pointer-events-none": isSelected,
    })}
    disabled={
      (tripType === "round-trip" && outboundTicket && date < departureDate) ||
      date < new Date()
    }
    onClick={onClick}
  >
    <div className="flex flex-col items-center">
      <span
        className={cn("text-sm sm:text-base md:text-lg font-medium", {
          "button-gradient bg-clip-text text-transparent": isSelected,
        })}
      >
        {format(date, "E, LLL dd", { locale: currentLocale })}
      </span>
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
  const { setIsLoading, isLoading } = useLoadingStore();
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
        setIsLoading(false);
      }
    }
  }, [departureDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsLoading(true);
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
    <div className="flex flex-col space-y-2 max-w-2xl mx-auto mt-4 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-between flex-1 border rounded-r-lg bg-white py-2 rounded-l-lg divide-x sm:px-8 md:px-2 mx-4 sm:mx-8 md:mx-auto overflow-x-auto">
          {dates.map((date) =>
            isLoading ? (
              <Skeleton className="h-10 w-full bg-white rounded-none">
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
