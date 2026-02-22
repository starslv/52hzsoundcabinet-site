"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h2 className="pt-h2">{children}</h2>,
    h2: ({ children }) => <h3 className="pt-h3">{children}</h3>,
    normal: ({ children }) => <p className="pt-p">{children}</p>,
    blockquote: ({ children }) => <blockquote className="pt-quote">{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value?.href || value?.url) as string | undefined;
      if (!href) return <>{children}</>;
      const isExternal = href.startsWith("http");
      return (
        <a className="pt-link" href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined}>
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="pt-ul">{children}</ul>,
    number: ({ children }) => <ol className="pt-ol">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pt-li">{children}</li>,
    number: ({ children }) => <li className="pt-li">{children}</li>,
  },
};

export function PortableTextRenderer({ value }: { value: any }) {
  if (!Array.isArray(value)) return null;
  return <PortableText value={value} components={components} />;
}