"use client";

import type React from "react";
import { Suspense, useEffect, useMemo, useCallback, useReducer } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Ticket } from "@/models/ticket";
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
import ConnectedTicketDetails from "@/components/ticket/connected-ticket-details";
import NoTicketsAvailable from "./NoTicketsAvailable";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import ConnectedTicketBlock from "@/components/ticket/connected-ticket-block";
import SearchFilters from "./search-filters";
import { addDays, format, parse } from "date-fns";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { ConnectedTicket } from "@/models/connected-ticket";
import ConnectedSearchFilters from "@/components/ticket/connected-search-fitlers";
import TicketBlock from "@/components/ticket/Ticket";

interface TicketState {
  directTickets: Ticket[];
  connectedTickets: ConnectedTicket[];
  filteredDirectTickets: Ticket[];
  filteredConnectedTickets: ConnectedTicket[];
  noData: boolean;
  loading: boolean;
  initialLoading: boolean;
  page: number;
  hasMore: boolean;
  availableDates: string[];
  fetchingAvailableDates: boolean;
}

type TicketAction =
  | { type: "SET_DIRECT_TICKETS"; payload: Ticket[] }
  | { type: "SET_CONNECTED_TICKETS"; payload: ConnectedTicket[] }
  | { type: "ADD_DIRECT_TICKETS"; payload: Ticket[] }
  | { type: "ADD_CONNECTED_TICKETS"; payload: ConnectedTicket[] }
  | { type: "SET_FILTERED_DIRECT_TICKETS"; payload: Ticket[] }
  | { type: "SET_FILTERED_CONNECTED_TICKETS"; payload: ConnectedTicket[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_INITIAL_LOADING"; payload: boolean }
  | { type: "SET_NO_DATA"; payload: boolean }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_HAS_MORE"; payload: boolean }
  | { type: "SET_AVAILABLE_DATES"; payload: string[] }
  | { type: "SET_FETCHING_DATES"; payload: boolean }
  | { type: "RESET_TICKETS" };

const ticketReducer = (
  state: TicketState,
  action: TicketAction
): TicketState => {
  switch (action.type) {
    case "SET_DIRECT_TICKETS":
      return {
        ...state,
        directTickets: action.payload,
        filteredDirectTickets: action.payload,
      };
    case "SET_CONNECTED_TICKETS":
      return {
        ...state,
        connectedTickets: action.payload,
        filteredConnectedTickets: action.payload,
      };
    case "ADD_DIRECT_TICKETS":
      const newDirectTickets = [...state.directTickets, ...action.payload];
      return {
        ...state,
        directTickets: newDirectTickets,
        filteredDirectTickets: [
          ...state.filteredDirectTickets,
          ...action.payload,
        ],
      };
    case "ADD_CONNECTED_TICKETS":
      const newConnectedTickets = [
        ...state.connectedTickets,
        ...action.payload,
      ];
      return {
        ...state,
        connectedTickets: newConnectedTickets,
        filteredConnectedTickets: [
          ...state.filteredConnectedTickets,
          ...action.payload,
        ],
      };
    case "SET_FILTERED_DIRECT_TICKETS":
      return { ...state, filteredDirectTickets: action.payload };
    case "SET_FILTERED_CONNECTED_TICKETS":
      return { ...state, filteredConnectedTickets: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_INITIAL_LOADING":
      return { ...state, initialLoading: action.payload };
    case "SET_NO_DATA":
      return { ...state, noData: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_HAS_MORE":
      return { ...state, hasMore: action.payload };
    case "SET_AVAILABLE_DATES":
      return { ...state, availableDates: action.payload };
    case "SET_FETCHING_DATES":
      return { ...state, fetchingAvailableDates: action.payload };
    case "RESET_TICKETS":
      return {
        ...state,
        directTickets: [],
        connectedTickets: [],
        filteredDirectTickets: [],
        filteredConnectedTickets: [],
        page: 1,
        hasMore: true,
        noData: false,
        initialLoading: true,
      };
    default:
      return state;
  }
};

const initialState: TicketState = {
  directTickets: [],
  connectedTickets: [],
  filteredDirectTickets: [],
  filteredConnectedTickets: [],
  noData: false,
  loading: false,
  initialLoading: true,
  page: 1,
  hasMore: true,
  availableDates: [],
  fetchingAvailableDates: false,
};

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

  const [state, dispatch] = useReducer(ticketReducer, initialState);

  // Memoized search parameters
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

  const validateAndUpdateDates = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formatDateString = (date: Date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr
        .split("-")
        .map((part) => Number.parseInt(part));
      return new Date(year, month - 1, day);
    };

    const params = new URLSearchParams(window.location.search);
    let paramsUpdated = false;

    const departureDate =
      params.get("departureDate") || formatDateString(today);
    const returnDate = params.get("returnDate");

    const departureDateTime = parseDate(departureDate);
    if (departureDateTime < today) {
      params.set("departureDate", formatDateString(today));
      paramsUpdated = true;
    }

    if (returnDate) {
      const returnDateTime = parseDate(returnDate);
      if (returnDateTime < today) {
        params.set("returnDate", formatDateString(today));
        paramsUpdated = true;
      }
    }

    if (paramsUpdated) {
      router.push(`${window.location.pathname}?${params.toString()}`, {
        scroll: false,
      });
    }

    return {
      departureStation: params.get("departureStation"),
      arrivalStation: params.get("arrivalStation"),
      departureDate: params.get("departureDate"),
      returnDate: params.get("returnDate"),
      adult: Number.parseInt(params.get("adult") || "1"),
      children: Number.parseInt(params.get("children") || "0"),
    };
  }, [router]);

  const fetchTickets = useCallback(
    async (pageNumber: number) => {
      const {
        departureStation,
        arrivalStation,
        departureDate,
        returnDate,
        adult,
        children,
      } = validateAndUpdateDates();

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
        dispatch({ type: "SET_LOADING", payload: true });

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/ticket/search`;
        const searchUrl = new URLSearchParams({
          departureStation: isSelectingReturn
            ? arrivalStation
            : departureStation,
          arrivalStation: isSelectingReturn ? departureStation : arrivalStation,
          departureDate:
            (isSelectingReturn ? returnDate || departureDate : departureDate) ||
            "",
          adults: adult.toString(),
          children: children.toString(),
          page: pageNumber.toString(),
        });

        // Fetch both direct and connected tickets
        const [directResponse, connectedResponse] = await Promise.all([
          fetch(`${apiUrl}?${searchUrl}`),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/ticket/connected?${searchUrl}`
          ),
        ]);

        if (!directResponse.ok || !connectedResponse.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const [directData, connectedData] = await Promise.all([
          directResponse.json(),
          connectedResponse.json(),
        ]);

        const newDirectTickets: Ticket[] = directData.data || [];
        const newConnectedTickets: ConnectedTicket[] = connectedData.data || [];

        console.log({
          directTickets: newDirectTickets,
          connectedTickets: newConnectedTickets,
        });

        if (newDirectTickets.length === 0 && newConnectedTickets.length === 0) {
          if (pageNumber === 1) {
            dispatch({ type: "SET_NO_DATA", payload: true });
            fetchNextAvailableDates();
          }
          dispatch({ type: "SET_HAS_MORE", payload: false });
        } else {
          if (pageNumber === 1) {
            dispatch({ type: "SET_DIRECT_TICKETS", payload: newDirectTickets });
            dispatch({
              type: "SET_CONNECTED_TICKETS",
              payload: newConnectedTickets,
            });
          } else {
            dispatch({ type: "ADD_DIRECT_TICKETS", payload: newDirectTickets });
            dispatch({
              type: "ADD_CONNECTED_TICKETS",
              payload: newConnectedTickets,
            });
          }
          dispatch({ type: "SET_NO_DATA", payload: false });
          dispatch({ type: "SET_PAGE", payload: pageNumber + 1 });
          dispatch({
            type: "SET_HAS_MORE",
            payload:
              newDirectTickets.length === 6 || newConnectedTickets.length > 0,
          });
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch tickets",
          variant: "destructive",
        });
        dispatch({ type: "SET_HAS_MORE", payload: false });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_INITIAL_LOADING", payload: false });
        setIsLoading(false);
      }
    },
    [isSelectingReturn, toast, setIsLoading, validateAndUpdateDates]
  );

  const fetchNextAvailableDates = useCallback(async () => {
    const {
      departureStation,
      arrivalStation,
      departureDate,
      returnDate,
      adult,
      children,
    } = validateAndUpdateDates();

    if (!arrivalStation || !departureStation) return;

    try {
      dispatch({ type: "SET_FETCHING_DATES", payload: true });

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/ticket/search/find-nearest`;
      const searchUrl = new URLSearchParams({
        departureStation: isSelectingReturn ? arrivalStation : departureStation,
        arrivalStation: isSelectingReturn ? departureStation : arrivalStation,
        currentDate:
          (isSelectingReturn ? returnDate || departureDate : departureDate) ||
          "",
        adults: adult.toString(),
        children: children.toString(),
      });

      const response = await fetch(`${apiUrl}?${searchUrl}`);
      if (!response.ok) {
        throw new Error("Failed to fetch available dates");
      }

      const data = await response.json();
      dispatch({
        type: "SET_AVAILABLE_DATES",
        payload: data.data.availableDates || [],
      });
    } catch (err) {
      console.error("Failed to fetch available dates:", err);
    } finally {
      dispatch({ type: "SET_FETCHING_DATES", payload: false });
    }
  }, [isSelectingReturn, validateAndUpdateDates]);

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

      dispatch({ type: "RESET_TICKETS" });
      fetchTickets(1);
    }
  }, [
    searchParameters.departureStation,
    searchParameters.arrivalStation,
    searchParameters.departureDate,
    searchParameters.returnDate,
    searchParameters.adult,
    searchParameters.children,
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

  const handleLoadMore = useCallback(() => {
    if (!state.noData && !state.loading && state.hasMore) {
      fetchTickets(state.page);
    }
  }, [state.noData, state.loading, state.hasMore, fetchTickets, state.page]);

  const handleTicketSelection = useCallback(
    (ticket: Ticket | ConnectedTicket) => {
      setIsLoading(true);
      if (isSelectingReturn) {
        setReturnTicket(ticket as any);
        router.push("/checkout");
      } else {
        setOutboundTicket(ticket as any);
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
    if (state.availableDates.length === 0) {
      return <NoTicketsAvailable />;
    }

    const nextAvailableDate = state.availableDates[0];
    const dateObj = parse(nextAvailableDate, "dd-MM-yyyy", new Date());
    const formattedDate = format(dateObj, "d MMM");

    return (
      <div className="flex flex-col items-center max-w-lg mx-auto text-center space-y-8 p-6">
        <div className="relative w-52 h-52 bg-gray-100 rounded-full flex items-center justify-center">
          <Image
            className="object-cover w-full h-full"
            src="/assets/icons/man-illustration.svg"
            width={150}
            height={150}
            alt={t("searchedTickets.noTicketsAvailableIllustrationAlt")}
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            {t("searchedTickets.noTicketsAvailable")}
          </h2>
          <p className="text-muted-foreground">
            {t("searchedTickets.noTicketsAvailableDescription")}
          </p>
        </div>
        <Button
          onClick={() => navigateToDate(nextAvailableDate)}
          className="group px-6 py-3 text-sm font-medium rounded-xl"
          size="lg"
          variant="primary"
        >
          {t("searchedTickets.nextAvailable")} {formattedDate}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    );
  };

  const totalResults =
    state.filteredDirectTickets.length + state.filteredConnectedTickets.length;

  // Show loading skeleton during initial load
  if (state.initialLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <TicketSkeletonton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {state.noData && totalResults === 0 ? (
        state.fetchingAvailableDates ? (
          <Loader2 className="animate-spin mx-auto size-6" />
        ) : (
          <NextAvailableDates />
        )
      ) : (
        <div className="w-full mx-auto space-y-4">
          <h1
            className={cn("mb-2 font-medium text-lg", {
              hidden: tripType === "one-way",
            })}
          >
            {isSelectingReturn && tripType === "round-trip"
              ? "Select Return Ticket"
              : ""}
          </h1>

          {/* Direct Routes Section */}
          {state.filteredDirectTickets.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-full flex items-center justify-between">
                    <p className="font-normal">{totalResults || 0} Results</p>
                  </div>
                </div>
                <SearchFilters
                  tickets={state.directTickets}
                  totalTrips={state.filteredDirectTickets.length}
                  onFiltersChange={(filtered) => {
                    dispatch({
                      type: "SET_FILTERED_DIRECT_TICKETS",
                      payload: filtered,
                    });
                  }}
                />
              </div>

              <InfiniteScroll
                dataLength={state.directTickets.length}
                className="space-y-2 sm:space-y-1"
                next={handleLoadMore}
                hasMore={state.hasMore}
                loader={state.loading ? <TicketSkeletonton /> : null}
              >
                {state.filteredDirectTickets.map((ticket, index) => (
                  <Sheet key={`direct-${ticket._id}-${index}`}>
                    <SheetTrigger className="w-full">
                      <div
                        onClick={() => setSelectedTicket(ticket)}
                        className="cursor-pointer"
                      >
                        <TicketBlock
                          ticket={ticket}
                          isReturn={isSelectingReturn}
                        />
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

          {state.filteredConnectedTickets.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-full flex items-center justify-between">
                  <p className="font-medium text-center">Indirect rotues</p>
                </div>
                {/* <ConnectedSearchFilters
                  tickets={state.connectedTickets}
                  totalTrips={state.filteredConnectedTickets.length}
                  onFiltersChange={(filtered) => {
                    dispatch({
                      type: "SET_FILTERED_CONNECTED_TICKETS",
                      payload: filtered,
                    });
                  }}
                /> */}
              </div>

              <div className="space-y-2 sm:space-y-1">
                {state.filteredConnectedTickets.map((ticket, index) => (
                  <Sheet key={`connected-${ticket._id}-${index}`}>
                    <SheetTrigger className="w-full">
                      <div
                        onClick={() => setSelectedTicket(ticket as any)}
                        className="cursor-pointer"
                      >
                        <ConnectedTicketBlock
                          ticket={ticket}
                          isReturn={isSelectingReturn}
                        />
                      </div>
                    </SheetTrigger>
                    <SheetContent className="p-0 rounded-tl-xl rounded-bl-xl h-full flex flex-col justify-between overflow-y-auto">
                      <div>
                        <SheetHeader className="border-b p-4 shadow-sm">
                          <SheetTitle className="font-medium">
                            Connected Journey Details
                          </SheetTitle>
                        </SheetHeader>
                        <ConnectedTicketDetails ticket={ticket} />
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
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function SearchedTickets() {
  return (
    <Suspense fallback={<TicketSkeletonton />}>
      <TicketList />
    </Suspense>
  );
}
