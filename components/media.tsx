import Image from "next/image";
import type { SanityImageAsset } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

export function CoverImage({ image, title }: { image?: SanityImageAsset; title: string }) {
  if (!image) {
    return null;
  }

  const imageUrl = urlForImage(image).width(1440).height(900).fit("crop").url();

  return (
    <figure className="cover-image">
      <Image src={imageUrl} alt={title} width={1440} height={900} />
    </figure>
  );
}

export function Gallery({ images, title }: { images?: SanityImageAsset[]; title: string }) {
  if (!images?.length) {
    return null;
  }

  return (
    <section aria-label="Gallery" className="media-grid">
      {images.map((image, index) => {
        const imageUrl = urlForImage(image).width(900).height(600).fit("crop").url();

        return (
          <Image
            key={`${image._ref || "image"}-${index}`}
            src={imageUrl}
            alt={`${title} image ${index + 1}`}
            width={900}
            height={600}
          />
        );
      })}
    </section>
  );
}

export function VideoEmbeds({ urls }: { urls?: string[] }) {
  if (!urls?.length) {
    return null;
  }

  return (
    <section aria-label="Video embeds" className="video-grid">
      {urls.map((url, index) => (
        <div key={`${url}-${index}`} className="video-embed">
          <iframe
            src={url}
            title={`Embedded video ${index + 1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
    </section>
  );
}
