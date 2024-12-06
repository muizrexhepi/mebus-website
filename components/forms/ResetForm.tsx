"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
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
} from "../ui/form";
import Link from "next/link";
import { Loader } from "lucide-react";
import { account } from "@/appwrite.config";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useNavbarStore } from "@/store";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const ResetPasswordForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const { setOpenReset, setOpenLogin, openReset } = useNavbarStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { t } = useTranslation();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setIsLoading(true);

    try {
      const user = {
        email: values.email,
      };

      const promise = account.createRecovery(
        user.email,
        "https://mebus-website.vercel.app/reset"
      );

      promise.then(
        function (response) {
          setSuccess("Email verification sent!");
          setIsLoading(false);
        },
        function (error) {}
      );
      setError("");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={openReset} onOpenChange={() => setOpenReset(false)}>
      <DialogContent className="">
        <DialogHeader>
          <div className="text-center">
            <Image
              src={"/assets/icons/icon.svg"}
              width={90}
              height={90}
              alt="logo"
              className="mx-auto"
            />
            <h1 className="mt-6 text-4xl font-extrabold text-gray-900">
              {t("reset.title")}
            </h1>
            <p className="mt-2 text-sm text-gray-600">{t("reset.subtitle")}</p>
          </div>
        </DialogHeader>
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
                    <FormLabel className="font-medium text-base">
                      {t("reset.email.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        type="email"
                        placeholder={t("reset.email.placeholder")}
                        className="w-full h-12 px-4 hover:bg-accent bg-primary-bg/5 rounded-lg border-none ring-0  text-base"
                      />
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
              href="/"
              onClick={() => {
                setOpenReset(false);
                setOpenLogin(true);
              }}
              className="font-medium text-primary-accent transition-colors"
            >
              {t("reset.backToLogin")}
            </Link>
          </p>
        </div>
        {/* <Button
          variant="link"
          onClick={() => {
            router.push("/");
            setOpenReset(false);
            setOpenLogin(true);
          }}
          className="text-sm text-center font-normal w-fit mx-auto text-indigo-700 hover:no-underline"
        >
          Return to login
        </Button> */}
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordForm;
