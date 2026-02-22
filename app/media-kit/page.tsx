import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Kit",
  description: "Downloadable information for curators, editors, and collaborators."
};

export default function MediaKitPage() {
  return (
    <article>
      <h1>Media Kit</h1>
      <section aria-labelledby="assets">
        <h2 id="assets">Assets</h2>
        <p>
          The media kit provides biography, project descriptions, technical riders, and approved visual materials
          for publication.
        </p>
      </section>
    </article>
  );
}
