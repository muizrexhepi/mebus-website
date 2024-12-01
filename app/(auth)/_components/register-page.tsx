"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/schemas";
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
import { createUser } from "@/actions/users";
import { cn } from "@/lib/utils";

const RegisterPage = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const dbUser = await createUser(user);

      const newUser = await account.create(
        dbUser,
        user.email,
        user.password,
        user.name
      );

      if (newUser) {
        window.dispatchEvent(new Event("userChange"));
        await account.createEmailPasswordSession(user.email, user.password);
        await account.createVerification(
          "https://www.gobusly.com/email-verification"
        );
        router.push("/");
      }

      setError("");
    } catch (error: any) {
      if (error && error.code == 409) {
        setError(t("register.errors.userExists"));
      } else {
        setError(t("register.errors.generic"));
      }
    }

    setIsLoading(false);
  };

  const togglePasswrod = () => {
    setShowPassword(!showPassword);
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
          <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-gray-900">
            {t("register.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-600">{t("register.subtitle")}</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-base">
                      {t("register.name.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        type="text"
                        placeholder={t("register.name.placeholder")}
                        className="w-full h-12 px-4 hover:bg-accent bg-primary-bg/5 rounded-xl border-none ring-0 text-base"
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
                    <FormLabel className="font-medium text-base">
                      {t("register.email.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        type="email"
                        placeholder={t("register.email.placeholder")}
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
                      {t("register.password.label")}
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

            <FormError message={error} />

            <Button
              className="w-full button-gradient text-base h-12 rounded-xl"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                t("register.signUpButton")
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
                {t("register.googleButton")}
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
                {t("register.facebookButton")}
              </span>
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            {t("register.haveAccount")}{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary-dark transition-colors"
            >
              {t("register.loginLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
