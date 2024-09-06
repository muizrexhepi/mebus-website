import { create } from 'zustand';
import { Ticket } from './models/ticket';

export interface Passengers {
  adults: number;
  children: number;
}

interface SearchState {
  from: string;
  to: string;
  route: string;
  passengers: Passengers;
  departureDate: string | null;
  returnDate: string | null;

  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setRoute: (route: string) => void;
  setPassengers: (passengers: Passengers) => void;
  setDepartureDate: (date: string | null) => void;
  setReturnDate: (returnDate: string | null) => void;
  resetSearch: () => void;
}

interface CheckoutState {
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket) => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  selectedTicket: null,

  setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),
  
  resetCheckout: () => set({ selectedTicket: null }),
}));


const initialState: Omit<SearchState, 'setFrom' | 'setTo' | 'setRoute' | 'setPassengers' | 'setDepartureDate' | 'setReturnDate' | 'resetSearch'> = {
  from: '',
  to: '',
  route: '',
  passengers: {
    adults: 1,
    children: 0,
  },
  departureDate: null,
  returnDate: null,
};

const useSearchStore = create<SearchState>((set) => ({
  ...initialState,

  setFrom: (from) => set({ from }),
  setTo: (to) => set({ to }),
  setRoute: (route) => set({ route }),
  setPassengers: (passengers) => set({ passengers }),
  setDepartureDate: (departureDate) => set({ departureDate }),
  setReturnDate: (returnDate) => set({ returnDate }),

  resetSearch: () => set(initialState),
}));

export default useSearchStore;
