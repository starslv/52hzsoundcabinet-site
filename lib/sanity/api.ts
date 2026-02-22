import { cache } from "react";
import { sanityClient } from "@/lib/sanity/client";

import {
  homePageQuery,
  projectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  researchPostsQuery,
  researchPostBySlugQuery,
  researchPostSlugsQuery,
  pressItemsQuery,
  exhibitionsQuery,
  exhibitionBySlugQuery,
  exhibitionSlugsQuery,
  publicationsQuery,
  publicationBySlugQuery,
  publicationSlugsQuery
} from "@/lib/sanity/queries";

import type {
  HomePage,
  Project,
  ResearchPost,
  PressItem,
  Exhibition,
  Publication
} from "@/lib/sanity/types";

//
// 🏠 HOMEPAGE
//
export const getHomePage = cache(async () => {
  return sanityClient.fetch<HomePage | null>(homePageQuery);
});

//
// 🎛 PROJECTS
//
export const getProjects = cache(async () => {
  return sanityClient.fetch<Project[]>(projectsQuery);
});

export const getProjectBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<Project | null>(projectBySlugQuery, { slug });
});

export const getProjectSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(projectSlugsQuery);
});

//
// 🧪 RESEARCH
//
export const getResearchPosts = cache(async () => {
  return sanityClient.fetch<ResearchPost[]>(researchPostsQuery);
});

export const getResearchPostBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<ResearchPost | null>(researchPostBySlugQuery, { slug });
});

export const getResearchPostSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(researchPostSlugsQuery);
});

//
// 📰 PRESS
//
export const getPressItems = cache(async () => {
  return sanityClient.fetch<PressItem[]>(pressItemsQuery);
});

//
// 🎨 EXHIBITIONS
//
export const getExhibitions = cache(async () => {
  return sanityClient.fetch<Exhibition[]>(exhibitionsQuery);
});

export const getExhibitionBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<Exhibition | null>(exhibitionBySlugQuery, { slug });
});

export const getExhibitionSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(exhibitionSlugsQuery);
});

//
// 📚 PUBLICATIONS
//
export const getPublications = cache(async () => {
  return sanityClient.fetch<Publication[]>(publicationsQuery);
});

export const getPublicationBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<Publication | null>(publicationBySlugQuery, { slug });
});

export const getPublicationSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(publicationSlugsQuery);
});