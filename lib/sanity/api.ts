import { cache } from "react";
import { sanityClient } from "@/lib/sanity/client";
import {
  expeditionBySlugQuery,
  expeditionSlugsQuery,
  expeditionsQuery,
  pressItemsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
  researchPostBySlugQuery,
  researchPostSlugsQuery,
  researchPostsQuery
} from "@/lib/sanity/queries";
import type { Expedition, PressItem, Project, ResearchPost } from "@/lib/sanity/types";

export const getProjects = cache(async () => {
  return sanityClient.fetch<Project[]>(projectsQuery);
});

export const getProjectBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<Project | null>(projectBySlugQuery, { slug });
});

export const getProjectSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(projectSlugsQuery);
});

export const getResearchPosts = cache(async () => {
  return sanityClient.fetch<ResearchPost[]>(researchPostsQuery);
});

export const getResearchPostBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<ResearchPost | null>(researchPostBySlugQuery, { slug });
});

export const getResearchPostSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(researchPostSlugsQuery);
});

export const getPressItems = cache(async () => {
  return sanityClient.fetch<PressItem[]>(pressItemsQuery);
});

export const getExpeditions = cache(async () => {
  return sanityClient.fetch<Expedition[]>(expeditionsQuery);
});

export const getExpeditionBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<Expedition | null>(expeditionBySlugQuery, { slug });
});

export const getExpeditionSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(expeditionSlugsQuery);
});
