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
import { Eye, EyeOff, Loader } from "lucide-react";
import Image from "next/image";
import { FormError } from "@/components/form-error";
import { handleFacebookLogin, handleGoogleLogin } from "@/actions/oauth";
import { account } from "@/appwrite.config";
import { loginUser } from "@/actions/auth";
import { cn } from "@/lib/utils";

const LoginPage = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
      const result = await loginUser(values);

      if (!result.success || !result.credentials) {
        setError(result.error || t("login.errors.generic"));
        return;
      }

      try {
        const session = await account.createEmailPasswordSession(
          result.credentials.email,
          result.credentials.password
        );

        window.dispatchEvent(new Event("userChange"));
        router.push("/");
        setError("");
      } catch (appwriteError: any) {
        console.error("Appwrite session creation failed:", appwriteError);
        setError(appwriteError.message || t("login.errors.generic"));
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || t("login.errors.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswrod = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* <BusFront className="mx-auto h-16 w-16 text-primary" /> */}
          <Image
            src={"/assets/icons/icon.svg"}
            width={90}
            height={90}
            alt="logo"
            className="mx-auto"
          />
          <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-gray-900">
            {t("login.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-600">{t("login.subtitle")}</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" font-medium text-base">
                      {t("login.email.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        type="email"
                        placeholder={t("login.email.placeholder")}
                        className="w-full h-12 px-4 hover:bg-accent bg-primary-bg/5 rounded-xl border-none ring-0 text-base"
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
                    <FormLabel className="font-medium text-base">
                      {t("login.password.label")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={isLoading}
                          type={showPassword ? "text" : "password"}
                          placeholder={t("register.password.placeholder")}
                          className="w-full h-12 px-4 hover:bg-accent bg-primary-bg/5 rounded-xl border-none ring-0 text-base"
                        />
                        {!showPassword ? (
                          <Eye
                            className={cn(
                              "absolute right-3 top-3 cursor-pointer text-primary/70",
                              {
                                hidden: !field.value,
                              }
                            )}
                            onClick={togglePasswrod}
                          />
                        ) : (
                          <EyeOff
                            className={cn(
                              "absolute right-3 top-3 cursor-pointer text-primary/70",
                              {
                                hidden: !field.value,
                              }
                            )}
                            onClick={togglePasswrod}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  href="/reset-password"
                  className="font-medium text-primary/80 hover:text-primary-dark transition-colors"
                >
                  {t("login.forgotPassword")}
                </Link>
              </div>
            </div>

            <FormError message={error} />

            <Button
              className="w-full button-gradient text-base h-12 rounded-xl"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                t("login.signInButton")
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-3 text-gray-700 text-sm">
              {t("login.orContinueWith")}
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              className="w-full h-12 rounded-xl"
              onClick={handleGoogleLogin}
              variant="outline"
              disabled={isLoading}
            >
              <Image
                src="/assets/icons/googleIcon.svg"
                width={30}
                height={30}
                alt="Google icon"
                className="mr-2"
              />
              <span className="sr-only sm:not-sr-only">
                {t("login.googleButton")}
              </span>
            </Button>
            <Button
              className="w-full h-12 rounded-xl"
              onClick={handleFacebookLogin}
              variant="outline"
              disabled={isLoading}
            >
              <Image
                src="/assets/icons/facebookIcon.svg"
                width={30}
                height={30}
                alt="Facebook icon"
                className="mr-2"
              />
              <span className="sr-only sm:not-sr-only">
                {t("login.facebookButton")}
              </span>
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
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
