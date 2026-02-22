import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverImage, Gallery, VideoEmbeds } from "@/components/media";
import { ExternalLinks } from "@/components/links";
import { RichText } from "@/components/rich-text";
import { localizedBody, localizedText } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { getPublicationBySlug, getPublicationSlugs } from "@/lib/sanity/api";

export const revalidate = 60;



export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const lang = params.lang as Locale;

  const pub = await getPublicationBySlug(params.slug);
  if (!pub) return { title: "Not Found" };

  return {
    title: localizedText(pub, "title", lang),
    description: localizedText(pub, "summary", lang),
    alternates: languageAlternates(lang, `/publications/${params.slug}`),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${lang}/publications/${params.slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang as Locale;

  const pub = await getPublicationBySlug(params.slug);
  if (!pub) notFound();

  const title = localizedText(pub, "title", lang);
  const summary = localizedText(pub, "summary", lang);
  const body = localizedBody(pub, lang);

  // 这些字段如果 schema 没有也不会报错
  const publishDate = (pub as any).publishDate as string | undefined;
  const outlet = (pub as any).outlet as string | undefined;
  const url = (pub as any).url as string | undefined;
  const fileUrl = (pub as any).file?.asset?.url as string | undefined;
  const fileName = (pub as any).file?.asset?.originalFilename as string | undefined;
  const authors = (pub as any).authors as string[] | undefined;

  return (
    <article>
      <h1>{title}</h1>

      <p className="meta-inline">
        {publishDate ? <span>{publishDate}</span> : null}
        {pub.year ? <span>{pub.year}</span> : null}
        {outlet ? <span>{outlet}</span> : null}
      </p>

      {authors?.length ? (
        <p style={{ opacity: 0.85 }}>
          {lang === "zh" ? "作者：" : "Authors: "}
          {authors.join(", ")}
        </p>
      ) : null}

      {summary ? <p>{summary}</p> : null}

      {url ? (
        <p>
          <a href={url} target="_blank" rel="noreferrer">
            {lang === "zh" ? "外部链接" : "External Link"}
          </a>
        </p>
      ) : null}

      {fileUrl ? (
        <p>
          <a href={fileUrl} target="_blank" rel="noreferrer">
            {lang === "zh" ? "下载文件" : "Download"}
            {fileName ? `: ${fileName}` : ""}
          </a>
        </p>
      ) : null}

      <CoverImage image={pub.coverImage} title={title} />
      <RichText value={body} />
      <Gallery images={pub.galleryImages} title={title} />
      <VideoEmbeds urls={pub.videoEmbeds} />
      <ExternalLinks links={pub.externalLinks} />

      <p style={{ marginTop: 24 }}>
        <Link href={`/${lang}/publications`}>← {lang === "zh" ? "返回列表" : "Back to list"}</Link>
      </p>
    </article>
  );
}