import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en, fr, al, de, mk, it, es } from '@/public/locales';

export const languageResources = {
    en: { translation: en },
    fr: { translation: fr },
    al: { translation: al },
    de: { translation: de },
    mk: { translation: mk },
    it: { translation: it },
    es: { translation: es }
};

const getLanguageFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'en'; 
    }
    return 'en'; 
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: getLanguageFromLocalStorage(),
        fallbackLng: 'en',
        resources: languageResources,
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;