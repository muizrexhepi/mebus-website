import { getStationsByOperatorId } from "@/actions/station";
import SearchBlock from "@/components/SearchBlock";
import SearchedTickets from "@/components/search/SearchedTickets";
import { Metadata } from "next";
import SecondaryNavbar from "@/components/SecondaryNavbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import { DateSelectBlock } from "@/components/search/DateSelectBlock";
import DateSelectSkeleton from "@/components/search/DateSelectSkeleton";

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

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="w-full flex justify-center items-center bg-neutral-900 px-4 sm:px-8 py-4 xl:px-0">
        <SecondaryNavbar />
      </div>
      <div className="min-h-screen px-4 sm:px-8 max-w-6xl mx-auto py-8 space-y-8 xl:px-0">
        <SearchBlock stations={stations} />
        <DateSelectBlock />
        <div className="w-full space-y-2 max-w-4xl mx-auto">
          <SearchedTickets />
        </div>
        {/* </div> */}
      </div>
      <SecondaryFooter />
    </div>
  );
};

export default SearchPage;
