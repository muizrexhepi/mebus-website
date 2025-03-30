"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCheck, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  websiteUrl: z
    .string()
    .url({ message: "Please enter a valid website URL." })
    .optional()
    .or(z.literal("")),
  websiteType: z.string({ message: "Please select a website type." }),
  socialMedia: z.string().optional(),
  description: z.string().min(10, {
    message:
      "Please provide a brief description of your website or social media.",
  }),
  termsAndConditions: z.boolean({
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
});

export function AffiliateApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      websiteUrl: "",
      websiteType: "",
      socialMedia: "",
      description: "",
      termsAndConditions: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/affiliate-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
      console.error("Error submitting form:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCheck className="h-10 w-10 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Application Submitted!</CardTitle>
              <CardDescription className="text-base mt-2">
                Thank you for applying to the GoBusly Affiliate Program.
                We&apos;ve sent a confirmation email to your inbox and will
                review your application within 24-48 hours.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full"
            variant={"primary"}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Return to Top
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Affiliate Application</CardTitle>
        <CardDescription>
          Fill in your details to apply for our affiliate program.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters with mixed case and numbers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourwebsite.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="websiteType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website/Channel Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select website or channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="blog">Blog</SelectItem>
                        <SelectItem value="review-site">Review Site</SelectItem>
                        <SelectItem value="deals-site">Deals Site</SelectItem>
                        <SelectItem value="content-site">
                          Content Site
                        </SelectItem>
                        <SelectItem value="social-media">
                          Social Media
                        </SelectItem>
                        <SelectItem value="email-marketing">
                          Email Marketing
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialMedia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media Handles (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="@yoursocialmedia" {...field} />
                    </FormControl>
                    <FormDescription>
                      List your social media handles (Instagram, TikTok,
                      YouTube, etc.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tell us about your website/channel</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your website, audience, and how you plan to promote GoBusly..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="termsAndConditions"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              variant={"primary"}
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting Application..."
                : "Submit Application"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
