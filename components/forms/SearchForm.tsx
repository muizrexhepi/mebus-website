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
    resetSearch,
  } = useSearchStore();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { stations, loading: stationsLoading } = useStations();
  const { setOutboundTicket, setReturnTicket, setIsSelectingReturn } =
    useCheckoutStore();

  const isRoundTrip = tripType === "round-trip";
  const isFormValid = Boolean(from && to && departureDate && !isLoading);

  const handleTripTypeChange = useCallback(
    (type: "one-way" | "round-trip") => {
      setTripType(type);
      setReturnDate(null);
      setReturnTicket(null);
      setOutboundTicket(null);
      setIsSelectingReturn(false);

      if (typeof window === "undefined") return;

      const params = new URLSearchParams(window.location.search);
      if (type === "one-way") {
        params.delete("returnDate");
      } else {
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 7);
        params.set("returnDate", returnDate.toISOString().split("T")[0]);
      }

      router.push(`${window.location.pathname}?${params.toString()}`, {
        scroll: false,
      });
    },
    [
      setTripType,
      setReturnDate,
      setReturnTicket,
      setOutboundTicket,
      setIsSelectingReturn,
      router,
    ]
  );

  const handleSearch = useCallback(async () => {
    if (!isFormValid || !departureDate) return;
    console.log({ isLoading });
    setIsLoading(true);
    console.log({ isLoading });

    try {
      const searchParams = new URLSearchParams({
        departureStation: from,
        arrivalStation: to,
        departureDate: departureDate,
        adult: String(passengers.adults),
        children: String(passengers.children),
      });

      if (returnDate && isRoundTrip) {
        searchParams.append("returnDate", returnDate);
      }

      await router.replace(
        `/search/${fromCity.toLowerCase()}-${toCity.toLowerCase()}?${searchParams.toString()}`
      );
    } catch (error) {
      console.error("Search failed:", error);
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
    isFormValid,
  ]);

  useEffect(() => {
    if (!window.location.pathname.includes("/search")) {
      resetSearch();
    }
  }, [resetSearch]);

  return (
    <div className="space-y-4 flex-1">
      <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between items-start md:items-center">
        <div className="flex items-center gap-4">
          <RadioGroup
            value={isRoundTrip ? "round-trip" : "one-way"}
            onChange={handleTripTypeChange}
            options={[
              { value: "one-way", label: t("searchBlock.tripType.oneWay") },
              {
                value: "round-trip",
                label: t("searchBlock.tripType.roundTrip"),
              },
            ]}
          />
        </div>
      </div>

      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end gap-2 lg:gap-1",
          { "lg:grid-cols-4": updateUrl }
        )}
      >
        {["from", "to"].map((type) => (
          <FormField
            key={type}
            label={t(`searchForm.${type}`)}
            loading={stationsLoading}
            component={
              <StationSelect
                stations={stations}
                departure={type as "from" | "to"}
                updateUrl={updateUrl}
              />
            }
          />
        ))}

        <FormField
          label={t("searchForm.departure")}
          loading={stationsLoading}
          component={
            <div className="flex items-center gap-2 sm:gap-1">
              <DatePicker updateUrl={updateUrl} />
              {isRoundTrip && <ReturnDatePicker updateUrl={updateUrl} />}
            </div>
          }
        />

        <FormField
          label={t("searchForm.passengers")}
          loading={stationsLoading}
          component={<PassengerSelect updateUrl={updateUrl} />}
        />

        {!updateUrl && (
          <Button
            type="submit"
            disabled={!isFormValid}
            onClick={handleSearch}
            className="p-6 w-full sm:col-span-2 lg:col-span-1 rounded-lg h-12 bg-gradient-to-tr from-[#ff6700] to-[#ff007f]"
          >
            {isLoading ? (
              <Loader2 className="size-6 animate-spin" />
            ) : (
              t("searchForm.searchButton.default")
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

const FormField = ({
  label,
  loading,
  component,
}: {
  label: string;
  loading: boolean;
  component: React.ReactNode;
}) => (
  <div className="w-full sm:space-y-1">
    <p className="uppercase text-black/50 font-medium text-xs hidden sm:block">
      {label}
    </p>
    {loading ? <InputSkeleton /> : component}
  </div>
);

const RadioGroup = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (type: "one-way" | "round-trip") => void;
  options: Array<{ value: string; label: string }>;
}) => (
  <div className="flex gap-4">
    {options.map((option) => (
      <label
        key={option.value}
        className="cursor-pointer flex items-center gap-2"
      >
        <input
          type="radio"
          name="tripType"
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value as "one-way" | "round-trip")}
          className="h-7 w-7 accent-primary-bg"
        />
        <span>{option.label}</span>
      </label>
    ))}
  </div>
);
