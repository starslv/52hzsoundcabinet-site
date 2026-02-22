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

export type DateRange = {
  startDate?: string;
  endDate?: string;
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
  relatedProjects?: Array<{
    _id: string;
    slug?: SanitySlug;
    title_en: string;
    title_zh: string;
    _type: "project";
  }>;
};

export type RelatedWorkRef = {
  _id: string;
  slug?: SanitySlug;
  title_en: string;
  title_zh: string;
  _type: "project" | "researchPost";
};

export type Exhibition = BaseContent & {
  // 展览核心信息
  venue?: string;
  collaborators?: string[];

  // 展期
  dateRange?: DateRange;

  // 关联作品（项目 / 研究文章）
  relatedWorks?: RelatedWorkRef[];
};