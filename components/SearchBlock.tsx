"use client";
import { ArrowRight } from "lucide-react";
import CustomSelect, { SELECT_TYPE } from "./custom-select";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import useSearchStore from "@/store";
import { useRouter } from "next/navigation";
import { getStationsByOperatorId } from "@/actions/station";
import { handleSearchAvailableTickets } from "@/actions/ticket";

const BUS_TYPES = ["Luxury Bus", "Economy Bus", "Sleeper Bus", "Executive Bus"];

// sper test
const operator_id = "66cba19d1a6e55b32932c59b";


const SearchBlock = () => {
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const router = useRouter();
  const { passengers, departureDate, from, to, resetSearch } = useSearchStore();

  const isEmpty = {
    from: !from,
    to: !to,
    departureDate: !departureDate,
    passengers: !passengers || passengers.adults === 0,
  };


  const handleSearch = async () => {
    console.log({from, to})
      router.push(
        `/search/?departureStation=${from}&arrivalStation=${to}&departureDate=${departureDate}&adult=${passengers.adults}&children=${passengers?.children}`
      );
      resetSearch();

  };

  const getStations = async () => {
    try {
      const stations = await getStationsByOperatorId(operator_id);
      console.log({stations})
      return stations;
    } catch (error) {
      console.log(error);    
    }
  }
  

  useEffect(() => {
    const stationList: any = [];
    getStations().then((data) =>{
      data.forEach((station: any) => {
        stationList.push({
          name: station?.city,
          cities: [
            {
              value: station?._id,
              label: station?.name,
            }
          ]
        })
      });
    });

    setCountryOptions(stationList)
  }, [])
  

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
            departure={"from"}
            empty={isEmpty.from} 
          />
        </div>
        <div className="w-full">
          <p className="text-black font-normal text-lg">To</p>
          <CustomSelect
            countries={countryOptions}
            type={SELECT_TYPE.SELECT}
            departure={"to"}
            empty={isEmpty.to}
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
            empty={isEmpty.departureDate}
          />
        </div>
        <div>
          <p className="text-black font-normal text-lg">Passengers</p>
          <CustomSelect
            type={SELECT_TYPE.PASSENGER_SELECT}
            empty={isEmpty.passengers}
          />
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
        <Button
          className="p-6 flex items-center gap-2 text-base w-full md:w-fit"
          onClick={handleSearch}
        >
          Search
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBlock;
