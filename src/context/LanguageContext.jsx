// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations } from "../data/translations.js";

const LanguageContext = createContext();
const RTL_LANGS = ["ar", "he"];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem("lang");
    if (saved) return saved;
    const browserLang = navigator.language;
    if (browserLang.startsWith("ar")) return "ar";
    if (browserLang.startsWith("he")) return "he";
    return "en";
  });

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
    const isRTL = RTL_LANGS.includes(newLang);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  }, []);

  useEffect(() => {
    const isRTL = RTL_LANGS.includes(lang);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key) => translations[lang]?.[key] || translations.en[key] || key,
    [lang]
  );

  const isRTL = RTL_LANGS.includes(lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
