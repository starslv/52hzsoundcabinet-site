import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { client } from "@/sanity/lib/client";

const query = `*[_type == "contactPage" && _id == "contactPage"][0]{
  email,
  wechat,
  instagram,
  body_en,
  body_zh
}`;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};

  return {
    title: params.lang === "zh" ? "联系" : "Contact",
    description:
      params.lang === "zh"
        ? "合作、委约与媒体咨询联系方式。"
        : "Contact details for commissions, collaborations, and press inquiries.",
    alternates: languageAlternates(params.lang, "/contact"),
  };
}

export default async function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();

  const data = await client.fetch(query);

  // 如果你还没在 Studio 里创建并 Publish 这条单页文档，会是 null
  if (!data) notFound();

  const email = data.email as string | undefined;
  const wechat = data.wechat as string | undefined;
  const instagram = data.instagram as string | undefined;

  return (
    <article>
      <h1>{params.lang === "zh" ? "联系" : "Contact"}</h1>

      <p>
        {params.lang === "zh"
          ? "合作、展览与研究咨询："
          : "For collaborations, exhibitions, or research partnerships: "}
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
    </article>
  );
}