import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field Expeditions",
  description: "Documentation of field recording journeys and listening expeditions."
};

export default function FieldExpeditionsPage() {
  return (
    <article>
      <h1>Field Expeditions</h1>
      <section aria-labelledby="expedition-notes">
        <h2 id="expedition-notes">Expedition Notes</h2>
        <p>
          Fieldwork spans coastlines, estuaries, and industrial edges, focusing on acoustic signatures and
          environmental change over time.
        </p>
      </section>
    </article>
  );
}
