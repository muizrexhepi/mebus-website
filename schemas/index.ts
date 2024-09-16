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

export const PartnerApplicationSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  fleetSize: z.number().min(1, "Fleet size must be at least 1"),
  routes: z.string().min(1, "Current routes are required"),
  experience: z.number().min(0, "Experience must be a positive number"),
  companyTaxNumber: z.string().min(1, "Company tax number is required"),
  country: z.string().min(1, "Country is required"),
  registrationNumber: z.string().min(1, "Company registration number is required"),
  additionalInfo: z.string().optional(),
});
