import SearchedTickets from "@/components/search/SearchedTickets";
import { Metadata } from "next";
import SecondaryNavbar from "@/components/SecondaryNavbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import SearchSection from "@/components/search/SearchSection";
import axios from "axios";
import { environment } from "@/environment";

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
  const res =
    (await axios.get(
      `${environment.apiurl}/station?select=name city country`
    )) || [];
  const stations = res.data.data || [];

  console.log({ stations });

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="w-full flex justify-center items-center bg-neutral-900 px-4 sm:px-8 py-4 xl:px-0">
        <SecondaryNavbar />
      </div>
      <SearchSection stations={stations} />
      <div className="min-h-screen px-4 sm:px-8 max-w-6xl mx-auto py-4 space-y-4 xl:px-0">
        {/* <DateSelectBlock /> */}
        <div className="w-full max-w-4xl mx-auto">
          <SearchedTickets />
        </div>
        {/* </div> */}
      </div>
      <SecondaryFooter />
    </div>
  );
};

export default SearchPage;
