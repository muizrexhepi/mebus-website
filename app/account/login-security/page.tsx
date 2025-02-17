"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/components/providers/auth-provider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginSecurity() {
  const { user, loading } = useAuth();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false);
  const [loginNotifications, setLoginNotifications] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();

  const handlePasswordChange = async () => {
    try {
      // Implement password change logic here
      toast({ description: "Password updated successfully." });
    } catch (error) {
      toast({
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTwoFactorToggle = async (checked: boolean) => {
    try {
      setTwoFactorEnabled(checked);
      toast({
        description: `Two-factor authentication ${
          checked ? "enabled" : "disabled"
        }.`,
      });
    } catch (error) {
      setTwoFactorEnabled(!checked);
      toast({
        description:
          "Failed to update two-factor authentication. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLoginNotificationsToggle = async (checked: boolean) => {
    try {
      setLoginNotifications(checked);
      toast({
        description: `Login notifications ${checked ? "enabled" : "disabled"}.`,
      });
    } catch (error) {
      setLoginNotifications(!checked);
      toast({
        description: "Failed to update login notifications. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">
            {t("security.loginSecurity")}
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b">
            <div>
              <div className="text-base font-medium">
                {t("security.password")}
              </div>
              <div className="text-sm text-muted-foreground">*****</div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  {t("security.edit")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("security.editPassword")}</DialogTitle>
                  <DialogDescription>
                    {t("security.makeChangesToYourPw")}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="oldPassword">{t("security.oldPw")}</Label>
                    <Input
                      id="oldPassword"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">{t("security.newPw")}</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handlePasswordChange}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center justify-between py-4 border-b">
            <div>
              <div className="text-base font-medium">{t("security.TFA")}</div>
              <div className="text-sm text-muted-foreground">
                {t("security.addExtraSecurity")}
              </div>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handleTwoFactorToggle}
            />
          </div>

          <div className="flex items-center justify-between py-4 border-b">
            <div>
              <div className="text-base font-medium">
                {t("security.loginNotifications")}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("security.newLoginNotifications")}
              </div>
            </div>
            <Switch
              checked={loginNotifications}
              onCheckedChange={handleLoginNotificationsToggle}
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{t("security.account")}</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b">
            <div>
              <div className="text-base font-medium">
                {t("security.verifyEmail")}
              </div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              disabled={user?.emailVerified}
            >
              {user?.emailVerified
                ? t("security.verified")
                : t("security.verify")}
            </Button>
          </div>

          <div className="flex items-center justify-between py-4 border-b">
            <div>
              <div className="text-base font-medium">
                {t("security.activeSessions")}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("security.manageSessions")}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() =>
                router.push("/account/login-security/active-sessions")
              }
            >
              Manage
            </Button>
          </div>

          <div className="flex items-center justify-between py-4 border-b">
            <div>
              <div className="text-base font-medium">
                {t("security.deleteAcc")}
              </div>
              <div className="text-sm text-muted-foreground">
                Contact our customer support team to delete your account
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              asChild
            >
              <Link href="/support">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
