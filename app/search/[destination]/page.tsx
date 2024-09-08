import { getStationsByOperatorId } from "@/actions/station";
import Navbar from "@/components/Navbar";
import FilterBlock from "@/components/search/FilterBlock";
import SearchBlock from "@/components/SearchBlock";
import SearchedTickets from "@/components/search/SearchedTickets";
import { Metadata } from "next";
import SecondaryNavbar from "@/components/SecondaryNavbar";

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

  const title = `Travel from ${departureCity} to ${arrivalCity} by bus | Mebus`;
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
          </div>
          <div className="w-full lg:w-[75%] space-y-2">
            <SearchedTickets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
