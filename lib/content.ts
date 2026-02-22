import type { Locale } from "@/lib/i18n";
import type { PortableTextBlock } from "sanity";

export function localizedText(
  value: { title_en?: string; title_zh?: string; summary_en?: string; summary_zh?: string; quote_en?: string; quote_zh?: string },
  field: "title" | "summary" | "quote",
  locale: Locale
): string {
  const localized = value[`${field}_${locale}` as keyof typeof value];
  const fallback = value[`${field}_en` as keyof typeof value];

  return String(localized || fallback || "");
}

export function localizedBody(
  item: { body_en?: PortableTextBlock[]; body_zh?: PortableTextBlock[] },
  locale: Locale
): PortableTextBlock[] | undefined {
  return (locale === "zh" ? item.body_zh : item.body_en) || item.body_en;
}
