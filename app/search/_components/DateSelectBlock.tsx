"use client";

import type React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  format,
  addDays,
  subDays,
  parse,
  isValid,
  type Locale,
  startOfDay,
  isBefore,
  isSameDay,
} from "date-fns";
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
  isLoading?: boolean;
}

const DateButton: React.FC<DateButtonProps> = ({
  date,
  isSelected,
  onClick,
  departureDate,
  outboundTicket,
  currentLocale,
  tripType,
  isLoading = false,
}) => {
  const today = startOfDay(new Date());
  const buttonDate = startOfDay(new Date(date));

  const isDisabled = useMemo(() => {
    if (isLoading) return true;
    if (buttonDate < today) return true;
    if (
      tripType === "round-trip" &&
      outboundTicket &&
      isBefore(date, departureDate)
    )
      return true;
    return false;
  }, [
    isLoading,
    buttonDate,
    today,
    tripType,
    outboundTicket,
    date,
    departureDate,
  ]);

  return (
    <Button
      variant="outline"
      className={cn(
        "flex-1 h-12 rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 text-gray-700",
        {
          "border-b-2 border-b-primary-accent": isSelected,
          "border-gray-200": !isSelected && !isDisabled,
          "opacity-50 cursor-not-allowed hover:bg-white": isDisabled,
        }
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      <span className="font-medium text-sm">
        {format(date, "EEE, LLL dd", { locale: currentLocale })}
      </span>
    </Button>
  );
};

export function DateSelectBlock() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { i18n } = useTranslation();
  const {
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    tripType,
  } = useSearchStore();
  const { outboundTicket, isSelectingReturn } = useCheckoutStore();
  const { setIsLoading, isLoading } = useLoadingStore();

  // Determine which date we're working with
  const isWorkingWithReturn =
    tripType === "round-trip" && (outboundTicket || isSelectingReturn);
  const currentDateString = isWorkingWithReturn ? returnDate : departureDate;

  // Parse current date with validation
  const parsedCurrentDate = useMemo(() => {
    if (currentDateString) {
      const parsed = parse(currentDateString, "dd-MM-yyyy", new Date());
      return isValid(parsed) ? parsed : new Date();
    }
    return new Date();
  }, [currentDateString]);

  const parsedDepartureDate = useMemo(() => {
    if (departureDate) {
      const parsed = parse(departureDate, "dd-MM-yyyy", new Date());
      return isValid(parsed) ? parsed : new Date();
    }
    return new Date();
  }, [departureDate]);

  const [selectedDate, setSelectedDate] = useState<Date>(parsedCurrentDate);

  const currentLocale =
    LOCALE_MAP[i18n.language as keyof typeof LOCALE_MAP] || enUS;

  // Generate the three dates (previous, current, next)
  const dates = useMemo(() => {
    return [subDays(selectedDate, 1), selectedDate, addDays(selectedDate, 1)];
  }, [selectedDate]);

  // Sync with store changes
  useEffect(() => {
    if (!isSameDay(parsedCurrentDate, selectedDate)) {
      setSelectedDate(parsedCurrentDate);
    }
  }, [parsedCurrentDate, selectedDate]);

  const handleDateSelect = useCallback(
    (date: Date) => {
      // Prevent selecting invalid dates
      const today = startOfDay(new Date());
      if (isBefore(date, today)) return;

      if (isWorkingWithReturn && isBefore(date, parsedDepartureDate)) return;

      setSelectedDate(date);
      setIsLoading(true);

      const formattedDate = format(date, "dd-MM-yyyy");
      const currentParams = new URLSearchParams(searchParams.toString());

      if (isWorkingWithReturn) {
        setReturnDate(formattedDate);
        currentParams.set("returnDate", formattedDate);
      } else {
        setDepartureDate(formattedDate);
        currentParams.set("departureDate", formattedDate);
      }

      const newPathname = window.location.pathname.split("?")[0];
      const newURL = `${newPathname}?${currentParams.toString()}`;

      router.push(newURL, { scroll: false });
    },
    [
      isWorkingWithReturn,
      parsedDepartureDate,
      searchParams,
      setReturnDate,
      setDepartureDate,
      router,
      setIsLoading,
    ]
  );

  return (
    <div className="flex flex-col space-y-4 max-w-2xl mx-auto mt-6 w-full">
      {/* Simple three-button layout like FlixBus */}
      <div className="flex gap-2 px-4 sm:px-0">
        {isLoading
          ? // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="flex-1 h-12 rounded-lg border bg-white border-gray-100 flex items-center justify-center"
              >
                <Skeleton className="h-4 w-24" />
              </Skeleton>
            ))
          : // Date buttons
            dates.map((date) => (
              <DateButton
                key={date.toISOString()}
                outboundTicket={outboundTicket}
                tripType={tripType || "one-way"}
                date={date}
                currentLocale={currentLocale}
                isSelected={isSameDay(date, selectedDate)}
                onClick={() => handleDateSelect(date)}
                departureDate={parsedDepartureDate}
                isLoading={isLoading}
              />
            ))}
      </div>
    </div>
  );
}
