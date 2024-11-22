import * as React from "react";
import { format, parse, isSameDay, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function DatePicker({ updateUrl }: { updateUrl?: boolean }) {
  const router = useRouter();
  const { departureDate, setDepartureDate } = useSearchStore();
  const isMobile = useIsMobile();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (departureDate) {
      const parsedDate = parse(departureDate, "dd-MM-yyyy", new Date());
      if (isValid(parsedDate) && (!date || !isSameDay(parsedDate, date))) {
        setDate(parsedDate);
      }
    }
  }, [departureDate, date]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (
      selectedDate &&
      isValid(selectedDate) &&
      (!date || !isSameDay(selectedDate, date))
    ) {
      setDate(selectedDate);
      const formattedDate = format(selectedDate, "dd-MM-yyyy");
      setDepartureDate(formattedDate);
      if (updateUrl) {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set("departureDate", formattedDate);

        const newPathname = `${
          window.location.pathname
        }?${currentParams.toString()}`;
        router.push(newPathname, { scroll: false });
      }
    }
    if (isMobile) {
      setIsDialogOpen(false);
    }
  };

  const months = Array.from({ length: 12 }, (_, i) => i);
  const buttonText = date ? format(date, "LLL dd, y") : "Pick a date";

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          className="w-full h-14 flex items-center justify-start bg-primary-bg/5 rounded-xl border-none ring-0"
          onClick={() => setIsDialogOpen(true)}
        >
          <CalendarIcon className="mr-2 h-6 w-6" />
          <span className="font-medium">{buttonText}</span>
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px] py-20 h-full sm:h-auto flex flex-col px-0">
            <DialogHeader className="space-y-4 h-fit px-4">
              <DialogTitle>Select Departure Date</DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-grow">
              <div className="p-4">
                {months.map((monthIndex) => {
                  const monthDate = new Date(2024, monthIndex, 1);

                  return (
                    <div key={monthIndex} className="mb-4">
                      <Calendar
                        mode="single"
                        disableNavigation
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                        month={monthDate}
                        className="w-full"
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <DialogFooter>
              <div className="px-4 py-8 absolute bottom-0 bg-white left-0 w-full border-t">
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  className="w-full h-14 bg-primary-bg"
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
          className="w-full h-14 flex items-center justify-start bg-primary-bg/5 rounded-xl border-none ring-0"
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
