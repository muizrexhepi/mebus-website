"use client";

import type React from "react";
import {
  Suspense,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
  useRef,
} from "react";
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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import TicketDetails from "@/components/ticket/ticket-details";
import ConnectedTicketDetails from "@/components/ticket/connected-ticket-details";
import NoTicketsAvailable from "./NoTicketsAvailable";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import ConnectedTicketBlock from "@/components/ticket/connected-ticket-block";
import { addDays, format, parse } from "date-fns";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import type { ConnectedTicket } from "@/models/connected-ticket";
import TicketBlock from "@/components/ticket/Ticket";

/**
 * Converts time string (HH:MM or HH:MM:SS) to minutes for easy comparison
 */
/**
 * Converts a date to timestamp for comparison
 */
const dateToTimestamp = (date: Date | string): number => {
  if (!date) return 0;
  return new Date(date).getTime();
};

/**
 * Gets the departure date from a ticket (handles both direct and connected tickets)
 */
const getTicketDepartureDate = (ticket: Ticket | ConnectedTicket): Date => {
  // For direct tickets, use the first stop's departure_date
  if (ticket.stops && ticket.stops.length > 0) {
    return ticket.stops[0].departure_date;
  }

  // Fallback to ticket's departure_date if available
  if ("departure_date" in ticket) {
    return ticket.departure_date;
  }

  return new Date(0); // Return epoch if no date found
};

/**
 * Sorts tickets by departure date and time in ascending order
 * Works for both direct tickets and connected tickets
 */
const sortTicketsByTime = <T extends Ticket | ConnectedTicket>(
  tickets: T[]
): T[] => {
  return [...tickets].sort((a, b) => {
    const dateA = dateToTimestamp(getTicketDepartureDate(a));
    const dateB = dateToTimestamp(getTicketDepartureDate(b));

    // If dates are different, sort by date
    if (dateA !== dateB) {
      return dateA - dateB;
    }

    // If dates are the same, sort by departure time
    const timeA = timeToMinutes(a.stops[0]?.time || "");
    const timeB = timeToMinutes(b.stops[0]?.time || "");
    return timeA - timeB;
  });
};

/**
 * Converts time string (HH:MM or HH:MM:SS) to minutes for easy comparison
 */
const timeToMinutes = (timeString: string): number => {
  if (!timeString) return 0;
  const parts = timeString.split(":");
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  return hours * 60 + minutes;
};

interface TicketState {
  directTickets: Ticket[];
  connectedTickets: ConnectedTicket[];
  noData: boolean;
  loading: boolean;
  initialLoading: boolean;
  directPage: number;
  connectedPage: number;
  hasMoreDirect: boolean;
  hasMoreConnected: boolean;
  availableDates: string[];
  fetchingAvailableDates: boolean;
  showDirectOnly: boolean;
  fetchingDirect: boolean;
  fetchingConnected: boolean;
}

