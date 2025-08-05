"use client";

import * as React from "react";
import { format, parse, isSameDay, isValid, isBefore } from "date-fns";
import { X, ArrowLeft } from "lucide-react";
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

  const departureDateParsed = React.useMemo(() => {
    if (departureDate) {
      const parsed = parse(departureDate, "dd-MM-yyyy", new Date());
      return isValid(parsed) ? parsed : new Date();
    }
    return new Date();
  }, [departureDate]);

  const minReturnDate = departureDateParsed;

  React.useEffect(() => {
    if (returnDate) {
      const parsedDate = parse(returnDate, "dd-MM-yyyy", new Date());
      if (isValid(parsedDate)) {
        if (isBefore(parsedDate, departureDateParsed)) {
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

  React.useEffect(() => {
    if (isDialogOpen && isMobile && scrollAreaRef.current) {
      const targetDate = selectedReturnDate || departureDateParsed;
      const selectedMonth = targetDate.getMonth();
      const currentMonth = new Date().getMonth();
      const monthDiff = selectedMonth - currentMonth;
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
      if (isBefore(date, departureDateParsed)) {
        return;
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
          <DialogContent
            hideCloseButton={true}
            className="sm:max-w-[425px] h-full sm:h-[90vh] max-h-[100vh] flex flex-col p-0 gap-0 rounded-none sm:rounded-2xl"
          >
            {/* Header */}
            <DialogHeader className="bg-gray-50 px-4 py-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDialogOpen(false)}
                  className="h-10 w-10 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-700" />
                </Button>
                <DialogTitle className="text-lg font-medium text-gray-900">
                  {t("searchForm.return", "Select return date")}
                </DialogTitle>
              </div>
            </DialogHeader>

            {/* Calendar Content */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full" ref={scrollAreaRef}>
                <div className="p-4">
                  {months.map(({ month, year }, i) => {
                    const monthDate = new Date(year, month, 1);
                    return (
                      <div key={`${month}-${year}`} className="mb-6">
                        <Calendar
                          mode="single"
                          disableNavigation
                          selected={selectedReturnDate}
                          onSelect={handleDateSelect}
                          initialFocus={i === 0}
                          month={monthDate}
                          locale={currentLocale}
                          className="w-full rounded-xl border border-gray-200 bg-white shadow-sm"
                          fromDate={minReturnDate}
                          disabled={(date) =>
                            isBefore(date, departureDateParsed)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <Button
                onClick={() => setIsDialogOpen(false)}
                variant={"primary"}
                className="w-full h-12 text-white rounded-xl"
              >
                {t("actions.confirmCancellation", "Confirm")}
              </Button>
            </div>
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
