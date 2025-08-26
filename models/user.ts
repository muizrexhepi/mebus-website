import { Otp } from "./operator";

export interface User {
  _id?: string; // from MongoDB
  name?: string;
  email: string;
  password?: string; // usually not sent to frontend, but keep optional
  phone?: string;
  otp?: Otp;
  fcm_token?: string;
  points?: number;
  balance_in_cents?: number;
  appwrite_id?: string;
  stripe_customer_id?: string;
  stripe_payment_method_ids?: string[];
  notifications?: {
    booking_confirmations: boolean;
    departure_reminders: boolean;
    promotions: boolean;
    account_updates: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}
