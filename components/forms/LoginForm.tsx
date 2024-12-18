"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
import { Eye, EyeOff, Loader, Loader2 } from "lucide-react";
import { FormError } from "@/components/form-error";
import { account } from "@/appwrite.config";
import { useMFAStore, useNavbarStore } from "@/store";
import { loginUser } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { OauthButtons } from "../../app/(auth)/_components/oauth-buttons";

const LoginForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setOpenLogin, setOpenReset } = useNavbarStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { setError, error, setMFAFactors, setCurrentForm } = useMFAStore();

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const result = await loginUser(values);

      if (!result.success || !result.credentials) {
        setError(result.error || t("login.errors.generic"));
        console.log("error");

        return;
      }

      await account.createEmailPasswordSession(
        result.credentials.email,
        result.credentials.password
      );

      const user = await account.get();
      if (user) {
        setOpenLogin(false);
        setError("");
        window.dispatchEvent(new Event("userChange"));
      }
    } catch (error: any) {
      console.log("catch");
      if (error.type === "user_more_factors_required") {
        const factors = await account.listMfaFactors();
        setMFAFactors(factors);
        if (factors) {
          setCurrentForm("mfaOptions");
        } else {
          setError(t("login.errors.noMfaMethodAvailable"));
        }
      } else {
        console.log("elsecatch");

        console.error("Login error:", error);
        setError(error.message || t("login.errors.generic"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-4 pt-32 sm:pt-0">
      <div className="space-y-2 text-center lg:hidden">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("login.title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("login.subtitle")}</p>
      </div>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>{t("login.email.label")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    type="email"
                    placeholder={t("login.email.placeholder")}
                    className="w-full h-12 px-4 hover:bg-accent bg-primary-bg/5 rounded-lg border-none ring-0 text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
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
                    className="font-medium px-0 text-transparent button-gradient bg-clip-text transition-colors hover:no-underline"
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
                        onClick={togglePassword}
                      />
                    ) : (
                      <EyeOff
                        className={cn(
                          "absolute right-3 top-3 cursor-pointer text-primary/70",
                          {
                            hidden: !field.value,
                          }
                        )}
                        onClick={togglePassword}
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
      <OauthButtons isLoading={isLoading} />
    </div>
  );
};

export default LoginForm;
