import * as React from "react";
import { format, parse, isSameDay, isValid } from "date-fns";
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

function DatePickerComponent({
  isReturnDate = false,
}: {
  isReturnDate?: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { departureDate, setDepartureDate, returnDate, setReturnDate } =
    useSearchStore();
  const path = usePathname();

  const urlDateParam = searchParams?.get(
    isReturnDate ? "returnDate" : "departureDate"
  );

  const initialDate = urlDateParam
    ? parse(urlDateParam, "dd-MM-yyyy", new Date())
    : new Date();

  const [date, setDate] = React.useState<Date | undefined>(
    isValid(initialDate) ? initialDate : undefined
  );

  React.useEffect(() => {
    const storeDate = isReturnDate ? returnDate : departureDate;
    if (storeDate) {
      const parsedDate = parse(storeDate, "dd-MM-yyyy", new Date());
      if (isValid(parsedDate) && (!date || !isSameDay(parsedDate, date))) {
        setDate(parsedDate);
      }
    }
  }, [isReturnDate ? returnDate : departureDate]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (
      selectedDate &&
      isValid(selectedDate) &&
      (!date || !isSameDay(selectedDate, date))
    ) {
      setDate(selectedDate);

      const formattedDate = format(selectedDate, "dd-MM-yyyy");
      if (isReturnDate) {
        setReturnDate(formattedDate);
      } else {
        setDepartureDate(formattedDate);
      }
      localStorage.setItem(
        isReturnDate ? "returnDate" : "departureDate",
        formattedDate
      );

      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set(
        isReturnDate ? "returnDate" : "departureDate",
        formattedDate
      );

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
          variant={"outline"}
          className={cn(
            "w-full h-14 justify-start text-left text-base font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
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

export function DatePicker({
  isReturnDate = false,
}: {
  isReturnDate?: boolean;
}) {
  return <DatePickerComponent isReturnDate={isReturnDate} />;
}
