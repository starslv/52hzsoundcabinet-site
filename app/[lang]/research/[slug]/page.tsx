import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CoverImage, Gallery, VideoEmbeds } from "@/components/media";
import { ExternalLinks } from "@/components/links";
import { RichText } from "@/components/rich-text";
import { localizedBody, localizedText } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { getResearchPostBySlug, getResearchPostSlugs } from "@/lib/sanity/api";

export async function generateStaticParams() {
  const slugs = await getResearchPostSlugs();
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  if (!isLocale(params.lang)) {
    return {};
  }

  const post = await getResearchPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Not Found"
    };
  }

  return {
    title: localizedText(post, "title", params.lang as Locale),
    description: localizedText(post, "summary", params.lang as Locale),
    alternates: languageAlternates(params.lang as Locale, `/research/${params.slug}`),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/research/${params.slug}`
    }
  };
}

export default async function ResearchDetailPage({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const post = await getResearchPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const title = localizedText(post, "title", lang);
  const body = localizedBody(post, lang);

  return (
    <article>
      <h1>{title}</h1>
      <CoverImage image={post.coverImage} title={title} />
      <p>{localizedText(post, "summary", lang)}</p>
      <RichText value={body} />
      <Gallery images={post.galleryImages} title={title} />
      <VideoEmbeds urls={post.videoEmbeds} />
      <ExternalLinks links={post.externalLinks} />
    </article>
  );
}
