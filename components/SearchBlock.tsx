"use client";
import { ArrowRight } from "lucide-react";
import CustomSelect, { SELECT_TYPE } from "./custom-select";
import { Button } from "./ui/button";

import { useEffect, useMemo, useState } from "react";
import useSearchStore from "@/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchSchema } from "@/schemas";
import { Form } from "./ui/form";
import InputSkeleton from "./input-skeleton";
import { cn } from "@/lib/utils";

const BUS_TYPES = ["Luxury Bus", "Economy Bus", "Sleeper Bus", "Executive Bus"];

const SearchBlock = ({
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

  const handleSearch = async (values: z.infer<typeof searchSchema>) => {
    setIsSubmitting(true);
    const { from, to, departureDate, passengers, returnDate } = values;
    try {
      router.push(
        `/search/${fromCity.toLowerCase()}-${toCity.toLowerCase()}?departureStation=${from}&arrivalStation=${to}&departureDate=${departureDate}${
          returnDate && `&returnDate=${returnDate}`
        }&adult=${passengers.adults}&children=${passengers?.children}`
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
      departureDate: "",
      returnDate: "",
      passengers: {
        adults: 1,
        children: 0,
      },
    },
  });

  const stationList = useMemo(
    () =>
      stations?.map((station) => ({
        name: station?.city,
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
    <div className="bg-white rounded-xl p-7 flex flex-col gap-4 w-full min-h-fit">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </div>
          <div className="w-full flex-col gap-4 items-start justify-start flex md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-4 overflow-hidden w-full">
              <p className="text-black font-normal text-lg">Filter:</p>
              <div className="flex gap-2 items-center overflow-x-auto">
                {BUS_TYPES.map((bus, index) => (
                  <Button
                    variant={"outline"}
                    type="button"
                    className="rounded-full"
                    key={index}
                  >
                    {bus}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              type="submit"
              className="p-6 flex items-center gap-2 text-base w-full md:w-fit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Searching..." : "Search"}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SearchBlock;
