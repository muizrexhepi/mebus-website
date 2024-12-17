import { Metadata } from "next";
import SecondaryFooter from "@/components/SecondaryFooter";
import SearchSection from "../_components/SearchSection";
import SearchedTickets from "../_components/SearchedTickets";

export async function generateMetadata({
  params,
}: {
  params: { destination: string };
}): Promise<Metadata> {
  const { destination } = params;
  const [departureCity, arrivalCity] = destination
    .split("-")
    .map((city) => city.charAt(0).toUpperCase() + city.slice(1));

  const title = `Buses from ${departureCity} to ${arrivalCity} | GoBusly`;
  const description = `Search and book your bus tickets from ${departureCity} to ${arrivalCity} with GoBusly. Travel comfortably across Europe.`;
  return {
    title,
    description,
  };
}

const SearchPage = async () => {
  return (
    <div className="min-h-screen bg-primary-bg/5">
      <SearchSection />
      <div className="px-4 sm:px-8 max-w-6xl mx-auto py-4 space-y-4 xl:px-0 min-h-screen">
        <div className="w-full max-w-2xl mx-auto">
          <SearchedTickets />
        </div>
      </div>
      <SecondaryFooter />
    </div>
  );
};

export default SearchPage;
