import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press",
  description: "Press mentions, interviews, and feature coverage."
};

export default function PressPage() {
  return (
    <article>
      <h1>Press</h1>
      <section aria-labelledby="coverage">
        <h2 id="coverage">Coverage</h2>
        <p>
          This section collects interviews, festival features, and editorial responses to the collective&apos;s work.
        </p>
      </section>
    </article>
  );
}
