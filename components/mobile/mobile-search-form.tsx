"use client";

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
import StationSelect from "@/app/search/_components/station-select";

interface MobileSearchFormProps {
  updateUrl?: boolean;
}

export const MobileSearchForm: React.FC<MobileSearchFormProps> = ({
  updateUrl,
}) => {
  const { t } = useTranslation();
  const {
    returnDate,
    departureDate,
    from,
    to,
    fromCity,
    toCity,
    passengers,
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

  // --- TRIP TYPE auto-handling based on returnDate ---
  useEffect(() => {
    if (returnDate) {
      setTripType("round-trip");
    } else {
      setTripType("one-way");
      setReturnTicket(null);
      setOutboundTicket(null);
      setIsSelectingReturn(false);
    }
  }, [
    returnDate,
    setTripType,
    setReturnTicket,
    setOutboundTicket,
    setIsSelectingReturn,
  ]);

  const hasFromError = !from && attemptedSubmit;
  const hasToError = !to && attemptedSubmit;
  const hasDateError = !departureDate && attemptedSubmit;
  const hasSameCityError = from && to && from === to && attemptedSubmit;

  const handleSearch = useCallback(() => {
    setAttemptedSubmit(true);

    if (!from || !to || !departureDate || (from && to && from === to)) {
      setTimeout(() => {
        const firstErrorElement = document.querySelector('[data-error="true"]');
        firstErrorElement?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
      return;
    }

    startTransition(() => {
      const searchParams = new URLSearchParams({
        departureStation: from,
        arrivalStation: to,
        departureDate: departureDate,
        adult: String(passengers.adults),
        children: String(passengers.children),
      });

      if (returnDate) {
        searchParams.append("returnDate", returnDate);
      }

      const searchUrl = `/search/${fromCity.toLowerCase()}-${toCity.toLowerCase()}?${searchParams.toString()}`;
      router.push(searchUrl);
    });
  }, [
    from,
    to,
    departureDate,
    returnDate,
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
      <div className="grid grid-cols-1 gap-2">
        {/* From Station */}
        <FormField
          label={t("searchForm.from")}
          required
          error={
            hasFromError
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
              />
            )}
          </div>
        </FormField>

        {/* To Station */}
        <FormField
          label={t("searchForm.to")}
          required
          error={
            hasToError
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
              />
            )}
          </div>
        </FormField>

        {/* Dates */}
        <FormField
          label={t("searchForm.dates")}
          required
          error={
            hasDateError
              ? t("validation.dateRequired", "Please select departure date")
              : undefined
          }
        >
          <div className="flex gap-2" data-error={hasDateError}>
            <DatePicker updateUrl={updateUrl} />
            <ReturnDatePicker
              updateUrl={updateUrl}
              //   placeholder={t("searchForm.addReturn", "Add return date")}
            />
          </div>
        </FormField>

        {/* Passengers */}
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
              "p-6 w-full rounded-lg h-12 transition-all duration-200 mt-1",
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

      {/* Validation Message */}
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
