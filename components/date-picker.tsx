"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSearchStore from "@/store";

export function DatePicker({ field }: { field: any }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { setDepartureDate } = useSearchStore();
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
          // onch
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
