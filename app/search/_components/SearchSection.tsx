"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSearchStore, { useCheckoutStore } from "@/store";
import { useRouter } from "next/navigation";
import { getStations } from "@/actions/station";
import { Station } from "@/models/station";

import { SearchForm } from "@/components/forms/SearchForm";
import { useTranslation } from "react-i18next";
import { DateSelectBlock } from "./DateSelectBlock";
import { DateRangePicker } from "./daterange-picker";
import DatePicker from "./date-picker";

const SearchSection = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const { t } = useTranslation();
  const {
    returnDate,
    departureDate,
    setReturnDate,
    from,
    to,
    fromCity,
    toCity,
    passengers,
    setTripType,
    tripType,
  } = useSearchStore();
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return tripType === "round-trip";
    }
    return false;
  });
  const resetSearch = useSearchStore((state) => state.resetSearch);

  const { setOutboundTicket, setReturnTicket, setIsSelectingReturn } =
    useCheckoutStore();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await getStations();
        setStations(data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handleSearch = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const searchParams = new URLSearchParams({
        departureStation: from,
        arrivalStation: to,
        departureDate: departureDate || "",
        adult: passengers.adults.toString(),
        children: passengers.children.toString(),
      });

      if (isRoundTrip && returnDate) {
        searchParams.append("returnDate", returnDate);
      }

      router.push(
        `/search/${fromCity.toLowerCase()}-${toCity.toLowerCase()}?${searchParams.toString()}`
      );
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
    passengers,
    fromCity,
    toCity,
    router,
  ]);

  useEffect(() => {
    return () => {
      resetSearch();
    };
  }, [resetSearch]);

  const handleTripTypeChange = useCallback(
    (type: "one-way" | "round-trip") => {
      setIsRoundTrip(type === "round-trip");
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

        const newPathname = `${
          window.location.pathname
        }?${currentParams.toString()}`;
        router.push(newPathname, { scroll: false });
      }
    },
    [
      returnDate,
      setReturnDate,
      setReturnTicket,
      setOutboundTicket,
      setIsSelectingReturn,
      router,
    ]
  );

  const datePickerComponent = useMemo(() => {
    return isRoundTrip ? (
      <DateRangePicker updateUrl />
    ) : (
      <DatePicker updateUrl />
    );
  }, [isRoundTrip]);

  return (
    <>
      <div className="bg-white rounded-xl py-4 md:py-6 flex flex-col gap-4 w-full min-h-fit">
        <div className="max-w-7xl paddingX mx-auto w-full">
          <div className="space-y-4 flex-1">
            <div className="w-full flex flex-col gap-2 md:flex-row justify-start md:justify-between items-start md:items-center">
              <div className="flex items-center gap-4">
                <div className="flex gap-4">
                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      name="tripType"
                      value="one-way"
                      checked={tripType === "one-way"}
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
                      checked={tripType === "round-trip"}
                      onChange={() => handleTripTypeChange("round-trip")}
                      className="h-7 w-7 accent-primary-bg"
                    />
                    <span>{t("searchBlock.tripType.roundTrip")}</span>
                  </label>
                </div>
              </div>
            </div>

            <SearchForm
              loading={loading}
              stations={stations}
              datePickerComponent={datePickerComponent}
              isSubmitting={isSubmitting}
              onSearch={handleSearch}
              updateUrl
            />
          </div>
        </div>
      </div>
      <DateSelectBlock />
    </>
  );
};

export default SearchSection;
