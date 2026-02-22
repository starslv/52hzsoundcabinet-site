import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lectures",
  description: "Talks, workshops, and invited lectures by 52Hz Sound Cabinet."
};

export default function LecturesPage() {
  return (
    <article>
      <h1>Lectures</h1>
      <section aria-labelledby="teaching">
        <h2 id="teaching">Talks and Workshops</h2>
        <p>
          The collective shares methods through lectures and workshops on spatial composition, recording ethics,
          and environmental listening.
        </p>
      </section>
    </article>
  );
}
