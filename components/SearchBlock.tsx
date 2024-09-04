"use client";
import { ArrowRight } from "lucide-react";
import CustomSelect, { SELECT_TYPE } from "./custom-select";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
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
  const handleSearch = async (values: z.infer<typeof searchSchema>) => {
    const { from, to, departureDate, passengers, returnDate } = values;
    console.log({ values });
    router.push(
      `/search/${fromCity}-${toCity}?departureStation=${from}&arrivalStation=${to}&departureDate=${departureDate}${
        returnDate && `&returnDate=${returnDate}`
      }&adult=${passengers.adults}&children=${passengers?.children}`
    );
    // resetSearch();
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

  useEffect(() => {
    const stationList: any = stations?.map((station) => ({
      name: station?.city,
      cities: [
        {
          value: station?._id,
          label: station?.name,
          city: station?.city,
        },
      ],
    }));

    setCountryOptions(stationList);
    setLoading(false);
  }, [stations]);

  return (
    <div className="bg-white rounded-xl p-7 flex flex-col gap-4 w-full min-h-fit">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          className="space-y-6 flex-1"
        >
          <div className="w-full flex flex-col gap-2 md:flex-row justify-start md:justify-between items-start md:items-center">
            <h1 className="text-3xl text-black">Find your bus & travel</h1>
            <div className="flex items-center gap-2">
              <Button>Europe</Button>
              <Button disabled variant={"ghost"}>
                Japan
              </Button>
              <Button disabled variant={"ghost"}>
                Indonesia
              </Button>
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
              <div className="flex justify-between items-center">
                <p className="text-black font-normal text-lg">Departure</p>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="round-trip">Round-trip?</Label>
                  <Switch
                    id="round-trip"
                    onCheckedChange={() => setIsRoundTrip(!isRoundTrip)}
                  />
                </div>
              </div>
              {loading ? (
                <InputSkeleton />
              ) : (
                <div className="flex border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg divide-x">
                  <div
                    className={cn("w-1/2", {
                      "w-full": !isRoundTrip,
                    })}
                  >
                    <CustomSelect
                      type={SELECT_TYPE.DATE_PICKER}
                      name="departureDate"
                    />
                  </div>
                  {isRoundTrip && (
                    <div className={cn("w-1/2")}>
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
            >
              Search
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SearchBlock;
