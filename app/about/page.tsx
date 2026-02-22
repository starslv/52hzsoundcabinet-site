import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About the 52Hz Sound Cabinet research initiative and collective practice."
};

export default function AboutPage() {
  return (
    <article>
      <h1>About</h1>
      <section aria-labelledby="mission">
        <h2 id="mission">Mission</h2>
        <p>
          52Hz Sound Cabinet is a sound art and research collective initiated by Xingyu Li. The project develops
          long-form investigations into listening, place, and ecological memory through artistic production and
          interdisciplinary collaboration.
        </p>
      </section>
    </article>
  );
}
