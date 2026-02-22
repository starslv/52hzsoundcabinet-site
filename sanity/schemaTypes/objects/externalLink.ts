import { defineField, defineType } from "sanity";

export const externalLinkType = defineType({
  name: "externalLink",
  title: "External Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string"
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url"
    })
  ]
});
