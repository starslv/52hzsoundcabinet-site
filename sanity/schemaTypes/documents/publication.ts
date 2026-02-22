import { defineArrayMember, defineField, defineType } from "sanity";

export const publicationType = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({ name: "title_en", title: "Title (EN)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title_zh", title: "Title (ZH)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title_en", maxLength: 96 }, validation: (r) => r.required() }),

    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "publisher", title: "Publisher / Journal / Platform", type: "string" }),
    defineField({ name: "authors", title: "Authors", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "publicationType", title: "Type", type: "string", description: "paper / essay / catalog / interview / liner notes" }),

    defineField({ name: "summary_en", title: "Summary (EN)", type: "text" }),
    defineField({ name: "summary_zh", title: "Summary (ZH)", type: "text" }),
    defineField({ name: "body_en", title: "Body (EN)", type: "blockContent" }),
    defineField({ name: "body_zh", title: "Body (ZH)", type: "blockContent" }),

    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "file", title: "PDF / File", type: "file" }),
    defineField({ name: "externalLinks", title: "External Links", type: "array", of: [defineArrayMember({ type: "externalLink" })] }),
  ],
});