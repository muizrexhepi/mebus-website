"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
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
} from "../ui/form";
import { Eye, EyeOff, Loader, Loader2 } from "lucide-react";
import Image from "next/image";
import { FormError } from "@/components/form-error";
import { handleFacebookLogin, handleGoogleLogin } from "@/actions/oauth";
import { account } from "@/appwrite.config";
import { useNavbarStore } from "@/store";
import { createUser } from "@/actions/users";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { OauthButtons } from "../../app/(auth)/_components/oauth-buttons";
import { ScrollArea } from "../ui/scroll-area";

const RegisterForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setOpenRegister, openRegister } = useNavbarStore();
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
      console.log({ dbUser });

      if (dbUser) {
        setOpenRegister(false);
        window.dispatchEvent(new Event("userChange"));
        await account.createEmailPasswordSession(user.email, user.password);
        await account.createVerification(
          "https://www.gobusly.com/email-verification"
        );
      }

      setError("");
    } catch (error: any) {
      console.log({ error });
      if (error && error.code === 409) {
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
    <Dialog open={openRegister} onOpenChange={() => setOpenRegister(false)}>
      <DialogContent className="w-full lg:max-w-[900px] p-0 h-screen lg:h-fit">
        <ScrollArea className="py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 h-full">
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
                    {t("register.getFullExperience")}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("register.experienceDescription")}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 my-auto">
              <div className="max-w-[360px] mx-auto space-y-6">
                <div className="space-y-2 text-center lg:hidden">
                  <h1 className="text-2xl font-bold tracking-tight">
                    {t("register.title")}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {t("register.subtitle")}
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormLabel>{t("register.name.label")}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              type="text"
                              placeholder={t("register.name.placeholder")}
                              className="w-full h-12 px-4 hover:bg-accent bg-primary-bg/5 rounded-lg border-none ring-0 text-base"
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
                        <FormItem className="space-y-0">
                          <FormLabel>{t("register.email.label")}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              type="email"
                              placeholder={t("register.email.placeholder")}
                              className="w-full h-12 px-4 hover:bg-accent bg-primary-bg/5 rounded-lg border-none ring-0 text-base"
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
                          <FormLabel>{t("register.password.label")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                disabled={isLoading}
                                type={showPassword ? "text" : "password"}
                                placeholder={t("register.password.placeholder")}
                                className="w-full h-12 px-4 hover:bg-accent bg-primary-bg/5 rounded-lg border-none ring-0 text-base"
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
                      className="w-full h-12 rounded-lg button-gradient text-base"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        t("register.signUpButton")
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
                <OauthButtons isLoading={isLoading} />
                <p className="text-sm text-primary-bg/70 text-center">
                  By creating an account you agree to our{" "}
                  <Link
                    className="text-transparent button-gradient bg-clip-text"
                    href={"/legal/terms-of-service"}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    className="text-transparent button-gradient bg-clip-text"
                    href={"/legal/privacy-policy"}
                  >
                    Privacy Policy
                  </Link>
                  .{" "}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
