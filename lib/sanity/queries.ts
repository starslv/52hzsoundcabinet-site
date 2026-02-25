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
  *[_type == "project"] | order(coalesce(year, dateTime(_createdAt)) desc, _createdAt desc){
    ${baseFields}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ${baseFields}
  }
`;
export const projectsBySlugQuery = projectBySlugQuery;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;
export const projectsSlugsQuery = projectSlugsQuery;

//
// 🧪 RESEARCH
//
export const researchPostsQuery = groq`
  *[_type == "researchPost"] | order(coalesce(year, dateTime(_createdAt)) desc, _createdAt desc){
    ${baseFields}
  }
`;

export const researchPostBySlugQuery = groq`
  *[_type == "researchPost" && slug.current == $slug][0]{
    ${baseFields}
  }
`;
export const researchPostsBySlugQuery = researchPostBySlugQuery;

export const researchPostSlugsQuery = groq`
  *[_type == "researchPost" && defined(slug.current)][].slug.current
`;
export const researchPostsSlugsQuery = researchPostSlugsQuery;

//
// 📰 PRESS
//
export const pressItemsQuery = groq`
  *[_type == "pressItem"] | order(coalesce(year, dateTime(publishDate), dateTime(_createdAt)) desc, _createdAt desc){
    ${baseFields},
    outlet,
    url,
    publishDate,
    quote_en,
    quote_zh,
    relatedProjects[]->{_id, _type, slug, title_en, title_zh}
  }
`;

export const pressItemBySlugQuery = groq`
  *[_type == "pressItem" && slug.current == $slug][0]{
    ${baseFields},
    outlet,
    url,
    publishDate,
    quote_en,
    quote_zh,
    relatedProjects[]->{_id, _type, slug, title_en, title_zh}
  }
`;
export const pressBySlugQuery = pressItemBySlugQuery;

export const pressItemSlugsQuery = groq`
  *[_type == "pressItem" && defined(slug.current)][].slug.current
`;
export const pressSlugsQuery = pressItemSlugsQuery;

//
// 🎨 EXHIBITIONS
//
export const exhibitionsQuery = groq`
  *[_type == "exhibition"]
  | order(coalesce(year, dateTime(dateRange.startDate), dateTime(_createdAt)) desc, _createdAt desc){
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
export const exhibitionsBySlugQuery = exhibitionBySlugQuery;

export const exhibitionSlugsQuery = groq`
  *[_type == "exhibition" && defined(slug.current)][].slug.current
`;
export const exhibitionsSlugsQuery = exhibitionSlugsQuery;

//
// 📚 PUBLICATIONS
//
export const publicationsQuery = groq`
  *[_type == "publication"]
  | order(coalesce(year, dateTime(publishDate), dateTime(_createdAt)) desc, _createdAt desc){
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

//
// 🎭 IMMERSIVE PERFORMANCES
//
export const immersivePerformancesQuery = groq`
  *[_type == "performance"] | order(coalesce(year, dateTime(dateRange.startDate), dateTime(_createdAt)) desc, _createdAt desc){
    ${baseFields},
    dateRange,
    venue,
    city,
    format
  }
`;

export const immersivePerformanceBySlugQuery = groq`
  *[_type == "performance" && slug.current == $slug][0]{
    ${baseFields},
    dateRange,
    venue,
    city,
    format
  }
`;
export const immersivePerformancesBySlugQuery = immersivePerformanceBySlugQuery;

export const immersivePerformanceSlugsQuery = groq`
  *[_type == "performance" && defined(slug.current)][].slug.current
`;
export const immersivePerformancesSlugsQuery = immersivePerformanceSlugsQuery;

//
// 🎤 LECTURES
//
export const lecturesQuery = groq`
  *[_type == "lecture"] | order(coalesce(year, dateTime(date), dateTime(_createdAt)) desc, _createdAt desc){
    ${baseFields},
    date,
    host,
    slides[]{
      asset->{url, originalFilename}
    }
  }
`;

export const lectureBySlugQuery = groq`
  *[_type == "lecture" && slug.current == $slug][0]{
    ${baseFields},
    date,
    host,
    slides[]{
      asset->{url, originalFilename}
    }
  }
`;
export const lecturesBySlugQuery = lectureBySlugQuery;

export const lectureSlugsQuery = groq`
  *[_type == "lecture" && defined(slug.current)][].slug.current
`;
export const lecturesSlugsQuery = lectureSlugsQuery;
