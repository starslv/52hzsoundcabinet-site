"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

// 这些类型我们要当作“单页（Singleton）”处理：只能编辑固定 documentId 的那一条
const singletonTypes = ["homePage", "aboutPage", "mediaKitPage", "contactPage"];

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,

  schema: {
    types: schemaTypes,

    // 1) 隐藏“新建模板”（Create new）里出现的 singleton 类型
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },

  plugins: [structureTool({ structure })],

  // 2) 再加一层保险：从“新建”菜单里彻底移除 singleton 类型（不同入口都管住）
  document: {
    newDocumentOptions: (prev, ctx) => {
      // 全局新建入口（+ Create）
      if (ctx.creationContext.type === "global") {
        return prev.filter((opt) => !singletonTypes.includes(opt.schemaType));
      }
      return prev;
    },

    // 3) 禁用 singleton 的 duplicate / delete，防止再次生成多条导致冲突
    actions: (prev, ctx) => {
      if (singletonTypes.includes(ctx.schemaType)) {
        return prev.filter(
          (action) => action.action !== "duplicate" && action.action !== "delete"
        );
      }
      return prev;
    },
  },

  // NOTE:
  // We intentionally disable @sanity/vision for now due to React/Next compatibility
  // issues in this project setup. We can re-enable it later after aligning versions.
});