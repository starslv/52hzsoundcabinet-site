// Document types (collections)
import { homePageType } from "./documents/homePage";
import { projectType } from "./documents/project";
import { researchPostType } from "./documents/researchPost";
import { pressItemType } from "./documents/pressItem";
import { exhibitionType } from "./documents/expedition";

import { performanceType } from "./documents/performance";
import { publicationType } from "./documents/publication";
import { lectureType } from "./documents/lecture";

// Document types (single pages)
import { aboutPageType } from "./documents/aboutPage";
import { mediaKitPageType } from "./documents/mediaKitPage";
import { contactPageType } from "./documents/contactPage";

// Object types (used inside documents)
import { blockContentType } from "./objects/blockContent";
import { externalLinkType } from "./objects/externalLink";
import { dateRangeType } from "./objects/dateRange";

export const schemaTypes = [
  // Collections
homePageType,
  projectType,
  researchPostType,
  pressItemType,
  exhibitionType,
  performanceType,
  publicationType,
  lectureType,

  // Single pages
  aboutPageType,
  mediaKitPageType,
  contactPageType,

  // Objects
  blockContentType,
  externalLinkType,
  dateRangeType,
];