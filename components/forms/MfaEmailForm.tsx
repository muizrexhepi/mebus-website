"use client";

import { useTranslation } from "react-i18next";
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
import { Loader } from "lucide-react";
import { useMFAStore } from "@/store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MFAVerificationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMfaVerification } from "../hooks/use-mfaVerification";

export const MfaEmailForm = () => {
  const { t } = useTranslation();
  const { remainingTime, error } = useMFAStore();

  const mfaForm = useForm<z.infer<typeof MFAVerificationSchema>>({
    resolver: zodResolver(MFAVerificationSchema),
    defaultValues: {
      mfaCode: "",
    },
  });

  const { onMFAVerify, isLoading } = useMfaVerification();

  return (
    <div className="max-w-[360px] mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("login.mfaVerification")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("login.mfaEmailDescription")}
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
                  {remainingTime && (
                    <p className="text-primary-bg font-semibold text-sm text-center">
                      {remainingTime.minutes.toString().padStart(2, "0")}:
                      {remainingTime.seconds.toString().padStart(2, "0")}
                    </p>
                  )}
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
                        className="flex-grow h-full bg-primary-bg/5"
                      />
                      <InputOTPSlot
                        index={1}
                        className="flex-grow h-full bg-primary-bg/5"
                      />
                      <InputOTPSlot
                        index={2}
                        className="flex-grow h-full bg-primary-bg/5"
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
