import { SearchForm } from "@/components/forms/SearchForm";
import { DateSelectBlock } from "./DateSelectBlock";

const SearchSection = () => {
  return (
    <div className="hidden md:block">
      <div className="bg-white rounded-lg py-4 md:py-6 flex flex-col gap-4 w-full min-h-fit">
        <div className="max-w-6xl paddingX mx-auto w-full">
          <SearchForm updateUrl />
        </div>
      </div>
      <DateSelectBlock />
    </div>
  );
};

export default SearchSection;
