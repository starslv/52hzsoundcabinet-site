export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { urlFor } from "@/sanity/lib/image";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { getPublicationBySlug, getPublicationSlugs } from "@/lib/sanity/api";
import { localizedBody, localizedText } from "@/lib/content";
import { RichText } from "@/components/rich-text";
import { ExternalLinks } from "@/components/links";

export async function generateStaticParams() {
  const slugs = await getPublicationSlugs();
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};

  const pub = await getPublicationBySlug(params.slug);
  if (!pub) return { title: "Not Found" };

  const lang = params.lang as Locale;

  return {
    title: localizedText(pub, "title", lang),
    description: localizedText(pub, "summary", lang),
    alternates: languageAlternates(lang, `/publications/${params.slug}`),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/publications/${params.slug}`
    }
  };
}

export default async function PublicationDetailPage({
  params
}: {
  params: { lang: string; slug: string };
}) {
  if (!isLocale(params.lang)) notFound();

  const lang = params.lang as Locale;
  const pub = await getPublicationBySlug(params.slug);
  if (!pub) notFound();

  const title = localizedText(pub, "title", lang);
  const body = localizedBody(pub, lang);

  return (
    <article>
      {/* ✅ 调试用：确认 coverImage 是否存在，确认 _ref 是否正确。看完可删除 */}


      <h1>{title}</h1>

      {/* ✅ 封面图（Sanity _ref -> URL） */}
      {pub.coverImage?.asset ? (
       <div style={{ maxWidth: "720px", margin: "2rem 0" }}>
  <Image
    src={urlFor(pub.coverImage)
      .width(720)
      .height(720)
      .fit("crop")
      .auto("format")
      .url()}
    alt={title}
    width={720}
    height={720}
    style={{
      width: "100%",
      height: "auto",
      borderRadius: "8px"
    }}
  />
</div>
      ) : null}

      {pub.publishDate || pub.year || pub.outlet ? (
        <p className="meta-inline">
          {pub.publishDate ? <span>{pub.publishDate}</span> : null}
          {pub.year ? <span>{pub.year}</span> : null}
          {pub.outlet ? <span>{pub.outlet}</span> : null}
        </p>
      ) : null}

      {pub.url ? (
        <p>
          <a href={pub.url} target="_blank" rel="noreferrer">
            {lang === "zh" ? "外部链接" : "External link"}
          </a>
        </p>
      ) : null}

      {pub.file?.asset?.url ? (
        <p>
          <a href={pub.file.asset.url} target="_blank" rel="noreferrer">
            {lang === "zh" ? "下载文件" : "Download file"}{" "}
            {pub.file.asset.originalFilename ? `(${pub.file.asset.originalFilename})` : ""}
          </a>
        </p>
      ) : null}

      {body?.length ? <RichText value={body} /> : null}

      <ExternalLinks links={pub.externalLinks} />
    </article>
  );
}