import { defineArrayMember, defineField, defineType } from "sanity";

export const exhibitionType = defineType({
  name: "exhibition",
  title: "Exhibition",
  type: "document",
  orderings: [
    {
      title: "Year (newest first)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }]
    },
    {
      title: "Updated (newest first)",
      name: "updatedDesc",
      by: [{ field: "_updatedAt", direction: "desc" }]
    }
  ],

  fields: [
    defineField({
      name: "title_en",
      title: "Title (EN)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title_zh",
      title: "Title (ZH)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title_en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    defineField({ name: "summary_en", title: "Summary (EN)", type: "text" }),
    defineField({ name: "summary_zh", title: "Summary (ZH)", type: "text" }),

    defineField({ name: "body_en", title: "Body (EN)", type: "blockContent" }),
    defineField({ name: "body_zh", title: "Body (ZH)", type: "blockContent" }),

    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "location", title: "Location", type: "string" }),

    // 🟣 展览核心字段（新增）
    defineField({ name: "venue", title: "Venue", type: "string" }),

    defineField({
      name: "collaborators",
      title: "Collaborators",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),

    defineField({
      name: "dateRange",
      title: "Exhibition Dates",
      type: "dateRange",
    }),

    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),

    defineField({
      name: "videoEmbeds",
      title: "Video Embeds",
      type: "array",
      of: [defineArrayMember({ type: "url" })],
    }),

    defineField({
      name: "externalLinks",
      title: "External Links",
      type: "array",
      of: [defineArrayMember({ type: "externalLink" })],
    }),

    defineField({
      name: "relatedWorks",
      title: "Related Works",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
    }),
  ],
});
