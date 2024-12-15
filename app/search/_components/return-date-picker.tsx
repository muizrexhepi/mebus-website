import * as React from "react";
import { format, parse, isSameDay, isValid, addDays } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
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

  const currentLocale =
    LOCALE_MAP[i18n.language as keyof typeof LOCALE_MAP] || enUS;

  React.useEffect(() => {
    if (returnDate) {
      const parsedDate = parse(returnDate, "dd-MM-yyyy", new Date());
      if (
        isValid(parsedDate) &&
        (!selectedReturnDate || !isSameDay(parsedDate, selectedReturnDate))
      ) {
        setSelectedReturnDate(parsedDate);
      }
    }
  }, [returnDate, selectedReturnDate]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isValid(date)) {
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
  }, [router]);

  const minReturnDate = departureDate
    ? addDays(parse(departureDate, "dd-MM-yyyy", new Date()), 0)
    : undefined;

  const buttonText = selectedReturnDate
    ? format(selectedReturnDate, "E, LLL dd", { locale: currentLocale })
    : t("searchForm.addReturn", "Add return");

  const currentMonth = new Date().getMonth();
  const months = Array.from({ length: 13 }, (_, i) => (currentMonth + i) % 12);

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          className="w-full h-12 flex items-center justify-between bg-primary-bg/5 rounded-lg border-none"
          onClick={() => {
            setTripType("round-trip");
            setIsDialogOpen(true);
          }}
        >
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-6 w-6 " />
            <span
              className={selectedReturnDate ? "text-black" : "text-primary"}
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
            <ScrollArea className="flex-grow">
              <div className="p-4">
                {months.map((monthIndex, i) => {
                  const year =
                    new Date().getFullYear() +
                    Math.floor((currentMonth + i) / 12);
                  const monthDate = new Date(year, monthIndex, 1);

                  return (
                    <div key={monthIndex + year} className="mb-4">
                      <Calendar
                        mode="single"
                        disableNavigation
                        selected={selectedReturnDate}
                        onSelect={handleDateSelect}
                        initialFocus
                        month={monthDate}
                        locale={currentLocale}
                        className="w-full"
                        fromDate={minReturnDate}
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
                  className="w-full h-12 button-gradient text-base"
                >
                  {t("datePicker.confirm", "Confirm")}
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
          className="w-full h-12 flex items-center px-2.5 justify-between bg-primary-bg/5 rounded-lg border-none"
        >
          <div className="flex items-center">
            {/* <CalendarIcon
              className={`mr-2 h-4 w-4 ${!updateUrl && "hidden"}`}
            /> */}
            <span
              className={selectedReturnDate ? "text-black" : "text-primary"}
            >
              {buttonText}
            </span>
          </div>
          {selectedReturnDate && (
            <X
              className={`h-5 w-5 ${!updateUrl && "hidden"}`}
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
          fromDate={minReturnDate}
        />
      </PopoverContent>
    </Popover>
  );
}
