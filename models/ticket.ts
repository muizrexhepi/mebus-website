import { Operator } from "./operator";
import { Route } from "./route";
import { Station } from "./station";
import { Stop } from "./stop";

export interface Ticket {
  _id: string;
  route_number: Route | string;
  destination: {
    from: string;
    to: string;
  };
  is_direct_route: boolean;
  fromStations?: Station[];
  toStations?: Station[];
  operator: Operator | string;
  stops: Stop[];
  departure_date: Date;
  time: string;
  type: TicketTypes;
  number_of_tickets: number;
  stop_sequence: StopSequenceItem[];
  is_active: boolean;
  location: {
    from: {
      lat: number;
      lng: number;
    };
    to: {
      lat: number;
      lng: number;
    };
  };
  metadata: TicketMetadata;
  operatorInfo: any;
}

export interface TicketMetadata {
  operator_name: string;
  operator_company_name: string;
  message: string;
  features: string[];
  views: number;
  is_single_ticket: boolean;
}

export enum TicketTypes {
  ONE_WAY = "one_way",
  RETURN = "return,",
}

export interface StopSequenceItem {
  _id: string;
  name: string;
  city: string;
  code: string;
  country: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}
