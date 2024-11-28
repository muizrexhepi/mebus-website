"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavbarStore } from "@/store";
import { useMFAStore } from "@/store";
import LoginForm from "../forms/LoginForm";
import { MFAOptionsForm } from "../forms/MfaOptionsForm";
import { MfaEmailForm } from "../forms/MfaEmailForm";

export const LoginDialog = () => {
  const { t } = useTranslation();
  const { setOpenLogin, openLogin } = useNavbarStore();
  const { currentForm, mfaType } = useMFAStore();

  const getTitle = () => {
    switch (currentForm) {
      case "login":
        return t("login.title");
      case "mfaOptions":
        return t("mfa.title");
      case "mfaVerification":
        return t("login.mfaVerification");
      default:
        return t("login.title");
    }
  };

  const getSubtitle = () => {
    switch (currentForm) {
      case "login":
        return t("login.subtitle");
      case "mfaOptions":
        return t("mfa.subtitle");
      case "mfaVerification":
        return t("login.mfaEmailDescription");
      default:
        return t("login.subtitle");
    }
  };

  const renderForm = () => {
    switch (currentForm) {
      case "login":
        return <LoginForm />;
      case "mfaOptions":
        return <MFAOptionsForm />;
      case "mfaVerification":
        switch (mfaType) {
          case "email":
            return <MfaEmailForm />;
          default:
            return <MfaEmailForm />;
        }
      default:
        return <LoginForm />;
    }
  };

  return (
    <Dialog open={openLogin} onOpenChange={() => setOpenLogin(false)}>
      <DialogContent className="sm:max-w-[900px] p-0 h-screen sm:h-fit">
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
                  {t("login.getFullExperience")}
                </h2>
                <p className="text-muted-foreground">
                  {t("login.experienceDescription")}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 my-auto space-y-8">
            <div className="space-y-2 text-center lg:hidden">
              <h1 className="text-2xl font-bold tracking-tight">
                {getTitle()}
              </h1>
              <p className="text-sm text-muted-foreground">{getSubtitle()}</p>
            </div>

            {renderForm()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
