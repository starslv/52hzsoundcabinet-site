import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "wechat", title: "WeChat", type: "string" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "body_en", title: "Extra Notes (EN)", type: "blockContent" }),
    defineField({ name: "body_zh", title: "Extra Notes (ZH)", type: "blockContent" }),
  ],
});