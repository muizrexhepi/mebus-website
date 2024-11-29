"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { FormError } from "@/components/form-error";
import { ChevronLeft, Loader } from "lucide-react";
import { useMFAStore } from "@/store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MFAVerificationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMfaVerification } from "../hooks/use-mfaVerification";

export const MfaEmailForm = () => {
  const { t } = useTranslation();
  const { error, setCurrentForm } = useMFAStore();

  const mfaForm = useForm<z.infer<typeof MFAVerificationSchema>>({
    resolver: zodResolver(MFAVerificationSchema),
    defaultValues: {
      mfaCode: "",
    },
  });

  const { onMFAVerify, isLoading } = useMfaVerification();

  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="max-w-[400px] mx-auto space-y-8 pt-32 sm:pt-6">
      <ChevronLeft
        className="absolute left-6 top-6 w-6 h-6 shrink-0 cursor-pointer"
        onClick={() => setCurrentForm("mfaVerification")}
      />
      <div className="space-y-0 text-center lg:text-start">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("mfa.emailVerification")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("mfa.emailDescription")}
        </p>
      </div>

      <Form {...mfaForm}>
        <form
          onSubmit={mfaForm.handleSubmit(onMFAVerify)}
          className="space-y-4"
        >
          <FormField
            control={mfaForm.control}
            name="mfaCode"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex justify-between items-center">
                  {t("login.mfaCode")}
                  <span className="text-xs font-medium text-muted-foreground">
                    {formatTime(timeLeft)}
                  </span>
                </FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    disabled={isLoading}
                    pattern={REGEXP_ONLY_DIGITS}
                    className="flex-1"
                    {...field}
                  >
                    <InputOTPGroup className="flex flex-grow h-12">
                      <InputOTPSlot
                        index={0}
                        className="flex-grow h-full bg-primary-bg/5 rounded-l-xl"
                      />
                      <InputOTPSlot
                        index={1}
                        className="flex-grow h-full bg-primary-bg/5"
                      />
                      <InputOTPSlot
                        index={2}
                        className="flex-grow h-full bg-primary-bg/5 rounded-r-xl"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="flex flex-grow h-12">
                      <InputOTPSlot
                        index={3}
                        className="flex-grow h-full bg-primary-bg/5"
                      />
                      <InputOTPSlot
                        index={4}
                        className="flex-grow h-full bg-primary-bg/5"
                      />
                      <InputOTPSlot
                        index={5}
                        className="flex-grow h-full bg-primary-bg/5"
                      />
                    </InputOTPGroup>
                  </InputOTP>
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
              t("login.verifyButton")
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
