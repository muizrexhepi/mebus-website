"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useNavbarStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, BookmarkCheck, Clock, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const LoginCTA = () => {
  const { user } = useAuth();
  const { setOpenLogin } = useNavbarStore();
  const { t } = useTranslation();

  // Don't show if user is already logged in
  if (user) return null;

  return (
    <Card className="border-2 border-dashed border-orange-200 bg-orange-50/50">
      <CardContent className="p-3 md:p-4">
        {/* Mobile: Single row layout */}
        <div className="md:hidden flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#ff6700] to-[#ff007f] bg-opacity-10 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-[#fff]" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 text-sm">
                {t("loginCTA.saveBookingTitle", "Save your booking details")}
              </h3>
              <span className="text-xs text-gray-500">
                {t("loginCTA.quickLogin", "Takes less than 30 seconds")}
              </span>
            </div>
          </div>
          <Button
            onClick={() => setOpenLogin(true)}
            size="sm"
            variant="primary"
            className="whitespace-nowrap text-xs px-3"
          >
            {t("auth.login", "Login")}
          </Button>
        </div>

        {/* Desktop: Full layout */}
        <div className="hidden md:block">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#ff6700] to-[#ff007f] bg-opacity-10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#fff]" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 mb-1">
                {t("loginCTA.saveBookingTitle", "Save your booking details")}
              </h3>
              <p className="text-sm text-gray-600">
                {t(
                  "loginCTA.saveBookingDescription",
                  "Login to save your booking history, track your trips, and get faster checkout next time."
                )}
              </p>

              {/* Benefits list */}
              {/* <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <BookmarkCheck className="w-3 h-3 text-green-600" />
                  <span>{t("loginCTA.benefit1", "Save booking history")}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Clock className="w-3 h-3 text-green-600" />
                  <span>
                    {t("loginCTA.benefit2", "Faster future checkouts")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span>
                    {t("loginCTA.benefit3", "Secure payment methods")}
                  </span>
                </div>
              </div> */}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-orange-200">
            <span className="text-xs text-gray-500">
              {t("loginCTA.quickLogin", "Takes less than 30 seconds")}
            </span>
            <Button
              onClick={() => setOpenLogin(true)}
              size="sm"
              variant="primary"
            >
              {t("loginCTA.loginButton", "Login / Sign up")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginCTA;
