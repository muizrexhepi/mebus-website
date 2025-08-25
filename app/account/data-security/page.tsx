"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { FormError } from "@/components/form-error";
import { useAuth } from "@/components/providers/auth-provider";
import {
  Info,
  Download,
  Loader2,
  Shield,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DataAndSecurity() {
  const { user, loading } = useAuth();
  const [exportingData, setExportingData] = useState<boolean>(false);
  const [changingPassword, setChangingPassword] = useState<boolean>(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleDataExport = async () => {
    if (!user?._id) {
      toast({
        description: t("dataAndSecurity.userNotFound"),
        variant: "destructive",
      });
      return;
    }

    setExportingData(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/download-data/${user._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export data");
      }

      const blob = await response.blob(); // receive PDF as blob

      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `gobusly_user_data_${user._id}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        description: t("dataAndSecurity.exportSuccess"),
      });
    } catch (error: any) {
      console.error("Data export error:", error);
      toast({
        description: error.message || t("dataAndSecurity.exportError"),
        variant: "destructive",
      });
    } finally {
      setExportingData(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError(t("dataAndSecurity.passwordMismatch"));
      return;
    }

    if (newPassword.length < 8) {
      setError(t("dataAndSecurity.passwordTooShort"));
      return;
    }

    setChangingPassword(true);
    setError(undefined);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/change-password/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password");
      }

      setShowPasswordDialog(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast({
        description: t("dataAndSecurity.passwordChanged"),
      });
    } catch (error: any) {
      setError(error.message || t("dataAndSecurity.passwordChangeError"));
    } finally {
      setChangingPassword(false);
    }
  };

  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(undefined);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="container max-w-3xl mx-auto pb-14">
      <div className="space-y-8">
        <h1 className="text-3xl font-medium mb-4">
          {t("dataAndSecurity.title")}
        </h1>

        {/* Data Export Section */}
        <div className="space-y-6">
          <div className="">
            <h2 className="text-xl font-medium">
              {t("dataAndSecurity.dataExportTitle")}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t("dataAndSecurity.dataExportSubtitle")}
            </p>
          </div>

          <div className="bg-green-50 text-green-800/80 flex items-center gap-2 rounded-lg p-3 border border-green-200">
            <Shield className="size-5 flex-shrink-0" color="#166534" />
            <div>
              <p className="text-sm font-medium">
                {t("dataAndSecurity.gdprCompliance")}
              </p>
              <p className="text-xs mt-1 text-green-700/70">
                {t("dataAndSecurity.gdprDescription")}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start flex-wrap gap-2 justify-between py-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-muted-foreground">
                    {t("dataAndSecurity.personalDataExport")}
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("dataAndSecurity.exportTooltip")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="text-base">
                  {loading ? (
                    <Skeleton className="w-48 h-5" />
                  ) : (
                    t("dataAndSecurity.exportDescription")
                  )}
                </div>
              </div>
              <Button
                onClick={handleDataExport}
                disabled={exportingData || loading}
                variant="outline"
                size="sm"
              >
                {exportingData ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("dataAndSecurity.exporting")}
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    {t("dataAndSecurity.downloadButton")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Account Security Section */}
        {/* <div className="space-y-6">
          <div className="">
            <h2 className="text-xl font-medium">
              {t("dataAndSecurity.accountSecurityTitle")}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t("dataAndSecurity.accountSecuritySubtitle")}
            </p>
          </div>

          <div className="bg-blue-50 text-blue-800/80 flex items-center gap-2 rounded-lg p-3 border border-blue-800">
            <Lock className="size-5" color="#1e40af" />
            <p className="text-sm font-medium">
              {t("dataAndSecurity.securityInfo")}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between py-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-muted-foreground">
                    {t("dataAndSecurity.password")}
                  </span>
                </div>
                <div className="text-base">
                  {loading ? (
                    <Skeleton className="w-32 h-5" />
                  ) : (
                    t("dataAndSecurity.passwordLastChanged", {
                      date: user?.passwordUpdatedAt
                        ? new Date(user.passwordUpdatedAt).toLocaleDateString()
                        : t("dataAndSecurity.unknown"),
                    })
                  )}
                </div>
              </div>
              <button
                className="text-transparent bg-clip-text text-sm button-gradient"
                onClick={() => {
                  setShowPasswordDialog(true);
                  resetPasswordForm();
                }}
              >
                {t("dataAndSecurity.changePassword")}
              </button>
            </div>

            <div className="flex items-start justify-between py-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-muted-foreground">
                    {t("dataAndSecurity.loginSecurity")}
                  </span>
                </div>
                <div className="text-base">
                  {loading ? (
                    <Skeleton className="w-40 h-5" />
                  ) : (
                    t("dataAndSecurity.lastLogin", {
                      date: user?.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : t("dataAndSecurity.unknown"),
                    })
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                disabled
              >
                {t("dataAndSecurity.secure")}
              </Button>
            </div>
          </div>
        </div> */}

        {/* Privacy & Data Section */}
        <div className="space-y-6">
          <div className="">
            <h2 className="text-xl font-medium">
              {t("dataAndSecurity.privacyTitle")}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t("dataAndSecurity.privacySubtitle")}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between py-2">
              <div className="space-y-1">
                <span className="font-medium text-sm text-muted-foreground">
                  {t("dataAndSecurity.dataRetention")}
                </span>
                <div className="text-base">
                  {t("dataAndSecurity.dataRetentionDescription")}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                disabled
              >
                {t("dataAndSecurity.automatic")}
              </Button>
            </div>
          </div>
        </div>

        {/* Account Deletion Section */}
        <div className="space-y-4 pt-8 border-t">
          <h2 className="text-xl font-medium">
            {t("dataAndSecurity.deleteAccountTitle")}
          </h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {t("dataAndSecurity.deleteAccountDescription")}
            </p>
            <p className="text-sm">
              {t("dataAndSecurity.contactSupport")}{" "}
              <a
                href="https://support.gobusly.com"
                className="text-transparent bg-clip-text text-sm button-gradient hover:underline"
              >
                support.gobusly.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Password Change Dialog */}
      <Dialog
        open={showPasswordDialog}
        onOpenChange={(open) => {
          setShowPasswordDialog(open);
          if (!open) resetPasswordForm();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("dataAndSecurity.changePasswordTitle")}
            </DialogTitle>
            <DialogDescription>
              {t("dataAndSecurity.changePasswordDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">
                {t("dataAndSecurity.currentPassword")}
              </Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">
                {t("dataAndSecurity.newPassword")}
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">
                {t("dataAndSecurity.confirmPassword")}
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {error && <FormError message={error} />}
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPasswordDialog(false)}
              disabled={changingPassword}
            >
              {t("dataAndSecurity.cancel")}
            </Button>
            <Button
              variant="primary"
              onClick={handlePasswordChange}
              disabled={
                changingPassword ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword
              }
            >
              {changingPassword ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t("dataAndSecurity.changing")}
                </>
              ) : (
                t("dataAndSecurity.changePassword")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
