import { defineArrayMember, defineField, defineType } from "sanity";

export const pressItemType = defineType({
  name: "pressItem",
  title: "Press Item",
  type: "document",
  fields: [
    defineField({ name: "title_en", title: "Title (EN)", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title_zh", title: "Title (ZH)", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title_en", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "summary_en", title: "Summary (EN)", type: "text" }),
    defineField({ name: "summary_zh", title: "Summary (ZH)", type: "text" }),
    defineField({ name: "body_en", title: "Body (EN)", type: "blockContent" }),
    defineField({ name: "body_zh", title: "Body (ZH)", type: "blockContent" }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "keywords", title: "Keywords", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "technologies", title: "Technologies", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "galleryImages", title: "Gallery Images", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true } })] }),
    defineField({ name: "videoEmbeds", title: "Video Embeds", type: "array", of: [defineArrayMember({ type: "url" })] }),
    defineField({ name: "externalLinks", title: "External Links", type: "array", of: [defineArrayMember({ type: "externalLink" })] }),
    defineField({ name: "outlet", title: "Outlet", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "url", title: "Article URL", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "publishDate", title: "Publish Date", type: "date" }),
    defineField({ name: "quote_en", title: "Quote (EN)", type: "text" }),
    defineField({ name: "quote_zh", title: "Quote (ZH)", type: "text" }),
    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }]
        })
      ]
    })
  ]
});
