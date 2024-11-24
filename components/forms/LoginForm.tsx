"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
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
import { Loader } from "lucide-react";
import Image from "next/image";
import { FormError } from "@/components/form-error";
import { handleFacebookLogin, handleGoogleLogin } from "@/actions/oauth";
import { account } from "@/appwrite.config";
import { useNavbarStore } from "@/store";
import { loginUser } from "@/actions/auth";

const LoginForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setOpenLogin, openLogin, setOpenReset } = useNavbarStore();

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

  return (
    <Dialog open={openLogin} onOpenChange={() => setOpenLogin(false)}>
      <DialogContent className="h-screen sm:h-fit flex flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("login.title")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("login.email.label")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        type="email"
                        placeholder={t("login.email.placeholder")}
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
                    <FormLabel className="flex justify-between items-center">
                      <p>{t("login.password.label")}</p>
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => {
                          setOpenReset(true);
                          setOpenLogin(!openLogin);
                        }}
                        className="text-sm font-medium text-indigo-500"
                      >
                        {t("login.forgotPassword")}
                      </Button>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        type="password"
                        placeholder={t("login.password.placeholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <Button className="w-full button-gradient" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader className="h-3 w-3 animate-spin" />
              ) : (
                t("login.signInButton")
              )}
            </Button>
          </form>
        </Form>
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-3 text-gray-700 text-sm">
            {t("login.orContinueWith")}
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div className="space-y-3">
          <Button
            className="w-full relative"
            onClick={handleGoogleLogin}
            variant="outline"
            disabled={isLoading}
          >
            <Image
              src="/assets/icons/googleIcon.svg"
              width={20}
              height={20}
              alt="Google icon"
              className="absolute left-4"
            />
            {t("login.googleButton")}
          </Button>
          <Button
            className="w-full relative"
            onClick={handleFacebookLogin}
            variant="outline"
            disabled={isLoading}
          >
            <Image
              src="/assets/icons/facebookIcon.svg"
              width={20}
              height={20}
              alt="Facebook icon"
              className="absolute left-4"
            />
            {t("login.facebookButton")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
