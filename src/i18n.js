import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "./languages/ar.json";
import de from "./languages/de.json";
import en from "./languages/en.json";
import es from "./languages/es.json";
import fr from "./languages/fr.json";
import hi from "./languages/hi.json";
import ja from "./languages/ja.json";
import ko from "./languages/ko.json";
import pt from "./languages/pt.json";
import ru from "./languages/ru.json";
import tr from "./languages/tr.json";
import zh from "./languages/zh.json";

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    de: { translation: de },
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    hi: { translation: hi },
    ja: { translation: ja },
    ko: { translation: ko },
    pt: { translation: pt },
    ru: { translation: ru },
    tr: { translation: tr },
    zh: { translation: zh },
  },
  fallbackLng: "en",
});

i18n.changeLanguage(window.localStorage.getItem("language") || "en");

export default i18n;
