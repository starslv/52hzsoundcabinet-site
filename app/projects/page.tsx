import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project archive of installations, performances, and research outcomes."
};

export default function ProjectsPage() {
  return (
    <article>
      <h1>Projects</h1>
      <section aria-labelledby="project-index">
        <h2 id="project-index">Project Index</h2>
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.slug} className="project-card">
              <h3>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>
              <p>{project.shortDescription}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
