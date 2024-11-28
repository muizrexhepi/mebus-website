import { create } from 'zustand';
import { Ticket } from './models/ticket';
import { PassengerData } from './components/hooks/use-passengers';
import { addDays, format } from 'date-fns';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';
import { AuthenticationFactor, Models } from 'appwrite';

export interface Passengers {
  adults: number;
  children: number;
}

interface PaymentSuccessStore {
  isPaymentSuccess: boolean;
  setIsPaymentSuccess: (success: boolean) => void;
}

export const usePaymentSuccessStore = create<PaymentSuccessStore>((set) => ({
  isPaymentSuccess: false,
  setIsPaymentSuccess: (success: boolean) => set({ isPaymentSuccess: success }),
}));


interface CheckoutState {
  selectedTicket: Ticket | null;
  outboundTicket: Ticket | null;
  returnTicket: Ticket | null;
  isSelectingReturn: boolean;
  passengers: PassengerData[];
  selectedFlex: string | null;
  flexPrice: number;
  totalCost: number;

  setSelectedTicket: (ticket: Ticket | null) => void;
  setOutboundTicket: (ticket: Ticket | null) => void;
  setReturnTicket: (ticket: Ticket | null) => void;
  setIsSelectingReturn: (isSelecting: boolean) => void;
  setPassengers: (passengers: PassengerData[]) => void;
  setSelectedFlex: (flex: string | null) => void;
  setFlexPrice: (price: number) => void;
  calculateTotalCost: () => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      selectedTicket: null,
      outboundTicket: null,
      returnTicket: null,
      isSelectingReturn: false,
      passengers: [],
      selectedFlex: null,
      flexPrice: 0,
      totalCost: 0,

      setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),
      setOutboundTicket: (ticket) => set({ outboundTicket: ticket }),
      setReturnTicket: (ticket) => set({ returnTicket: ticket }),
      setIsSelectingReturn: (isSelecting) => set({ isSelectingReturn: isSelecting }),
      setPassengers: (passengers) => set({ passengers }),
      setSelectedFlex: (flex) => set({ selectedFlex: flex }),
      setFlexPrice: (price) => set({ flexPrice: price }),
      calculateTotalCost: () => {
        const { passengers, flexPrice } = get();
        set({ totalCost: passengers.length * flexPrice });
      },
      resetCheckout: () => set({
        selectedTicket: null,
        outboundTicket: null,
        returnTicket: null,
        isSelectingReturn: false,
        passengers: [],
        selectedFlex: null,
        flexPrice: 0,
        totalCost: 0
      }),
    }),
    {
      name: 'checkout-storage',
      storage: createJSONStorage(() => sessionStorage),
    } as PersistOptions<CheckoutState>
  )
);

interface SearchState {
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  route: string;
  passengers: Passengers;
  departureDate: string | null;
  returnDate: string | null;
  tripType: 'one-way' | 'round-trip'; 

  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setFromCity: (fromCity: string) => void;
  setToCity: (toCity: string) => void;
  setRoute: (route: string) => void;
  setPassengers: (passengers: Passengers) => void;
  setDepartureDate: (date: string | null) => void;
  setReturnDate: (returnDate: string | null) => void;
  setTripType: (tripType: 'one-way' | 'round-trip') => void; 
  resetSearch: () => void;
}

const initialState: Omit<SearchState, 'setFrom' | 'setTo' | 'setFromCity' | 'setToCity' | 'setRoute' | 'setPassengers' | 'setDepartureDate' | 'setReturnDate' | 'setTripType' | 'resetSearch'> = {
  from: '',
  to: '',
  fromCity: '',
  toCity: '',
  route: '',
  passengers: {
    adults: 1,
    children: 0,
  },
  departureDate: format(new Date(), "dd-MM-yyyy"),
  returnDate: format(addDays(new Date(), 7), "dd-MM-yyyy"),
  tripType: 'one-way', 
};

