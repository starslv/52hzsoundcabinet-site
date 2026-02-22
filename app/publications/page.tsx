import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications",
  description: "Essays, papers, and artist writings produced by the collective."
};

export default function PublicationsPage() {
  return (
    <article>
      <h1>Publications</h1>
      <section aria-labelledby="writing">
        <h2 id="writing">Writing and Papers</h2>
        <p>
          Publications include peer-reviewed papers, artist essays, and research notes around sound, architecture,
          and oceanic listening practices.
        </p>
      </section>
    </article>
  );
}
