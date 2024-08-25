import create from 'zustand';

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
}

const useSearchStore = create<SearchState>((set) => ({
  from: '',
  to: '',
  route: '',
  passengers: {
    adults: 1,
    children: 0,
  },
  departureDate: null,
  returnDate: null,

  setFrom: (from) => set({ from }),
  setTo: (to) => set({ to }),
  setRoute: (route) => set({ route }),
  setPassengers: (passengers) => set({ passengers }),
  setDepartureDate: (departureDate) => set({ departureDate }),
  setReturnDate: (returnDate) => set({ returnDate }),
}));

export default useSearchStore;