const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      ...initialState,
      setFrom: (from) => set({ from }),
      setTo: (to) => set({ to }),
      setFromCity: (fromCity) => set({ fromCity }),
      setToCity: (toCity) => set({ toCity }),
      setRoute: (route) => set({ route }),
      setPassengers: (passengers) => set({ passengers }),
      setDepartureDate: (departureDate) => set({ departureDate }),
      setReturnDate: (returnDate) => set({ returnDate }),
      setTripType: (tripType) => set({ tripType }),
      resetSearch: () => set((state) => ({
        from: state.from || initialState.from,
        to: state.to || initialState.to,
        fromCity: state.fromCity || initialState.fromCity,
        toCity: state.toCity || initialState.toCity,
        route: state.route || initialState.route,
        passengers: state.passengers || initialState.passengers, 
        departureDate: state.departureDate || initialState.departureDate,
        returnDate: state.returnDate || initialState.returnDate,
        tripType: state.tripType || initialState.tripType, 
      })),
    }),
    {
      name: 'search-store',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<SearchState>
  )
);



interface ILoading {
  isLoading:boolean;
  setIsLoading:(isLoading:boolean)=>void;
}

export const useLoadingStore = create<ILoading>((set)=>({
  isLoading:true,
  setIsLoading:(isLoading)=>set({isLoading})
}))

export interface RemainingTime {
  minutes: number;
  seconds: number;
}


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



type CurrentForm = 'login' | 'mfaOptions' | 'mfaVerification';

interface IMFAStore {
  openMFAModal: boolean;
  setOpenMFAModal: (openMFAModal: boolean) => void;
  openEmailMFAModal: boolean;
  setOpenEmailMFAModal: (openEmailMFAModal: boolean) => void;
  openPhoneMFAModal: boolean;
  setOpenPhoneMFAModal: (openPhoneMFAModal: boolean) => void;
  openRecoverycodeMFAModal: boolean;
  setOpenRecoverycodeMFAModal: (openRecoverycodeMFAModal: boolean) => void;
  mfaFactors: Models.MfaFactors; 
  setMFAFactors: (mfaFactors: Models.MfaFactors) => void; 
  remainingTime: RemainingTime | null;
  setRemainingTime: (time: RemainingTime) => void;
  mfaChallenge: Models.MfaChallenge | null;
  setMfaChallenge: (challenge: Models.MfaChallenge | null) => void;
  error?: string;
  setError: (error: string | undefined) => void;
  mfaType: string;  
  setMfaType: (type: string) => void; 
  currentForm: CurrentForm;
  setCurrentForm: (form: CurrentForm) => void;
}

export const useMFAStore = create<IMFAStore>((set) => ({
  openMFAModal: false,
  setOpenMFAModal: (openMFAModal) => set({ openMFAModal }),
  
  openEmailMFAModal: false,
  setOpenEmailMFAModal: (openEmailMFAModal) => set({ openEmailMFAModal }),

  openPhoneMFAModal: false,
  setOpenPhoneMFAModal: (openPhoneMFAModal) => set({ openPhoneMFAModal }),
  
  openRecoverycodeMFAModal: false,
  setOpenRecoverycodeMFAModal: (openRecoverycodeMFAModal: boolean) => set({ openRecoverycodeMFAModal }),

  mfaFactors: {
    totp: false,
    phone: false,
    email: false,
    recoveryCode: false,
  },
  setMFAFactors: (mfaFactors) => set({ mfaFactors }),

  remainingTime: null,
  setRemainingTime: (time) => set({ remainingTime: time }),
  
  mfaChallenge: null,
  setMfaChallenge: (mfaChallenge) => set({ mfaChallenge }),

  error: '',
  setError: (error) => set({ error }),

  mfaType: '', 
  setMfaType: (type: string) => set({ mfaType: type }),  

  currentForm: 'login',
  setCurrentForm: (form: CurrentForm) => set({ currentForm: form }),
}));

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
