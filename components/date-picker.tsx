"use client";

import * as React from "react";
import { format, parse, isSameDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSearchStore from "@/store";

function DatePickerComponent({ field }: { field: any }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { departureDate, setDepartureDate } = useSearchStore();
  const path = usePathname();

  const urlDateParam = searchParams?.get("departureDate");
  const initialDate = urlDateParam
    ? parse(urlDateParam, "dd-MM-yyyy", new Date())
    : new Date();

  const [date, setDate] = React.useState<Date | undefined>(initialDate);

  React.useEffect(() => {
    if (
      departureDate &&
      !isSameDay(parse(departureDate, "dd-MM-yyyy", new Date()), date!)
    ) {
      setDate(parse(departureDate, "dd-MM-yyyy", new Date()));
    }
  }, [departureDate]);

  React.useEffect(() => {
    if (date) {
      const formattedDate = format(date, "dd-MM-yyyy");
      setDepartureDate(formattedDate);
      field.onChange(formattedDate);
    }
  }, [date]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && !isSameDay(selectedDate, date!)) {
      setDate(selectedDate);

      const formattedDate = format(selectedDate, "dd-MM-yyyy");
      setDepartureDate(formattedDate);
      field.onChange(formattedDate);
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("departureDate", formattedDate);

      const newPathname = window.location.pathname.split("?")[0];
      const newURL = `${newPathname}?${currentParams.toString()}`;
      if (path !== "/") {
        router.push(newURL, { scroll: false });
      }
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
export function DatePicker({ field }: any) {
  return <DatePickerComponent field={field} />;
}
