import Script from "next/script";

export function StructuredDataPlaceholder() {
  // Future JSON-LD can be inserted by replacing this object.
  const schemaData: Record<string, unknown> | null = null;

  if (!schemaData) {
    return null;
  }

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
