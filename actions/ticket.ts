"use server";
import { environment } from "@/environment";
import axios from "axios";

export const handleSearchAvailableTickets = async (departureStation: string, arrivalStation: string) => {
  try {
    const res = await axios.get(`${environment.apiurl}/ticket/search?departureStation=${departureStation}&arrivalStation=${arrivalStation}`);
    console.log(res.data.data)
    return res.data.data;
  } catch (error: any) {
    console.error("An error occurred while creating a new appointment:", error);
    return error?.response?.data?.message;
  }
}


