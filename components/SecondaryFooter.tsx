"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const SecondaryFooter = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  return (
    <footer
      className={cn("bg-transparent w-full pb-4 sm:px-8 xl:px-0", className)}
    >
      <div className="max-w-6xl mx-auto paddingX">
        <div className="flex flex-wrap justify-center sm:justify-between items-center border-t  pt-4 gap-2">
          <p className="text-sm text-black/70">{t("footer.copyright")}</p>
          <nav className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mt-2 sm:mt-0">
            <Link
              href="/legal/privacy-policy"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              {t("footer.links.privacypolicy")}
            </Link>
            <Link
              href="/legal/terms-of-service"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              {t("footer.links.termsofservice")}
            </Link>
            <Link
              href="/legal/cookie-policy"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              {t("footer.links.cookiepolicy")}
            </Link>
            <Link
              href="https://support.gobusly.com"
              target="_blank"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              {t("footer.links.help")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default SecondaryFooter;
