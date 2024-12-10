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
import axios from "axios";
import { FormSuccess } from "../form-success";
import { useTranslation } from "react-i18next";

type PartnerApplicationFormValues = z.infer<typeof PartnerApplicationSchema>;

const PartnerApplicationForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>();
  const { t } = useTranslation();

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

  // NODE JS VERSION
  // const onSubmit = async (values: PartnerApplicationFormValues) => {
  //   setIsLoading(true);

  //   try {
  //     const response: ApiResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/applicant/create`, values);
  //     setError("");
  //     setMessage(response.data.message)
  //   } catch (error: any) {
  //     setError(error?.response?.data?.message || "Something went wrong!");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onSubmit = async (values: PartnerApplicationFormValues) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/applicant/create`,
        values
      );
      if (response.status !== 201) {
        setError("Something went wront, please try again");
        return;
      }
      await axios.post("/api/send", values);
      setMessage(
        "Application submitted successfully. Please check your email for confirmation."
      );
    } catch (error: any) {
      setError(error?.response?.data?.message || "Something went wrong!");
    } finally {
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
                <FormLabel>{t("partnerApplicationForm.labels.companyName")}</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 bg-primary-bg/5 rounded-lg border-none"
                    {...field}
                    disabled={isLoading}
                    placeholder={t("partnerApplicationForm.placeholders.companyName")}
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
                <FormLabel>{t("partnerApplicationForm.labels.contactName")}</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 bg-primary-bg/5 rounded-lg border-none"
                    {...field}
                    disabled={isLoading}
                    placeholder={t("partnerApplicationForm.placeholders.contactName")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyTaxNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("partnerApplicationForm.labels.companyTaxNr")}</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 bg-primary-bg/5 rounded-lg border-none"
                    {...field}
                    disabled={isLoading}
                    placeholder={t("partnerApplicationForm.placeholders.companyTaxNr")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("partnerApplicationForm.labels.country")}</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 bg-primary-bg/5 rounded-lg border-none"
                    {...field}
                    disabled={isLoading}
                    placeholder={t("partnerApplicationForm.placeholders.country")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("partnerApplicationForm.labels.registrationNr")}</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 bg-primary-bg/5 rounded-lg border-none"
                    {...field}
                    disabled={isLoading}
                    placeholder={t("partnerApplicationForm.placeholders.registrationNr")}
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
                <FormLabel>{t("partnerApplicationForm.labels.email")}</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 bg-primary-bg/5 rounded-lg border-none"
                    {...field}
                    disabled={isLoading}
                    type="email"
                    placeholder={t("partnerApplicationForm.placeholders.email")}
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
                <FormLabel>{t("partnerApplicationForm.labels.phoneNumber")}</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 bg-primary-bg/5 rounded-lg border-none"
                    {...field}
                    disabled={isLoading}
                    type="tel"
                    placeholder={t("partnerApplicationForm.placeholders.phoneNumber")}
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
                  {t("partnerApplicationForm.labels.website")}{" "}
                  <span className="text-sm text-black/70">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-12 bg-primary-bg/5 rounded-lg border-none"
                    {...field}
                    disabled={isLoading}
                    type="url"
                    placeholder={t("partnerApplicationForm.placeholders.website")}
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
                <FormLabel>{t("partnerApplicationForm.labels.fleetSize")}</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 bg-primary-bg/5 rounded-lg border-none"
                    {...field}
                    disabled={isLoading}
                    type="number"
                    placeholder={t("partnerApplicationForm.placeholders.fleetSize")}
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
                <FormLabel>{t("partnerApplicationForm.labels.yoe")}</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 bg-primary-bg/5 rounded-lg border-none"
                    {...field}
                    disabled={isLoading}
                    type="number"
                    placeholder={t("partnerApplicationForm.placeholders.yoe")}
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
                <FormLabel>{t("partnerApplicationForm.labels.currentRoutes")}</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none bg-primary-bg/5 rounded-lg border-none"
                    {...field}
                    disabled={isLoading}
                    placeholder={t("partnerApplicationForm.placeholders.currentRoutes")}
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
                <FormLabel>{t("partnerApplicationForm.labels.additionalInfo")}</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none bg-primary-bg/5 rounded-lg border-none"
                    {...field}
                    disabled={isLoading}
                    placeholder={t("partnerApplicationForm.placeholders.additionalInfo")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={message} />
        <Button
          variant={"primary"}
          className="w-full h-12"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            t("partnerApplicationForm.buttons.submit")
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PartnerApplicationForm;
