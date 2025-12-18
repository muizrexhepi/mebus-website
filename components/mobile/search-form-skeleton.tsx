import { cn } from "@/lib/utils";

export const SearchFormSkeleton = () => {
  return (
    <div className="space-y-4 w-full animate-pulse">
      {/* Trip Type Radio Buttons */}
      <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between items-start md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Main Form Grid - Matches SearchForm grid classes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end gap-1 lg:gap-1">
        {/* From Station */}
        <div className="space-y-2 mb-1">
          <div className="h-4 w-12 bg-gray-200 rounded ml-1" />
          <div className="h-12 w-full bg-gray-200 rounded-lg" />
        </div>

        {/* To Station */}
        <div className="space-y-2 mb-1">
          <div className="h-4 w-12 bg-gray-200 rounded ml-1" />
          <div className="h-12 w-full bg-gray-200 rounded-lg" />
        </div>

        {/* Date Picker */}
        <div className="space-y-2 mb-1">
          <div className="h-4 w-24 bg-gray-200 rounded ml-1" />
          <div className="h-12 w-full bg-gray-200 rounded-lg" />
        </div>

        {/* Passengers */}
        <div className="space-y-2 mb-1">
          <div className="h-4 w-20 bg-gray-200 rounded ml-1" />
          <div className="h-12 w-full bg-gray-200 rounded-lg" />
        </div>

        {/* Search Button */}
        <div className="mt-1 md:mt-0 sm:col-span-2 lg:col-span-1">
          <div className="h-12 w-full bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
