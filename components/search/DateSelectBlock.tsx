"use client";

import React, { useState, useEffect } from "react";
import { format, addDays, subDays, parse, isValid } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import useSearchStore from "@/store";

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
      isSelected
        ? "bg-emerald-700 text-primary-foreground pointer-events-none"
        : ""
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
  const { departureDate, setDepartureDate } = useSearchStore();

  const urlDateParam = searchParams?.get("departureDate");
  const initialDate = urlDateParam
    ? parse(urlDateParam, "dd-MM-yyyy", new Date())
    : new Date();

  // Ensure the initial date is valid
  const validInitialDate = isValid(initialDate) ? initialDate : new Date();

  const [dates, setDates] = useState<Date[]>([
    subDays(validInitialDate, 1),
    validInitialDate,
    addDays(validInitialDate, 1),
  ]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    departureDate ? new Date(departureDate) : validInitialDate
  );

  useEffect(() => {
    if (departureDate) {
      const parsedDate = parse(departureDate, "dd-MM-yyyy", new Date());
      if (isValid(parsedDate)) {
        setSelectedDate(parsedDate); // Ensure it's a valid Date object
      }
    }
  }, [departureDate]);

  useEffect(() => {
    if (selectedDate) {
      const newDates = [
        subDays(selectedDate, 1),
        selectedDate,
        addDays(selectedDate, 1),
      ];
      setDates(newDates.filter(isValid)); // Filter invalid dates
    }
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "dd-MM-yyyy");
    setDepartureDate(formattedDate); // Assuming setDepartureDate expects a string

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("departureDate", formattedDate);

    const newPathname = window.location.pathname.split("?")[0];
    const newURL = `${newPathname}?${currentParams.toString()}`;

    router.push(newURL, { scroll: false });
  };

  return (
    <div className="flex flex-col space-y-2 max-w-4xl mx-auto mt-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 flex justify-between space-x-2">
          {dates.map((date) => (
            <DateButton
              key={date.toISOString()}
              date={date}
              isSelected={date.toDateString() === selectedDate?.toDateString()}
              onClick={() => handleDateSelect(date)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
