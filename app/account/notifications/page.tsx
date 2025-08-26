"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/hooks/use-toast";
import { BellIcon, BellOffIcon, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/components/providers/auth-provider";

interface NotificationSettings {
  booking_confirmations: boolean;
  departure_reminders: boolean;
  promotions: boolean;
  account_updates: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const { user } = useAuth();

  const fetchNotifications = async () => {
    if (!user?._id) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${user._id}`
      );
      const data = await response.json();

      console.log({ data });
      if (data.message == "Success" && data.data?.notifications) {
        setNotifications(data.data.notifications);
      } else {
        setNotifications({
          booking_confirmations: true,
          departure_reminders: true,
          promotions: false,
          account_updates: true,
        });
      }
    } catch (error) {
      setNotifications({
        booking_confirmations: true,
        departure_reminders: true,
        promotions: false,
        account_updates: true,
      });
      toast({
        description: "Failed to load notification preferences.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user?._id]);

  const handleToggle = (key: keyof NotificationSettings) => {
    if (!notifications) return;
    setNotifications((prev) => (prev ? { ...prev, [key]: !prev[key] } : null));
  };

  const handleSavePreferences = async () => {
    if (!user?._id || !notifications) {
      toast({
        description:
          "User not authenticated or no notification settings loaded.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/notifications/update/${user._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notifications }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update preferences");
      }

      toast({
        description: data.message || "Preferences updated successfully.",
      });
    } catch (error) {
      console.error("Save failed:", error);
      toast({
        description:
          error instanceof Error
            ? error.message
            : "Failed to save preferences.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !notifications) {
    return (
      <div className="h-screen w-full justify-center items-center flex">
        <Loader2 className="h-10 w-10 animate-spin text-black" />
      </div>
    );
  }

  const hasNotificationsEnabled = Object.values(notifications).some(Boolean);

  return (
    <div className="w-full">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-medium">{t("notifications.title")}</h2>
        </div>

        <div className="space-y-6">
          {[
            {
              key: "booking_confirmations",
              label: "bookingConfirmations",
              desc: "bookingConfirmationsDesc",
            },
            {
              key: "departure_reminders",
              label: "DepartureReminders",
              desc: "DepartureRemindersDesc",
            },
            { key: "promotions", label: "promotions", desc: "promotionsDesc" },
            {
              key: "account_updates",
              label: "accountUpdates",
              desc: "accountUpdatesDesc",
            },
          ].map(({ key, label, desc }) => (
            <div
              key={key}
              className="grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6"
            >
              <div>
                <div className="text-base font-medium">
                  {t(`notifications.${label}`)}
                </div>
                <div className="text-neutral-800/60 text-sm">
                  {t(`notifications.${desc}`)}
                </div>
              </div>
              <Switch
                checked={notifications[key as keyof NotificationSettings]}
                className="data-[state=checked]:bg-primary-bg"
                onCheckedChange={() =>
                  handleToggle(key as keyof NotificationSettings)
                }
                disabled={isSaving}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {hasNotificationsEnabled ? (
              <BellIcon className="h-5 w-5 text-green-500" />
            ) : (
              <BellOffIcon className="h-5 w-5 text-red-500" />
            )}
            <Label>
              {hasNotificationsEnabled
                ? t("notifications.enabled")
                : t("notifications.disabled")}
            </Label>
          </div>
          <Button
            onClick={handleSavePreferences}
            className="bg-primary-bg"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : t("notifications.savePreferences")}
          </Button>
        </div>
      </div>
    </div>
  );
}
