import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExpeditions } from "@/lib/sanity/api";
import { localizedText } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) {
    return {};
  }

  return {
    title: params.lang === "zh" ? "田野探险" : "Field Expeditions",
    description:
      params.lang === "zh"
        ? "田野录音与环境聆听考察记录。"
        : "Documentation of field recording journeys and listening expeditions.",
    alternates: languageAlternates(params.lang, "/field-expeditions"),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/field-expeditions`
    }
  };
}

export default async function FieldExpeditionsPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const expeditions = await getExpeditions();

  return (
    <article>
      <h1>{lang === "zh" ? "田野探险" : "Field Expeditions"}</h1>
      <ul className="project-list">
        {expeditions.map((expedition) => (
          <li key={expedition._id} className="project-card">
            <h2>
              {expedition.slug?.current ? (
                <Link href={`/${lang}/field-expeditions/${expedition.slug.current}`}>
                  {localizedText(expedition, "title", lang)}
                </Link>
              ) : (
                localizedText(expedition, "title", lang)
              )}
            </h2>
            <p>{localizedText(expedition, "summary", lang)}</p>
            <p className="meta-inline">
              {expedition.region ? <span>{expedition.region}</span> : null}
              {expedition.dateRange?.startDate ? <span>{expedition.dateRange.startDate}</span> : null}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
