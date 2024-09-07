export interface PassengerData {
    full_name: string;
    email: string;
    phone: string;
    birthdate: string;
    age: number;
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