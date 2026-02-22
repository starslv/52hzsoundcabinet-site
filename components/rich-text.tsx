import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>
  }
};

export function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) {
    return null;
  }

  return <PortableText value={value} components={components} />;
}
