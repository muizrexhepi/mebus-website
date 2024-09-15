import { getStationsByOperatorId } from "@/actions/station";
import FilterBlock from "@/components/search/FilterBlock";
import SearchBlock from "@/components/SearchBlock";
import SearchedTickets from "@/components/search/SearchedTickets";
import { Metadata } from "next";
import SecondaryNavbar from "@/components/SecondaryNavbar";
import SecondaryFooter from "@/components/SecondaryFooter";

const operator_id = "66cba19d1a6e55b32932c59b";

export async function generateMetadata({
  params,
}: {
  params: { destination: string };
}): Promise<Metadata> {
  const { destination } = params;
  const [departureCity, arrivalCity] = destination
    .split("-")
    .map((city) => city.charAt(0).toUpperCase() + city.slice(1));

  const title = `Buses from ${departureCity} to ${arrivalCity} | Mebus`;
  const description = `Search and book your bus tickets from ${departureCity} to ${arrivalCity} with Mebus. Travel comfortably across Europe.`;

  return {
    title,
    description,
  };
}

const SearchPage = async () => {
  const stations = (await getStationsByOperatorId(operator_id)) || [];

  const sortOptions = [
    { value: "price", label: "Price" },
    { value: "duration", label: "Duration" },
    { value: "departure", label: "Departure" },
  ];

  const transferOptions = [
    { value: "direct", label: "Direct" },
    { value: "1transfer", label: "1 transfer" },
    { value: "2transfers", label: "2+ transfers" },
  ];

  const departureTimeOptions = [
    { value: "00:00-04:00", label: "Sat, 00:00 - Sun, 04:00" },
  ];

  const arrivalTimeOptions = [
    { value: "05:30-09:30", label: "Sun, 05:30 - Mon, 09:30" },
  ];

  const berlinStops = [
    { value: "berlin-wannsee", label: "Berlin Wannsee (1)" },
    { value: "berlin-sudkreuz", label: "Berlin Südkreuz (5)" },
    { value: "berlin-alt-tegel", label: "Berlin Alt-Tegel (2)" },
    { value: "berlin-zoo", label: "Berlin Zoo (1)" },
    { value: "berlin-s-treptower-park", label: "Berlin S-Treptower Park (1)" },
    { value: "berlin-alexanderplatz", label: "Berlin Alexanderplatz (3)" },
    {
      value: "berlin-central-bus-station",
      label: "Berlin central bus station (6)",
    },
  ];

  const skopjeStops = [{ value: "skopje", label: "Skopje (19)" }];

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="w-full flex justify-center items-center bg-neutral-900 px-4 sm:px-8 py-4">
        <SecondaryNavbar />
      </div>
      <div className="min-h-screen px-4 sm:px-8 max-w-6xl mx-auto py-8 space-y-4">
        <SearchBlock stations={stations} />
        <div className="flex flex-col lg:flex-row gap-4 h-full">
          <div className="w-full lg:w-[25%] space-y-4">
            <FilterBlock title="Sort by" data={sortOptions} />
            <FilterBlock title="Filter by" data={transferOptions} />
            <FilterBlock
              title="Departure from: Berlin"
              data={departureTimeOptions}
            />
            <FilterBlock title="Arrival in: Skopje" data={arrivalTimeOptions} />
            <FilterBlock title="Stops - Berlin" data={berlinStops} />
            <FilterBlock title="Stops - Skopje" data={skopjeStops} />
          </div>
          <div className="w-full lg:w-[75%] space-y-2">
            <SearchedTickets />
          </div>
        </div>
      </div>
      <SecondaryFooter />
    </div>
  );
};

export default SearchPage;
