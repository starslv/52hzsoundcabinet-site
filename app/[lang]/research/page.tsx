import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResearchPosts } from "@/lib/sanity/api";
import { localizedText } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) {
    return {};
  }

  return {
    title: params.lang === "zh" ? "研究" : "Research",
    description: params.lang === "zh" ? "研究文章列表。" : "Current and ongoing research themes within 52Hz Sound Cabinet.",
    alternates: languageAlternates(params.lang, "/research"),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/research`
    }
  };
}

export default async function ResearchPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const posts = await getResearchPosts();

  return (
    <article>
      <h1>{lang === "zh" ? "研究" : "Research"}</h1>
      <ul className="project-list">
        {posts.map((post) => (
          <li key={post._id} className="project-card">
            <h2>
              {post.slug?.current ? (
                <Link href={`/${lang}/research/${post.slug.current}`}>{localizedText(post, "title", lang)}</Link>
              ) : (
                localizedText(post, "title", lang)
              )}
            </h2>
            <p>{localizedText(post, "summary", lang)}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
