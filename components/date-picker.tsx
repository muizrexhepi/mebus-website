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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import useIsMobile from "./hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const urlDateParam = searchParams?.get(
    isReturnDate ? "returnDate" : "departureDate"
  );

  const [date, setDate] = React.useState<Date | undefined>(() => {
    const storedDate = localStorage.getItem(
      isReturnDate ? "returnDate" : "departureDate"
    );
    if (storedDate) {
      const parsedDate = parse(storedDate, "dd-MM-yyyy", new Date());
      return isValid(parsedDate) ? parsedDate : undefined;
    }
    return urlDateParam
      ? parse(urlDateParam, "dd-MM-yyyy", new Date())
      : undefined;
  });

  React.useEffect(() => {
    const storeDate = isReturnDate ? returnDate : departureDate;
    if (storeDate) {
      const parsedDate = parse(storeDate, "dd-MM-yyyy", new Date());
      if (isValid(parsedDate) && (!date || !isSameDay(parsedDate, date))) {
        setDate(parsedDate);
        localStorage.setItem(
          isReturnDate ? "returnDate" : "departureDate",
          storeDate
        );
      }
    }
  }, [isReturnDate ? returnDate : departureDate, date]);

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
    if (isMobile) {
      setIsDialogOpen(false);
    }
  };

  const buttonText = date ? format(date, "LLL dd, y") : "Pick a date";

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          className="w-full h-14 flex items-center justify-start"
          onClick={() => setIsDialogOpen(true)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{buttonText}</span>
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px] py-20 h-full sm:h-auto flex flex-col px-0">
            <DialogHeader className="space-y-4 h-fit px-4">
              <DialogTitle>
                Select {isReturnDate ? "Return" : "Departure"} Date
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-grow">
              <div className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="w-full"
                />
              </div>
            </ScrollArea>
            <DialogFooter>
              <div className="p-4 absolute bottom-4 left-0 w-full border-t">
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  className="w-full"
                >
                  Confirm
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-14 flex items-center justify-start"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{buttonText}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
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

export default DatePicker;
