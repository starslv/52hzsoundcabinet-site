import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExhibitions } from "@/lib/sanity/api";
import { localizedText } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};

  const lang = params.lang;

  return {
    title: lang === "zh" ? "展览" : "Exhibitions",
    description:
      lang === "zh"
        ? "展览、空间呈现与沉浸式作品的项目档案。"
        : "Projects archive for exhibitions, spatial presentations, and immersive works.",
    alternates: languageAlternates(lang, "/exhibitions"),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${lang}/exhibitions`,
    },
  };
}

export default async function ExhibitionsPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();

  const lang = params.lang as Locale;
  const exhibitions = await getExhibitions();

  return (
    <article>
      <h1>{lang === "zh" ? "展览" : "Exhibitions"}</h1>

      <ul className="project-list">
        {exhibitions.map((exhibition) => (
          <li key={exhibition._id} className="project-card">
            <h2>
              {exhibition.slug?.current ? (
                <Link href={`/${lang}/exhibitions/${exhibition.slug.current}`}>
                  {localizedText(exhibition, "title", lang)}
                </Link>
              ) : (
                localizedText(exhibition, "title", lang)
              )}
            </h2>

            {localizedText(exhibition, "summary", lang) ? (
              <p>{localizedText(exhibition, "summary", lang)}</p>
            ) : null}

            <p className="meta-inline">
              {exhibition.venue ? <span>{exhibition.venue}</span> : null}
              {exhibition.location ? <span>{exhibition.location}</span> : null}
              {exhibition.year ? <span>{String(exhibition.year)}</span> : null}
              {exhibition.dateRange?.startDate ? <span>{exhibition.dateRange.startDate}</span> : null}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}