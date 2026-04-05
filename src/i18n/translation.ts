import config from "@shConfig";
import type I18nKey from "./i18nKey";

// 匯入各語言的翻譯檔
import { en } from "./languages/en.ts";
import { zh_TW } from "./languages/zh_TW.ts";

export type Translation = {
  [K in I18nKey]: string;
};

const defaultTranslation = en;

const map: { [key: string]: Translation } = {
  // 建立語言代碼與翻譯檔的對應關係
  en: en,
  zh_tw: zh_TW,
};

export const supportedLanguages = Object.keys(map);

export function getTranslation(lang: string, key: I18nKey): string {
  const normalizedLang = lang.toLowerCase();
  const current = map[normalizedLang] ?? defaultTranslation;

  return current[key] ?? key;
}

export default function i18n(
  key: I18nKey,
  params?: Record<string, string | number>,
): string {
  const lang = config.siteLang || "zh_TW";
  let translation = getTranslation(lang, key);

  // 如果有傳入參數，則進行取代
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      // 取代 {key} 為實際數值
      translation = translation.replace(
        new RegExp(`{${paramKey}}`, "g"),
        String(value),
      );
    });
  }

  return translation;
}
