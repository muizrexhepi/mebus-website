"use server";

import { environment } from "@/environment";
import { cache } from "react";

export const getStationsByOperatorId = cache(async (operator_id: string) => {
  try {
    const res = await fetch(`${environment.apiurl}/station/operator/${operator_id}?select=_id name city country`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("An error occurred while fetching stations by operator:", error);
    throw error;
  }
});

export const getStations = cache(async () => {
  try {
    const res = await fetch(`${environment.apiurl}/station?select=name city country`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("An error occurred while fetching stations:", error);
    throw error;
  }
});