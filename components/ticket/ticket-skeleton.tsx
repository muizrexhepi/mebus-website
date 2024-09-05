import { Skeleton } from "../ui/skeleton";

export default function TicketSkeletonton() {
  return (
    <div className="p-4 border border-gray-200 rounded-xl h-[165px]">
      <Skeleton className="h-6 rounded w-3/4 mb-2"></Skeleton>
      <Skeleton className="h-4 rounded w-1/2 mb-2"></Skeleton>
      <Skeleton className="h-4 rounded w-full"></Skeleton>
      <Skeleton className="h-4 rounded w-5/6 mt-2"></Skeleton>
    </div>
  );
}
