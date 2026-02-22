import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { getHomePage } from "@/lib/sanity/api";
import { RichText } from "@/components/rich-text";

// ✅ 让线上 Sanity publish 后最多 60 秒生效（不需要每次 redeploy）
export const revalidate = 60;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const lang = params.lang as Locale;

  return {
    title: lang === "zh" ? "52Hz 声音馆" : "52Hz Sound Cabinet",
    description:
      lang === "zh"
        ? "52Hz声音馆是一个跨学科声音艺术研究计划，关注田野录音、环境声景与空间聆听实践。"
        : "52Hz Sound Cabinet is an interdisciplinary sound art research initiative focused on field recording, environmental soundscapes, and spatial listening.",
    alternates: languageAlternates(lang, ""),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${lang}`
    }
  };
}

export default async function HomePage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang as Locale;

  const home = await getHomePage();

  const title = lang === "zh" ? home?.title_zh : home?.title_en;
  const intro = lang === "zh" ? home?.intro_zh : home?.intro_en;

  const heroUrl = home?.heroImage?.asset?.url;
  const heroAlt = home?.heroImage?.alt || (lang === "zh" ? "主页图片" : "Homepage image");

  return (
    <article className="home">
      <header className="home-hero">
        {heroUrl ? (
          <div className="hero-media">
            <Image
              src={`${heroUrl}?w=2000&auto=format`}
              alt={heroAlt}
              width={2000}
              height={1125}
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ) : null}

        <h1>{title || (lang === "zh" ? "52Hz 声音馆" : "52Hz Sound Cabinet")}</h1>

        <section className="home-intro">
          {Array.isArray(intro) ? (
            <RichText value={intro} />
          ) : typeof intro === "string" && intro.trim() ? (
            <p>{intro}</p>
          ) : (
            <p style={{ opacity: 0.7 }}>
              {lang === "zh"
                ? "请在 /studio → Home Page 填写简介并发布。"
                : "Please add the homepage intro in /studio → Home Page and publish."}
            </p>
          )}
        </section>

        {/* 可选：放几个快速入口 */}
        <nav className="home-quicklinks" aria-label="Quick links">
          <Link href={`/${lang}/projects`}>{lang === "zh" ? "项目" : "Projects"}</Link>
          <Link href={`/${lang}/research`}>{lang === "zh" ? "研究" : "Research"}</Link>
          <Link href={`/${lang}/exhibitions`}>{lang === "zh" ? "展览" : "Exhibitions"}</Link>
          <Link href={`/${lang}/press`}>{lang === "zh" ? "媒体" : "Press"}</Link>
        </nav>
      </header>

      {/* ✅ 调试用：确认线上读到的是哪条 HomePage（确认好后删掉） */}
      {/* 
      <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, opacity: 0.6 }}>
        {JSON.stringify(
          {
            homeDoc: home ? { _id: home._id, _updatedAt: home._updatedAt } : null
          },
          null,
          2
        )}
      </pre>
      */}
    </article>
  );
}