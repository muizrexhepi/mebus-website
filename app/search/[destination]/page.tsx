import { Metadata } from "next";
import { Suspense } from "react";
import SecondaryFooter from "@/components/SecondaryFooter";
import SearchSection from "../_components/SearchSection";
import SearchedTickets from "../_components/SearchedTickets";
import { Loader2 } from "lucide-react";
import { MobileSearchBlock } from "../_components/MobileSearchBlock";

type GenerateMetadataProps = {
  params: { destination: string };
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const { destination } = params;
  const [departureCity, arrivalCity] = destination
    .split("-")
    .map((city) => city.charAt(0).toUpperCase() + city.slice(1));

  const title = `Buses from ${departureCity} to ${arrivalCity} | GoBusly`;
  const description = `Search and book your bus tickets from ${departureCity} to ${arrivalCity} with GoBusly. Travel comfortably across Europe.`;

  const filteredSearchParams: Record<string, string> = Object.fromEntries(
    Object.entries(searchParams).filter(([, value]) => value !== undefined) as [
      string,
      string
    ][]
  );

  return {
    title,
    description,
    alternates: {
      canonical: `/search/${destination}?${new URLSearchParams(
        filteredSearchParams
      ).toString()}`,
    },
  };
}

const TicketsLoading = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-primary-bg/5">
      <MobileSearchBlock />
      <SearchSection />
      <div className="px-4 sm:px-8 max-w-6xl mx-auto py-4 space-y-4 xl:px-0 min-h-screen">
        <div className="w-full max-w-2xl mx-auto">
          <Suspense fallback={<TicketsLoading />}>
            <SearchedTickets />
          </Suspense>
        </div>
      </div>
      <SecondaryFooter />
    </div>
  );
};

export default SearchPage;
