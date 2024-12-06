import { Skeleton } from "../ui/skeleton";

export default function TicketSkeletonton() {
  return (
    <div className="p-4 border bg-white rounded-lg space-y-4 h-[175px] sm:h-[152.5px]">
      <div className="flex justify-between items-center w-full">
        <Skeleton className="h-5 rounded w-1/4 sm:w-1/6"></Skeleton>
        <Skeleton className="h-5 rounded w-1/2 sm:w-1/4"></Skeleton>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between h-full w-full">
        <div className="h-full w-full sm:w-2/3 space-y-4">
          <Skeleton className="h-5 rounded"></Skeleton>
          <div className="h-4 rounded flex justify-between items-center">
            <Skeleton className="h-5 rounded w-1/4"></Skeleton>
            <Skeleton className="h-5 rounded w-1/4"></Skeleton>
          </div>
          <div className="h-4 hidden rounded sm:flex justify-between items-center">
            <Skeleton className="h-4 rounded w-1/3"></Skeleton>
            <Skeleton className="h-4 rounded w-1/3"></Skeleton>
          </div>
        </div>
        <div className="w-full sm:w-1/3 flex sm:flex-col justify-between items-end h-full pb-8">
          <Skeleton className="h-8 rounded w-1/3"></Skeleton>
          <Skeleton className="h-8 rounded w-1/3"></Skeleton>
        </div>
      </div>
    </div>
  );
}
