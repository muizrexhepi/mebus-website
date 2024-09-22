"use client";
import { ArrowRight } from "lucide-react";
import CustomSelect, { SELECT_TYPE } from "@/components/custom-select";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import useSearchStore from "@/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import InputSkeleton from "@/components/input-skeleton";
import { cn } from "@/lib/utils";
import { DateSelectBlock } from "@/components/search/DateSelectBlock";

const SearchSection = ({
  stations,
}: {
  stations: { _id: string; name: string; city: string; country: string }[];
}) => {
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const router = useRouter();
  const { from: fromCity, to: toCity, resetSearch } = useSearchStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const handleSearch = async (values: z.infer<typeof searchSchema>) => {
    setIsSubmitting(true);
    const { from, to, passengers, departureDate: searchDepartureDate } = values;
    try {
      router.push(
        `/search/${fromCity.toLowerCase()}-${toCity.toLowerCase()}?departureStation=${from}&arrivalStation=${to}&departureDate=${
          departureDate ? departureDate.toISOString() : searchDepartureDate
        }${returnDate ? `&returnDate=${returnDate.toISOString()}` : ""}&adult=${
          passengers.adults
        }&children=${passengers?.children}`
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: "",
      to: "",
      passengers: {
        adults: 1,
        children: 0,
      },
    },
  });

  const stationList = useMemo(
    () =>
      stations?.map((station) => ({
        country: station?.country,
        cities: [
          {
            value: station?._id,
            label: station?.name,
            city: station?.city,
          },
        ],
      })),
    [stations]
  );

  useEffect(() => {
    setCountryOptions(stationList);
    setLoading(false);
  }, [stationList]);

  return (
    <>
      <div className="bg-white rounded-xl p-7 flex flex-col gap-4 w-full min-h-fit">
        <div className="max-w-6xl mx-auto w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSearch)}
              className="space-y-6 flex-1"
            >
              <div className="w-full flex flex-col gap-2 md:flex-row justify-start md:justify-between items-start md:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex gap-4">
                    <label className="cursor-pointer flex items-center gap-2">
                      <input
                        type="radio"
                        name="tripType"
                        value="one-way"
                        checked={!isRoundTrip}
                        onChange={() => setIsRoundTrip(false)}
                        className="h-7 w-7 accent-emerald-700"
                      />
                      <span>One-way</span>
                    </label>
                    <label className="cursor-pointer flex items-center gap-2">
                      <input
                        type="radio"
                        name="tripType"
                        value="round-trip"
                        checked={isRoundTrip}
                        onChange={() => setIsRoundTrip(true)}
                        className="h-7 w-7 accent-emerald-700"
                      />
                      <span>Round-trip</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end gap-4">
                <div className="w-full">
                  <p className="text-black font-normal text-lg">From</p>
                  {loading ? (
                    <InputSkeleton />
                  ) : (
                    <CustomSelect
                      countries={countryOptions}
                      type={SELECT_TYPE.SELECT}
                      departure={"from"}
                      name="from"
                    />
                  )}
                </div>
                <div className="w-full">
                  <p className="text-black font-normal text-lg">To</p>
                  {loading ? (
                    <InputSkeleton />
                  ) : (
                    <CustomSelect
                      countries={countryOptions}
                      type={SELECT_TYPE.SELECT}
                      departure={"to"}
                      name="to"
                    />
                  )}
                </div>
                <div>
                  <p className="text-black font-normal text-lg">Departure</p>
                  {loading ? (
                    <InputSkeleton />
                  ) : (
                    <div className="flex border border-input overflow-hidden rounded-lg divide-x">
                      <div
                        className={cn(
                          "w-1/2 flex bg-background hover:bg-accent hover:text-accent-foreground",
                          {
                            "w-full": !isRoundTrip,
                          }
                        )}
                      >
                        <CustomSelect
                          type={SELECT_TYPE.DATE_PICKER}
                          name="departureDate"
                          selectedDate={departureDate}
                          onDateChange={setDepartureDate}
                        />
                      </div>
                      {isRoundTrip && (
                        <div
                          className={cn(
                            "w-1/2 flex bg-background hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <CustomSelect
                            type={SELECT_TYPE.DATE_PICKER}
                            name="returnDate"
                            selectedDate={returnDate}
                            onDateChange={setReturnDate}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-black font-normal text-lg">Passengers</p>
                  {loading ? (
                    <InputSkeleton />
                  ) : (
                    <CustomSelect
                      type={SELECT_TYPE.PASSENGER_SELECT}
                      name="passengers"
                    />
                  )}
                </div>
                <Button
                  type="submit"
                  className="p-6 flex items-center gap-2 text-base w-full sm:col-span-2 h-14 lg:col-span-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Searching..." : "Search"}
                  {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <DateSelectBlock
      // departureDate={departureDate}
      // setDepartureDate={setDepartureDate}
      // returnDate={returnDate}
      // setReturnDate={setReturnDate}
      />
    </>
  );
};

export default SearchSection;
