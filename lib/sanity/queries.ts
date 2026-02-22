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

//
// 🏠 HOMEPAGE (Singleton-like, newest published)
//
export const homePageQuery = groq`
  *[_type == "homePage"] | order(_updatedAt desc)[0]{
    _id,
    _updatedAt,
    title_en,
    title_zh,
    intro_en,
    intro_zh,
    heroImage{
      asset->{url, metadata{dimensions, lqip}},
      alt
    }
  }
`;

//
// 🎛 PROJECTS
//
export const projectsQuery = groq`
  *[_type == "project"] | order(year desc, _createdAt desc){
    ${baseFields}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ${baseFields}
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

//
// 🧪 RESEARCH
//
export const researchPostsQuery = groq`
  *[_type == "researchPost"] | order(year desc, _createdAt desc){
    ${baseFields}
  }
`;

export const researchPostBySlugQuery = groq`
  *[_type == "researchPost" && slug.current == $slug][0]{
    ${baseFields}
  }
`;

export const researchPostSlugsQuery = groq`
  *[_type == "researchPost" && defined(slug.current)][].slug.current
`;

//
// 📰 PRESS
//
export const pressItemsQuery = groq`
  *[_type == "pressItem"] | order(publishDate desc, _createdAt desc){
    ${baseFields},
    outlet,
    url,
    publishDate,
    quote_en,
    quote_zh,
    relatedProjects[]->{_id, _type, slug, title_en, title_zh}
  }
`;

//
// 🎨 EXHIBITIONS
//
export const exhibitionsQuery = groq`
  *[_type == "exhibition"]
  | order(coalesce(dateRange.startDate, year) desc, _createdAt desc){
    ${baseFields},
    venue,
    collaborators,
    dateRange,
    relatedWorks[]->{_id, _type, slug, title_en, title_zh}
  }
`;

export const exhibitionBySlugQuery = groq`
  *[_type == "exhibition" && slug.current == $slug][0]{
    ${baseFields},
    venue,
    collaborators,
    dateRange,
    relatedWorks[]->{_id, _type, slug, title_en, title_zh}
  }
`;

export const exhibitionSlugsQuery = groq`
  *[_type == "exhibition" && defined(slug.current)][].slug.current
`;

//
// 📚 PUBLICATIONS
//
export const publicationsQuery = groq`
  *[_type == "publication"]
  | order(coalesce(publishDate, year) desc, _createdAt desc){
    ${baseFields},
    publishDate,
    outlet,
    url,
    authors,
    file{
      asset->{url, originalFilename}
    }
  }
`;

export const publicationBySlugQuery = groq`
  *[_type == "publication" && slug.current == $slug][0]{
    ${baseFields},
    publishDate,
    outlet,
    url,
    authors,
    file{
      asset->{url, originalFilename}
    }
  }
`;

export const publicationSlugsQuery = groq`
  *[_type == "publication" && defined(slug.current)][].slug.current
`;