import { defineArrayMember, defineField, defineType } from "sanity";

export const mediaKitPageType = defineType({
  name: "mediaKitPage",
  title: "Media Kit Page",
  type: "document",
  fields: [
    defineField({ name: "bio_en", title: "Bio (EN)", type: "blockContent" }),
    defineField({ name: "bio_zh", title: "Bio (ZH)", type: "blockContent" }),
    defineField({ name: "pressPhotos", title: "Press Photos", type: "array", of: [defineArrayMember({ type: "image" })] }),
    defineField({ name: "logoAssets", title: "Logos / Assets", type: "array", of: [defineArrayMember({ type: "file" })] }),
    defineField({ name: "selectedLinks", title: "Selected Links", type: "array", of: [defineArrayMember({ type: "externalLink" })] }),
  ],
});