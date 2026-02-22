import imageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "@/lib/sanity/client";

const builder = imageUrlBuilder(sanityConfig);

export function urlForImage(source: unknown) {
  return builder.image(source as never);
}
