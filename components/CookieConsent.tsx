"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { X, Cookie } from 'lucide-react';
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
      <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-primary-bg text-primary-foreground rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Cookie Preferences</h2>
            <Button
              onClick={() => setShowConsent(false)}
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:text-primary-foreground/80"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm mb-4">
            We use cookies to enhance your experience and provide personalized services.
          </p>
          <div className="flex flex-col space-y-2">
            <Button
              onClick={() => setShowModal(true)}
              variant="secondary"
              className="w-full justify-start"
            >
              <Cookie className="h-4 w-4 mr-2" />
              Customize
            </Button>
            <Button
              onClick={handleAcceptAll}
              variant="secondary"
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
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
              <p className="text-sm text-muted-foreground mt-1 ml-6">
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
              <p className="text-sm text-muted-foreground mt-1 ml-6">
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
              <p className="text-sm text-muted-foreground mt-1 ml-6">
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
              <p className="text-sm text-muted-foreground mt-1 ml-6">
                These cookies are used to make advertising messages more
                relevant to you and your interests.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSavePreferences}
              className=" bg-gradient-to-tr from-[#ff6700] to-[#ff007f] text-primary-foreground"
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

