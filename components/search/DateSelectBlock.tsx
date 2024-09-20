"use client";

import React, { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import useSearchStore, { useLoadingStore } from "@/store";
import DateSelectSkeleton from "./DateSelectSkeleton";

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
      <span className="text-lg font-bold">{format(date, "EEEE")}</span>
      <span className="text-lg font-bold">{format(date, "PP")}</span>
    </div>
  </Button>
);

export function DateSelectBlock() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<Date[]>([
    subDays(new Date(), 1),
    new Date(),
    addDays(new Date(), 1),
  ]);

  const { isLoading } = useLoadingStore();

  console.log({ isLoading });

  const { setDepartureDate } = useSearchStore();

  useEffect(() => {
    const formattedDate = format(selectedDate, "dd-MM-yyyy");
    setDepartureDate(formattedDate);
  }, [selectedDate, setDepartureDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const newDates = [subDays(date, 1), date, addDays(date, 1)];
    setDates(newDates);
  };

  return (
    <div className="flex flex-col space-y-2 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        {isLoading ? (
          <DateSelectSkeleton />
        ) : (
          <div className="flex-1 flex justify-between space-x-2">
            {dates.map((date, index) => (
              <DateButton
                key={date.toISOString()}
                date={date}
                isSelected={index === 1}
                onClick={() => handleDateSelect(date)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
