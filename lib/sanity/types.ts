import type { PortableTextBlock } from "sanity";

export type SanitySlug = {
  current: string;
};

export type SanityImageAsset = {
  _ref?: string;
  _type: "image";
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

export type Expedition = BaseContent & {
  dateRange?: {
    startDate?: string;
    endDate?: string;
  };
  region?: string;
  gearList?: string[];
  audioThemes?: string[];
  relatedOutputs?: Array<{
    _id: string;
    slug?: SanitySlug;
    title_en: string;
    title_zh: string;
    _type: "project" | "researchPost";
  }>;
};
