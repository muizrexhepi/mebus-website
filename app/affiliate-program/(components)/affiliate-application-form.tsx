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
import axios from "axios";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
      console.log({ ...values, name: values.fullName });
      const response = await fetch("/api/affiliate-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("affiliateForm.errorGeneric"));
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/affiliate/register`,
        { ...values, name: values.fullName }
      );

      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("affiliateForm.errorUnexpected")
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
              <CardTitle className="text-2xl">
                {t("affiliateForm.submissionSuccess")}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {t("affiliateForm.submissionDescription")}
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
            {t("affiliateForm.returnToTop")}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("affiliateForm.title")}</CardTitle>
        <CardDescription>{t("affiliateForm.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t("affiliateForm.error")}</AlertTitle>
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
                    <FormLabel>{t("affiliateForm.fullName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("affiliateForm.fullNamePlaceholder")}
                        {...field}
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
                    <FormLabel>{t("affiliateForm.email")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("affiliateForm.emailPlaceholder")}
                        {...field}
                      />
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
                    <FormLabel>{t("affiliateForm.password")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("affiliateForm.passwordDescription")}
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
                    <FormLabel>{t("affiliateForm.websiteUrl")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("affiliateForm.websiteUrlPlaceholder")}
                        {...field}
                      />
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
                    <FormLabel>{t("affiliateForm.websiteType")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              "affiliateForm.websiteTypePlaceholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="blog">
                          {t("affiliateForm.websiteTypeBlog")}
                        </SelectItem>
                        <SelectItem value="review-site">
                          {t("affiliateForm.websiteTypeReview")}
                        </SelectItem>
                        <SelectItem value="deals-site">
                          {t("affiliateForm.websiteTypeDeals")}
                        </SelectItem>
                        <SelectItem value="content-site">
                          {t("affiliateForm.websiteTypeContent")}
                        </SelectItem>
                        <SelectItem value="social-media">
                          {t("affiliateForm.websiteTypeSocial")}
                        </SelectItem>
                        <SelectItem value="email-marketing">
                          {t("affiliateForm.websiteTypeEmail")}
                        </SelectItem>
                        <SelectItem value="other">
                          {t("affiliateForm.websiteTypeOther")}
                        </SelectItem>
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
                    <FormLabel>{t("affiliateForm.socialMedia")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("affiliateForm.socialMediaPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("affiliateForm.socialMediaDescription")}
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
                    <FormLabel>{t("affiliateForm.description2")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("affiliateForm.descriptionPlaceholder")}
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
                        {t("affiliateForm.termsPrefix")}{" "}
                        <a href="#" className="text-primary hover:underline">
                          {t("affiliateForm.termsLink")}
                        </a>{" "}
                        {t("affiliateForm.termsAnd")}{" "}
                        <a href="#" className="text-primary hover:underline">
                          {t("affiliateForm.privacyLink")}
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
                ? t("affiliateForm.submitting")
                : t("affiliateForm.submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
