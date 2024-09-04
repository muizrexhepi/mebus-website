"use client"
 
import { z } from "zod"
 
export const LoginSchema = z.object({
    email: z.string().email({
      message: "Email is required"
    }),
    password: z.string().min(1, {
      message: "Password is required"
    })
  });
  
  export const registerSchema = z.object({
    name: z.string().min(1, {
      message: "Name is required"
    }),
    email: z.string().email({
      message: "Email is required"
    }),
    password: z.string().min(8, {
      message: "Minimum 8 characters"
    })
  });

  
  export const resetPasswordSchema = z.object({
    email: z.string().email({
      message: "Email is required"
    }),
  });

  export const ResetPasswordConfirmSchema = z.object({
    password: z.string().min(8, {
      message: "Minimum 8 characters"
    }),
  });


export const searchSchema = z.object({
  from: z.string().min(1, "Departure station is required"),
  to: z.string().min(1, "Arrival station is required"),
  departureDate: z.string().min(1, "Departure date is required"),
  returnDate: z.string().optional(), // Optional field for return date
  passengers: z.object({
    adults: z.number().min(1, "At least one adult is required"), // Minimum 1 adult
    children: z.number().min(0, "Number of children must be at least 0").optional(),
  }),
});
