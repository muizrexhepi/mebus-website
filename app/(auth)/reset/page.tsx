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
import { Loader, KeyRound, CheckCircle, Loader2 } from "lucide-react";
import { account } from "@/appwrite.config";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Image from "next/image";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src={"/assets/icons/icon.svg"}
            width={90}
            height={90}
            alt="logo"
            className="mx-auto"
          />
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900">
            {t("security.resetPwTitle")}
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-base">
                      {t("security.newPw")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={isLoading}
                          type="password"
                          placeholder={t("security.newPw")}
                          className="w-full h-12 px-4 pl-12 hover:bg-accent bg-primary-bg/5 rounded-lg border-none ring-0  text-base"
                        />
                        <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                    <FormLabel className="font-medium text-base">
                      {t("security.confirmNewPw")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={isLoading}
                          type="password"
                          placeholder={t("security.confirmNewPw")}
                          className="w-full h-12 px-4 pl-12 hover:bg-accent bg-primary-bg/5 rounded-lg border-none ring-0  text-base"
                        />
                        <CheckCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
              className="w-full button-gradient text-base h-12 rounded-lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                t("actions.confirmCancellation")
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-8">
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary-dark transition-colors"
          >
            {t("security.returnToLogin")}
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
}
