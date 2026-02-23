export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPressItems } from "@/lib/sanity/api";
import { localizedText } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};

  return {
    title: params.lang === "zh" ? "媒体报道" : "Press",
    description: params.lang === "zh" ? "采访与媒体报道。" : "Press mentions, interviews, and feature coverage.",
    alternates: languageAlternates(params.lang, "/press"),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/press`
    }
  };
}

function formatDate(date: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}

export default async function PressPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();

  const lang = params.lang as Locale;
  const items = await getPressItems();

  return (
    <article>
      <h1>{lang === "zh" ? "媒体报道" : "Press"}</h1>
      <ul className="project-list">
        {items.map((item) => {
          const title = localizedText(item, "title", lang);
          return (
            <li key={item._id} className="project-card">
              <h2>
                {item.slug?.current ? (
                  <Link href={`/${lang}/press/${item.slug.current}`}>{title}</Link>
                ) : (
                  title
                )}
              </h2>
              <p className="meta-inline">
                <span>{item.outlet}</span>
                {item.publishDate ? <span>{formatDate(item.publishDate, lang)}</span> : null}
              </p>
              {localizedText(item, "summary", lang) ? <p>{localizedText(item, "summary", lang)}</p> : null}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
