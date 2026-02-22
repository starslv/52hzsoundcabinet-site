import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) {
    return {};
  }

  return {
    title: params.lang === "zh" ? "出版" : "Publications",
    description:
      params.lang === "zh"
        ? "围绕声音、建筑与海洋聆听的论文与写作。"
        : "Essays, papers, and artist writings produced by the collective.",
    alternates: languageAlternates(params.lang, "/publications")
  };
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  return (
    <article>
      <h1>{params.lang === "zh" ? "出版" : "Publications"}</h1>
      <p>
        {params.lang === "zh"
          ? "此部分收录学术论文、艺术家写作与研究随笔。"
          : "Publications include peer-reviewed papers, artist essays, and research notes around sound, architecture, and oceanic listening practices."}
      </p>
    </article>
  );
}
