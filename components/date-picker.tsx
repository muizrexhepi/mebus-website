"use client";

import * as React from "react";
import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSearchStore from "@/store";
import { Suspense } from "react"; // Import Suspense

function DatePickerComponent({ field }: { field: any }) {
  const searchParams = useSearchParams();
  const { setDepartureDate } = useSearchStore();

  const urlDateParam = searchParams?.get("departureDate");
  const initialDate = urlDateParam
    ? parse(urlDateParam, "dd-MM-yyyy", new Date())
    : new Date();

  const [date, setDate] = React.useState<Date | undefined>(initialDate);

  React.useEffect(() => {
    if (urlDateParam) {
      const parsedDate = parse(urlDateParam, "dd-MM-yyyy", new Date());
      setDate(parsedDate);
    }
  }, [urlDateParam]);

  React.useEffect(() => {
    if (date) {
      const formattedDate = format(date, "dd-MM-yyyy");
      setDepartureDate(formattedDate);
      field.onChange(formattedDate);
    }
  }, [date, setDepartureDate]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "dd-MM-yyyy");
      field.onChange(formattedDate);
      setDate(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "justify-start text-left font-normal h-14 text-base w-full",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// Wrap DatePickerComponent with Suspense
export function DatePicker({ field }: { field: any }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DatePickerComponent field={field} />
    </Suspense>
  );
}
