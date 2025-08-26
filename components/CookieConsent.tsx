// components/CookieConsent.tsx

"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { X, Cookie, ArrowRight, XCircle, Check } from "lucide-react";
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
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

// Define the structure for your cookie preferences
type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

// Key used to store the preferences in a cookie
const COOKIE_NAME = "gobusly_cookie_consent";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consentGiven = Cookies.get(COOKIE_NAME);
    if (!consentGiven) {
      setShowBanner(true);
    } else {
      try {
        const savedPreferences = JSON.parse(consentGiven);
        setPreferences(savedPreferences);
      } catch (error) {
        setShowBanner(true);
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
    Cookies.set(COOKIE_NAME, JSON.stringify(allAccepted), { expires: 365 });
    setPreferences(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const allRejected = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    Cookies.set(COOKIE_NAME, JSON.stringify(allRejected), { expires: 365 });
    setPreferences(allRejected);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    Cookies.set(COOKIE_NAME, JSON.stringify(preferences), { expires: 365 });
    setShowModal(false);
    setShowBanner(false);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-xl border-t border-gray-100 animate-slideUp">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-shrink-0 p-2 bg-white rounded-full">
              {/* Added gradient to the cookie icon and its parent div */}
              <Cookie className="h-5 w-5 bg-clip-text text-transparent bg-gradient-to-tr from-[#ff6700] to-[#ff007f]" />
            </div>
            <p className="text-sm text-gray-700">
              We use cookies to improve your experience. By continuing to use
              our site, you agree to our
              {/* Added gradient to the link */}
              <Link
                href="/legal/cookie-policy"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-tr from-[#ff6700] to-[#ff007f] hover:from-[#ff007f] hover:to-[#ff6700] ml-1"
              >
                Cookie Policy.
              </Link>
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="rounded-full text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              Reject All
            </Button>
            <Button
              onClick={() => setShowModal(true)}
              variant="outline"
              className="rounded-full text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              Customize
            </Button>
            <Button
              onClick={handleAcceptAll}
              // Added gradient to the Accept All button
              className="rounded-full bg-gradient-to-tr from-[#ff6700] to-[#ff007f] text-white hover:from-[#ff007f] hover:to-[#ff6700] transition-colors shadow-md"
            >
              Accept All
            </Button>
            <Button
              onClick={() => setShowBanner(false)}
              variant="ghost"
              className="ml-2 px-2 text-gray-500 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px] rounded-xl shadow-2xl">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Your Cookie Preferences
            </DialogTitle>
          </DialogHeader>

          <Separator />

          <div className="grid gap-6 py-4">
            {/* Essential Cookies */}
            <div className="flex items-start space-x-4">
              <Checkbox id="necessary" checked disabled className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center">
                  <Label
                    htmlFor="necessary"
                    className="font-semibold text-gray-800 cursor-default"
                  >
                    Essential Cookies
                  </Label>
                  {/* Added gradient to the Always Active span */}
                  <span className="ml-2 text-xs font-medium bg-clip-text text-transparent bg-gradient-to-tr from-[#ff6700] to-[#ff007f] px-2 py-0.5 rounded-full bg-blue-50">
                    Always Active
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  These cookies are essential for the website to function
                  properly and cannot be switched off. They enable core
                  functionalities like security, network management, and
                  accessibility.
                </p>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="flex items-start space-x-4">
              <Checkbox
                id="functional"
                checked={preferences.functional}
                onCheckedChange={() => handlePreferenceChange("functional")}
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor="functional"
                  className="font-semibold text-gray-800"
                >
                  Functional Cookies
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  These cookies allow us to remember choices you make to provide
                  a more personalized and enhanced experience, such as
                  remembering your language or currency settings.
                </p>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start space-x-4">
              <Checkbox
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={() => handlePreferenceChange("analytics")}
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor="analytics"
                  className="font-semibold text-gray-800"
                >
                  Analytics Cookies
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  These cookies help us understand how visitors interact with
                  our website. This information is used to measure and improve
                  our services, helping us provide a better user experience.
                </p>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start space-x-4">
              <Checkbox
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={() => handlePreferenceChange("marketing")}
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor="marketing"
                  className="font-semibold text-gray-800"
                >
                  Marketing Cookies
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  These cookies are used by our advertising partners to track
                  your browsing habits across different websites and build a
                  profile of your interests to show you relevant advertisements.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row-reverse sm:justify-start gap-2">
            <Button
              onClick={handleSavePreferences}
              className="w-full sm:w-auto rounded-full bg-gradient-to-tr from-[#ff6700] to-[#ff007f] text-white hover:from-[#ff007f] hover:to-[#ff6700] transition-colors"
            >
              Save Preferences
            </Button>
            <Button
              onClick={() => setShowModal(false)}
              variant="outline"
              className="w-full sm:w-auto rounded-full text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
