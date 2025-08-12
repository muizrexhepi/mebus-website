import { SearchForm } from "../../../components/forms/SearchForm";

const SearchBlock = () => {
  return (
    <div className="bg-transparent sm:bg-white sm:rounded-2xl sm:p-6 flex flex-col gap-4 w-full min-h-fit shadow-sm">
      <SearchForm />
    </div>
  );
};

export default SearchBlock;
