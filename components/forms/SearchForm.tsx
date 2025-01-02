"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputSkeleton from "@/components/input-skeleton";
import PassengerSelect from "@/app/search/_components/passenger-select";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import StationSelect from "@/app/search/_components/station-select";
import DatePicker from "@/app/search/_components/date-picker";
import ReturnDatePicker from "@/app/search/_components/return-date-picker";
import useSearchStore, { useCheckoutStore } from "@/store";
import { useRouter } from "next/navigation";
import { useStations } from "../providers/station-provider";

interface SearchFormProps {
  updateUrl?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ updateUrl }) => {
  const { t } = useTranslation();
  const {
    returnDate,
    departureDate,
    from,
    to,
    fromCity,
    toCity,
    passengers,
    tripType,
    setReturnDate,
    setTripType,
  } = useSearchStore();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { stations, loading } = useStations();

  const { setOutboundTicket, setReturnTicket, setIsSelectingReturn } =
    useCheckoutStore();
  const resetSearch = useSearchStore((state) => state.resetSearch);

  const isRoundTrip = tripType === "round-trip";

  const handleTripTypeChange = useCallback(
    (type: "one-way" | "round-trip") => {
      setTripType(type);
      setReturnDate(null);
      setReturnTicket(null);
      setOutboundTicket(null);
      setIsSelectingReturn(false);

      if (typeof window !== "undefined") {
        const currentParams = new URLSearchParams(window.location.search);

        if (type === "one-way") {
          currentParams.delete("returnDate");
        } else {
          const today = new Date();
          const defaultReturnDate = new Date(today);
          defaultReturnDate.setDate(today.getDate() + 7);
          const formattedReturnDate = defaultReturnDate
            .toISOString()
            .split("T")[0];
          currentParams.set("returnDate", returnDate || formattedReturnDate);
        }

        router.push(`${window.location.pathname}?${currentParams.toString()}`, {
          scroll: false,
        });
      }
    },
    [
      returnDate,
      setReturnDate,
      setReturnTicket,
      setOutboundTicket,
      setIsSelectingReturn,
      router,
      setTripType,
    ]
  );

  const handleSearch = useCallback(async () => {
    if (isSubmitting || !from || !to || !departureDate) return;

    setIsSubmitting(true);

    try {
      const searchParams = new URLSearchParams({
        departureStation: from,
        arrivalStation: to,
        departureDate: departureDate,
        adult: passengers.adults.toString(),
        children: passengers.children.toString(),
      });

      if (returnDate && isRoundTrip) {
        searchParams.append("returnDate", returnDate);
      }

      const path = `/search/${fromCity.toLowerCase()}-${toCity.toLowerCase()}?${searchParams.toString()}`;

      router.push(path);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    from,
    to,
    departureDate,
    returnDate,
    isRoundTrip,
    fromCity,
    toCity,
    passengers,
    router,
    isSubmitting,
  ]);

  useEffect(() => {
    return () => {
      if (!window.location.pathname.includes("/search")) {
        resetSearch();
      }
    };
  }, [resetSearch]);

  return (
    <div className="space-y-4 flex-1">
      <div className="w-full flex flex-col gap-2 md:flex-row justify-start md:justify-between items-start md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-4">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="radio"
                name="tripType"
                value="one-way"
                checked={!isRoundTrip}
                onChange={() => handleTripTypeChange("one-way")}
                className="h-7 w-7 accent-primary-bg"
              />
              <span>{t("searchBlock.tripType.oneWay")}</span>
            </label>
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="radio"
                name="tripType"
                value="round-trip"
                checked={isRoundTrip}
                onChange={() => handleTripTypeChange("round-trip")}
                className="h-7 w-7 accent-primary-bg"
              />
              <span>{t("searchBlock.tripType.roundTrip")}</span>
            </label>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end gap-2 lg:gap-1",
          { "lg:grid-cols-4": updateUrl }
        )}
      >
        {["from", "to"].map((departure) => (
          <div key={departure} className="w-full sm:space-y-1">
            <p className="uppercase text-black/50 font-medium text-xs hidden sm:block">
              {t(`searchForm.${departure}`)}
            </p>
            {loading ? (
              <InputSkeleton />
            ) : (
              <StationSelect
                stations={stations}
                departure={departure as "from" | "to"}
                updateUrl={updateUrl}
              />
            )}
          </div>
        ))}
        <div className="w-full sm:space-y-1">
          <p className="uppercase text-black/50 font-medium text-xs hidden sm:block">
            {t("searchForm.departure")}
          </p>
          {loading ? (
            <InputSkeleton />
          ) : (
            <div className="flex items-center gap-2 sm:gap-1">
              <DatePicker updateUrl={updateUrl} />
              {isRoundTrip ? <ReturnDatePicker updateUrl={updateUrl} /> : null}
            </div>
          )}
        </div>
        <div className="w-full sm:space-y-1">
          <p className="uppercase text-black/50 font-medium text-xs hidden sm:block">
            {t("searchForm.passengers")}
          </p>
          {loading ? (
            <InputSkeleton />
          ) : (
            <PassengerSelect updateUrl={updateUrl} />
          )}
        </div>
        <Button
          type="submit"
          className={cn(
            "p-6 flex items-center gap-2 w-full sm:col-span-2 rounded-lg h-12 lg:col-span-1 bg-gradient-to-tr from-[#ff6700] to-[#ff007f]",
            { hidden: updateUrl }
          )}
          disabled={isSubmitting || !from || !to || !departureDate}
          onClick={handleSearch}
        >
          {isSubmitting ? (
            <Loader2 className="size-6 animate-spin mx-auto text-white" />
          ) : (
            t("searchForm.searchButton.default")
          )}
        </Button>
      </div>
    </div>
  );
};
