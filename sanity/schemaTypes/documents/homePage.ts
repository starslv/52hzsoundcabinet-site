import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "tagline_en",
      title: "Tagline (EN)",
      type: "string"
    }),
    defineField({
      name: "tagline_zh",
      title: "Tagline (ZH)",
      type: "string"
    }),
    defineField({
      name: "intro_en",
      title: "Intro (EN)",
      type: "blockContent"
    }),
    defineField({
      name: "intro_zh",
      title: "Intro (ZH)",
      type: "blockContent"
    })
  ]
});