"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { Ticket } from "@/models/ticket";
import { useToast } from "../hooks/use-toast";
import TicketSkeletonton from "../ticket/ticket-skeleton";
import TicketBlock from "./Ticket";
import useSearchStore, { useCheckoutStore, useLoadingStore } from "@/store";
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
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const TicketList: React.FC = () => {
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
  const { tripType, departureDate, returnDate, passengers, from, to } =
    useSearchStore();
  const { setIsLoading, isLoading } = useLoadingStore();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { t } = useTranslation();

  const fetchTickets = async (pageNumber: number) => {
    if (!from || !to) {
      toast({
        title: "Error",
        description: "Missing required parameters",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);
      setLoading(true);
      const response = await fetch(
        `${environment.apiurl}/ticket/search?departureStation=${
          isSelectingReturn ? to : from
        }&arrivalStation=${isSelectingReturn ? from : to}&departureDate=${
          isSelectingReturn ? returnDate : departureDate
        }&adults=${passengers.adults}&children=${
          passengers.children
        }&page=${pageNumber}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const data = await response.json();
      const newTickets: Ticket[] = data.data || [];

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
    if (to && from) {
      setTickets([]);
      setPage(1);
      setHasMore(true);
      fetchTickets(1);
    }
  }, [
    from,
    to,
    departureDate,
    returnDate,
    passengers.adults,
    passengers.children,
    isSelectingReturn,
  ]);

  const handleLoadMore = () => {
    if (!noData && !loading && hasMore) {
      fetchTickets(page);
    }
  };

  const handleTicketSelection = (ticket: Ticket) => {
    if (isSelectingReturn) {
      setIsLoading(true);
      setReturnTicket(ticket);
      router.push("/checkout");
    } else {
      setOutboundTicket(ticket);
      setIsLoading(true);
      if (tripType === "round-trip" && returnDate) {
        setIsLoading(false);
        setIsSelectingReturn(true);
      } else {
        setIsLoading(false);
        router.push("/checkout");
      }
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="space-y-3">
  //       {Array.from({ length: 5 }).map((_, index) => (
  //         <TicketSkeletonton key={index} />
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col gap-8">
      {noData && tickets.length === 0 ? (
        <NoTicketsAvailable />
      ) : (
        <div className="w-full mx-auto">
          <h1
            className={cn("mb-2 font-medium text-lg", {
              hidden: tripType == "one-way",
            })}
          >
            {isSelectingReturn && tripType == "round-trip"
              ? "Select Return Ticket"
              : ""}
          </h1>
          <InfiniteScroll
            dataLength={tickets.length}
            className="space-y-2 sm:space-y-1"
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
                    <TicketBlock ticket={ticket} isReturn={isSelectingReturn} />
                  </div>
                </SheetTrigger>
                <SheetContent className="p-0 rounded-tl-xl rounded-bl-xl h-full flex flex-col justify-between">
                  <div>
                    <SheetHeader className="border-b p-4 shadow-sm">
                      <SheetTitle className="font-medium">
                        {t("ticketDetails.title")}
                      </SheetTitle>
                    </SheetHeader>
                    <TicketDetails ticket={ticket} />
                  </div>
                  <SheetFooter className="p-4">
                    <Button
                      className="w-full h-14 bg-primary-bg rounded-xl hover:bg-primary-bg/95 text-base"
                      onClick={() => handleTicketSelection(ticket)}
                    >
                      {isSelectingReturn
                        ? t("ticket.selectReturn")
                        : tripType !== "round-trip"
                        ? t("ticket.continue")
                        : t("ticket.selectOutbound")}
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
