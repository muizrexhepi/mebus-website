import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en, fr, al, de, mk, it, es } from "@/public/locales";

export const languageResources = {
  en: { translation: en },
  fr: { translation: fr },
  al: { translation: al },
  de: { translation: de },
  mk: { translation: mk },
  it: { translation: it },
  es: { translation: es },
};

export type SupportedLanguage = keyof typeof languageResources;

export const LANGUAGE_COOKIE_NAME = "gobusly_language";

// Client-side cookie helpers
export const getLanguageFromCookies = (): SupportedLanguage => {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split(";");
    const languageCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${LANGUAGE_COOKIE_NAME}=`)
    );
    if (languageCookie) {
      const language = languageCookie.split("=")[1] as SupportedLanguage;
      return language in languageResources ? language : "en";
    }
  }
  return "en";
};

export const setLanguageCookie = (language: SupportedLanguage): void => {
  if (typeof window !== "undefined") {
    const expires = new Date();
    expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `${LANGUAGE_COOKIE_NAME}=${language}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`;
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    lng: getLanguageFromCookies(),
    fallbackLng: "en",
    resources: languageResources,
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["cookie", "navigator"],
      caches: ["cookie"],
      lookupCookie: LANGUAGE_COOKIE_NAME,
      cookieMinutes: 525600, // 1 year in minutes
      cookieOptions: {
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    },
  });

export default i18n;
