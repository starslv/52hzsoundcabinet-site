import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { client } from "@/sanity/lib/client";
import { PortableTextRenderer } from "@/components/portable-text";

export const dynamic = "force-dynamic"; // 关键：避免缓存导致“发布了但不更新”

const query = `*[_type == "homePage" && _id == "homePage"][0]{
  heroImage{asset->{url, metadata{dimensions}}},
  tagline_en,
  tagline_zh,
  intro_en,
  intro_zh
}`;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  return {
    title: "52Hz Sound Cabinet",
    alternates: languageAlternates(params.lang, "/"),
  };
}

export default async function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();

  const data = await client.fetch(query);

  if (!data) {
    return (
      <article>
        <h1>52Hz Sound Cabinet</h1>
        <p>
          {params.lang === "zh"
            ? "未找到 homePage（_id=homePage）。请到 /studio → Homepage 填写并 Publish。"
            : "No homePage document found (_id=homePage). Go to /studio → Homepage and Publish."}
        </p>
      </article>
    );
  }

  const tagline = params.lang === "zh" ? data.tagline_zh : data.tagline_en;
  const intro = params.lang === "zh" ? data.intro_zh : data.intro_en;

  const imgUrl = data.heroImage?.asset?.url as string | undefined;
  const w = data.heroImage?.asset?.metadata?.dimensions?.width ?? 1600;
  const h = data.heroImage?.asset?.metadata?.dimensions?.height ?? 900;

  return (
    <article>
      {imgUrl && (
        <div style={{ marginBottom: "1.25rem" }}>
<Image
  src={`${imgUrl}?w=1600&auto=format`}
  alt="52Hz Sound Cabinet hero"
  width={1600}
  height={900}
  priority
  style={{ width: "100%", height: "auto", borderRadius: 12 }}
/>
        </div>
      )}

      <h1>{tagline || (params.lang === "zh" ? "52Hz 声音柜" : "52Hz Sound Cabinet")}</h1>

      {Array.isArray(intro) ? (
        <PortableTextRenderer value={intro} />
      ) : (
        <p>
          {params.lang === "zh"
            ? "请在后台填写 intro_zh / intro_en。"
            : "Please fill intro_en / intro_zh in Studio."}
        </p>
      )}
    </article>
  );
}