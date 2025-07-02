import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Ticket } from "@/models/ticket";
import type { ConnectedTicket } from "@/models/connected-ticket";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

// Type guard to check if ticket is connected
export const isConnectedTicket = (
  ticket: Ticket | ConnectedTicket | null
): ticket is ConnectedTicket => {
  return ticket !== null && "type" in ticket && ticket.type === "connected";
};

// Get ticket price regardless of type
export const getTicketPrice = (
  ticket: Ticket | ConnectedTicket | null
): number => {
  if (!ticket) return 0;

  if (isConnectedTicket(ticket)) {
    return ticket.total_price;
  } else {
    return ticket.stops[0]?.other_prices?.our_price || 0;
  }
};

// Get operator price regardless of type
export const getOperatorPrice = (
  ticket: Ticket | ConnectedTicket | null
): number => {
  if (!ticket) return 0;

  if (isConnectedTicket(ticket)) {
    // For connected tickets, sum up all leg prices
    return ticket.legs.reduce((total, leg) => total + (leg.price || 0), 0);
  } else {
    return ticket.stops[0]?.price || 0;
  }
};

// Get children price regardless of type
export const getChildrenPrice = (
  ticket: Ticket | ConnectedTicket | null
): number => {
  if (!ticket) return 0;

  if (isConnectedTicket(ticket)) {
    return ticket.total_children_price || 0;
  } else {
    return ticket.stops[0]?.other_prices?.our_children_price || 0;
  }
};

// Get operator children price regardless of type
export const getOperatorChildrenPrice = (
  ticket: Ticket | ConnectedTicket | null
): number => {
  if (!ticket) return 0;

  if (isConnectedTicket(ticket)) {
    // For connected tickets, sum up all leg children prices
    return ticket.legs.reduce(
      (total, leg) => total + (leg.children_price || 0),
      0
    );
  } else {
    return ticket.stops[0]?.children_price || 0;
  }
};

// Get operator info regardless of type
export const getOperatorInfo = (ticket: Ticket | ConnectedTicket | null) => {
  if (!ticket) return null;

  if (isConnectedTicket(ticket)) {
    return {
      name: ticket.legs[0]?.operator?.name || "Unknown",
      _id: ticket.legs[0]?.operator?._id || "",
      company_name: ticket.legs[0]?.operator?.company_name || "",
    };
  } else {
    return ticket.operatorInfo;
  }
};

// Get departure info regardless of type
export const getDepartureInfo = (ticket: Ticket | ConnectedTicket | null) => {
  if (!ticket) return null;

  if (isConnectedTicket(ticket)) {
    const firstLeg = ticket.legs[0];
    return {
      date: firstLeg.departure_date,
      station: firstLeg.from_station,
    };
  } else {
    return {
      date: ticket.stops[0]?.departure_date,
      station: ticket.stops[0]?.from,
    };
  }
};

// Get arrival info regardless of type
export const getArrivalInfo = (ticket: Ticket | ConnectedTicket | null) => {
  if (!ticket) return null;

  if (isConnectedTicket(ticket)) {
    const lastLeg = ticket.legs[ticket.legs.length - 1];
    return {
      time: lastLeg.arrival_time,
      station: lastLeg.to_station,
    };
  } else {
    const lastStop = ticket.stops[ticket.stops.length - 1];
    return {
      time: lastStop?.arrival_time,
      station: lastStop?.to,
    };
  }
};
