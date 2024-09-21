"use client";

import React, { useState, useEffect } from "react";
import { format, addDays, subDays, parse } from "date-fns"; // Add parse for custom date formats
import { Button } from "@/components/ui/button";
import useSearchStore, { useLoadingStore } from "@/store";
import DateSelectSkeleton from "./DateSelectSkeleton";
import { useRouter, useSearchParams } from "next/navigation";

interface DateButtonProps {
  date: Date;
  isSelected: boolean;
  onClick: () => void;
}

const DateButton: React.FC<DateButtonProps> = ({
  date,
  isSelected,
  onClick,
}) => (
  <Button
    variant={isSelected ? "default" : "outline"}
    className={`flex-1 py-2 px-4 h-20 ${
      isSelected ? "bg-emerald-700 text-primary-foreground" : ""
    }`}
    onClick={onClick}
  >
    <div className="flex flex-col items-center">
      <span className="text-sm sm:text-base md:text-lg font-medium sm:font-bold">
        {format(date, "EEEE")}
      </span>
      <span className="text-sm hidden sm:block sm:text-base md:text-lg font-medium sm:font-bold">
        {format(date, "PP")}
      </span>
      <span className="text-sm sm:text-base sm:hidden md:text-lg font-medium sm:font-bold">
        {format(date, "P")}
      </span>
    </div>
  </Button>
);

export function DateSelectBlock() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlDateParam = searchParams?.get("departureDate");
  const initialDate = urlDateParam
    ? parse(urlDateParam, "dd-MM-yyyy", new Date())
    : new Date();

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [dates, setDates] = useState<Date[]>([
    subDays(initialDate, 1),
    initialDate,
    addDays(initialDate, 1),
  ]);

  const { isLoading, setIsLoading } = useLoadingStore();
  const { setDepartureDate } = useSearchStore();

  useEffect(() => {
    const formattedDate = format(selectedDate, "dd-MM-yyyy");
    setDepartureDate(formattedDate);

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("departureDate", formattedDate);

    const newPathname = window.location.pathname.split("?")[0];
    const newURL = `${newPathname}?${currentParams.toString()}`;
    if (window.location.href !== newURL) {
      router.push(newURL, { scroll: false });
    }
  }, [selectedDate, router, searchParams]);

  const handleDateSelect = (date: Date) => {
    setIsLoading(true);
    setSelectedDate(date);
    setDates([subDays(date, 1), date, addDays(date, 1)]);
  };

  return (
    <div className="flex flex-col space-y-2 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        {isLoading ? (
          <DateSelectSkeleton />
        ) : (
          <div className="flex-1 flex justify-between space-x-2">
            {dates.map((date) => (
              <DateButton
                key={date.toISOString()}
                date={date}
                isSelected={date.toDateString() === selectedDate.toDateString()}
                onClick={() => handleDateSelect(date)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
