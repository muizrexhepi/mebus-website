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
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PersonalInfo() {
  const { user, loading, updateUserInfo } = useAuth();
  const [editingInfo, setEditingInfo] = useState<any>(null);
  const [editedValue, setEditedValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const { toast } = useToast();
  const { t } = useTranslation();

  const PERSONAL_INFO = [
    {
      label: t("personalInfo.name"),
      value: user?.name || t("personalInfo.notProvided"),
      action: t("personalInfo.edit"),
      editable: true,
      update: async (newValue: string) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/name/edit/${user._id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
              },
              body: JSON.stringify({ name: newValue }),
            }
          );

          if (!res.ok) throw new Error("Failed to update name");

          updateUserInfo({ name: newValue });

          toast({ description: t("personalInfo.nameUpdated") });
        } catch (error: any) {
          throw new Error(error.message || t("personalInfo.updateError"));
        }
      },
    },
    {
      label: t("personalInfo.emailAddress"),
      value: user?.email || t("personalInfo.notProvided"),
      editable: false,
      tooltip: t("personalInfo.emailTooltip"),
    },
    {
      label: t("personalInfo.phoneNumber"),
      value: user?.phone || t("personalInfo.addPhonePrompt"),
      action: t("personalInfo.edit"),
      editable: true,
      update: async (newValue: string) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/phone/edit/${user._id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
              },
              body: JSON.stringify({ phone: newValue }),
            }
          );

          if (!res.ok) throw new Error("Failed to update phone number");

          updateUserInfo({ phone: newValue });

          toast({ description: t("personalInfo.phoneUpdated") });
        } catch (error: any) {
          throw new Error(error.message || t("personalInfo.updateError"));
        }
      },
    },
  ];

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  const handleSaveChanges = async () => {
    if (editingInfo?.update) {
      try {
        await editingInfo.update(editedValue);
        setEditingInfo(null);
        toast({ description: t("personalInfo.changesSaved") });
      } catch (error: any) {
        setError(error?.message || t("personalInfo.updateError"));
      }
    }
  };

  return (
    <div className="container max-w-3xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-3xl font-medium mb-4">{t("personalInfo.title")}</h1>

        <div className="space-y-6">
          <div className="">
            <h2 className="text-xl font-medium">
              {t("personalInfo.mainPassenger")}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t("personalInfo.addDetails")}
            </p>
          </div>
          <div className="bg-blue-50 text-blue-800/80 flex items-center gap-2 rounded-lg p-3 border border-blue-800">
            <Info className="size-5" color="#1e40af" />
            <p className="text-sm font-medium">{t("personalInfo.matchID")}</p>
          </div>

          <div className="space-y-6">
            {PERSONAL_INFO?.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between py-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-muted-foreground">
                      {item.label}
                    </span>
                    {item.tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <div className="text-base">
                    {loading ? <Skeleton className="w-24 h-5" /> : item.value}
                  </div>
                </div>
                {item.editable ? (
                  <button
                    className="text-transparent bg-clip-text text-sm button-gradient"
                    onClick={() => {
                      setEditingInfo(item);
                      setEditedValue(item.value);
                    }}
                  >
                    {item.action}
                  </button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    disabled
                  >
                    {item.action}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-8">
          <h2 className="text-xl font-medium">
            {t("personalInfo.deleteAccount")}
          </h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {t("personalInfo.contactSupport")}
            </p>
            <p className="text-sm">
              {t("personalInfo.visitContactPage")}{" "}
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

      <Dialog
        open={editingInfo !== null}
        onOpenChange={() => {
          setEditingInfo(null);
          setError(undefined);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("personalInfo.edit")} {editingInfo?.label}
            </DialogTitle>
            <DialogDescription>
              {t("personalInfo.makeChanges", {
                field: editingInfo?.label.toLowerCase(),
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="value">{editingInfo?.label}</Label>
              <Input
                id="value"
                value={editedValue}
                onChange={handleValueChange}
                autoComplete="off"
              />
            </div>
          </div>
          {error && <FormError message={error} />}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setEditingInfo(null)}>
              {t("personalInfo.cancel")}
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              {t("personalInfo.saveChanges")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
