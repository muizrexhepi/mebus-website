"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useToast } from "@/components/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/components/providers/auth-provider";

export default function DataAndPrivacy() {
  const { user, loading } = useAuth();
  const [password, setPassword] = useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleDataDeletionRequest = async () => {
    try {
      toast({ description: "Data deletion request submitted successfully." });
      setPassword("");
      setIsAlertOpen(false);
    } catch (error) {
      console.error("Failed to submit data deletion request:", error);
      toast({
        description:
          "Failed to submit data deletion request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDataExport = async () => {
    try {
      toast({
        description:
          "Data export request submitted. You'll receive an email shortly.",
      });
    } catch (error) {
      console.error("Failed to request data export:", error);
      toast({
        description: "Failed to request data export. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">
            {t("dataPrivacy.dataPrivacy")}
          </h2>
        </div>
        <div className="space-y-6">
          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div>
              <div className="text-base">{t("dataPrivacy.dataExport")}</div>
              <div className="text-neutral-800/60 max-w-2xl text-sm">
                {t("dataPrivacy.download data")}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleDataExport}>
              {t("dataPrivacy.exportData")}
            </Button>
          </div>

          <div
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
          >
            <div>
              <div className="text-base">
                {t("dataPrivacy.requestDataDeletion")}
              </div>
              <div className="text-neutral-800/60 max-w-2xl text-sm">
                {t("dataPrivacy.parmanentlyDeleteData")}
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  {t("dataPrivacy.deleteData")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {t("dataPrivacy.requestDataDeletion")}
                  </DialogTitle>
                  <DialogDescription>
                    {t("dataPrivacy.deletionAlert")}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      {t("dataPrivacy.password")}
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      placeholder={t("dataPrivacy.passwordPlaceholder")}
                      className="col-span-3"
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" disabled={!password}>
                        {t("dataPrivacy.confirmDeletion")}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {t("dataPrivacy.areYouSure")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {t("dataPrivacy.cannotBeUndone")}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setIsAlertOpen(false)}
                        >
                          {t("dataPrivacy.cancel")}
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDataDeletionRequest}>
                          {t("dataPrivacy.yes")}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
