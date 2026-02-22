import { defineArrayMember, defineType } from "sanity";

export const blockContentType = defineType({
  name: "blockContent",
  title: "Body Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block"
    })
  ]
});
