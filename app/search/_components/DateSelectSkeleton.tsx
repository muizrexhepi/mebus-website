import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DateSelectSkeleton = () => {
  return (
    <div className="w-full flex justify-between items-center gap-2 h-20 max-w-4xl mx-auto">
      <Skeleton className="flex-1 h-full bg-neutral-300/50" />
      <Skeleton className="flex-1 h-full bg-neutral-300/50" />
      <Skeleton className="flex-1 h-full bg-neutral-300/50" />
    </div>
  );
};

export default DateSelectSkeleton;
