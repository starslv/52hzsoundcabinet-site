import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverImage, Gallery, VideoEmbeds } from "@/components/media";
import { ExternalLinks } from "@/components/links";
import { RichText } from "@/components/rich-text";
import { localizedBody, localizedText } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { getExpeditionBySlug, getExpeditionSlugs } from "@/lib/sanity/api";

function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) {
    return "";
  }

  if (startDate && endDate) {
    return `${startDate} - ${endDate}`;
  }

  return startDate || endDate || "";
}

export async function generateStaticParams() {
  const slugs = await getExpeditionSlugs();
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  if (!isLocale(params.lang)) {
    return {};
  }

  const expedition = await getExpeditionBySlug(params.slug);

  if (!expedition) {
    return {
      title: "Not Found"
    };
  }

  return {
    title: localizedText(expedition, "title", params.lang as Locale),
    description: localizedText(expedition, "summary", params.lang as Locale),
    alternates: languageAlternates(params.lang as Locale, `/field-expeditions/${params.slug}`),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/field-expeditions/${params.slug}`
    }
  };
}

export default async function ExpeditionDetailPage({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const expedition = await getExpeditionBySlug(params.slug);

  if (!expedition) {
    notFound();
  }

  const title = localizedText(expedition, "title", lang);
  const body = localizedBody(expedition, lang);

  return (
    <article>
      <h1>{title}</h1>
      <p className="meta-inline">
        {expedition.region ? <span>{expedition.region}</span> : null}
        <span>{formatDateRange(expedition.dateRange?.startDate, expedition.dateRange?.endDate)}</span>
      </p>
      <CoverImage image={expedition.coverImage} title={title} />
      <p>{localizedText(expedition, "summary", lang)}</p>
      <RichText value={body} />
      <Gallery images={expedition.galleryImages} title={title} />
      <VideoEmbeds urls={expedition.videoEmbeds} />

      <section className="panel">
        <h2>{lang === "zh" ? "探险信息" : "Expedition Details"}</h2>
        <dl className="meta-list">
          {expedition.gearList?.length ? (
            <div>
              <dt>{lang === "zh" ? "设备清单" : "Gear List"}</dt>
              <dd>{expedition.gearList.join(", ")}</dd>
            </div>
          ) : null}
          {expedition.audioThemes?.length ? (
            <div>
              <dt>{lang === "zh" ? "声音主题" : "Audio Themes"}</dt>
              <dd>{expedition.audioThemes.join(", ")}</dd>
            </div>
          ) : null}
          {expedition.relatedOutputs?.length ? (
            <div>
              <dt>{lang === "zh" ? "相关成果" : "Related Outputs"}</dt>
              <dd>
                {expedition.relatedOutputs.map((output, index) => {
                  const hrefBase = output._type === "project" ? "projects" : "research";

                  return (
                    <span key={output._id}>
                      {output.slug?.current ? (
                        <Link href={`/${lang}/${hrefBase}/${output.slug.current}`}>
                          {localizedText(output, "title", lang)}
                        </Link>
                      ) : (
                        localizedText(output, "title", lang)
                      )}
                      {index < expedition.relatedOutputs!.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>
      <ExternalLinks links={expedition.externalLinks} />
    </article>
  );
}
