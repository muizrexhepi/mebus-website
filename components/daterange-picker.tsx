import * as React from "react";
import { addDays, format, parse, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSearchStore from "@/store";
import useIsMobile from "./hooks/use-mobile";
import DateRangePickerDialog from "./dialogs/DateRangePickerDialog";

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  updateUrl?: boolean;
}

export function DateRangePicker({
  className,
  updateUrl = false,
}: DateRangePickerProps) {
  const {
    setReturnDate,
    setDepartureDate,
    returnDate,
    departureDate,
    tripType,
  } = useSearchStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    if (tripType === "round-trip") {
      const today = new Date();
      const defaultReturnDate = addDays(today, 7);
      setDepartureDate(format(today, "dd-MM-yyyy"));
      setReturnDate(format(defaultReturnDate, "dd-MM-yyyy"));
      return { from: today, to: defaultReturnDate };
    }

    if (departureDate) {
      const from = parse(departureDate, "dd-MM-yyyy", new Date());
      let to: Date | undefined;
      if (returnDate) {
        to = parse(returnDate, "dd-MM-yyyy", new Date());
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
      const departureDateStr = format(range.from, "dd-MM-yyyy");
      setDepartureDate(departureDateStr);
      if (range.to) {
        const returnDateStr = format(range.to, "dd-MM-yyyy");
        setReturnDate(returnDateStr);
      } else {
        setReturnDate(null);
      }

      if (updateUrl) {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set("departureDate", departureDateStr);
        if (range.to) {
          currentParams.set("returnDate", format(range.to, "dd-MM-yyyy"));
        } else {
          currentParams.delete("returnDate");
        }
        const newPathname = `${
          window.location.pathname
        }?${currentParams.toString()}`;
        router.push(newPathname, { scroll: false });
      }
    } else {
      setDepartureDate(null);
      setReturnDate(null);
      if (updateUrl) {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete("departureDate");
        currentParams.delete("returnDate");
        const newPathname = `${
          window.location.pathname
        }?${currentParams.toString()}`;
        router.push(newPathname, { scroll: false });
      }
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

  if (isMobile) {
    return (
      <div className={cn("grid gap-2 w-full", className)}>
        <Button
          variant="outline"
          className="w-full h-14 flex items-center justify-start bg-primary-bg/5 rounded-xl border-none ring-0"
          onClick={() => setIsDialogOpen(true)}
        >
          <CalendarIcon className="mr-2 h-6 w-6 shrink-0" />
          <span className="truncate font-medium">{buttonText}</span>
        </Button>
        <DateRangePickerDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          date={date}
          onSelect={handleDateSelect}
        />
      </div>
    );
  }

  return (
    <div className={cn("grid gap-2 w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-14 flex items-center justify-start !truncate bg-primary-bg/5 rounded-xl border-none ring-0"
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">{buttonText}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={handleDateSelect}
            className="w-fit"
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
