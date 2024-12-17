"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSearchStore, { useCheckoutStore } from "@/store";
import { useRouter } from "next/navigation";
import { getStations } from "@/actions/station";
import { Station } from "@/models/station";
import { SearchForm } from "../../../components/forms/SearchForm";
import { useTranslation } from "react-i18next";
import DatePicker from "./date-picker";

const SearchBlock = () => {
  const { t } = useTranslation();
  const [stations, setStations] = useState<Station[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    returnDate,
    departureDate,
    setReturnDate,
    from,
    to,
    fromCity,
    toCity,
    passengers,
    tripType,
    setTripType,
  } = useSearchStore();
  const resetSearch = useSearchStore((state) => state.resetSearch);

  const { setOutboundTicket, setReturnTicket, setIsSelectingReturn } =
    useCheckoutStore();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await getStations();
        setStations(data);
      } catch (error) {
        console.error(t("searchBlock.searchError"), error);
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

      if (returnDate && tripType === "round-trip") {
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
    tripType,
  ]);

  useEffect(() => {
    return () => {
      resetSearch();
    };
  }, [resetSearch]);

  const handleTripTypeChange = useCallback(
    (type: "one-way" | "round-trip") => {
      setTripType(type);
      setReturnDate(null);
      setReturnTicket(null);
      setOutboundTicket(null);
      setIsSelectingReturn(false);
    },
    [setReturnDate]
  );

  return (
    <div className="bg-white sm:rounded-2xl sm:shadow-md sm:p-6 flex flex-col gap-4 w-full min-h-fit sm:border sm:border-gray-200">
      <div className="space-y-4 flex-1">
        <div className="w-full flex flex-col gap-2 md:flex-row justify-start md:justify-between items-start md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex gap-4 text-base">
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="radio"
                  name="tripType"
                  value="one-way"
                  checked={tripType === "one-way"}
                  onChange={() => handleTripTypeChange("one-way")}
                  className="h-4 w-4 accent-primary-accent"
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
                  className="h-4 w-4 accent-primary-accent"
                />
                <span>{t("searchBlock.tripType.roundTrip")}</span>
              </label>
            </div>
          </div>
        </div>

        <SearchForm
          loading={loading}
          stations={stations}
          isSubmitting={isSubmitting}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBlock;
