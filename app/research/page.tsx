import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description: "Current and ongoing research themes within 52Hz Sound Cabinet."
};

export default function ResearchPage() {
  return (
    <article>
      <h1>Research</h1>
      <section aria-labelledby="research-threads">
        <h2 id="research-threads">Research Threads</h2>
        <p>
          Ongoing studies address acoustic ecology, sonic ethnography, and spatial listening methodologies across
          marine and urban environments.
        </p>
      </section>
    </article>
  );
}
