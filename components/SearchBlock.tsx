"use client";
import { ArrowRight, RefreshCcw } from "lucide-react";
import CustomSelect, { SELECT_TYPE } from "./custom-select";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useState } from "react";
import useSearchStore from "@/store";

const BUS_TYPES = ["Luxury Bus", "Economy Bus", "Sleeper Bus", "Executive Bus"];

const countryOptions = [
  {
    name: "USA",
    cities: [
      { value: "nyc", label: "New York City" },
      { value: "la", label: "Los Angeles" },
    ],
  },
  {
    name: "UK",
    cities: [
      { value: "ldn", label: "London" },
      { value: "man", label: "Manchester" },
    ],
  },
  {
    name: "Japan",
    cities: [
      { value: "tok", label: "Tokyo" },
      { value: "osa", label: "Osaka" },
    ],
  },
  {
    name: "Australia",
    cities: [
      { value: "syd", label: "Sydney" },
      { value: "mel", label: "Melbourne" },
    ],
  },
  {
    name: "France",
    cities: [
      { value: "par", label: "Paris" },
      { value: "nic", label: "Nice" },
    ],
  },
  {
    name: "Germany",
    cities: [
      { value: "ber", label: "Berlin" },
      { value: "mun", label: "Munich" },
    ],
  },
];

const SearchBlock = () => {
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);

  const { passengers, departureDate, from, to } = useSearchStore();

  console.log({ passengers, departureDate, from, to });

  return (
    <div className="bg-white rounded-xl p-7 flex flex-col gap-4 w-full min-h-fit">
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
          <CustomSelect
            countries={countryOptions}
            type={SELECT_TYPE.SELECT}
            departure="from"
          />
        </div>
        {/* <div className="rounded-full h-13 w-13 mb-2 shrink-0 flex justify-center items-center bg-black p-2">
            <RefreshCcw className="w-6 h-6 text-white" />
          </div> */}
        <div className="w-full">
          <p className="text-black font-normal text-lg">To</p>
          <CustomSelect
            countries={countryOptions}
            type={SELECT_TYPE.SELECT}
            departure="to"
          />
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
          <CustomSelect
            type={
              isRoundTrip
                ? SELECT_TYPE.DATE_RANGE_PICKER
                : SELECT_TYPE.DATE_PICKER
            }
          />
        </div>
        <div>
          <p className="text-black font-normal text-lg">Passengers</p>
          <CustomSelect type={SELECT_TYPE.PASSENGER_SELECT} />
        </div>
      </div>
      <div className="w-full flex-col gap-4 items-start justify-start flex md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-4 overflow-hidden w-full">
          <p className="text-black font-normal text-lg">Filter:</p>
          <div className="flex gap-2 items-center overflow-x-auto">
            {BUS_TYPES.map((bus, index) => (
              <Button variant={"outline"} className="rounded-full" key={index}>
                {bus}
              </Button>
            ))}
          </div>
        </div>
        <Button className="p-6 flex items-center gap-2 text-base w-full md:w-fit">
          Search
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBlock;
