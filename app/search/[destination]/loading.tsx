import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="min-h-screen bg-primary-bg/5">
      {/* Mobile Search Block Skeleton */}
      <div className="block md:hidden bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-8 w-16 rounded" />
        </div>
      </div>

      {/* Desktop Search Section Skeleton */}
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
              <Skeleton className="h-12 w-full" />
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

      {/* Main Content Skeleton */}
      <div className="px-4 sm:px-8 max-w-4xl mx-auto py-4 space-y-4 xl:px-0">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>

        {/* Ticket skeletons */}
        <div className="space-y-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 border-l-4 border-l-primary-accent/80"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <div className="flex gap-2 items-center mb-2 sm:mb-0 justify-between w-full">
                  <Skeleton className="h-6 w-32" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-end relative gap-3">
                <div className="w-full md:w-2/3">
                  <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-8 w-16" />
                    <div className="text-center flex-1 px-2">
                      <Skeleton className="h-6 w-20 mx-auto" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col items-start">
                      <Skeleton className="h-5 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <div className="flex flex-col items-end">
                      <Skeleton className="h-5 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4 w-full md:flex-col md:justify-end md:items-end md:w-fit">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
