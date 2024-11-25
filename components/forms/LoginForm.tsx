"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
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
} from "../ui/form";
import { Eye, EyeOff, Loader } from "lucide-react";
import Image from "next/image";
import { FormError } from "@/components/form-error";
import { handleFacebookLogin, handleGoogleLogin } from "@/actions/oauth";
import { account } from "@/appwrite.config";
import { useNavbarStore } from "@/store";
import { loginUser } from "@/actions/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LoginForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setOpenLogin, openLogin, setOpenReset } = useNavbarStore();
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
        setOpenLogin(false);
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
    <Dialog open={openLogin} onOpenChange={() => setOpenLogin(false)}>
      <DialogContent className="sm:max-w-[900px] p-0 h-screen sm:h-fit">
        <div className="grid lg:grid-cols-2 h-full">
          {/* Left Side - Branding */}
          <div className="hidden lg:flex flex-col justify-center w-full items-center p-8 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex justify-center items-center flex-col mx-auto space-y-6">
              <Image
                src="/assets/icons/icon.svg"
                width={250}
                height={250}
                alt="logo"
                className="mb-8"
              />

              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold">
                  {t("login.getFullExperience")}
                </h2>
                <p className="text-muted-foreground">
                  {t("login.experienceDescription")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-6 sm:p-8 my-auto">
            <div className="max-w-[360px] mx-auto space-y-6">
              <div className="space-y-2 text-center lg:hidden">
                <h1 className="text-2xl font-bold tracking-tight">
                  {t("login.title")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t("login.subtitle")}
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel>{t("login.email.label")}</FormLabel>
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
                      <FormItem className="space-y-0">
                        <div className="flex items-center justify-between">
                          <FormLabel>{t("login.password.label")}</FormLabel>
                          <Button
                            type="button"
                            variant="link"
                            onClick={() => {
                              setOpenReset(true);
                              setOpenLogin(false);
                            }}
                            className="font-medium px-0 text-primary-accent transition-colors hover:no-underline"
                            size="sm"
                          >
                            {t("login.forgotPassword")}
                          </Button>
                        </div>
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
                  <FormError message={error} />
                  <Button
                    className="w-full h-12 rounded-xl button-gradient text-base"
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
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {t("login.orContinueWith")}
                  </span>
                </div>
              </div>
              <div className="grid gap-4">
                <Button
                  className="w-full h-12 rounded-xl"
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
                  className="w-full h-12 rounded-xl"
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
              <p className="text-sm text-primary-bg/70 text-center">
                By signing in you agree to our{" "}
                <Link
                  className="text-primary-accent"
                  href={"/legal/terms-of-service"}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  className="text-primary-accent"
                  href={"/legal/privacy-policy"}
                >
                  Privacy Policy
                </Link>
                .{" "}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
