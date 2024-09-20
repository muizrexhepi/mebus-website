import { create } from 'zustand';
import { Ticket } from './models/ticket';
import { PassengerData } from './components/hooks/use-passengers';

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

  setSelectedTicket: (ticket) => {
    set({ selectedTicket: ticket })
    if(typeof window !== 'undefined'){
      localStorage.setItem('ticket',JSON.stringify(ticket))
    }
  },
  
  resetCheckout: () => {
    set({ selectedTicket: null })
    if(typeof window !== 'undefined'){
      localStorage.removeItem('ticket')
    }
  },
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

interface ILoading {
  isLoading:boolean;
  setIsLoading:(isLoading:boolean)=>void;
}

export const useLoadingStore = create<ILoading>((set)=>({
  isLoading:true,
  setIsLoading:(isLoading)=>set({isLoading})
}))



interface INavbarMenu {
    openLogin:boolean;
    setOpenLogin:(openLogin:boolean)=>void;
    openRegister:boolean;
    setOpenRegister:(openRegister:boolean)=>void;
    openLanguages:boolean;
    setOpenLanguages:(openLanguages:boolean)=>void;
    openReset:boolean;
    setOpenReset:(openLanguages:boolean)=>void;
}

export const useNavbarStore= create<INavbarMenu>((set)=>({
  openLogin:false,
  setOpenLogin:(openLogin)=>set({openLogin}),
  openRegister:false,
  setOpenRegister:(openRegister)=>set({openRegister}),
  openLanguages:false,
  setOpenLanguages:(openLanguages)=>set({openLanguages}),
  openReset:false,
  setOpenReset:(openReset:boolean)=>set({openReset}),
}))




interface TravelStore {
  passengers: PassengerData[];
  selectedFlex: string | null;
  flexPrice: number;
  setPassengers: (passengers: PassengerData[]) => void;
  setSelectedFlex: (flex: string | null) => void;
  setFlexPrice: (price: number) => void;
}

export const useTravelStore = create<TravelStore>((set) => ({
  passengers: [],
  selectedFlex: null,
  flexPrice: 0,
  setPassengers: (passengers) => set({ passengers }),
  setSelectedFlex: (flex) => set({ selectedFlex: flex }),
  setFlexPrice: (price) => set({ flexPrice: price }),
}));

interface DepositStore {
  useDeposit:boolean;
  depositAmount:number;
  setUseDeposit: (useDeposit:boolean)=>void;
  setDepositAmount: (depositAmount:number)=>void,
}

export const useDepositStore = create<DepositStore>((set)=>({
  useDeposit:false,
  depositAmount:0,
  setUseDeposit: (useDeposit) => set({ useDeposit }),
  setDepositAmount: (depositAmount) => set({ depositAmount }),
}))

export default useSearchStore;
