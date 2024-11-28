"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader } from "lucide-react";
import { AuthenticationFactor } from "appwrite";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { useMFAStore } from "@/store";
import { account } from "@/appwrite.config";

const mfaSchema = z.object({
  method: z.enum(["email", "phone", "totp", "recoverycode"]),
});

type MFAMethod = z.infer<typeof mfaSchema>["method"];

const MFA_FACTORS: Record<MFAMethod, AuthenticationFactor> = {
  email: AuthenticationFactor.Email,
  phone: AuthenticationFactor.Phone,
  totp: AuthenticationFactor.Totp,
  recoverycode: AuthenticationFactor.Recoverycode,
};

export const MFAOptionsForm = () => {
  const { t } = useTranslation();
  const {
    mfaType,
    mfaFactors,
    setOpenMFAModal,
    setOpenEmailMFAModal,
    setOpenPhoneMFAModal,
    setOpenRecoverycodeMFAModal,
    setMfaChallenge,
    setMfaType,
    setCurrentForm,
  } = useMFAStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const mfaForm = useForm<z.infer<typeof mfaSchema>>({
    resolver: zodResolver(mfaSchema),
    defaultValues: {
      method: undefined,
    },
  });

  const handleOptionClick = useCallback(
    async (option: MFAMethod) => {
      setIsLoading(true);
      setError(undefined);

      try {
        const challenge = await account.createMfaChallenge(MFA_FACTORS[option]);
        setMfaChallenge(challenge);
        setMfaType(option);
        setOpenMFAModal(false);
        setCurrentForm("mfaVerification");

        switch (option) {
          case "email":
            setOpenEmailMFAModal(true);
            break;
          case "phone":
          case "totp":
            setOpenPhoneMFAModal(true);
            break;
          case "recoverycode":
            setOpenRecoverycodeMFAModal(true);
            break;
        }
      } catch (error) {
        console.error("Error creating MFA challenge:", error);
        setError(t("mfa.errors.setupFailed"));
      } finally {
        setIsLoading(false);
      }
    },
    [
      setMfaChallenge,
      setMfaType,
      setOpenMFAModal,
      setCurrentForm,
      setOpenEmailMFAModal,
      setOpenPhoneMFAModal,
      setOpenRecoverycodeMFAModal,
      t,
    ]
  );

  const onSubmit = (values: z.infer<typeof mfaSchema>) => {
    handleOptionClick(values.method);
  };

  return (
    <div className="max-w-[360px] mx-auto space-y-6">
      <Form {...mfaForm}>
        <form onSubmit={mfaForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={mfaForm.control}
            name="method"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-semibold">
                  {t("mfa.selectMethod")}
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {Object.entries(MFA_FACTORS).map(
                      ([key, value]) =>
                        mfaFactors?.[key as keyof typeof mfaFactors] && (
                          <Button
                            key={key}
                            type="button"
                            className={`w-full h-12 rounded-xl transition-colors duration-200 ${
                              mfaType === key
                                ? "bg-primary-bg text-white"
                                : "border border-primary-bg hover:bg-primary-bg hover:text-white"
                            }`}
                            onClick={() => {
                              field.onChange(key);
                              handleOptionClick(key as MFAMethod);
                            }}
                            disabled={isLoading}
                          >
                            {t(`mfa.${key}Verification`)}
                          </Button>
                        )
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {error && <FormError message={error} />}
          <Button
            className="button-gradient rounded-xl"
            type="submit"
            disabled={isLoading || !mfaForm.getValues().method}
          >
            {isLoading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              t("mfa.continueButton")
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
