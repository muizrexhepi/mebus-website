import React, { useState, useEffect } from "react";
import { format, addDays, subDays, parse, isValid, Locale } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import useSearchStore, { useCheckoutStore, useLoadingStore } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";
import { enUS } from "date-fns/locale";
import { LOCALE_MAP } from "@/lib/data";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface DateButtonProps {
  date: Date;
  isSelected: boolean;
  onClick: () => void;
  departureDate: Date;
  outboundTicket: any;
  currentLocale: Locale;
  tripType: string;
}

const DateButton: React.FC<DateButtonProps> = ({
  date,
  isSelected,
  onClick,
  departureDate,
  outboundTicket,
  currentLocale,
  tripType,
}) => (
  <Button
    variant="ghost"
    className={cn(
      "flex-1 rounded-full py-1 px-3 transition-all border",
      isSelected ? "bg-white text-white" : "text-black",
      {
        "pointer-events-none": isSelected,
      }
    )}
    disabled={
      (tripType === "round-trip" && outboundTicket && date < departureDate) ||
      date < new Date()
    }
    onClick={onClick}
  >
    <div className="flex flex-col items-center">
      <span
        className={cn("text-sm font-medium truncate", {
          "text-transparent button-gradient bg-clip-text": isSelected,
          "text-black": !isSelected,
        })}
      >
        {format(date, "EEE, MMM d", { locale: currentLocale })}
      </span>
    </div>
  </Button>
);

export function MobileDateSelectBlock() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    tripType,
  } = useSearchStore();
  const { outboundTicket } = useCheckoutStore();
  const { i18n } = useTranslation();
  const { isLoading } = useLoadingStore();
  const parsedDepartureDate = departureDate
    ? parse(departureDate, "dd-MM-yyyy", new Date())
    : new Date();

  const [selectedDate, setSelectedDate] = useState<Date>(
    tripType === "round-trip" && outboundTicket
      ? returnDate
        ? parse(returnDate, "dd-MM-yyyy", new Date())
        : parsedDepartureDate
      : parsedDepartureDate
  );

  const dates = [
    subDays(selectedDate, 1),
    selectedDate,
    addDays(selectedDate, 1),
  ];

  const currentLocale =
    LOCALE_MAP[i18n.language as keyof typeof LOCALE_MAP] || enUS;

  useEffect(() => {
    if (departureDate) {
      const parsedDate = parse(departureDate, "dd-MM-yyyy", new Date());
      if (
        isValid(parsedDate) &&
        parsedDate.getTime() !== selectedDate.getTime()
      ) {
        setSelectedDate(parsedDate);
      }
    }
  }, [departureDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "dd-MM-yyyy");
    const currentParams = new URLSearchParams(searchParams.toString());

    if (tripType === "round-trip" && outboundTicket) {
      setReturnDate(formattedDate);
      currentParams.set("returnDate", formattedDate);
    } else {
      setDepartureDate(formattedDate);
      currentParams.set("departureDate", formattedDate);
    }

    const newPathname = window.location.pathname.split("?")[0];
    const newURL = `${newPathname}?${currentParams.toString()}`;

    router.push(newURL, { scroll: false });
  };

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center gap-4">
        {dates.map((date) =>
          isLoading ? (
            <Skeleton
              key={date.toISOString()}
              className="flex-1 h-12 rounded-full bg-gray/20"
            >
              <div className="flex justify-center items-center h-full">
                <Skeleton className="h-4 w-20" />
              </div>
            </Skeleton>
          ) : (
            <DateButton
              key={date.toISOString()}
              outboundTicket={outboundTicket}
              tripType={tripType || "one-way"}
              date={date}
              currentLocale={currentLocale}
              isSelected={date.toDateString() === selectedDate.toDateString()}
              onClick={() => handleDateSelect(date)}
              departureDate={parsedDepartureDate}
            />
          )
        )}
      </div>
    </div>
  );
}

export default MobileDateSelectBlock;