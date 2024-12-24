import * as React from "react";
import { format, parse, isSameDay, isValid } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
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
import useIsMobile from "@/components/hooks/use-mobile";
import { LOCALE_MAP } from "@/lib/data";
import { enUS } from "date-fns/locale";
import { FaCalendarAlt } from "react-icons/fa";

export default function DatePicker({ updateUrl }: { updateUrl?: boolean }) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { departureDate, setDepartureDate } = useSearchStore();
  const isMobile = useIsMobile();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const searchParams = useSearchParams();

  const currentLocale =
    LOCALE_MAP[i18n.language as keyof typeof LOCALE_MAP] || enUS;

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

  const buttonText = date
    ? format(date, "E, LLL dd", { locale: currentLocale })
    : t("searchForm.departure");

  const currentMonth = new Date().getMonth();
  const months = Array.from({ length: 13 }, (_, i) => (currentMonth + i) % 12);

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          className="w-full h-12 flex items-center truncate justify-start bg-primary-bg/5 rounded-lg border-none text-base ring-0"
          onClick={() => setIsDialogOpen(true)}
        >
          <FaCalendarAlt className="size-4 mr-2 text-primary-accent" />

          <span className="font-normal line-clamp-1">{buttonText}</span>
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px] py-20 h-full sm:h-auto flex flex-col px-0">
            <DialogHeader className="space-y-4 h-fit px-4">
              <DialogTitle>{t("searchForm.departure")}</DialogTitle>
            </DialogHeader>
            <ScrollArea>
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
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                        month={monthDate}
                        locale={currentLocale}
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
                  className="w-full h-12 button-gradient"
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
          className="w-full h-12 flex items-center text-base justify-start bg-primary-bg/5 rounded-lg border-none ring-0 truncate text-left"
        >
          <FaCalendarAlt className="size-4 mr-2 text-primary-accent shrink-0" />

          <span className="font-normal line-clamp-1">{buttonText}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
          fromDate={new Date()}
          defaultMonth={date || new Date()}
          locale={currentLocale}
        />
      </PopoverContent>
    </Popover>
  );
}
