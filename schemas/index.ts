"use client"
 
import { z } from 'zod'

export const passengerSchema = z.object({
    // full_name: z.string().min(1, 'Full name is required').regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),    
    first_name: z.string().min(1, 'First name is required').regex(/^[a-zA-Z\s]+$/, 'First name must contain only letters and spaces'),    
    last_name: z.string().min(1, 'Last name is required').regex(/^[a-zA-Z\s]+$/, 'Last name must contain only letters and spaces'),    
    email: z.string().email('Invalid email').optional(),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
    birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Birthdate must be in YYYY-MM-DD format').optional(),
    age: z.number().min(0),
    price: z.number(),
  });
  
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
    password: z
    .string()
    .min(8, "Password must be at least 8 characters")  // Your current length check
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")  // Require an uppercase letter
    .regex(/[0-9]/, "Password must contain at least one number")  // Require at least one number
    .regex(/[@$!%*?&]/, "Password must contain at least one special character")  // Require a special character
    .min(1, "Password is required"),  // Ensure the password field isn't empty
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
    confirmPassword: z.string().min(8, {
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
