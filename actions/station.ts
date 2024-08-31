"use server";
import { environment } from "@/environment";
import axios from "axios";

export const getStationsByOperatorId = async (operator_id: string) => {
  try {
    const res = await axios.get(`${environment.apiurl}/station/operator/${operator_id}?select=_id name city country`);
    return res.data.data;
  } catch (error: any) {
    console.error("An error occurred while creating a new appointment:", error);
    return error?.response?.data?.message;
  }
}

export const getStationById = async (station_id: string) => {
  try {
    
    } catch (error) {
        console.error("An error occurred while creating a new appointment:", error);
    }
} 
