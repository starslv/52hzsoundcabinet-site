import Link from "next/link";
import type { ExternalLink } from "@/lib/sanity/types";

export function ExternalLinks({ links }: { links?: ExternalLink[] }) {
  if (!links?.length) {
    return null;
  }

  return (
    <section aria-label="External links">
      <h2>External Links</h2>
      <ul>
        {links.map((link) => {
          if (!link.url) {
            return null;
          }

          return (
            <li key={link._key}>
              <Link href={link.url} target="_blank" rel="noreferrer">
                {link.label || link.url}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
