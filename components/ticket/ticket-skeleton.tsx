import { Skeleton } from "../ui/skeleton";

export default function TicketSkeletonton() {
  return (
    <div className="p-6 border bg-white rounded-xl space-y-4 h-[166px]">
      <Skeleton className="h-5 rounded w-1/4"></Skeleton>
      <div className="flex items-center justify-between h-full w-full">
        <div className="h-full w-2/3 space-y-4">
          <Skeleton className="h-5 rounded"></Skeleton>
          <div className="h-4 rounded flex justify-between items-center">
            <Skeleton className="h-5 rounded w-1/4"></Skeleton>
            <Skeleton className="h-5 rounded w-1/4"></Skeleton>
          </div>
          <div className="h-4 rounded flex justify-between items-center">
            <Skeleton className="h-4 rounded w-1/3"></Skeleton>
            <Skeleton className="h-4 rounded w-1/3"></Skeleton>
          </div>
        </div>
        <div className="w-1/3 flex flex-col justify-between items-end h-full pb-8">
          <Skeleton className="h-8 rounded w-1/3"></Skeleton>
          <Skeleton className="h-8 rounded w-1/3"></Skeleton>
        </div>
      </div>
    </div>
  );
}
