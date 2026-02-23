export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { urlFor } from "@/sanity/lib/image";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { getPressBySlug, getPressSlugs } from "@/lib/sanity/api";
import { localizedBody, localizedText } from "@/lib/content";
import { RichText } from "@/components/rich-text";
import { ExternalLinks } from "@/components/links";

export async function generateStaticParams() {
  const slugs = await getPressSlugs();
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};

  const item = await getPressBySlug(params.slug);
  if (!item) return { title: "Not Found" };

  const lang = params.lang as Locale;

  return {
    title: localizedText(item, "title", lang),
    description: localizedText(item, "summary", lang),
    alternates: languageAlternates(lang, `/press/${params.slug}`),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/press/${params.slug}`
    }
  };
}

export default async function PressItemDetailPage({
  params
}: {
  params: { lang: string; slug: string };
}) {
  if (!isLocale(params.lang)) notFound();

  const lang = params.lang as Locale;
  const item = await getPressBySlug(params.slug);
  if (!item) notFound();

  const title = localizedText(item, "title", lang);
  const summary = localizedText(item, "summary", lang);
  const body = localizedBody(item, lang);

  return (
    <article>
      <h1>{title}</h1>

      {item.coverImage?.asset ? (
        <div style={{ maxWidth: "720px", margin: "2rem 0" }}>
          <Image
            src={urlFor(item.coverImage)
              .width(720)
              .height(720)
              .fit("crop")
              .auto("format")
              .url()}
            alt={title}
            width={720}
            height={720}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>
      ) : null}

      {summary ? <p>{summary}</p> : null}
      {body?.length ? <RichText value={body} /> : null}

      {item.galleryImages?.length ? (
        <section className="media-grid" aria-label="Gallery">
          {item.galleryImages.map((img, i) =>
            img?.asset?._ref ? (
              <Image
                key={`${img.asset._ref}-${i}`}
                src={urlFor(img).width(900).height(600).fit("crop").auto("format").url()}
                alt={`${title} image ${i + 1}`}
                width={900}
                height={600}
                style={{ width: "100%", height: "auto" }}
              />
            ) : null
          )}
        </section>
      ) : null}

      <ExternalLinks links={item.externalLinks} />
    </article>
  );
}
