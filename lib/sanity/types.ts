import type { PortableTextBlock } from "sanity";

export type SanitySlug = {
  current: string;
};

export type SanityImageAsset = {
  _type: "image";
  // Sanity image field usually stores a reference object:
  // { _type: "image", asset: { _ref: "image-...", _type: "reference" }, ... }
  asset?: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type SanityImage = {
  asset?: {
    url?: string;
    metadata?: {
      dimensions?: { width?: number; height?: number };
      lqip?: string;
    };
  };
  alt?: string;
};

export type ExternalLink = {
  _key: string;
  label?: string;
  url?: string;
};

export type BaseContent = {
  _id: string;
  _createdAt: string;
  slug?: SanitySlug;
  title_en: string;
  title_zh: string;
  summary_en?: string;
  summary_zh?: string;
  body_en?: PortableTextBlock[];
  body_zh?: PortableTextBlock[];
  year?: number;
  location?: string;
  keywords?: string[];
  technologies?: string[];
  coverImage?: SanityImageAsset;
  galleryImages?: SanityImageAsset[];
  videoEmbeds?: string[];
  externalLinks?: ExternalLink[];
};

export type HomePage = {
  _id: string;
  _updatedAt?: string;
  title_en?: string;
  title_zh?: string;
  intro_en?: PortableTextBlock[] | string;
  intro_zh?: PortableTextBlock[] | string;
  heroImage?: SanityImage;
};

export type Project = BaseContent;

export type ResearchPost = BaseContent;

export type PressItem = BaseContent & {
  outlet: string;
  url: string;
  publishDate?: string;
  quote_en?: string;
  quote_zh?: string;
  relatedProjects?: Project[];
};

export type Exhibition = BaseContent & {
  dateRange?: {
    startDate?: string;
    endDate?: string;
  };
  venue?: string;
  collaborators?: string[];
  relatedWorks?: Array<{
    _id: string;
    slug?: SanitySlug;
    title_en: string;
    title_zh: string;
    _type: "project" | "researchPost";
  }>;
};

export type SanityFileAsset = {
  asset?: {
    url?: string;
    originalFilename?: string;
  };
};

export type Publication = BaseContent & {
  publishDate?: string;
  outlet?: string;
  url?: string;
  authors?: string[];
  file?: SanityFileAsset;
};