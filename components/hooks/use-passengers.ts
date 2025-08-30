export interface PassengerData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  countryCode: string; // Added this field
  birthdate: string;
  age: number;
  price: number;
}

export const calculatePassengerPrices = (
  passengers: PassengerData[],
  selectedTicket: any,
  max_child_age: number = 10
) => {
  if (
    !selectedTicket ||
    !selectedTicket.stops ||
    selectedTicket.stops.length === 0
  ) {
    throw new Error("Invalid ticket data.");
  }

  const childPrice = selectedTicket.stops[0].other_prices.our_children_price;
  const adultPrice = selectedTicket.stops[0].other_prices.our_price;

  return passengers.map((passenger) => ({
    ...passenger,
    phone: `${passenger.countryCode}${passenger.phone.replace(/\D/g, "")}`, // combine country code + phone
    full_name: [passenger.first_name, passenger.last_name]
      .filter(Boolean)
      .join(" "),
    price: passenger.age <= max_child_age ? childPrice : adultPrice,
  }));
};
