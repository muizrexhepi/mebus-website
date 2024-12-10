"use client";
import { deleteUser } from "@/actions/users";
import { account } from "@/appwrite.config";
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
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import useUser from "@/components/hooks/use-user";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";

export default function LoginSecurity() {
  const { user, loading } = useUser();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(
    user?.mfa || false
  );
  const [loginNotifications, setLoginNotifications] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [isPhoneVerificationModalOpen, setIsPhoneVerificationModalOpen] =
    useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      setTwoFactorEnabled(user.mfa || false);
    }
  }, [user]);

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSavePassword = async () => {
    try {
      await account.updatePassword(newPassword, oldPassword);
      setOldPassword("");
      setNewPassword("");
      toast({ description: "Password updated successfully." });
    } catch (error) {
      console.error("Failed to update password:", error);
      toast({
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEmailVerification = async () => {
    try {
      await account.createVerification(
        "https://www.gobusly.com/email-verification"
      );
      toast({ description: "Email sent successfully." });
    } catch (error) {
      console.error("Failed to update password:", error);
      toast({
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePhoneVerification = async () => {
    try {
      setIsPhoneVerificationModalOpen(true);

      await account.createPhoneVerification();

      toast({ description: "Verification code sent." });
    } catch (error) {
      console.error("Failed to initiate phone verification:", error);
      toast({
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOtpVerification = async () => {
    try {
      await account.updatePhoneVerification(user?.$id, otpCode);

      setIsPhoneVerificationModalOpen(false);
      setOtpCode("");

      toast({ description: "Phone number verified successfully." });
    } catch (error) {
      console.error("Failed to verify phone number:", error);
      toast({
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user?.$id);
      toast({ description: "Account deleted successfully." });
      router.push("/");
      setIsAlertOpen(false);
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast({
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTwoFactorToggle = async (checked: boolean) => {
    try {
      setTwoFactorEnabled(checked);

      const result = await account.updateMFA(checked);

      toast({
        description: `Two-factor authentication ${
          checked ? "enabled" : "disabled"
        }.`,
      });
    } catch (error) {
      console.error("Failed to toggle two-factor authentication:", error);

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

      const logs = await account.listLogs();
      const sessions = await account.listSessions();
      console.log({ logs, sessions });
      toast({
        description: `Login notifications ${checked ? "enabled" : "disabled"}.`,
      });
    } catch (error) {
      console.error("Failed to toggle login notifications:", error);
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
    <div className="">
      <Dialog
        open={isPhoneVerificationModalOpen}
        onOpenChange={setIsPhoneVerificationModalOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Verify Phone Number</DialogTitle>
            <DialogDescription>
              Enter the 6-digit verification code sent to your phone
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="otpCode" className="text-right">
                OTP Code
              </Label>
              <Input
                id="otpCode"
                type="text"
                value={otpCode}
                placeholder="Enter 6-digit code"
                className="col-span-3 bg-primary-bg/5 h-12 rounded-lg border-none"
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleOtpVerification}
              disabled={otpCode.length !== 6}
            >
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">
            {t("security.loginSecurity")}
          </h2>
        </div>
        <div className="space-y-6">
          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div>
              <div className="text-base">{t("security.password")}</div>
              <div className="text-neutral-800/60 max-w-2xl text-sm">*****</div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  {t("security.edit")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t("security.editPassword")}</DialogTitle>
                  <DialogDescription>
                    {t("security.makeChangesToYourPw")}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="oldPassword" className="text-right">
                      {t("security.oldPw")}
                    </Label>
                    <Input
                      id="oldPassword"
                      type="password"
                      value={oldPassword}
                      placeholder="***"
                      className="col-span-3 bg-primary-bg/5 h-12 rounded-lg border-none"
                      onChange={handleOldPasswordChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newPassword" className="text-right">
                      {t("security.newPw")}
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      placeholder="***"
                      className="col-span-3 bg-primary-bg/5 h-12 rounded-lg border-none"
                      onChange={handleNewPasswordChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    variant={"primary"}
                    onClick={handleSavePassword}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div>
              <div className="text-base">{t("security.TFA")}</div>
              <div className="text-neutral-800/60 max-w-2xl text-sm">
                {t("security.addExtraSecurity")}
              </div>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handleTwoFactorToggle}
            />
          </div>
          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div>
              <div className="text-base">
                {t("security.loginNotifications")}
              </div>
              <div className="text-neutral-800/60 max-w-2xl text-sm">
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
          <h2 className="text-3xl font-semibold">{t("security.account")}</h2>
        </div>
        <div className="space-y-6">
          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div className="text-base">{t("security.verifyEmail")}</div>
            {user?.emailVerification ? (
              <Button
                disabled
                variant="outline"
                size="sm"
                onClick={handleEmailVerification}
              >
                {t("security.verified")}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEmailVerification}
              >
                {t("security.verify")}
              </Button>
            )}
          </div>
          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div className="text-base">
              {t("security.verifyPhone", "Verify Phone")}
            </div>
            {user?.phoneVerification ? (
              <Button
                disabled
                variant="outline"
                size="sm"
                onClick={handlePhoneVerification}
              >
                {t("security.verified")}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePhoneVerification}
              >
                {t("security.verify")}
              </Button>
            )}
          </div>
          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div>
              <div className="text-base">{t("security.activeSessions")}</div>
              <div className="text-neutral-800/60 max-w-2xl text-sm">
                {t("security.manageSessions")}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                router.push("/account/login-security/active-sessions")
              }
            >
              Manage
            </Button>
          </div>
          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div className="text-base">{t("security.deleteAcc")}</div>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsAlertOpen(true)}
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Are you sure you want to
                    delete your account?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
