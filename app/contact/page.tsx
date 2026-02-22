import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details for commissions, collaborations, and press inquiries."
};

export default function ContactPage() {
  return (
    <article>
      <h1>Contact</h1>
      <section aria-labelledby="inquiries">
        <h2 id="inquiries">Inquiries</h2>
        <p>For collaborations, exhibitions, or research partnerships, contact: studio@52hzsoundcabinet.org</p>
      </section>
    </article>
  );
}
