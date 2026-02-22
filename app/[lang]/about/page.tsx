import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { client } from "@/sanity/lib/client";
import { RichText } from "@/components/rich-text";

export const revalidate = 60;

// ✅ 不绑 _id，永远取最新发布的那条
const query = `*[_type == "aboutPage"] | order(_updatedAt desc)[0]{
  _id,
  _updatedAt,
  title_en,
  title_zh,
  body_en,
  body_zh
}`;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const lang = params.lang as Locale;

  return {
    title: lang === "zh" ? "关于" : "About",
    description: lang === "zh" ? "52Hz 声音馆介绍与背景。" : "About 52Hz Sound Cabinet and its mission.",
    alternates: languageAlternates(lang, "/about"),
    openGraph: { url: `https://52hzsoundcabinet.com/${lang}/about` }
  };
}

export default async function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang as Locale;

  const data = await client.fetch(query);

  if (!data) {
    return (
      <article>
        <h1>{lang === "zh" ? "关于" : "About"}</h1>
        <p style={{ opacity: 0.7 }}>
          {lang === "zh"
            ? "此页面还未在后台创建/发布。请到 /studio → About 创建并点击 Publish。"
            : "This page hasn't been created/published yet. Go to /studio → About and click Publish."}
        </p>
      </article>
    );
  }

  const title = lang === "zh" ? (data.title_zh || "关于") : (data.title_en || "About");
  const body = lang === "zh" ? data.body_zh : data.body_en;

  return (
    <article>
      <h1>{title}</h1>

      {Array.isArray(body) ? (
        <RichText value={body} />
      ) : (
        <p style={{ opacity: 0.7 }}>
          {lang === "zh" ? "请在后台填写内容并发布。" : "Please add and publish content in Studio."}
        </p>
      )}

      {/* ✅ 调试用：确认线上读到的是哪条（确认后删掉） */}
      {/* 
      <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, opacity: 0.6 }}>
        {JSON.stringify({ _id: data._id, _updatedAt: data._updatedAt }, null, 2)}
      </pre>
      */}
    </article>
  );
}