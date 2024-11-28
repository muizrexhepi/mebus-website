import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMFAStore, useNavbarStore } from "@/store";
import { z } from "zod";
import { MFAVerificationSchema } from "@/schemas";
import { account } from "@/appwrite.config";

export const useMfaVerification = () => {
  const { t } = useTranslation();
  const { mfaChallenge, setError,setCurrentForm } = useMFAStore();
  const { setOpenLogin } = useNavbarStore()
  const [isLoading, setIsLoading] = useState(false);

  const onMFAVerify = async (values: z.infer<typeof MFAVerificationSchema>) => {
    if (!mfaChallenge) return;

    setIsLoading(true);
    try {
        await account.updateMfaChallenge(
          mfaChallenge.$id,
          values.mfaCode
        );
        window.dispatchEvent(new Event("userChange"));
        setOpenLogin(false)
        setCurrentForm('login')
    } catch (error: any) {
      console.error("MFA verification failed:", error);
      setError(error.message || t("login.errors.mfaVerificationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onMFAVerify,
    isLoading,
  };
};
