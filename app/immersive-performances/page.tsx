import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Immersive Performances",
  description: "Performance works developed through spatial audio and collective listening."
};

export default function ImmersivePerformancesPage() {
  return (
    <article>
      <h1>Immersive Performances</h1>
      <section aria-labelledby="performance-method">
        <h2 id="performance-method">Approach</h2>
        <p>
          Performances combine live processing, site-responsive staging, and multichannel diffusion to activate
          embodied listening in shared spaces.
        </p>
      </section>
    </article>
  );
}
