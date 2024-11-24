import SearchedTickets from "@/components/search/SearchedTickets";
import { Metadata } from "next";
import SecondaryNavbar from "@/components/SecondaryNavbar";
import SearchSection from "@/components/search/SearchSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

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
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="w-full flex justify-center items-center bg-gradient-to-tr from-primary-bg/95 via-primary-bg to-primary-bg/95 px-4 sm:px-8 py-4 xl:px-0">
        <Navbar className="max-w-6xl mx-auto z-20 " />
      </div>
      <SearchSection />
      <div className="px-4 sm:px-8 max-w-6xl mx-auto py-4 space-y-4 xl:px-0 min-h-screen">
        <div className="w-full max-w-3xl mx-auto">
          <SearchedTickets />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
