import { PortableTextRenderer } from "@/components/portable-text";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { client } from "@/sanity/lib/client";

const query = `*[_type == "aboutPage"] | order(_updatedAt desc)[0]{
  title_en,
  title_zh,
  body_en,
  body_zh
}`;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};

  return {
    title: params.lang === "zh" ? "关于" : "About",
    description:
      params.lang === "zh"
        ? "52Hz Sound Cabinet 介绍与背景。"
        : "About 52Hz Sound Cabinet and its mission.",
    alternates: languageAlternates(params.lang, "/about"),
  };
}

export default async function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();

  const data = await client.fetch(query);

  // 不再直接 404：没有内容就给提示
  if (!data) {
    return (
      <article>
        <h1>{params.lang === "zh" ? "关于" : "About"}</h1>
        <p>
          {params.lang === "zh"
            ? "此页面还未在后台创建/发布。请到 /studio → About 创建并点击 Publish。"
            : "This page hasn't been created/published yet. Go to /studio → About and click Publish."}
        </p>
      </article>
    );
  }

  const title = params.lang === "zh" ? (data.title_zh || "关于") : (data.title_en || "About");
  const body = params.lang === "zh" ? data.body_zh : data.body_en;

  return (
    <article>
      <h1>{title}</h1>

      {/* 兜底渲染：你还没接 PortableText 时也不会报错 */}
{Array.isArray(body) ? (
  <PortableTextRenderer value={body} />
) : (
  <p>{params.lang === "zh" ? "请在后台填写内容并发布。" : "Please add and publish content in Studio."}</p>
)}
    </article>
  );
}