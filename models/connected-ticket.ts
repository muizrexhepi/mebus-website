import type { Station } from "@/models/station";
import type { Ticket } from "@/models/ticket";

export interface ConnectedTicketLeg {
  leg_number: number;
  ticket: string;
  operator: {
    _id: string;
    name: string;
    company_name: string;
  };
  route: {
    _id: string;
    code: string;
    destination: {
      from: string;
      to: string;
    };
    contact: {
      phone: string;
      email: string;
    };
  };
  from_station: Station;
  to_station: Station;
  departure_date: string;
  arrival_time: string;
  time: string;
  price: number;
  children_price: number;
  number_of_tickets: number;
  metadata: {
    operator_name: string;
    operator_company_name: string;
    features: string[];
    is_single_ticket: boolean;
  };
}

export interface ConnectedTicket {
  _id: string;
  type: "connected";
  legs: ConnectedTicketLeg[];
  connection_time: number;
  intermediate_station: Station;
  total_price: number;
  total_children_price: number;
  total_duration: number;
}

// Union type for all ticket types
export type AnyTicket = Ticket | ConnectedTicket;

// Type guard functions
export function isConnectedTicket(
  ticket: AnyTicket
): ticket is ConnectedTicket {
  return ticket.type === "connected";
}

export function isDirectTicket(ticket: AnyTicket): ticket is Ticket {
  return !ticket.type || ticket.type !== "connected";
}
