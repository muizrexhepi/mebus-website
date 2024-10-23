"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Loader, BusFront } from "lucide-react";
import { account } from "@/appwrite.config";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);

    try {
      await account.createRecovery(
        values.email,
        "https://mebus-website.vercel.app/reset"
      );
      setSuccess(t("reset.success"));
    } catch (error: any) {
      console.error(error);
      setError(error.message || t("reset.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 p-6 sm:p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <BusFront className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
            {t("reset.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-600">{t("reset.subtitle")}</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      {t("reset.email.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        type="email"
                        placeholder={t("reset.email.placeholder")}
                        className="rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormSuccess message={success} />
            <FormError message={error} />

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                t("reset.sendButton")
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {t("reset.rememberPassword")}{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary-dark transition-colors"
            >
              {t("reset.backToLogin")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
