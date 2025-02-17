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
import { Switch } from "@/components/ui/switch";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PersonalInfo() {
  const { user, isAuthenticated, loading } = useAuth();
  const [editingInfo, setEditingInfo] = useState<any>(null);
  const [editedValue, setEditedValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [useAsPassengerInfo, setUseAsPassengerInfo] = useState<boolean>(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const PERSONAL_INFO = [
    {
      label: t("personalInfo.name"),
      value: user?.name || "Not provided",
      action: user?.name ? t("personalInfo.edit") : "Add",
      editable: true,
      update: async (newValue: string) => {
        // Update name logic here
      },
    },
    {
      label: t("personalInfo.emailAddress"),
      value: user?.email || "Not provided",
      action: "View",
      editable: false,
      tooltip:
        "Email cannot be changed, but you can choose a different email for receiving the booking during checkout",
    },
    {
      label: t("personalInfo.phoneNumber"),
      value: user?.phone || "Add a number so the operators can get in touch.",
      action: user?.phone ? t("personalInfo.edit") : "Add",
      editable: true,
      update: async (newValue: string, password: string) => {
        // Update phone logic here
      },
    },
  ];

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSaveChanges = async () => {
    if (editingInfo?.update) {
      try {
        await editingInfo.update(editedValue, password);
        setPassword("");
        setEditingInfo(null);
        toast({ description: "Changes saved successfully." });
      } catch (error: any) {
        setError(error?.message || "An error occurred");
      }
    }
  };

  return (
    <div className="container max-w-3xl mx-auto">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold mb-4">
            {t("personalInfo.title")}
          </h1>
        </div>

        <div className="space-y-6">
          <div className="">
            <h2 className="text-xl font-medium">Main passenger</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Add your details for faster booking.
            </p>
          </div>
          <div className="bg-blue-50 text-blue-800/80 flex items-center gap-2 rounded-lg p-3 border border-blue-800">
            <Info className="size-5" color="#1e40af" />
            <p className="text-sm font-medium">
              These details must match your passport or ID card
            </p>
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

        {/* New Delete Account Section */}
        <div className="space-y-4 pt-8">
          <h2 className="text-xl font-medium">Delete account</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Please contact Customer Service to delete your account.
            </p>
            <p className="text-sm">
              Visit our contact page:{" "}
              <a
                href="/help"
                className="text-transparent bg-clip-text text-sm button-gradient hover:underline"
              >
                help.gobusly.com
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
            <DialogTitle>Edit {editingInfo?.label}</DialogTitle>
            <DialogDescription>
              Make changes to your {editingInfo?.label.toLowerCase()}
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
            {editingInfo?.requiresPassword && (
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm with password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            )}
          </div>
          {error && <FormError message={error} />}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingInfo(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
