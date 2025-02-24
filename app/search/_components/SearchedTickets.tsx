"use client";
import React, {
  Suspense,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { Ticket } from "@/models/ticket";
import { useToast } from "@/components/hooks/use-toast";
import TicketSkeletonton from "@/components/ticket/ticket-skeleton";
import useSearchStore, { useCheckoutStore, useLoadingStore } from "@/store";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import TicketDetails from "@/components/ticket/ticket-details";
import NoTicketsAvailable from "./NoTicketsAvailable";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import TicketBlock from "@/components/ticket/Ticket";
import SearchFilters from "./search-filters";
import { addDays, format, parse } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Loader2 } from "lucide-react";

const TicketList: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    setSelectedTicket,
    setOutboundTicket,
    setReturnTicket,
    isSelectingReturn,
    setIsSelectingReturn,
  } = useCheckoutStore();
  const {
    tripType,
    setFrom,
    setFromCity,
    setTo,
    setToCity,
    setPassengers,
    setDepartureDate,
    setReturnDate,
  } = useSearchStore();

  const searchParams = useSearchParams();
  const params = useParams();

  const { setIsLoading } = useLoadingStore();
  const { t } = useTranslation();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // New state for next available dates
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [fetchingAvailableDates, setFetchingAvailableDates] = useState(false);

  const searchParameters = useMemo(
    () => ({
      destination: Array.isArray(params.destination)
        ? params.destination[0]
        : params.destination,
      departureStation: searchParams.get("departureStation"),
      arrivalStation: searchParams.get("arrivalStation"),
      departureDate: searchParams.get("departureDate"),
      returnDate: searchParams.get("returnDate"),
      adult: searchParams.get("adult"),
      children: searchParams.get("children"),
    }),
    [params.destination, searchParams]
  );

  const [fromCity, toCity] = useMemo(
    () => searchParameters.destination.split("-"),
    [searchParameters.destination]
  );

  const fetchTickets = useCallback(
    async (pageNumber: number) => {
      const {
        departureStation,
        arrivalStation,
        departureDate,
        returnDate,
        adult,
        children,
      } = searchParameters;

      if (!arrivalStation || !departureStation) {
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
          `${process.env.NEXT_PUBLIC_API_URL}/ticket/search?departureStation=${
            isSelectingReturn ? arrivalStation : departureStation
          }&arrivalStation=${
            isSelectingReturn ? departureStation : arrivalStation
          }&departureDate=${
            isSelectingReturn ? returnDate : departureDate
          }&adults=${adult}&children=${children}&page=${pageNumber}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();
        const newTickets: Ticket[] = data.data || [];

        if (newTickets.length === 0) {
          if (pageNumber === 1) {
            setNoData(true);
            fetchNextAvailableDates();
          }
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
    },
    [searchParameters, isSelectingReturn, toast, setIsLoading]
  );

  // New function to fetch next available dates
  const fetchNextAvailableDates = useCallback(async () => {
    const {
      departureStation,
      arrivalStation,
      departureDate,
      returnDate,
      adult,
      children,
    } = searchParameters;

    if (!arrivalStation || !departureStation) return;

    try {
      setFetchingAvailableDates(true);

      // This endpoint needs to be implemented on your backend
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/ticket/search/find-nearest?departureStation=${
          isSelectingReturn ? arrivalStation : departureStation
        }&arrivalStation=${
          isSelectingReturn ? departureStation : arrivalStation
        }&currentDate=${
          isSelectingReturn ? returnDate : departureDate
        }&adults=${adult}&children=${children}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch available dates");
      }

      const data = await response.json();
      console.log({ availableDates: data });
      setAvailableDates(data.data.availableDates || []);
    } catch (err) {
      console.error("Failed to fetch available dates:", err);
    } finally {
      setFetchingAvailableDates(false);
    }
  }, [searchParameters, isSelectingReturn]);

  useEffect(() => {
    const {
      departureStation,
      arrivalStation,
      departureDate,
      returnDate,
      adult,
      children,
    } = searchParameters;

    if (departureStation && arrivalStation && adult && children) {
      setFrom(departureStation);
      setFromCity(fromCity);
      setToCity(toCity);
      setDepartureDate(departureDate || format(new Date(), "dd-MM-yyyy"));
      setReturnDate(returnDate || format(addDays(new Date(), 7), "dd-MM-yyyy"));
      setPassengers({
        adults: +adult,
        children: +children,
      });
      setTo(arrivalStation);
      setTickets([]);
      setPage(1);
      setHasMore(true);
      fetchTickets(1);
      setFilteredTickets([]);
    }
  }, [
    searchParameters,
    fromCity,
    toCity,
    fetchTickets,
    setFrom,
    setFromCity,
    setToCity,
    setDepartureDate,
    setReturnDate,
    setPassengers,
    setTo,
  ]);

  useEffect(() => {
    setFilteredTickets(tickets);
  }, [tickets]);

  const handleLoadMore = useCallback(() => {
    if (!noData && !loading && hasMore) {
      fetchTickets(page);
    }
  }, [noData, loading, hasMore, fetchTickets, page]);

  const handleTicketSelection = useCallback(
    (ticket: Ticket) => {
      setIsLoading(true);
      if (isSelectingReturn) {
        setReturnTicket(ticket);
        router.push("/checkout");
      } else {
        setOutboundTicket(ticket);
        setIsLoading(true);
        if (tripType === "round-trip" && searchParameters.returnDate) {
          setIsLoading(false);
          setIsSelectingReturn(true);
        } else {
          setIsLoading(false);
          router.push("/checkout");
        }
      }
    },
    [
      isSelectingReturn,
      setReturnTicket,
      router,
      setOutboundTicket,
      tripType,
      searchParameters.returnDate,
      setIsLoading,
      setIsSelectingReturn,
    ]
  );

  const navigateToDate = useCallback(
    (dateStr: string) => {
      const currentParams = new URLSearchParams(searchParams.toString());

      if (isSelectingReturn) {
        currentParams.set("returnDate", dateStr);
      } else {
        currentParams.set("departureDate", dateStr);
      }

      router.push(
        `/search/${searchParameters.destination}?${currentParams.toString()}`
      );
    },
    [isSelectingReturn, router, searchParams, searchParameters.destination]
  );

  const NextAvailableDates = () => {
    // if (availableDates.length === 0) {
    //   return <NoTicketsAvailable />;
    // }
    console.log({ zi: availableDates });
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          No tickets available for selected date
        </h2>
        <p>Here are the next available dates:</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableDates.slice(0, 6).map((date, index) => {
            const dateObj = parse(date, "dd-MM-yyyy", new Date());
            return (
              <Button
                key={index}
                variant="outline"
                className="p-4 h-auto flex flex-col items-center gap-2 hover:bg-primary/10"
                onClick={() => navigateToDate(date)}
              >
                <span className="text-lg font-medium">
                  {format(dateObj, "EEE")}
                </span>
                <span className="text-2xl font-bold">
                  {format(dateObj, "d")}
                </span>
                <span>{format(dateObj, "MMM yyyy")}</span>
              </Button>
            );
          })}
        </div>

        {availableDates.length > 6 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">
              View all available dates
            </h3>
            <Calendar
              mode="single"
              disabled={[
                { before: new Date() },
                (date) => {
                  const dateStr = format(date, "dd-MM-yyyy");
                  return !availableDates.includes(dateStr);
                },
              ]}
              onSelect={(date) =>
                date && navigateToDate(format(date, "dd-MM-yyyy"))
              }
              className="rounded-md border"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {noData && filteredTickets.length === 0 ? (
        fetchingAvailableDates ? (
          <Loader2 className="animate-spin mx-auto size-6" />
        ) : (
          <NextAvailableDates />
        )
      ) : (
        <div className="w-full mx-auto space-y-4">
          <div className="w-full flex items-center justify-between">
            <SearchFilters
              tickets={tickets}
              totalTrips={filteredTickets.length}
              onFiltersChange={setFilteredTickets}
            />
            <p className="font-normal">{filteredTickets.length || 0} Results</p>
          </div>
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
            {filteredTickets.map((ticket, index) => (
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
                      className="w-full h-12 button-gradient rounded-lg"
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
