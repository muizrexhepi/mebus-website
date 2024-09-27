import * as React from "react";
import { addDays, format, parse, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSearchStore from "@/store";

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DateRangePicker({ className }: DateRangePickerProps) {
  const { setReturnDate, setDepartureDate } = useSearchStore();

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    const savedDepartureDate = localStorage.getItem("departureDate");
    const savedReturnDate = localStorage.getItem("returnDate");
    if (savedDepartureDate) {
      const from = parse(savedDepartureDate, "dd-MM-yyyy", new Date());
      let to: Date | undefined;
      if (savedReturnDate) {
        to = parse(savedReturnDate, "dd-MM-yyyy", new Date());
      }
      return isValid(from)
        ? { from, to: isValid(to) ? to : undefined }
        : undefined;
    }
    return undefined;
  });

  const handleDateSelect: SelectRangeEventHandler = (
    range: DateRange | undefined
  ) => {
    setDate(range);
    if (range?.from) {
      const departureDate = format(range.from, "dd-MM-yyyy");
      setDepartureDate(departureDate);
      localStorage.setItem("departureDate", departureDate);
      if (range.to) {
        const returnDate = format(range.to, "dd-MM-yyyy");
        setReturnDate(returnDate);
        localStorage.setItem("returnDate", returnDate);
      } else {
        setReturnDate(null);
        localStorage.removeItem("returnDate");
      }
    } else {
      setDepartureDate(null);
      setReturnDate(null);
      localStorage.removeItem("departureDate");
      localStorage.removeItem("returnDate");
    }
  };

  const buttonText = React.useMemo(() => {
    if (date?.from) {
      return date.to
        ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
        : format(date.from, "LLL dd, y");
    }
    return "Pick a date";
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="w-full h-14 flex items-center justify-start"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{buttonText}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
