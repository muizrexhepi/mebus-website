"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/hooks/use-toast";
import { BellIcon, BellOffIcon } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState({
    bookingConfirmation: true,
    departureReminder: true,
    promotions: false,
    accountUpdates: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePreferences = async () => {
    // Simulating API call to save user's notification preferences
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({ description: "Notification preferences updated successfully." });
    } catch (error) {
      console.error("Failed to update notification preferences:", error);
      toast({
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Notifications</h2>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6">
            <div>
              <div className="text-base font-medium">Booking Confirmations</div>
              <div className="text-neutral-800/60 text-sm">
                Receive notifications for successful bookings
              </div>
            </div>
            <Switch
              checked={notifications.bookingConfirmation}
              onCheckedChange={() => handleToggle("bookingConfirmation")}
            />
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6">
            <div>
              <div className="text-base font-medium">Departure Reminders</div>
              <div className="text-neutral-800/60 text-sm">
                Get reminders before your scheduled departure
              </div>
            </div>
            <Switch
              checked={notifications.departureReminder}
              onCheckedChange={() => handleToggle("departureReminder")}
            />
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6">
            <div>
              <div className="text-base font-medium">Promotions and Offers</div>
              <div className="text-neutral-800/60 text-sm">
                Receive updates about special deals and discounts
              </div>
            </div>
            <Switch
              checked={notifications.promotions}
              onCheckedChange={() => handleToggle("promotions")}
            />
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6">
            <div>
              <div className="text-base font-medium">Account Updates</div>
              <div className="text-neutral-800/60 text-sm">
                Get notified about important account-related changes
              </div>
            </div>
            <Switch
              checked={notifications.accountUpdates}
              onCheckedChange={() => handleToggle("accountUpdates")}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {Object.values(notifications).some(Boolean) ? (
              <BellIcon className="h-5 w-5 text-green-500" />
            ) : (
              <BellOffIcon className="h-5 w-5 text-red-500" />
            )}
            <Label>
              {Object.values(notifications).some(Boolean)
                ? "Notifications are enabled"
                : "All notifications are disabled"}
            </Label>
          </div>
          <Button onClick={handleSavePreferences}>Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}
