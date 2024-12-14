import React from "react";
import { ArrowRight, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputSkeleton from "@/components/input-skeleton";
import PassengerSelect from "@/app/search/_components/passenger-select";
import { Station } from "@/models/station";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import StationSelect from "@/app/search/_components/station-select";
import DatePicker from "@/app/search/_components/date-picker";
import ReturnDatePicker from "@/app/search/_components/return-date-picker";
import useSearchStore from "@/store";

interface SearchFormProps {
  loading: boolean;
  stations: Station[];
  isSubmitting: boolean;
  onSearch: () => void;
  updateUrl?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  loading,
  updateUrl,
  stations,
  isSubmitting,
  onSearch,
}) => {
  const { t } = useTranslation();
  const { tripType } = useSearchStore();
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end gap-2 lg:gap-1",
        {
          "lg:grid-cols-4": updateUrl,
        }
      )}
    >
      {["from", "to"].map((departure) => (
        <div key={departure} className="w-full">
          <p className="hidden sm:block text-black font-medium text-base">
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
      <div className="w-full">
        <p className="hidden sm:block text-black font-medium text-base">
          {t("searchForm.departure")}
        </p>{" "}
        {loading ? (
          <InputSkeleton />
        ) : (
          <div className="flex items-center gap-2 sm:gap-1">
            <DatePicker updateUrl={updateUrl} />
            {tripType == "round-trip" ? (
              <ReturnDatePicker updateUrl={updateUrl} />
            ) : null}
          </div>
        )}
      </div>
      <div>
        <p className="hidden sm:block text-black font-medium text-base">
          {t("searchForm.passengers")}
        </p>{" "}
        {loading ? (
          <InputSkeleton />
        ) : (
          <PassengerSelect updateUrl={updateUrl} />
        )}
      </div>
      <Button
        type="submit"
        className={cn(
          "p-6 flex items-center gap-2 text-base w-full sm:col-span-2 rounded-lg h-14 lg:col-span-1 bg-gradient-to-tr from-[#ff6700] to-[#ff007f]",
          {
            hidden: updateUrl,
          }
        )}
        disabled={isSubmitting}
        onClick={onSearch}
      >
        {isSubmitting ? (
          <Loader className="size-6 animate-spin mx-auto text-gray-600" />
        ) : (
          t("searchForm.searchButton.default")
        )}{" "}
      </Button>
    </div>
  );
};
