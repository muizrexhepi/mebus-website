"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useNavbarStore } from "@/store";
import AuthForm from "../forms/auth-form";
import { ChevronLeft, X } from "lucide-react";

export const LoginDialog = () => {
  const { t } = useTranslation();
  const { setOpenLogin, openLogin } = useNavbarStore();

  return (
    <Dialog open={openLogin} onOpenChange={() => setOpenLogin(false)}>
      <DialogContent className="md:max-w-[700px] p-0 h-screen md:h-fit">
        <DialogTitle aria-readonly className="hidden">
          Login Dialog
        </DialogTitle>
        <button
          onClick={() => setOpenLogin(false)}
          className="absolute right-4 sm:top-5 top-12 z-10 p-2 rounded-md hover:bg-gray-100"
        >
          <X className="size-5" />
        </button>
        <div className="grid lg:grid-cols-2 h-full">
          <div className="hidden lg:flex flex-col justify-center w-full items-center p-8 bg-gradient-to-br from-primary-bg/10 to-primary-bg/5">
            <div className="flex justify-center items-center flex-col mx-auto space-y-6">
              <Image
                src="/assets/icons/icon.svg"
                width={170}
                height={170}
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
          <div className="p-6 sm:p-8 my-auto space-y-8 h-full relative">
            <AuthForm />
            {/* <LoginForm /> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
