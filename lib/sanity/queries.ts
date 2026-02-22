import { groq } from "next-sanity";

const baseFields = `
  _id,
  _createdAt,
  slug,
  title_en,
  title_zh,
  summary_en,
  summary_zh,
  body_en,
  body_zh,
  year,
  location,
  keywords,
  technologies,
  coverImage,
  galleryImages,
  videoEmbeds,
  externalLinks
`;

export const projectsQuery = groq`*[_type == "project"] | order(year desc, _createdAt desc) {${baseFields}}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {${baseFields}}`;

export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)][].slug.current`;

export const researchPostsQuery = groq`*[_type == "researchPost"] | order(year desc, _createdAt desc) {${baseFields}}`;

export const researchPostBySlugQuery = groq`*[_type == "researchPost" && slug.current == $slug][0] {${baseFields}}`;

export const researchPostSlugsQuery = groq`*[_type == "researchPost" && defined(slug.current)][].slug.current`;

export const pressItemsQuery = groq`*[_type == "pressItem"] | order(publishDate desc, _createdAt desc) {
  ${baseFields},
  outlet,
  url,
  publishDate,
  quote_en,
  quote_zh,
  relatedProjects[]->{_id, _type, slug, title_en, title_zh}
}`;

export const expeditionsQuery = groq`*[_type == "expedition"] | order(dateRange.startDate desc, year desc, _createdAt desc) {
  ${baseFields},
  dateRange,
  region,
  gearList,
  audioThemes,
  relatedOutputs[]->{_id, _type, slug, title_en, title_zh}
}`;

export const expeditionBySlugQuery = groq`*[_type == "expedition" && slug.current == $slug][0] {
  ${baseFields},
  dateRange,
  region,
  gearList,
  audioThemes,
  relatedOutputs[]->{_id, _type, slug, title_en, title_zh}
}`;

export const expeditionSlugsQuery = groq`*[_type == "expedition" && defined(slug.current)][].slug.current`;
