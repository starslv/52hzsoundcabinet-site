import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Overview of 52Hz Sound Cabinet and its core research directions."
};

export default function HomePage() {
  return (
    <article>
      <h1>52Hz Sound Cabinet</h1>
      <p className="lead">
        52Hz Sound Cabinet is a sound art research initiative founded by Chinese sound artist Xingyu Li.
      </p>

      <section aria-labelledby="focus-areas">
        <h2 id="focus-areas">Research Focus</h2>
        <p>Its work focuses on:</p>
        <ul>
          <li>immersive spatial audio</li>
          <li>environmental field recording</li>
          <li>ocean bioacoustics</li>
          <li>sound installation in architectural space</li>
        </ul>
      </section>
    </article>
  );
}
