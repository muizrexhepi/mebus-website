"use client";
import { useCallback, useEffect } from "react";
import useSearchStore, { useCheckoutStore } from "@/store";
import { SearchForm } from "../../../components/forms/SearchForm";
import { useTranslation } from "react-i18next";

const SearchBlock = () => {
  const { t } = useTranslation();
  const { setReturnDate, tripType, setTripType } = useSearchStore();
  const { resetSearch } = useSearchStore();
  const { setOutboundTicket, setReturnTicket, setIsSelectingReturn } =
    useCheckoutStore();

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
    <div className="bg-transparent sm:bg-white sm:rounded-2xl sm:shadow py-6 sm:p-6 flex flex-col gap-4 w-full min-h-fit sm:border sm:border-gray-200">
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

        <SearchForm />
      </div>
    </div>
  );
};

export default SearchBlock;
