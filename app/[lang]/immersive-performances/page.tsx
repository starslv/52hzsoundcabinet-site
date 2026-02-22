import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) {
    return {};
  }

  return {
    title: params.lang === "zh" ? "沉浸式演出" : "Immersive Performances",
    description:
      params.lang === "zh"
        ? "基于空间音频与现场聆听的演出实践。"
        : "Performance works developed through spatial audio and collective listening.",
    alternates: languageAlternates(params.lang, "/immersive-performances")
  };
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  return (
    <article>
      <h1>{params.lang === "zh" ? "沉浸式演出" : "Immersive Performances"}</h1>
      <p>
        {params.lang === "zh"
          ? "演出结合现场处理、空间扩声与场地响应式编排，激活共享空间中的身体聆听。"
          : "Performances combine live processing, site-responsive staging, and multichannel diffusion to activate embodied listening in shared spaces."}
      </p>
    </article>
  );
}
