import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/sanity/api";
import { isLocale, type Locale } from "@/lib/i18n";
import { localizedText } from "@/lib/content";
import { languageAlternates } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) {
    return {};
  }

  return {
    title: params.lang === "zh" ? "项目" : "Projects",
    description:
      params.lang === "zh" ? "来自 Sanity 的项目档案。" : "Project archive of installations, performances, and research outcomes.",
    alternates: languageAlternates(params.lang, "/projects"),
    openGraph: {
      url: `https://52hzsoundcabinet.com/${params.lang}/projects`
    }
  };
}

export default async function ProjectsPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const projects = await getProjects();

  return (
    <article>
      <h1>{lang === "zh" ? "项目" : "Projects"}</h1>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project._id} className="project-card">
            <h2>
              {project.slug?.current ? (
                <Link href={`/${lang}/projects/${project.slug.current}`}>{localizedText(project, "title", lang)}</Link>
              ) : (
                localizedText(project, "title", lang)
              )}
            </h2>
            {project.summary_en || project.summary_zh ? <p>{localizedText(project, "summary", lang)}</p> : null}
            <p className="meta-inline">
              {project.year ? <span>{project.year}</span> : null}
              {project.location ? <span>{project.location}</span> : null}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
