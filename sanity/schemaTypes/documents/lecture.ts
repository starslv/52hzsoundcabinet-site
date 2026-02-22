import { defineArrayMember, defineField, defineType } from "sanity";

export const lectureType = defineType({
  name: "lecture",
  title: "Lecture",
  type: "document",
  fields: [
    defineField({ name: "title_en", title: "Title (EN)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title_zh", title: "Title (ZH)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title_en", maxLength: 96 }, validation: (r) => r.required() }),

    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "host", title: "Host / Organization", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),

    defineField({ name: "summary_en", title: "Summary (EN)", type: "text" }),
    defineField({ name: "summary_zh", title: "Summary (ZH)", type: "text" }),
    defineField({ name: "body_en", title: "Body (EN)", type: "blockContent" }),
    defineField({ name: "body_zh", title: "Body (ZH)", type: "blockContent" }),

    defineField({ name: "slides", title: "Slides / Files", type: "array", of: [defineArrayMember({ type: "file" })] }),
    defineField({ name: "videoEmbeds", title: "Video Embeds", type: "array", of: [defineArrayMember({ type: "url" })] }),
    defineField({ name: "externalLinks", title: "External Links", type: "array", of: [defineArrayMember({ type: "externalLink" })] }),
  ],
});