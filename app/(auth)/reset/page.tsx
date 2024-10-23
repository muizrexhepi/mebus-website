"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ResetPasswordConfirmSchema } from "@/schemas";
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
import { Loader, BusFront, KeyRound, CheckCircle } from "lucide-react";
import { account } from "@/appwrite.config";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const ResetPassword = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState<string | undefined>();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ResetPasswordConfirmSchema>>({
    resolver: zodResolver(ResetPasswordConfirmSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ResetPasswordConfirmSchema>
  ) => {
    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);
    if (values.password !== values.confirmPassword) {
      setError(t("reset.confirm.error.mismatch"));
      setIsLoading(false);
      return;
    } else {
      try {
        await account.updateRecovery(userId!, secret!, values.password);
        setSuccess(t("reset.confirm.success"));
        setTimeout(() => router.push("/?login=true"), 2000);
      } catch (error: any) {
        setError(error?.message || t("reset.confirm.error.general"));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <BusFront className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
            {t("reset.confirm.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {t("reset.confirm.subtitle")}
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <div className="rounded-md shadow-sm space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("reset.confirm.newPassword.label")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={isLoading}
                          type="password"
                          placeholder={t(
                            "reset.confirm.newPassword.placeholder"
                          )}
                          className="rounded-md pl-10"
                        />
                        <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("reset.confirm.confirmPassword.label")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={isLoading}
                          type="password"
                          placeholder={t(
                            "reset.confirm.confirmPassword.placeholder"
                          )}
                          className="rounded-md pl-10"
                        />
                        <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormSuccess message={success} />
            <FormError message={error} />

            <Button
              className="w-full bg-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                t("reset.confirm.submitButton")
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <Link href="/login" className="font-medium text-primary text-sm">
            {t("reset.confirm.returnToLogin")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function ResetPasswordConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <Loader className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
}
