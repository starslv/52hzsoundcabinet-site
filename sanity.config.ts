"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const singletonTypes = ["homePage", "aboutPage", "mediaKitPage", "contactPage"];

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,

  schema: {
    types: schemaTypes,

    // Hide singleton templates from the "Create new" menu
    templates: (templates) =>
      templates.filter((t) => !singletonTypes.includes((t as any).schemaType)),
  },

  plugins: [structureTool({ structure })],

  document: {
    // Remove singleton types from global "New document" options (type-safe fallback via `as any`)
    newDocumentOptions: (prev, ctx) => {
      if (ctx.creationContext.type === "global") {
        return prev.filter((opt) => {
          const schemaType = (opt as any).schemaType;
          return !singletonTypes.includes(schemaType);
        });
      }
      return prev;
    },

    // Prevent duplicate/delete on singleton docs to avoid accidental extra docs
    actions: (prev, ctx) => {
      if (singletonTypes.includes(ctx.schemaType)) {
        return prev.filter(
          (action) => action.action !== "duplicate" && action.action !== "delete"
        );
      }
      return prev;
    },
  },

  // Vision intentionally disabled for now (React/Next compat issues in this setup)
});