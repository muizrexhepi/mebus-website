// src/app/legal/cookie-settings/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cookie } from "lucide-react";
import { toast } from "@/components/hooks/use-toast";

type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

// Same key for consistency
const COOKIE_NAME = "gobusly_cookie_consent";

export default function CookieSettingsPage() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Load preferences from the cookie on page load
    const consentGiven = Cookies.get(COOKIE_NAME);
    if (consentGiven) {
      try {
        const savedPreferences = JSON.parse(consentGiven);
        setPreferences(savedPreferences);
      } catch (error) {}
    }
  }, []);

  const handleSavePreferences = () => {
    Cookies.set(COOKIE_NAME, JSON.stringify(preferences), { expires: 365 });

    toast({
      title: "Preferences Saved!",
      description: "Your cookie settings have been updated successfully.",
      duration: 3000,
    });
  };

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Cookie Settings
      </h1>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <Cookie className="h-8 w-8 text-blue-600" />
          <p className="text-gray-700">
            You can change your cookie preferences at any time. Your choices
            will be saved for all subsequent visits.
          </p>
        </div>
        <div className="grid gap-6 py-4">
          {/* Essential Cookies */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="necessary" checked disabled />
              <Label
                htmlFor="necessary"
                className="font-semibold text-gray-800"
              >
                Essential Cookies
              </Label>
            </div>
            <p className="text-sm text-gray-500 mt-1 ml-6">
              These cookies are required for basic site functionality and cannot
              be disabled.
            </p>
          </div>
          {/* Functional Cookies */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="functional"
                checked={preferences.functional}
                onCheckedChange={() => handlePreferenceChange("functional")}
              />
              <Label
                htmlFor="functional"
                className="font-semibold text-gray-800"
              >
                Functional Cookies
              </Label>
            </div>
            <p className="text-sm text-gray-500 mt-1 ml-6">
              These cookies allow us to remember choices you make to give you a
              more personalized experience.
            </p>
          </div>
          {/* Analytics Cookies */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={() => handlePreferenceChange("analytics")}
              />
              <Label
                htmlFor="analytics"
                className="font-semibold text-gray-800"
              >
                Analytics Cookies
              </Label>
            </div>
            <p className="text-sm text-gray-500 mt-1 ml-6">
              These cookies help us understand how visitors interact with our
              website, helping us improve our services.
            </p>
          </div>
          {/* Marketing Cookies */}
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={() => handlePreferenceChange("marketing")}
              />
              <Label
                htmlFor="marketing"
                className="font-semibold text-gray-800"
              >
                Marketing Cookies
              </Label>
            </div>
            <p className="text-sm text-gray-500 mt-1 ml-6">
              These cookies are used to make advertising messages more relevant
              to you and your interests.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSavePreferences}
            className="button-gradient h-12 text-white font-semibold"
          >
            Save Changes
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
