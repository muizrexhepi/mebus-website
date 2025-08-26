"use server";
import axios from "axios";

export const handleSearchAvailableTickets = async (
  departureStation: string,
  arrivalStation: string,
  ...rest: any
) => {
  try {
    const [departureDate, adults, children] = rest;
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/ticket/search?departureStation=${departureStation}&arrivalStation=${arrivalStation}&departureDate=${departureDate}&adults=${adults}&children=${children}`
    );
    return res.data.data;
  } catch (error: any) {
    return error?.response?.data?.message;
  }
};
