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
  pressItemBySlugQuery,
  pressItemSlugsQuery,
  exhibitionsQuery,
  exhibitionBySlugQuery,
  exhibitionSlugsQuery,
  publicationsQuery,
  publicationBySlugQuery,
  publicationSlugsQuery,
  immersivePerformancesQuery,
  immersivePerformanceBySlugQuery,
  immersivePerformanceSlugsQuery,
  lecturesQuery,
  lectureBySlugQuery,
  lectureSlugsQuery
} from "@/lib/sanity/queries";

import type {
  HomePage,
  Project,
  ResearchPost,
  PressItem,
  Exhibition,
  Publication,
  ImmersivePerformance,
  Lecture
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
export const getProjectsBySlug = getProjectBySlug;

export const getProjectSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(projectSlugsQuery);
});
export const getProjectsSlugs = getProjectSlugs;

//
// 🧪 RESEARCH
//
export const getResearchPosts = cache(async () => {
  return sanityClient.fetch<ResearchPost[]>(researchPostsQuery);
});

export const getResearchPostBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<ResearchPost | null>(researchPostBySlugQuery, { slug });
});
export const getResearchPostsBySlug = getResearchPostBySlug;

export const getResearchPostSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(researchPostSlugsQuery);
});
export const getResearchPostsSlugs = getResearchPostSlugs;

//
// 📰 PRESS
//
export const getPressItems = cache(async () => {
  return sanityClient.fetch<PressItem[]>(pressItemsQuery);
});

export const getPressItemBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<PressItem | null>(pressItemBySlugQuery, { slug });
});
export const getPressBySlug = getPressItemBySlug;

export const getPressItemSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(pressItemSlugsQuery);
});
export const getPressSlugs = getPressItemSlugs;

//
// 🎨 EXHIBITIONS
//
export const getExhibitions = cache(async () => {
  return sanityClient.fetch<Exhibition[]>(exhibitionsQuery);
});

export const getExhibitionBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<Exhibition | null>(exhibitionBySlugQuery, { slug });
});
export const getExhibitionsBySlug = getExhibitionBySlug;

export const getExhibitionSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(exhibitionSlugsQuery);
});
export const getExhibitionsSlugs = getExhibitionSlugs;

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

//
// 🎭 IMMERSIVE PERFORMANCES
//
export const getImmersivePerformances = cache(async () => {
  return sanityClient.fetch<ImmersivePerformance[]>(immersivePerformancesQuery);
});

export const getImmersivePerformanceBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<ImmersivePerformance | null>(immersivePerformanceBySlugQuery, { slug });
});
export const getImmersivePerformancesBySlug = getImmersivePerformanceBySlug;

export const getImmersivePerformanceSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(immersivePerformanceSlugsQuery);
});
export const getImmersivePerformancesSlugs = getImmersivePerformanceSlugs;

//
// 🎤 LECTURES
//
export const getLectures = cache(async () => {
  return sanityClient.fetch<Lecture[]>(lecturesQuery);
});

export const getLectureBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<Lecture | null>(lectureBySlugQuery, { slug });
});
export const getLecturesBySlug = getLectureBySlug;

export const getLectureSlugs = cache(async () => {
  return sanityClient.fetch<string[]>(lectureSlugsQuery);
});
export const getLecturesSlugs = getLectureSlugs;
