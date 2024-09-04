"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSearchStore from "@/store";

interface DateRangePickerProps {
  className?: string;
  field: any;
}

export function DateRangePicker({ className, field }: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 10),
  });

  const { setReturnDate } = useSearchStore();

  React.useEffect(() => {
    if (date?.from && date.to) {
      const formattedRange = `${format(date.from, "P")} - ${format(
        date.to,
        "P"
      )}`;
      setReturnDate(formattedRange);
      field.onChange(formattedRange);
    }
  }, [date, setReturnDate]);

  const handleDateRangeSelect = (selectedDate: DateRange | undefined) => {
    if (selectedDate?.from && selectedDate.to) {
      const formattedRange = `${format(selectedDate.from, "P")} - ${format(
        selectedDate.to,
        "P"
      )}`;
      field.onChange(formattedRange);
      setDate(selectedDate);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date-range"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal h-14 text-base w-full",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-5 w-5" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateRangeSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
