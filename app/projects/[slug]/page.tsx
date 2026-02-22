import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found"
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    keywords: project.keywords
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <h1>{project.title}</h1>
      <section aria-labelledby="project-metadata" className="panel">
        <h2 id="project-metadata">Project Details</h2>
        <dl className="meta-list">
          <div>
            <dt>Project Title</dt>
            <dd>{project.title}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Short Description</dt>
            <dd>{project.shortDescription}</dd>
          </div>
          <div>
            <dt>Technologies Used</dt>
            <dd>{project.technologiesUsed.join(", ")}</dd>
          </div>
          <div>
            <dt>Keywords</dt>
            <dd>{project.keywords.join(", ")}</dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
