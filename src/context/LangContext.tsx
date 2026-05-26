import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "ru" | "uz" | "en";
export type LocalizedText = Record<Lang, string>;

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const LangContext = createContext<LangContextType | undefined>(undefined);

interface LangProviderProps {
  children: ReactNode;
}

export function LangProvider({ children }: LangProviderProps) {
  const [lang, setLang] = useState<Lang>("ru");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextType {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

// Helper: { ru: "...", uz: "...", en: "..." } -> string
export function t(obj: LocalizedText, lang: Lang): string {
  return obj[lang] ?? obj.ru ?? "";
}