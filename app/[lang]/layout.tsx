import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { isLocale, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

const SITE_NAME = "52Hz Sound Cabinet";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/immersive-performances", label: "Immersive Performances" },
  { href: "/exhibitions", label: "Exhibitions" },
  { href: "/press", label: "Press" },
  { href: "/publications", label: "Publications" },
  { href: "/lectures", label: "Lectures" },
  { href: "/media-kit", label: "Media Kit" },
  { href: "/contact", label: "Contact" }
];

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) {
    return {};
  }

  return {
    alternates: languageAlternates(params.lang, "")
  };
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  const locale = params.lang as Locale;

  return (
    <div className="site-shell">
      <header className="site-header">
        <p className="site-title">
          <Link href={`/${locale}`}>{SITE_NAME}</Link>
        </p>
        <p className="site-tagline">
          {locale === "zh" ? "由李星宇发起的声音艺术研究计划" : "Sound art research initiative by Xingyu Li"}
        </p>
        <div className="header-row">
          <nav className="site-nav" aria-label="Primary">
            {navItems.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher locale={locale} />
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </footer>
    </div>
  );
}
