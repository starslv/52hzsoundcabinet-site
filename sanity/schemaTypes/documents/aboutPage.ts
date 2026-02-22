import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "title_en", title: "Title (EN)", type: "string" }),
    defineField({ name: "title_zh", title: "Title (ZH)", type: "string" }),
    defineField({ name: "body_en", title: "Body (EN)", type: "blockContent" }),
    defineField({ name: "body_zh", title: "Body (ZH)", type: "blockContent" }),
  ],
});