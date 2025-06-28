"use client";

import * as React from "react";
import { format, parse, isSameDay, isValid, isBefore } from "date-fns";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSearchStore, { useCheckoutStore } from "@/store";
import useIsMobile from "@/components/hooks/use-mobile";
import { useTranslation } from "react-i18next";
import { LOCALE_MAP } from "@/lib/data";
import { enUS } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { FaCalendarAlt } from "react-icons/fa";

interface ReturnDatePickerProps {
  updateUrl?: boolean;
}

export default function ReturnDatePicker({
  updateUrl = false,
}: ReturnDatePickerProps) {
  const { t, i18n } = useTranslation();
  const { returnDate, setReturnDate, setTripType, departureDate } =
    useSearchStore();
  const { setReturnTicket, setOutboundTicket, setIsSelectingReturn } =
    useCheckoutStore();
  const isMobile = useIsMobile();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedReturnDate, setSelectedReturnDate] = React.useState<
    Date | undefined
  >(undefined);
  const router = useRouter();
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const currentLocale =
    LOCALE_MAP[i18n.language as keyof typeof LOCALE_MAP] || enUS;

  // Parse departure date to get minimum return date
  const departureDateParsed = React.useMemo(() => {
    if (departureDate) {
      const parsed = parse(departureDate, "dd-MM-yyyy", new Date());
      return isValid(parsed) ? parsed : new Date();
    }
    return new Date();
  }, [departureDate]);

  // Minimum return date should be same as departure date (not the day after)
  const minReturnDate = departureDateParsed;

  React.useEffect(() => {
    if (returnDate) {
      const parsedDate = parse(returnDate, "dd-MM-yyyy", new Date());
      if (isValid(parsedDate)) {
        // Check if return date is before departure date
        if (isBefore(parsedDate, departureDateParsed)) {
          // Set return date to departure date if it's before
          const formattedDate = format(departureDateParsed, "dd-MM-yyyy");
          setReturnDate(formattedDate);
          setSelectedReturnDate(departureDateParsed);
        } else if (
          !selectedReturnDate ||
          !isSameDay(parsedDate, selectedReturnDate)
        ) {
          setSelectedReturnDate(parsedDate);
        }
      }
    }
  }, [returnDate, selectedReturnDate, departureDateParsed, setReturnDate]);

  // Scroll to the selected date when dialog opens
  React.useEffect(() => {
    if (isDialogOpen && isMobile && scrollAreaRef.current) {
      const targetDate = selectedReturnDate || departureDateParsed;
      const selectedMonth = targetDate.getMonth();
      const currentMonth = new Date().getMonth();
      const monthDiff = selectedMonth - currentMonth;

      // Calculate scroll position (each calendar is roughly 300px height)
      const scrollPosition = Math.max(0, monthDiff * 300);

      setTimeout(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = scrollPosition;
        }
      }, 100);
    }
  }, [isDialogOpen, isMobile, selectedReturnDate, departureDateParsed]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isValid(date)) {
      // Ensure selected date is not before departure date
      if (isBefore(date, departureDateParsed)) {
        return; // Don't allow selection of dates before departure
      }

      setSelectedReturnDate(date);
      const formattedDate = format(date, "dd-MM-yyyy");
      setReturnDate(formattedDate);
      setTripType("round-trip");

      if (updateUrl && typeof window !== "undefined") {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set("returnDate", formattedDate);
        window.history.pushState(
          {},
          "",
          `${window.location.pathname}?${currentParams.toString()}`
        );
      }
    }

    if (isMobile) {
      setIsDialogOpen(false);
    }
  };

  const handleRemoveReturnDate = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.delete("returnDate");
      const newPathname = `${
        window.location.pathname
      }?${currentParams.toString()}`;
      router.push(newPathname, { scroll: false });
    }
    setReturnDate(null);
    setSelectedReturnDate(undefined);
    setTripType("one-way");
    setReturnTicket(null);
    setOutboundTicket(null);
    setIsSelectingReturn(false);
  }, [
    router,
    setReturnDate,
    setTripType,
    setReturnTicket,
    setOutboundTicket,
    setIsSelectingReturn,
  ]);

  const buttonText = selectedReturnDate
    ? format(selectedReturnDate, "E, LLL dd", { locale: currentLocale })
    : t("ticket.selectReturn", "Add return");

  // Generate 12 months starting from current month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = (currentMonth + i) % 12;
    const year = currentYear + Math.floor((currentMonth + i) / 12);
    return { month: monthIndex, year };
  });

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          className="w-full h-12 flex items-center justify-between bg-primary-bg/5 text-base rounded-lg border-none"
          onClick={() => {
            setTripType("round-trip");
            setIsDialogOpen(true);
          }}
        >
          <div className="flex items-center">
            <FaCalendarAlt className="size-4 mr-2 text-primary-accent shrink-0" />
            <span
              className={
                selectedReturnDate
                  ? "text-black font-normal"
                  : "text-primary font-normal"
              }
            >
              {buttonText}
            </span>
          </div>
          {selectedReturnDate && (
            <X
              className="h-4 w-4 text-primary-bg"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveReturnDate();
              }}
            />
          )}
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px] py-20 h-full sm:h-auto flex flex-col px-0">
            <DialogHeader className="space-y-4 h-fit px-4">
              <DialogTitle>{t("searchForm.return", "Return date")}</DialogTitle>
            </DialogHeader>

            <ScrollArea className="flex-1" ref={scrollAreaRef}>
              <div className="p-4">
                {months.map(({ month, year }, i) => {
                  const monthDate = new Date(year, month, 1);
                  return (
                    <div key={`${month}-${year}`} className="mb-4">
                      <Calendar
                        mode="single"
                        disableNavigation
                        selected={selectedReturnDate}
                        onSelect={handleDateSelect}
                        initialFocus={i === 0}
                        month={monthDate}
                        locale={currentLocale}
                        className="w-full"
                        fromDate={minReturnDate}
                        disabled={(date) => isBefore(date, departureDateParsed)}
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
                  className="w-full h-12 button-gradient"
                >
                  {t("actions.confirmCancellation", "Confirm")}
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
          className="w-full h-12 flex items-center truncate justify-between text-base bg-primary-bg/5 rounded-lg border-none"
        >
          <div className="flex items-center flex-1 min-w-0">
            <FaCalendarAlt className="size-4 mr-2 text-primary-accent shrink-0" />
            <span
              className={
                selectedReturnDate
                  ? "text-black font-normal line-clamp-1"
                  : "text-primary font-normal line-clamp-1"
              }
            >
              {buttonText}
            </span>
          </div>
          {selectedReturnDate && (
            <X
              className={`h-5 w-5 shrink-0 ml-2 ${!updateUrl && "hidden"}`}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveReturnDate();
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedReturnDate}
          onSelect={handleDateSelect}
          initialFocus
          defaultMonth={selectedReturnDate || departureDateParsed}
          fromDate={minReturnDate}
          disabled={(date) => isBefore(date, departureDateParsed)}
          locale={currentLocale}
        />
      </PopoverContent>
    </Popover>
  );
}
