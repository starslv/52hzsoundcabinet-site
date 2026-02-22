import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverImage, Gallery, VideoEmbeds } from "@/components/media";
import { ExternalLinks } from "@/components/links";
import { RichText } from "@/components/rich-text";
import { localizedBody, localizedText } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { getExhibitionBySlug, getExhibitionSlugs } from "@/lib/sanity/api";

function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) return "";
  if (startDate && endDate) return `${startDate} - ${endDate}`;
  return startDate || endDate || "";
}

type RelatedWorkRef = {
  _id: string;
  _type: "project" | "researchPost";
  slug?: { current?: string };
  title_en?: string;
  title_zh?: string;
  summary_en?: string;
  summary_zh?: string;
};

export async function generateStaticParams() {
  const slugs = await getExhibitionSlugs();
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};

  const lang = params.lang as Locale;
  const exhibition = await getExhibitionBySlug(params.slug);

  if (!exhibition) {
    return { title: "Not Found" };
  }

  return {
    title: localizedText(exhibition, "title", lang),
    description: localizedText(exhibition, "summary", lang),
    alternates: languageAlternates(lang, `/exhibitions/${params.slug}`),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/exhibitions/${params.slug}`,
    },
  };
}

export default async function ExhibitionDetailPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  if (!isLocale(params.lang)) notFound();

  const lang = params.lang as Locale;
  const exhibition = await getExhibitionBySlug(params.slug);

  if (!exhibition) notFound();

  const title = localizedText(exhibition, "title", lang);
  const body = localizedBody(exhibition, lang);

  const dateText = formatDateRange(exhibition.dateRange?.startDate, exhibition.dateRange?.endDate);
  const relatedWorks = (exhibition.relatedWorks ?? []) as RelatedWorkRef[];

  return (
    <article>
      <h1>{title}</h1>

      <p className="meta-inline">
        {exhibition.venue ? <span>{exhibition.venue}</span> : null}
        {exhibition.location ? <span>{exhibition.location}</span> : null}
        {exhibition.year ? <span>{String(exhibition.year)}</span> : null}
        {dateText ? <span>{dateText}</span> : null}
      </p>

      <CoverImage image={exhibition.coverImage} title={title} />

      {localizedText(exhibition, "summary", lang) ? <p>{localizedText(exhibition, "summary", lang)}</p> : null}

      <RichText value={body} />

      <Gallery images={exhibition.galleryImages} title={title} />
      <VideoEmbeds urls={exhibition.videoEmbeds} />

      <section className="panel">
        <h2>{lang === "zh" ? "展览信息" : "Exhibition Details"}</h2>

        <dl className="meta-list">
          {exhibition.venue ? (
            <div>
              <dt>{lang === "zh" ? "场馆" : "Venue"}</dt>
              <dd>{exhibition.venue}</dd>
            </div>
          ) : null}

          {exhibition.collaborators?.length ? (
            <div>
              <dt>{lang === "zh" ? "合作方" : "Collaborators"}</dt>
              <dd>{exhibition.collaborators.join(", ")}</dd>
            </div>
          ) : null}

          {dateText ? (
            <div>
              <dt>{lang === "zh" ? "展期" : "Dates"}</dt>
              <dd>{dateText}</dd>
            </div>
          ) : null}

          {relatedWorks.length ? (
            <div>
              <dt>{lang === "zh" ? "相关作品" : "Related Works"}</dt>
              <dd>
                {relatedWorks.map((work: RelatedWorkRef, index: number) => {
                  const hrefBase = work._type === "project" ? "projects" : "research";
                  const label =
                    lang === "zh" ? work.title_zh || work.title_en : work.title_en || work.title_zh;

                  return (
                    <span key={work._id}>
                      {work.slug?.current ? (
                        <Link href={`/${lang}/${hrefBase}/${work.slug.current}`}>{label}</Link>
                      ) : (
                        label
                      )}
                      {index < relatedWorks.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      <ExternalLinks links={exhibition.externalLinks} />
    </article>
  );
}