"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import ky from "ky";
import { Ticket } from "@/models/ticket";
import TicketBlock from "./Ticket";
import TicketSkeleton from "../ticket/ticket-skeleton";
import TicketDetails from "../ticket/ticket-details";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

const fetchTickets = async ({ pageParam }: { pageParam: number }) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("page", pageParam.toString());

  const response = await ky
    .get(`/api/tickets?${searchParams.toString()}`)
    .json<{
      tickets: Ticket[];
      nextPage: number | undefined;
      totalPages: number;
    }>();
  return response;
};

function TicketList() {
  const searchParams = useSearchParams();
  const [selectedTicket, setSelectedTicket] = useState<Ticket>();
  const adults = searchParams.get("adult") || "1";
  const nrOfChildren = searchParams.get("children") || "0";
  const router = useRouter();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["searched-tickets", searchParams.toString()],
    queryFn: fetchTickets,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <TicketSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-destructive text-center">
        An error occurred while loading tickets.
      </p>
    );
  }

  const tickets = data?.pages.flatMap((page) => page.tickets) || [];

  return (
    <>
      {tickets.length > 0 ? (
        <>
          {tickets.map((ticket) => (
            <Sheet key={ticket._id}>
              <SheetTrigger className="w-full">
                <div
                  onClick={() => setSelectedTicket(ticket)}
                  className="cursor-pointer"
                >
                  <TicketBlock
                    ticket={ticket}
                    adults={searchParams.get("adult") || "1"}
                    nrOfChildren={searchParams.get("children")}
                  />
                </div>
              </SheetTrigger>
              <SheetContent className="p-0 rounded-tl-xl rounded-bl-xl h-full flex flex-col justify-between">
                <div>
                  <SheetHeader className="border-b p-4 shadow-sm">
                    <SheetTitle className="font-medium">
                      Ticket Details
                    </SheetTitle>
                  </SheetHeader>
                  <TicketDetails ticket={selectedTicket!} />
                </div>
                <SheetFooter className="p-4">
                  <Button
                    className="w-full"
                    onClick={(e: any) => {
                      try {
                        e.preventDefault();
                        setSelectedTicket(ticket);
                        router.push(
                          `/checkout?adults=${adults}&children=${nrOfChildren}`
                        );
                        console.log({ ticket });
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    Continue
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="mt-4 w-full"
            >
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </Button>
          )}
        </>
      ) : (
        <p className="text-center text-gray-700">No routes for your request</p>
      )}
    </>
  );
}

export default function SearchedTickets() {
  return (
    <Suspense fallback={<p>Loading tickets...</p>}>
      <TicketList />
    </Suspense>
  );
}
