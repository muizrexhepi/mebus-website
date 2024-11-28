import { Booking } from "@/models/booking";
import axios from "axios";


export const getBookingsByOperatorId = async (operator_id: string, select?: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking/operator/${operator_id}`);
        return res?.data?.data as Booking[];
    } catch (error) {
        console.error(error);
        // throw new Error("Error fetching bookings");
    }
};

export const getBookingByIdWithChargeData = async (booking_id: string, noCache?: boolean) => {
    try {
        const url = noCache ? `${process.env.NEXT_PUBLIC_API_URL}/booking/operator/with_charge/${booking_id}?cache=false` : `${process.env.NEXT_PUBLIC_API_URL}/booking/operator/with_charge/${booking_id}`
        const res = await axios.get(url);
        return res?.data?.data as Booking;
    } catch (error) {
        console.error(error);
    }
};