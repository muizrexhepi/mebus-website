// MobileAppDialog.tsx - ENHANCED VISUALS
"use client";

import { Smartphone, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect, FC } from "react";

// Assuming these components are imported from your shadcn/ui setup
import { Dialog, DialogContent } from "@/components/ui/dialog"; // Adjusted imports

const MobileAppDialog: FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile: boolean = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent
    );
    setIsMobile(checkMobile);

    const dialogDismissed: string | null =
      localStorage.getItem("appDialogDismissed");
    if (dialogDismissed) {
      const dismissedTime: number = parseInt(dialogDismissed);
      const now: number = Date.now();
      const hoursPassed: number = (now - dismissedTime) / (1000 * 60 * 60);

      if (hoursPassed < 24) {
        setOpen(false);
        return;
      }
    }

    if (checkMobile) {
      setOpen(true);
    }
  }, []);

  const handleClose = (wasDismissed: boolean = false): void => {
    setOpen(false);
    if (wasDismissed) {
      // Store dismissal when user closes or clicks the download link
      localStorage.setItem("appDialogDismissed", Date.now().toString());
    }
  };

  const getAppStoreLink = (): string => {
    const isIOS: boolean = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      return "https://apps.apple.com/za/app/gobusly/id6753230552";
    }
    return "https://play.google.com/store/apps/details?id=com.gobusly";
  };

  if (!isMobile) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* DialogContent Styling Improvements:
        - Wider max-width (max-w-xs or sm) for better use of space
        - Added padding (p-8)
      */}
      <DialogContent className="w-[90%] max-w-xs rounded-xl p-8 shadow-2xl transition-all duration-300">
        {/* Close Button - Custom position and style */}
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => handleClose(true)}
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col items-center text-center -mt-2">
          {/* Icon Styling Improvements: 
            - Larger size, cleaner background gradient, and stronger shadow for focus.
          */}
          <div className="flex-shrink-0 w-16 h-16 mb-6 bg-primary-accent rounded-2xl flex items-center justify-center shadow-red-400/50 shadow-lg">
            <Smartphone className="w-9 h-9 text-white" />
          </div>

          {/* Title and Description Styling Improvements */}
          <h3 className="text-xl font-bold text-gray-900">
            {t("mobileAppSection.banner.title")}
            {/* Displaying "Merrni aplikacionin GoBusly" from the image */}
          </h3>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            {t("mobileAppSection.banner.description")}
            {/* Displaying "Rezervime më të shpejta, bileta të menjëhershme" from the image */}
          </p>

          {/* Button Styling Improvements:
            - Full-width, gradient background, subtle shadow, and hover effect for professionalism.
          */}
          <a
            href={getAppStoreLink()}
            onClick={() => handleClose(true)}
            className="w-full inline-block px-6 py-3.5 bg-primary-accent text-white font-semibold rounded-lg shadow-md shadow-red-500/50 hover:shadow-lg transform hover:scale-[1.01] transition-all duration-200 text-base"
          >
            {t("mobileAppSection.banner.downloadButton")}
            {/* Displaying "Shkarkoni tani" from the image */}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileAppDialog;
