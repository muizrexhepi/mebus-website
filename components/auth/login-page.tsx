"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
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
import Image from "next/image";
import { FormError } from "@/components/form-error";
import { handleFacebookLogin, handleGoogleLogin } from "@/actions/oauth";
import { account } from "@/appwrite.config";

const LoginPage = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);

    try {
      const user = {
        email: values.email,
        password: values.password,
      };

      const newUser = await account.createEmailPasswordSession(
        user.email,
        user.password
      );
      if (newUser) {
        window.dispatchEvent(new Event("userChange"));
        setError("");
        setIsLoading(false);
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message || t("login.errors.generic"));
      setIsLoading(false);
    }
  };

  // const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
  //   setIsLoading(true);

  //   try {
  //     const user = {
  //       email: values.email,
  //       password: values.password,
  //     };

  //     const newUser = await account.createEmailPasswordSession(
  //       user.email,
  //       user.password
  //     );

  //     if (newUser) {
  //       const user = await account.get()
  //       if(user.labels[0] === "operator") {
  //         await account.deleteSessions();
  //         return setError("This email is used by another user.");
  //       }
  //       window.dispatchEvent(new Event("userChange"));
  //       setError("");
  //       setIsLoading(false);
  //       router.push("/");
  //     }
  //   } catch (error: any) {
  //     setError(error.message || "Something went wrong!");
  //     setIsLoading(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 p-6 sm:p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <BusFront className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
            {t("login.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-600">{t("login.subtitle")}</p>
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
                      {t("login.email.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        type="email"
                        placeholder={t("login.email.placeholder")}
                        className="rounded-t-md"
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
                    <FormLabel className="sr-only">
                      {t("login.password.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        type="password"
                        placeholder={t("login.password.placeholder")}
                        className="rounded-b-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/reset-password"
                  className="font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  {t("login.forgotPassword")}
                </Link>
              </div>
            </div>

            <FormError message={error} />

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                t("login.signInButton")
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {t("login.orContinueWith")}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              className="w-full"
              onClick={handleGoogleLogin}
              variant="outline"
              disabled={isLoading}
            >
              <Image
                src="/assets/icons/googleIcon.svg"
                width={20}
                height={20}
                alt="Google icon"
                className="mr-2"
              />
              {t("login.googleButton")}
            </Button>
            <Button
              className="w-full"
              onClick={handleFacebookLogin}
              variant="outline"
              disabled={isLoading}
            >
              <Image
                src="/assets/icons/facebookIcon.svg"
                width={20}
                height={20}
                alt="Facebook icon"
                className="mr-2"
              />
              {t("login.facebookButton")}
            </Button>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {t("login.noAccount")}{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary-dark transition-colors"
            >
              {t("login.registerLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
