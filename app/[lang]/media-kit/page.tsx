import { projectId, dataset } from "@/sanity/env";
import { PortableTextRenderer } from "@/components/portable-text";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { client } from "@/sanity/lib/client";

const query = `*[_type == "mediaKitPage"] | order(_updatedAt desc)[0]{
  _id,
  _updatedAt,  
  bio_en,
  bio_zh,
  pressPhotos[]{asset->{url, originalFilename}},
  logoAssets[]{asset->{url, originalFilename}},
  selectedLinks[]{label, url}
}`;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};

  return {
    title: params.lang === "zh" ? "媒体资料" : "Media Kit",
    description:
      params.lang === "zh"
        ? "媒体资料、简介、图片与素材下载。"
        : "Media assets, bio, photos, and downloadable materials.",
    alternates: languageAlternates(params.lang, "/media-kit"),
  };
}

export default async function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();

const data = await client.fetch(query);

if (!data) {
  const debugSelf = { projectId, dataset };
  return (
    <article>
      <h1>{params.lang === "zh" ? "媒体资料" : "Media Kit"}</h1>
      <p>
        {params.lang === "zh"
          ? "前台未查到 mediaKitPage。下面是前台正在使用的 Sanity 连接信息："
          : "No mediaKitPage found. Here is the Sanity connection info used by the website:"}
      </p>
      <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(debugSelf, null, 2)}</pre>
    </article>
  );
}

  const bio = params.lang === "zh" ? data.bio_zh : data.bio_en;

  return (
    <article>
      <h1>{params.lang === "zh" ? "媒体资料" : "Media Kit"}</h1>

      <section>
        <h2>{params.lang === "zh" ? "简介" : "Bio"}</h2>
{Array.isArray(bio) ? (
  <PortableTextRenderer value={bio} />
) : (
  <p>
    {params.lang === "zh"
      ? "已发布但简介为空，请在后台填写 bio_zh。注意：/en 读取 bio_en，/zh 读取 bio_zh。"
      : "Published but empty bio. Note: /en reads bio_en, /zh reads bio_zh."}
  </p>
)}
      </section>

      {Array.isArray(data.selectedLinks) && data.selectedLinks.length > 0 && (
        <section>
          <h2>{params.lang === "zh" ? "链接" : "Links"}</h2>
          <ul>
            {data.selectedLinks.map((l: any) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer">
                  {l.label || l.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {Array.isArray(data.pressPhotos) && data.pressPhotos.length > 0 && (
        <section>
          <h2>{params.lang === "zh" ? "媒体图片" : "Press Photos"}</h2>
          <ul>
            {data.pressPhotos.map((p: any, i: number) => (
              <li key={p?.asset?.url || i}>
                <a href={p?.asset?.url} target="_blank" rel="noreferrer">
                  {p?.asset?.originalFilename || p?.asset?.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {Array.isArray(data.logoAssets) && data.logoAssets.length > 0 && (
        <section>
          <h2>{params.lang === "zh" ? "Logo / 素材" : "Logos / Assets"}</h2>
          <ul>
            {data.logoAssets.map((f: any, i: number) => (
              <li key={f?.asset?.url || i}>
                <a href={f?.asset?.url} target="_blank" rel="noreferrer">
                  {f?.asset?.originalFilename || f?.asset?.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}