"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { FormError } from "@/components/form-error";
import { PartnerApplicationSchema } from "@/schemas";

type PartnerApplicationFormValues = z.infer<typeof PartnerApplicationSchema>;

const PartnerApplicationForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<PartnerApplicationFormValues>({
    resolver: zodResolver(PartnerApplicationSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      fleetSize: undefined,
      routes: "",
      experience: undefined,
      companyTaxNumber: "",
      country: "",
      registrationNumber: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (values: PartnerApplicationFormValues) => {
    setIsLoading(true);
    console.log(values);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setError("");
      setIsLoading(false);
      console.log("Application submitted successfully");
    } catch (error: any) {
      setError(error.message || "Something went wrong!");
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Enter your company name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Enter your full name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Tax Number */}
          <FormField
            control={form.control}
            name="companyTaxNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Tax Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Enter your company tax number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Enter your country"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Registration Number */}
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Enter your company registration number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company Website{" "}
                  <span className="text-sm text-black/70">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    type="url"
                    placeholder="https://www.example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fleetSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fleet Size</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    type="number"
                    placeholder="Enter the number of buses in your fleet"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    type="number"
                    placeholder="Enter years of operation"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="routes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Routes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isLoading}
                    placeholder="Describe your current bus routes"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isLoading}
                    placeholder="Any additional details you'd like to share"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            "Submit Application"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PartnerApplicationForm;
