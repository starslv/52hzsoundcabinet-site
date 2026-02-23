export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getLectures } from "@/lib/sanity/api";
import { localizedText } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};

  return {
    title: params.lang === "zh" ? "讲座" : "Lectures",
    description: params.lang === "zh" ? "讲座与工作坊。" : "Talks, workshops, and invited lectures by 52Hz Sound Cabinet.",
    alternates: languageAlternates(params.lang, "/lectures"),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/lectures`
    }
  };
}

export default async function LecturesPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();

  const lang = params.lang as Locale;
  const lectures = await getLectures();

  return (
    <article>
      <h1>{lang === "zh" ? "讲座" : "Lectures"}</h1>
      <ul className="project-list">
        {lectures.map((item) => {
          const title = localizedText(item, "title", lang);
          return (
            <li key={item._id} className="project-card">
              <h2>
                {item.slug?.current ? (
                  <Link href={`/${lang}/lectures/${item.slug.current}`}>{title}</Link>
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
