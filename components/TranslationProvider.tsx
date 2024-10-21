"use client";

import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "@/lib/i18next";

const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initI18n = async () => {
      await i18next.init();
      setIsInitialized(true);
    };

    initI18n();
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

export default TranslationProvider;
