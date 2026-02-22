import type { Locale } from "@/lib/i18n";

export function languageAlternates(lang: Locale, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  return {
    canonical: `/${lang}${normalized}`,
    languages: {
      en: `/en${normalized}`,
      zh: `/zh${normalized}`
    }
  };
}
