"use client";

import type React from "react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputSkeleton from "@/components/input-skeleton";
import PassengerSelect from "@/app/search/_components/passenger-select";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import DatePicker from "@/app/search/_components/date-picker";
import ReturnDatePicker from "@/app/search/_components/return-date-picker";
import useSearchStore, { useCheckoutStore } from "@/store";
import { useRouter } from "next/navigation";
import { useStations } from "../providers/station-provider";
import { FormField } from "@/components/ui/form-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useIsMobile from "@/components/hooks/use-mobile";
import StationSelect from "@/app/search/_components/station-select";

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
  const [isPending, startTransition] = useTransition();
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const { stations, loading: stationsLoading } = useStations();
  const { setOutboundTicket, setReturnTicket, setIsSelectingReturn } =
    useCheckoutStore();
  const isMobile = useIsMobile();

  const isRoundTrip = tripType === "round-trip";

  const hasFromError = !from && attemptedSubmit;
  const hasToError = !to && attemptedSubmit;
  const hasDateError = !departureDate && attemptedSubmit;
  const hasSameCityError = from && to && from === to && attemptedSubmit;

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

  // Optimized search handler - remove async/await to eliminate delay
  const handleSearch = useCallback(() => {
    setAttemptedSubmit(true);

    // Check for validation errors
    if (!from || !to || !departureDate || (from && to && from === to)) {
      // Scroll to first error field
      setTimeout(() => {
        const firstErrorElement = document.querySelector('[data-error="true"]');
        firstErrorElement?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
      return;
    }

    // Use startTransition for immediate navigation without blocking
    startTransition(() => {
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

      const searchUrl = `/search/${fromCity.toLowerCase()}-${toCity.toLowerCase()}?${searchParams.toString()}`;

      // Immediate navigation without await
      router.push(searchUrl);
    });
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
  ]);

  useEffect(() => {
    if (!window.location.pathname.includes("/search")) {
      resetSearch();
    }
  }, [resetSearch]);

  const isFormValid = Boolean(
    from && to && departureDate && from !== to && !isPending
  );

  return (
    <div className="space-y-4 flex-1">
      {/* Trip Type Selection */}
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

      {/* Same City Error Alert */}
      {hasSameCityError && (
        <Alert variant="destructive" className="animate-in slide-in-from-top-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t(
              "validation.sameCity",
              "Departure and arrival cities cannot be the same"
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Form Fields */}
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end gap-1 lg:gap-1",
          {
            "lg:grid-cols-4": updateUrl,
          }
        )}
      >
        {/* From Station */}
        <FormField
          label={t("searchForm.from")}
          required
          error={
            isMobile && hasFromError
              ? t("validation.fromRequired", "Please select departure city")
              : undefined
          }
        >
          <div data-error={hasFromError}>
            {stationsLoading ? (
              <InputSkeleton />
            ) : (
              <StationSelect
                stations={stations}
                departure="from"
                updateUrl={updateUrl}
                hasError={hasFromError}
                showError={isMobile}
              />
            )}
          </div>
        </FormField>

        {/* To Station */}
        <FormField
          label={t("searchForm.to")}
          required
          error={
            isMobile && hasToError
              ? t("validation.toRequired", "Please select arrival city")
              : undefined
          }
        >
          <div data-error={hasToError}>
            {stationsLoading ? (
              <InputSkeleton />
            ) : (
              <StationSelect
                stations={stations}
                departure="to"
                updateUrl={updateUrl}
                hasError={hasToError}
                showError={isMobile}
              />
            )}
          </div>
        </FormField>

        {/* Date Selection */}
        <FormField
          label={t("searchForm.departure")}
          required
          error={
            isMobile && hasDateError
              ? t("validation.dateRequired", "Please select departure date")
              : undefined
          }
        >
          <div
            className="flex items-center gap-2 sm:gap-1"
            data-error={hasDateError}
          >
            {stationsLoading ? (
              <InputSkeleton />
            ) : (
              <>
                <DatePicker updateUrl={updateUrl} />
                {isRoundTrip && <ReturnDatePicker updateUrl={updateUrl} />}
              </>
            )}
          </div>
        </FormField>

        {/* Passenger Selection */}
        <FormField label={t("searchForm.passengers")}>
          {stationsLoading ? (
            <InputSkeleton />
          ) : (
            <PassengerSelect updateUrl={updateUrl} />
          )}
        </FormField>

        {/* Search Button */}
        {!updateUrl && (
          <Button
            type="submit"
            disabled={!isFormValid}
            onClick={handleSearch}
            className={cn(
              "p-6 w-full sm:col-span-2 lg:col-span-1 rounded-lg h-14 sm:h-12 transition-all duration-200 mt-1 md:mt-0",
              isFormValid
                ? "bg-gradient-to-tr from-[#ff6700] to-[#ff007f] hover:shadow-lg hover:scale-[1.02]"
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            {isPending ? (
              <Loader2 className="size-6 animate-spin" />
            ) : (
              t("searchForm.searchButton.default")
            )}
          </Button>
        )}
      </div>

      {/* Form Status - only show after attempted submit */}
      {attemptedSubmit && !isFormValid && !isPending && (
        <div className="text-sm text-muted-foreground text-center">
          {t(
            "validation.fillRequired",
            "Please fill in all required fields to search"
          )}
        </div>
      )}
    </div>
  );
};

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
        className="cursor-pointer flex items-center gap-2 hover:text-primary transition-colors"
      >
        <input
          type="radio"
          name="tripType"
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value as "one-way" | "round-trip")}
          className="h-4 w-4 accent-primary-bg transition-all"
        />
        <span className="select-none">{option.label}</span>
      </label>
    ))}
  </div>
);
