export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localeLabel(locale: Locale): string {
  return locale === "zh" ? "中文" : "EN";
}

export function pickLocalizedField<T extends { [key: string]: unknown }>(
  item: T,
  key: "title" | "summary" | "body" | "quote",
  locale: Locale
) {
  return item[`${key}_${locale}`] ?? item[`${key}_en`];
}
