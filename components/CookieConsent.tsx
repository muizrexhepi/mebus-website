"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { X, Bus, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consentGiven = Cookies.get("cookie_consent");
    if (!consentGiven) {
      setShowConsent(true);
    } else {
      try {
        const savedPreferences = JSON.parse(consentGiven);
        setPreferences(savedPreferences);
      } catch (error) {
        console.error("Error parsing cookie preferences:", error);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    Cookies.set("cookie_consent", JSON.stringify(allAccepted), {
      expires: 365,
    });
    setPreferences(allAccepted);
    setShowConsent(false);
  };

  const handleSavePreferences = () => {
    Cookies.set("cookie_consent", JSON.stringify(preferences), {
      expires: 365,
    });
    setShowModal(false);
    setShowConsent(false);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showConsent) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t-4 border-emerald-700">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Bus className="h-8 w-8 text-emerald-700 mr-4" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  We value your privacy
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  We use cookies to enhance your booking experience and provide
                  personalized services.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowModal(true)}
                variant="outline"
                className="text-emerald-700 border-emerald-700"
              >
                <Cookie className="h-4 w-4 mr-2" />
                Customize
              </Button>
              <Button
                onClick={handleAcceptAll}
                variant="default"
                className="bg-emerald-700 hover:bg-emerald-600"
              >
                Accept All
              </Button>
              <Button
                onClick={() => setShowConsent(false)}
                variant="ghost"
                className="text-gray-500"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Cookie Preferences
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox id="necessary" checked disabled />
                <Label htmlFor="necessary" className="font-semibold">
                  Essential Cookies
                </Label>
              </div>
              <p className="text-sm text-gray-600 mt-1 ml-6">
                These cookies are required for basic site functionality and
                cannot be disabled.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="functional"
                  checked={preferences.functional}
                  onCheckedChange={() => handlePreferenceChange("functional")}
                />
                <Label htmlFor="functional" className="font-semibold">
                  Functional Cookies
                </Label>
              </div>
              <p className="text-sm text-gray-600 mt-1 ml-6">
                These cookies allow us to remember choices you make to give you
                better functionality and personal features.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="analytics"
                  checked={preferences.analytics}
                  onCheckedChange={() => handlePreferenceChange("analytics")}
                />
                <Label htmlFor="analytics" className="font-semibold">
                  Analytics Cookies
                </Label>
              </div>
              <p className="text-sm text-gray-600 mt-1 ml-6">
                These cookies help us understand how visitors interact with our
                website, helping us improve our services and user experience.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing"
                  checked={preferences.marketing}
                  onCheckedChange={() => handlePreferenceChange("marketing")}
                />
                <Label htmlFor="marketing" className="font-semibold">
                  Marketing Cookies
                </Label>
              </div>
              <p className="text-sm text-gray-600 mt-1 ml-6">
                These cookies are used to make advertising messages more
                relevant to you and your interests.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSavePreferences}
              className="bg-emerald-700 hover:bg-emerald-600"
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
