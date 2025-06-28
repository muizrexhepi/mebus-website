import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="hidden md:block">
      {/* Main search form skeleton */}
      <div className="bg-white rounded-lg py-4 md:py-6 flex flex-col gap-4 w-full min-h-fit">
        <div className="max-w-6xl paddingX mx-auto w-full">
          {/* Radio buttons skeleton */}
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Search form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end gap-2 lg:gap-1 flex-1 w-full">
            {/* From field */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-12 w-full" />
            </div>

            {/* To field */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-12 w-full" />
            </div>

            {/* Date field */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>

            {/* Passengers field */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-12 w-full" />
            </div>

            {/* Search button */}
          </div>
        </div>
      </div>

      {/* Date selection block skeleton */}
      <div className="max-w-6xl mx-auto paddingX pt-4">
        <div className="flex justify-center gap-1">
          <Skeleton className="h-10 w-24 rounded-t-lg" />
          <Skeleton className="h-10 w-24 rounded-t-lg bg-red-100" />
          <Skeleton className="h-10 w-24 rounded-t-lg" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
