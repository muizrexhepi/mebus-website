"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { Ticket } from "@/models/ticket";
import { useToast } from "../hooks/use-toast";
import TicketSkeletonton from "../ticket/ticket-skeleton";
import TicketBlock from "./Ticket";
import { useCheckoutStore, useLoadingStore } from "@/store";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import TicketDetails from "../ticket/ticket-details";
import { environment } from "@/environment";
import NoTicketsAvailable from "./NoTicketsAvailable";

const TicketList: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const {
    outboundTicket,
    returnTicket,
    setSelectedTicket,
    setOutboundTicket,
    setReturnTicket,
    isSelectingReturn,
    setIsSelectingReturn,
  } = useCheckoutStore();
  const { setIsLoading, isLoading } = useLoadingStore();
  const departureStation = searchParams.get("departureStation");
  const arrivalStation = searchParams.get("arrivalStation");
  const departureDate = searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate");
  const adults = searchParams.get("adult") || "1";
  const children = searchParams.get("children") || "0";
  const tripType =
    typeof window !== "undefined"
      ? localStorage.getItem("tripType")
      : "one-way";
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // const [isSelectingReturn, setIsSelectingReturn] = useState(false);

  const fetchTickets = async (pageNumber: number) => {
    if (!departureStation || !arrivalStation) {
      toast({
        title: "Error",
        description: "Missing required parameters",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${
          environment.apiurl
        }/ticket/search?departureStation=${departureStation}&arrivalStation=${arrivalStation}&departureDate=${
          isSelectingReturn ? returnDate : departureDate
        }&adults=${adults}&children=${children}&page=${pageNumber}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const data = await response.json();
      const newTickets: Ticket[] = data.data || [];

      console.log({newTickets})

      if (newTickets.length === 0) {
        setNoData(true);
        setHasMore(false);
      } else {
        setTickets((prevTickets) => [...prevTickets, ...newTickets]);
        setNoData(false);
        setPage(pageNumber + 1);
        setHasMore(newTickets.length === 6);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch tickets",
        variant: "destructive",
      });
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (departureStation && arrivalStation) {
      setTickets([]);
      setPage(1);
      setHasMore(true);
      fetchTickets(1);
    }
  }, [
    departureStation,
    arrivalStation,
    departureDate,
    returnDate,
    adults,
    children,
    isSelectingReturn,
  ]);

  const handleLoadMore = () => {
    if (!noData && !loading && hasMore) {
      fetchTickets(page);
    }
  };

  const handleTicketSelection = (ticket: Ticket) => {
    if (isSelectingReturn) {
      setReturnTicket(ticket);
      router.push(`/checkout?adults=${adults}&children=${children}`);
    } else {
      setOutboundTicket(ticket);

      if (tripType === "round-trip" && returnDate) {
        setIsSelectingReturn(true);
      } else {
        router.push(`/checkout?adults=${adults}&children=${children}`);
      }
    }
  };
  console.log({ isSelectingReturn });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <TicketSkeletonton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {noData && tickets.length === 0 ? (
        <NoTicketsAvailable />
      ) : (
        <div className="w-full mx-auto">
          <h1 className="mb-2 font-medium text-lg">
            {isSelectingReturn
              ? "Select Return Ticket"
              : "Select Outbound Ticket"}
          </h1>
          <InfiniteScroll
            dataLength={tickets.length}
            className="space-y-4"
            next={handleLoadMore}
            hasMore={hasMore}
            loader={loading ? <TicketSkeletonton /> : null}
          >
            {tickets?.map((ticket, index) => (
              <Sheet key={index}>
                <SheetTrigger className="w-full">
                  <div
                    onClick={() => setSelectedTicket(ticket)}
                    className="cursor-pointer"
                  >
                    <TicketBlock
                      ticket={ticket}
                      adults={adults}
                      nrOfChildren={children}
                      isReturn={isSelectingReturn}
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
                    <TicketDetails ticket={ticket} />
                  </div>
                  <SheetFooter className="p-4">
                    <Button
                      className="w-full"
                      onClick={() => handleTicketSelection(ticket)}
                    >
                      {isSelectingReturn
                        ? "Select Return and Continue"
                        : returnDate
                        ? "Select Outbound"
                        : "Continue"}
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default function SearchedTickets() {
  return (
    <Suspense fallback={<p>Loading tickets...</p>}>
      <TicketList />
    </Suspense>
  );
}
