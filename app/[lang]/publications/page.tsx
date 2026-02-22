import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { getPublications } from "@/lib/sanity/api";
import { localizedText } from "@/lib/content";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  return {
    title: params.lang === "zh" ? "出版" : "Publications",
    description:
      params.lang === "zh"
        ? "学术论文、艺术家写作与研究随笔。"
        : "Papers, essays, and research notes.",
    alternates: languageAlternates(params.lang as Locale, "/publications")
  };
}

export default async function PublicationsPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();

  const lang = params.lang as Locale;
  const publications = await getPublications();

  return (
    <article>
      <h1>{lang === "zh" ? "出版" : "Publications"}</h1>

      <ul className="project-list">
        {publications.map((pub) => {
          const title = localizedText(pub, "title", lang);

          return (
            <li key={pub._id} className="project-card">
              <h2>
                {pub.slug?.current ? (
                  <Link href={`/${lang}/publications/${pub.slug.current}`}>{title}</Link>
                ) : (
                  title
                )}
              </h2>
              {pub.summary_en || pub.summary_zh ? <p>{localizedText(pub, "summary", lang)}</p> : null}
              <p className="meta-inline">
                {pub.publishDate ? <span>{pub.publishDate}</span> : null}
                {pub.outlet ? <span>{pub.outlet}</span> : null}
              </p>
            </li>
          );
        })}
      </ul>
    </article>
  );
}