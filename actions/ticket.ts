"use server";
import { environment } from "@/environment";
import axios from "axios";

export const handleSearchAvailableTickets = async (departureStation: string, arrivalStation: string, ...rest: any) => {
  console.log({rest})
  try {
    const [departureDate, adults, children] = rest;
    const res = await axios.get(`${environment.apiurl}/ticket/search?departureStation=${departureStation}&arrivalStation=${arrivalStation}&departureDate=${departureDate}&adults=${adults}&children=${children}`);
    console.log(res.data.data)
    return res.data.data;
  } catch (error: any) {
    console.error("An error occurred while creating a new appointment:", error);
    return error?.response?.data?.message;
  }
}


