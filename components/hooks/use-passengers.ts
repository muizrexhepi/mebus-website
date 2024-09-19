import { Ticket } from "@/models/ticket";

export interface PassengerData {
    full_name: string;
    email: string;
    phone: string;
    birthdate: string;
    age: number;
    price: number;
  }
  
  export const getPassengersFromStorage = (): PassengerData[] => {
    if (typeof window === 'undefined') return [];
    const storedPassengers = localStorage.getItem('passengers');
    return storedPassengers ? JSON.parse(storedPassengers) : [];
  };
  
  export const setPassengersToStorage = (passengers: PassengerData[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('passengers', JSON.stringify(passengers));
  };

  export const calculatePassengerPrices = (passengers: PassengerData[], selectedTicket: Ticket, max_child_age?: number) => {
    if(!max_child_age) max_child_age = 10;
    return passengers.map(passenger => ({
      ...passenger,
      price: passenger.age <= max_child_age 
        ? selectedTicket.stops[0].other_prices.our_children_price 
        : selectedTicket.stops[0].other_prices.our_price
    }));
  };