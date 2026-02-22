import { cache } from "react";
import { sanityClient } from "@/lib/sanity/client";
import {
  exhibitionBySlugQuery,
  exhibitionSlugsQuery,
  exhibitionsQuery,
  pressItemsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
  researchPostBySlugQuery,
  researchPostSlugsQuery,
  researchPostsQuery,
} from "@/lib/sanity/queries";
import type { Exhibition, PressItem, Project, ResearchPost } from "@/lib/sanity/types";

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

export const getExhibitions = cache(async () => {
  return sanityClient.fetch<Exhibition[]>(exhibitionsQuery);
});

export const getExhibitionBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<Exhibition | null>(exhibitionBySlugQuery, { slug });
});

export const getExhibitionSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(exhibitionSlugsQuery);
});