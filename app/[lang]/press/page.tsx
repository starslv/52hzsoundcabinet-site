import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPressItems } from "@/lib/sanity/api";
import { localizedText } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

function formatDate(date: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) {
    return {};
  }

  return {
    title: params.lang === "zh" ? "媒体报道" : "Press",
    description: params.lang === "zh" ? "采访与媒体报道。" : "Press mentions, interviews, and feature coverage.",
    alternates: languageAlternates(params.lang, "/press"),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/press`
    }
  };
}

export default async function PressPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const items = await getPressItems();

  return (
    <article>
      <h1>{lang === "zh" ? "媒体报道" : "Press"}</h1>
      <ul className="project-list">
        {items.map((item) => (
          <li key={item._id} className="project-card">
            <h2>{localizedText(item, "title", lang)}</h2>
            <p className="meta-inline">
              <span>{item.outlet}</span>
              {item.publishDate ? <span>{formatDate(item.publishDate, lang)}</span> : null}
            </p>
            <p>{localizedText(item, "summary", lang)}</p>
            {item.quote_en || item.quote_zh ? <blockquote>{localizedText(item, "quote", lang)}</blockquote> : null}
            <p>
              <Link href={item.url} target="_blank" rel="noreferrer">
                {lang === "zh" ? "阅读原文" : "Read article"}
              </Link>
            </p>
            {item.relatedProjects?.length ? (
              <p>
                {lang === "zh" ? "相关项目" : "Related Projects"}: {" "}
                {item.relatedProjects
                  .map((project) => localizedText(project, "title", lang))
                  .join(", ")}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </article>
  );
}
