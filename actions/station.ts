"use server";
import { environment } from "@/environment";
import axios from "axios";
import { cache } from "react";

export const getStationsByOperatorId = cache(async (operator_id: string) => {
  try {
    const res = await axios.get(`${environment.apiurl}/station/operator/${operator_id}?select=_id name city country`);
    return res.data.data;
  } catch (error: any) {
    console.error("An error occurred while creating a new appointment:", error);
    return error?.response?.data?.message;
  }
})

export const getStations= cache(async () => {
  try {
      const res = await axios.get(`${environment.apiurl}/station`)
      return res.data.data
    } catch (error) {
        console.error("An error occurred while creating a new appointment:", error);
    }
} )
