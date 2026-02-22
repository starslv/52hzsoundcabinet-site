"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

function replaceLocale(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  if (locales.includes(segments[0] as Locale)) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  return `/${nextLocale}/${segments.join("/")}`;
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="language-switcher" aria-label="Language switcher">
      {locales.map((entry) => {
        const href = replaceLocale(pathname, entry);

        return (
          <Link key={entry} href={href} aria-current={entry === locale ? "page" : undefined}>
            {entry === "en" ? "EN" : "中文"}
          </Link>
        );
      })}
    </div>
  );
}
