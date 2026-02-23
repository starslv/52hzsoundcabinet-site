export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getImmersivePerformances } from "@/lib/sanity/api";
import { localizedText } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};

  return {
    title: params.lang === "zh" ? "沉浸式演出" : "Immersive Performances",
    description:
      params.lang === "zh"
        ? "基于空间音频与现场聆听的演出实践。"
        : "Performance works developed through spatial audio and collective listening.",
    alternates: languageAlternates(params.lang, "/immersive-performances"),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/immersive-performances`
    }
  };
}

export default async function ImmersivePerformancesPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();

  const lang = params.lang as Locale;
  const performances = await getImmersivePerformances();

  return (
    <article>
      <h1>{lang === "zh" ? "沉浸式演出" : "Immersive Performances"}</h1>
      <ul className="project-list">
        {performances.map((item) => {
          const title = localizedText(item, "title", lang);
          return (
            <li key={item._id} className="project-card">
              <h2>
                {item.slug?.current ? (
                  <Link href={`/${lang}/immersive-performances/${item.slug.current}`}>{title}</Link>
                ) : (
                  title
                )}
              </h2>
              {localizedText(item, "summary", lang) ? <p>{localizedText(item, "summary", lang)}</p> : null}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
