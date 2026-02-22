import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) {
    return {};
  }

  return {
    title: params.lang === "zh" ? "讲座" : "Lectures",
    description:
      params.lang === "zh" ? "讲座与工作坊。" : "Talks, workshops, and invited lectures by 52Hz Sound Cabinet.",
    alternates: languageAlternates(params.lang, "/lectures")
  };
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  return (
    <article>
      <h1>{params.lang === "zh" ? "讲座" : "Lectures"}</h1>
      <p>
        {params.lang === "zh"
          ? "团队通过讲座与工作坊分享空间作曲、田野录音伦理与环境聆听方法。"
          : "The collective shares methods through lectures and workshops on spatial composition, recording ethics, and environmental listening."}
      </p>
    </article>
  );
}
