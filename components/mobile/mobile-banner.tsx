"use client";

import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const MobileAppBanner = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!checkMobile) return;

    // Check if banner was dismissed in last 24 hours
    const bannerDismissed = localStorage.getItem("appBannerDismissed");
    if (bannerDismissed) {
      const dismissedTime = parseInt(bannerDismissed);
      const now = Date.now();
      const hoursPassed = (now - dismissedTime) / (1000 * 60 * 60);

      if (hoursPassed < 24) {
        return;
      }
    }

    // Show banner with slight delay for smooth animation
    setShowBanner(true);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowBanner(false);
      localStorage.setItem("appBannerDismissed", Date.now().toString());
    }, 300);
  };

  const getAppStoreLink = () => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      return "https://apps.apple.com/za/app/gobusly/id6753230552";
    }
    return "https://play.google.com/store/apps/details?id=com.gobusly";
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src="/assets/icons/icon.png" className="size-8 rounded-lg" />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {t("mobileAppSection.banner.title")}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {t("mobileAppSection.banner.description")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={getAppStoreLink()}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              {t("mobileAppSection.banner.downloadButton")}
            </a>

            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppBanner;
