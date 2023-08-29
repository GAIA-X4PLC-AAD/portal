import i18n from 'i18next';
import ICU from "i18next-icu";


import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng'
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(ICU)
  .init({
    detection: options,
    useSuspense: false,
    wait: false,
    debug: false, // true
    fallbackLng: 'en',
    preload: ['en', 'es', 'de'],
    defaultNS: ['translation'],
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