type TicketAction =
  | { type: "SET_DIRECT_TICKETS"; payload: Ticket[] }
  | { type: "SET_CONNECTED_TICKETS"; payload: ConnectedTicket[] }
  | { type: "ADD_DIRECT_TICKETS"; payload: Ticket[] }
  | { type: "ADD_CONNECTED_TICKETS"; payload: ConnectedTicket[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_INITIAL_LOADING"; payload: boolean }
  | { type: "SET_NO_DATA"; payload: boolean }
  | { type: "SET_DIRECT_PAGE"; payload: number }
  | { type: "SET_CONNECTED_PAGE"; payload: number }
  | { type: "SET_HAS_MORE_DIRECT"; payload: boolean }
  | { type: "SET_HAS_MORE_CONNECTED"; payload: boolean }
  | { type: "SET_AVAILABLE_DATES"; payload: string[] }
  | { type: "SET_FETCHING_DATES"; payload: boolean }
  | { type: "SET_SHOW_DIRECT_ONLY"; payload: boolean }
  | { type: "SET_FETCHING_DIRECT"; payload: boolean }
  | { type: "SET_FETCHING_CONNECTED"; payload: boolean }
  | { type: "RESET_TICKETS" };

const ticketReducer = (
  state: TicketState,
  action: TicketAction
): TicketState => {
  switch (action.type) {
    case "SET_DIRECT_TICKETS":
      return { ...state, directTickets: sortTicketsByTime(action.payload) };
    case "SET_CONNECTED_TICKETS":
      return { ...state, connectedTickets: sortTicketsByTime(action.payload) };
    case "ADD_DIRECT_TICKETS":
      return {
        ...state,
        directTickets: sortTicketsByTime([
          ...state.directTickets,
          ...action.payload,
        ]),
      };
    case "ADD_CONNECTED_TICKETS":
      return {
        ...state,
        connectedTickets: sortTicketsByTime([
          ...state.connectedTickets,
          ...action.payload,
        ]),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_INITIAL_LOADING":
      return { ...state, initialLoading: action.payload };
    case "SET_NO_DATA":
      return { ...state, noData: action.payload };
    case "SET_DIRECT_PAGE":
      return { ...state, directPage: action.payload };
    case "SET_CONNECTED_PAGE":
      return { ...state, connectedPage: action.payload };
    case "SET_HAS_MORE_DIRECT":
      return { ...state, hasMoreDirect: action.payload };
    case "SET_HAS_MORE_CONNECTED":
      return { ...state, hasMoreConnected: action.payload };
    case "SET_AVAILABLE_DATES":
      return { ...state, availableDates: action.payload };
    case "SET_FETCHING_DATES":
      return { ...state, fetchingAvailableDates: action.payload };
    case "SET_SHOW_DIRECT_ONLY":
      return { ...state, showDirectOnly: action.payload };
    case "SET_FETCHING_DIRECT":
      return { ...state, fetchingDirect: action.payload };
    case "SET_FETCHING_CONNECTED":
      return { ...state, fetchingConnected: action.payload };
    case "RESET_TICKETS":
      return {
        ...state,
        directTickets: [],
        connectedTickets: [],
        directPage: 1,
        connectedPage: 1,
        hasMoreDirect: true,
        hasMoreConnected: true,
        noData: false,
        initialLoading: true,
        showDirectOnly: false,
        fetchingDirect: false,
        fetchingConnected: false,
      };
    default:
      return state;
  }
};

const initialState: TicketState = {
  directTickets: [],
  connectedTickets: [],
  noData: false,
  loading: false,
  initialLoading: true,
  directPage: 1,
  connectedPage: 1,
  hasMoreDirect: true,
  hasMoreConnected: true,
  availableDates: [],
  fetchingAvailableDates: false,
  showDirectOnly: true,
  fetchingDirect: false,
  fetchingConnected: false,
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

  const fetchingRef = useRef(false);
  const lastSearchParamsRef = useRef<string>("");

  // Memoized search parameters with proper type safety
  const searchParameters = useMemo(
    () => ({
      destination:
        (Array.isArray(params.destination)
          ? params.destination[0]
          : params.destination) ?? "",
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
    async (
      directPageNumber: number,
      connectedPageNumber: number,
      isInitial = false
    ) => {
      // Prevent duplicate calls
      if (fetchingRef.current) return;

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
        fetchingRef.current = true;
        setIsLoading(true);

        if (isInitial) {
          dispatch({ type: "SET_INITIAL_LOADING", payload: true });
        } else {
          dispatch({ type: "SET_LOADING", payload: true });
        }

        // Determine if we're using multiple stations (All Stops)
        const departureStationArray = departureStation
          .split(",")
          .filter((id) => id.trim());
        const arrivalStationArray = arrivalStation
          .split(",")
          .filter((id) => id.trim());
        const isMultipleStations =
          departureStationArray.length > 1 || arrivalStationArray.length > 1;

        const baseParams = {
          departureDate:
            (isSelectingReturn ? returnDate || departureDate : departureDate) ||
            "",
          adults: adult.toString(),
          children: children.toString(),
        };

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/ticket`;

        // Fetch both direct and connected tickets in parallel
        const fetchPromises = [];

        // Only fetch direct tickets if we need them
        if (directPageNumber > 0) {
          dispatch({ type: "SET_FETCHING_DIRECT", payload: true });

          // Choose endpoint based on whether we have multiple stations
          const directEndpoint = isMultipleStations
            ? "/search/multiple"
            : "/search";

          // Build params based on single or multiple stations
          const directParams: Record<string, string> = {
            ...baseParams,
            page: directPageNumber.toString(),
          };

          if (isMultipleStations) {
            directParams.departureStations = isSelectingReturn
              ? arrivalStation
              : departureStation;
            directParams.arrivalStations = isSelectingReturn
              ? departureStation
              : arrivalStation;
          } else {
            directParams.departureStation = isSelectingReturn
              ? arrivalStation
              : departureStation;
            directParams.arrivalStation = isSelectingReturn
              ? departureStation
              : arrivalStation;
          }

          const directSearchUrl = new URLSearchParams(directParams);

          fetchPromises.push(
            fetch(`${apiUrl}${directEndpoint}?${directSearchUrl}`)
              .then((res) =>
                res.ok
                  ? res.json()
                  : Promise.reject(new Error("Direct fetch failed"))
              )
              .then((data) => ({ type: "direct", data: data.data || [] }))
              .catch(() => ({ type: "direct", data: [] }))
          );
        }

        // Only fetch connected tickets if we need them
        if (connectedPageNumber > 0) {
          dispatch({ type: "SET_FETCHING_CONNECTED", payload: true });

          // For now, connected tickets use the regular endpoint with first station
          const connectedParams: Record<string, string> = {
            ...baseParams,
            departureStation: isSelectingReturn
              ? arrivalStation.split(",")[0]
              : departureStation.split(",")[0],
            arrivalStation: isSelectingReturn
              ? departureStation.split(",")[0]
              : arrivalStation.split(",")[0],
            page: connectedPageNumber.toString(),
          };

          const connectedSearchUrl = new URLSearchParams(connectedParams);

          fetchPromises.push(
            fetch(`${apiUrl}/connected?${connectedSearchUrl}`)
              .then((res) =>
                res.ok
                  ? res.json()
                  : Promise.reject(new Error("Connected fetch failed"))
              )
              .then((data) => ({ type: "connected", data: data.data || [] }))
              .catch(() => ({ type: "connected", data: [] }))
          );
        }

        const results = await Promise.all(fetchPromises);

        let newDirectTickets: Ticket[] = [];
        let newConnectedTickets: ConnectedTicket[] = [];

        results.forEach((result) => {
          if (result.type === "direct") {
            newDirectTickets = result.data;
          } else if (result.type === "connected") {
            newConnectedTickets = result.data;
          }
        });

        // Handle results
        if (isInitial) {
          dispatch({ type: "SET_DIRECT_TICKETS", payload: newDirectTickets });
          dispatch({
            type: "SET_CONNECTED_TICKETS",
            payload: newConnectedTickets,
          });

          // Auto-switch to show indirect routes if no direct routes available
          if (newDirectTickets.length === 0 && newConnectedTickets.length > 0) {
            dispatch({ type: "SET_SHOW_DIRECT_ONLY", payload: false });
          }

          // Check if we have any data at all
          if (
            newDirectTickets.length === 0 &&
            newConnectedTickets.length === 0
          ) {
            dispatch({ type: "SET_NO_DATA", payload: true });
            fetchNextAvailableDates();
          } else {
            dispatch({ type: "SET_NO_DATA", payload: false });
          }
        } else {
          // Append new tickets for pagination
          if (newDirectTickets.length > 0) {
            dispatch({ type: "ADD_DIRECT_TICKETS", payload: newDirectTickets });
          }
          if (newConnectedTickets.length > 0) {
            dispatch({
              type: "ADD_CONNECTED_TICKETS",
              payload: newConnectedTickets,
            });
          }
        }

        // Update pagination state
        if (directPageNumber > 0) {
          dispatch({ type: "SET_DIRECT_PAGE", payload: directPageNumber + 1 });
          dispatch({
            type: "SET_HAS_MORE_DIRECT",
            payload: newDirectTickets.length >= 6,
          });
        }

        if (connectedPageNumber > 0) {
          dispatch({
            type: "SET_CONNECTED_PAGE",
            payload: connectedPageNumber + 1,
          });
          dispatch({
            type: "SET_HAS_MORE_CONNECTED",
            payload: newConnectedTickets.length >= 6,
          });
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch tickets",
          variant: "destructive",
        });
        dispatch({ type: "SET_HAS_MORE_DIRECT", payload: false });
        dispatch({ type: "SET_HAS_MORE_CONNECTED", payload: false });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_INITIAL_LOADING", payload: false });
        dispatch({ type: "SET_FETCHING_DIRECT", payload: false });
        dispatch({ type: "SET_FETCHING_CONNECTED", payload: false });
        setIsLoading(false);
        fetchingRef.current = false;
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
    } finally {
      dispatch({ type: "SET_FETCHING_DATES", payload: false });
    }
  }, [isSelectingReturn, validateAndUpdateDates]);

  useEffect(() => {
    const currentSearchParams = searchParams.toString();

    // Prevent duplicate calls with same parameters
    if (currentSearchParams === lastSearchParamsRef.current) {
      return;
    }

    const {
      departureStation,
      arrivalStation,
      departureDate,
      returnDate,
      adult,
      children,
    } = searchParameters;

    if (departureStation && arrivalStation && adult && children) {
      lastSearchParamsRef.current = currentSearchParams;

      // Update store state
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

      // Reset and fetch new tickets
      dispatch({ type: "RESET_TICKETS" });
      fetchTickets(1, 1, true);
    }
  }, [searchParams.toString()]); // Only depend on search params string

  const handleLoadMore = useCallback(() => {
    if (state.loading || state.fetchingDirect || state.fetchingConnected)
      return;

    // Determine what to load next based on current filter state
    if (state.showDirectOnly) {
      // Only load more direct tickets
      if (state.hasMoreDirect) {
        fetchTickets(state.directPage, 0);
      }
    } else {
      // Load both direct and connected tickets
      const shouldLoadDirect = state.hasMoreDirect;
      const shouldLoadConnected = state.hasMoreConnected;

      if (shouldLoadDirect || shouldLoadConnected) {
        fetchTickets(
          shouldLoadDirect ? state.directPage : 0,
          shouldLoadConnected ? state.connectedPage : 0
        );
      }
    }
  }, [
    state.loading,
    state.fetchingDirect,
    state.fetchingConnected,
    state.showDirectOnly,
    state.hasMoreDirect,
    state.hasMoreConnected,
    state.directPage,
    state.connectedPage,
    fetchTickets,
  ]);

  const handleTicketSelection = useCallback(
    (ticket: Ticket | ConnectedTicket) => {
      // Check if ticket is bookable
      const isBookable = ticket?.route?.metadata?.bookable !== false;
      console.log({ isBookable });
      if (!isBookable) {
        toast({
          title: t("ticket.notBookable", "Not Available"),
          description: t(
            "ticket.notBookableDescription",
            "This route is currently not available for online booking."
          ),
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      if (isSelectingReturn) {
        setReturnTicket(ticket as any);
        router.push("/checkout");
      } else {
        setOutboundTicket(ticket as any);
        if (tripType === "round-trip" && searchParameters.returnDate) {
          // IMPORTANT: Reset loading state before switching to return selection
          setIsLoading(false);
          setIsSelectingReturn(true);
        } else {
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
      toast,
      t,
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
          <p className="text-sm text-muted-foreground">
            {t("searchedTickets.noTicketsAvailableTryAgain")}
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

  const totalDirectResults = state.directTickets.length;
  const totalConnectedResults = state.connectedTickets.length;
  const totalResults = totalDirectResults + totalConnectedResults;

  // Determine what tickets to show in the infinite scroll
  const allTicketsToShow = useMemo(() => {
    const tickets: Array<{
      type: "direct" | "connected" | "separator";
      data?: any;
    }> = [];

    // Add direct tickets first
    if (state.directTickets.length > 0) {
      state.directTickets.forEach((ticket) => {
        tickets.push({ type: "direct", data: ticket });
      });
    }

    // Add separator and connected tickets if not showing direct only
    if (!state.showDirectOnly && state.connectedTickets.length > 0) {
      if (state.directTickets.length > 0) {
        tickets.push({ type: "separator" });
      }
      state.connectedTickets.forEach((ticket) => {
        tickets.push({ type: "connected", data: ticket });
      });
    }

    return tickets;
  }, [state.directTickets, state.connectedTickets, state.showDirectOnly]);

  // Calculate if we have more items to load
  const hasMoreItems = state.showDirectOnly
    ? state.hasMoreDirect
    : state.hasMoreDirect || state.hasMoreConnected;

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

  // Show no data state
  if (state.noData && totalResults === 0) {
    return state.fetchingAvailableDates ? (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin size-6" />
      </div>
    ) : (
      <NextAvailableDates />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full mx-auto space-y-4">
        <h1
          className={cn("mb-2 font-medium text-lg", {
            hidden: tripType === "one-way",
          })}
        >
          {isSelectingReturn && tripType === "round-trip"
            ? t("ticket.selectReturn")
            : ""}
        </h1>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {state.showDirectOnly ? totalDirectResults : totalResults}{" "}
            {t("searchedTickets.results")}
          </p>

          {totalDirectResults > 0 && totalConnectedResults > 0 && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="directOnly"
                checked={state.showDirectOnly}
                className="size-5 accent-primary-accent appearance-none"
                onCheckedChange={(checked) =>
                  dispatch({
                    type: "SET_SHOW_DIRECT_ONLY",
                    payload: checked as boolean,
                  })
                }
              />
              <label
                htmlFor="directOnly"
                className="text-sm text-gray-700 cursor-pointer"
              >
                {t("searchedTickets.directOnly")}
              </label>
            </div>
          )}
        </div>

        <InfiniteScroll
          dataLength={allTicketsToShow.length}
          className="space-y-4 sm:space-y-2"
          next={handleLoadMore}
          hasMore={hasMoreItems}
          loader={
            state.loading || state.fetchingDirect || state.fetchingConnected ? (
              <TicketSkeletonton />
            ) : null
          }
          endMessage={
            !hasMoreItems && allTicketsToShow.length > 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  {t("searchedTickets.endOfResults")}
                </p>
              </div>
            ) : null
          }
        >
          {allTicketsToShow.map((item, index) => {
            if (item.type === "separator") {
              return (
                <div key={`separator-${index}`} className="py-4 pb-5">
                  <Separator className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-background px-4 text-sm text-muted-foreground rounded-xl py-1">
                        {t("searchedTickets.indirectRoutes")}
                      </span>
                    </div>
                  </Separator>
                </div>
              );
            }

            const ticket = item.data;
            const isConnected = item.type === "connected";
            const keyPrefix = isConnected ? "connected" : "direct";
            const isBookable = ticket.routeInfo?.metadata?.bookable !== false;

            return (
              <Sheet key={`${keyPrefix}-${ticket._id}-${index}`}>
                <SheetTrigger asChild>
                  {/* 1. Change <button> to <div> */}
                  <div
                    role="button" // 2. Add role for accessibility
                    tabIndex={0} // 3. Make it focusable via keyboard
                    onClick={() => setSelectedTicket(ticket)}
                    className="w-full cursor-pointer"
                    // 4. (Optional) Add keyboard support for Enter/Space
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedTicket(ticket);
                      }
                    }}
                  >
                    {isConnected ? (
                      <ConnectedTicketBlock
                        ticket={ticket}
                        isReturn={isSelectingReturn}
                      />
                    ) : (
                      <TicketBlock
                        ticket={ticket}
                        isReturn={isSelectingReturn}
                      />
                    )}
                  </div>
                </SheetTrigger>
                <SheetContent className="p-0 rounded-tl-xl rounded-bl-xl h-full flex flex-col justify-between overflow-y-auto">
                  <div>
                    <SheetHeader className="border-b p-4 shadow-sm">
                      <SheetTitle className="font-medium">
                        {t("ticketDetails.title")}
                      </SheetTitle>
                    </SheetHeader>
                    {isConnected ? (
                      <ConnectedTicketDetails ticket={ticket} />
                    ) : (
                      <TicketDetails ticket={ticket} />
                    )}
                  </div>
                  {isBookable && (
                    <SheetFooter className="p-4">
                      <Button
                        variant={"primary"}
                        className="w-full h-12 rounded-lg"
                        onClick={() => handleTicketSelection(ticket)}
                      >
                        {isSelectingReturn
                          ? t("ticket.selectReturn")
                          : tripType !== "round-trip"
                          ? t("ticket.continue")
                          : t("ticket.selectOutbound")}
                      </Button>
                    </SheetFooter>
                  )}
                </SheetContent>
              </Sheet>
            );
          })}
        </InfiniteScroll>
      </div>
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
