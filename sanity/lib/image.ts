import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

/**
 * Minimal compatible type for Sanity image-url builder across versions.
 * Sanity Image objects are typically: { _type: "image", asset: { _ref: "image-..." } }
 */
export type SanityImageSource =
  | {
      _type?: string;
      asset?:
        | { _ref?: string; _type?: "reference" }
        | { _id?: string; _type?: "reference" };
      [key: string]: unknown;
    }
  | string
  | null
  | undefined;

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source as any);
}

export function urlForImage(source: SanityImageSource) {
  return urlFor(source);
}