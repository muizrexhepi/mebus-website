import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Loader2, Mail, Phone } from "lucide-react";
import { AuthenticationFactor } from "appwrite";
import { Button } from "@/components/ui/button";
import { useMFAStore } from "@/store";
import { account } from "@/appwrite.config";
import { FormError } from "@/components/form-error";

type MFAMethod = "email" | "phone";

const MFA_FACTORS: Record<MFAMethod, AuthenticationFactor> = {
  email: AuthenticationFactor.Email,
  phone: AuthenticationFactor.Phone,
};

export const MFAOptionsForm = () => {
  const { t } = useTranslation();
  const {
    mfaFactors,
    setMfaChallenge,
    setMfaType,
    setCurrentForm,
    setMFAFactors,
  } = useMFAStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleOptionClick = useCallback(
    async (option: MFAMethod) => {
      setIsLoading(true);
      setError(undefined);

      try {
        const challenge = await account.createMfaChallenge(MFA_FACTORS[option]);
        setMfaChallenge(challenge);
        setMfaType(option);
        setCurrentForm("mfaVerification");
      } catch (error) {
        console.error("Error creating MFA challenge:", error);
        setError(t("mfa.errors.setupFailed"));
      } finally {
        setIsLoading(false);
      }
    },
    [setMfaChallenge, setMfaType, setCurrentForm, t]
  );

  const handleBackClick = async () => {
    await account.deleteSession("current"); //
    setMFAFactors({
      totp: false,
      phone: false,
      email: false,
      recoveryCode: false,
    });
    setCurrentForm("login");
  };

  return (
    <div className="w-full max-w-[400px] mx-auto space-y-8 pt-32 sm:pt-6">
      <ChevronLeft
        className="absolute left-6 top-12 sm:top-6 w-6 h-6 shrink-0 cursor-pointer"
        onClick={handleBackClick}
      />
      <div className="space-y-0 text-center lg:text-start mb-6">
        <h2 className="text-2xl font-semibold">
          {t("mfa.selectMethod", "Multi factor authentication")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t(
            "mfa.selectMethodDescription",
            "Choose your preferred verification method"
          )}
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(MFA_FACTORS).map(
          ([key, value]) =>
            mfaFactors?.[key as MFAMethod] && (
              <Button
                key={key}
                variant="outline"
                className="w-full h-12 justify-start text-base font-normal hover:bg-accent bg-primary-bg/5 rounded-lg"
                onClick={() => handleOptionClick(key as MFAMethod)}
                disabled={isLoading}
              >
                {key === "email" ? (
                  <Mail className="mr-2 h-4 w-4" />
                ) : (
                  <Phone className="mr-2 h-4 w-4" />
                )}
                {key === "email" ? "Email Verification" : "Phone Verification"}
              </Button>
            )
        )}
      </div>

      <FormError message={error} />

      {isLoading && (
        <div className="mt-3 flex justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};
