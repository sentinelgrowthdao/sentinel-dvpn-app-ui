// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/en";
import fr from "./languages/fr";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fr: { translation: fr },
  },
  fallbackLng: "en",
});

i18n.changeLanguage(window.navigator.language || "en");

export default i18n;
