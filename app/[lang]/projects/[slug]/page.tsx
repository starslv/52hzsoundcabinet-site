import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CoverImage, Gallery, VideoEmbeds } from "@/components/media";
import { ExternalLinks } from "@/components/links";
import { RichText } from "@/components/rich-text";
import { localizedBody, localizedText } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { getProjectBySlug, getProjectSlugs } from "@/lib/sanity/api";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  if (!isLocale(params.lang)) {
    return {};
  }

  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Not Found"
    };
  }

  return {
    title: localizedText(project, "title", params.lang as Locale),
    description: localizedText(project, "summary", params.lang as Locale),
    alternates: languageAlternates(params.lang as Locale, `/projects/${params.slug}`),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/projects/${params.slug}`
    }
  };
}

export default async function ProjectDetailPage({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const title = localizedText(project, "title", lang);
  const body = localizedBody(project, lang);

  return (
    <article>
      <h1>{title}</h1>
      <p className="meta-inline">
        {project.year ? <span>{project.year}</span> : null}
        {project.location ? <span>{project.location}</span> : null}
      </p>
      <CoverImage image={project.coverImage} title={title} />
      <p>{localizedText(project, "summary", lang)}</p>
      <RichText value={body} />
      <Gallery images={project.galleryImages} title={title} />
      <VideoEmbeds urls={project.videoEmbeds} />
      <section className="panel">
        <h2>{lang === "zh" ? "项目信息" : "Project Details"}</h2>
        <dl className="meta-list">
          {project.technologies?.length ? (
            <div>
              <dt>{lang === "zh" ? "技术" : "Technologies"}</dt>
              <dd>{project.technologies.join(", ")}</dd>
            </div>
          ) : null}
          {project.keywords?.length ? (
            <div>
              <dt>{lang === "zh" ? "关键词" : "Keywords"}</dt>
              <dd>{project.keywords.join(", ")}</dd>
            </div>
          ) : null}
        </dl>
      </section>
      <ExternalLinks links={project.externalLinks} />
    </article>
  );
}
