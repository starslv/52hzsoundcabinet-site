import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { client } from "@/sanity/lib/client";
import { RichText } from "@/components/rich-text";

export const revalidate = 60;

// ✅ 不绑 _id，取最新发布的那条
const query = `*[_type == "contactPage"] | order(_updatedAt desc)[0]{
  _id,
  _updatedAt,
  email,
  wechat,
  instagram,
  body_en,
  body_zh
}`;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const lang = params.lang as Locale;

  return {
    title: lang === "zh" ? "联系" : "Contact",
    description:
      lang === "zh"
        ? "合作、委约与媒体咨询联系方式。"
        : "Contact details for commissions, collaborations, and press inquiries.",
    alternates: languageAlternates(lang, "/contact"),
    openGraph: { url: `https://52hzsoundcabinet.com/${lang}/contact` }
  };
}

export default async function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang as Locale;

  const data = await client.fetch(query);

  // 不建议 404，给提示更友好
  if (!data) {
    return (
      <article>
        <h1>{lang === "zh" ? "联系" : "Contact"}</h1>
        <p style={{ opacity: 0.7 }}>
          {lang === "zh"
            ? "此页面还未在后台创建/发布。请到 /studio → Contact 创建并点击 Publish。"
            : "This page hasn't been created/published yet. Go to /studio → Contact and click Publish."}
        </p>
      </article>
    );
  }

  const email = (data.email as string | undefined) || "";
  const wechat = data.wechat as string | undefined;
  const instagram = data.instagram as string | undefined;
  const body = lang === "zh" ? (data.body_zh as any) : (data.body_en as any);

  return (
    <article>
      <h1>{lang === "zh" ? "联系" : "Contact"}</h1>

      <p>
        {lang === "zh" ? "合作、展览与研究咨询：" : "For collaborations, exhibitions, or research partnerships: "}
        {email ? <a href={`mailto:${email}`}>{email}</a> : <span>—</span>}
      </p>

      {(wechat || instagram) && (
        <ul>
          {wechat && (
            <li>
              WeChat: <span>{wechat}</span>
            </li>
          )}
          {instagram && (
            <li>
              Instagram:{" "}
              <a href={instagram} target="_blank" rel="noreferrer">
                {instagram}
              </a>
            </li>
          )}
        </ul>
      )}

      {/* ✅ 可选：渲染正文（如果你 contactPage 里填了 body_en/body_zh） */}
      {Array.isArray(body) ? <RichText value={body} /> : null}

      {/* ✅ 调试用：确认线上读到的是哪条（确认后删掉） */}
      {/* 
      <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, opacity: 0.6 }}>
        {JSON.stringify({ _id: data._id, _updatedAt: data._updatedAt }, null, 2)}
      </pre>
      */}
    </article>
  );
}