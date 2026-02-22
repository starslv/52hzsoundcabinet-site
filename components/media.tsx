import Image from "next/image";
import type { SanityImageAsset } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

//
// 🎬 COVER IMAGE
//
export function CoverImage({
  image,
  title
}: {
  image?: SanityImageAsset;
  title: string;
}) {
  // ✅ 必须判断 asset._ref 是否存在
  if (!image?.asset?._ref) {
    return null;
  }

  const imageUrl = urlForImage(image)
    .width(1440)
    .height(900)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <figure className="cover-image">
      <Image
        src={imageUrl}
        alt={title}
        width={1440}
        height={900}
        priority
        style={{ width: "100%", height: "auto" }}
      />
    </figure>
  );
}

//
// 🖼 GALLERY
//
export function Gallery({
  images,
  title
}: {
  images?: SanityImageAsset[];
  title: string;
}) {
  if (!images?.length) {
    return null;
  }

  return (
    <section aria-label="Gallery" className="media-grid">
      {images.map((image, index) => {
        // ✅ 没有 ref 就跳过（否则 build error）
        if (!image?.asset?._ref) return null;

        const imageUrl = urlForImage(image)
          .width(900)
          .height(600)
          .fit("crop")
          .auto("format")
          .url();

        // ✅ key 不能用 image._ref
        const key = image.asset._ref
          ? `${image.asset._ref}-${index}`
          : `image-${index}`;

        return (
          <Image
            key={key}
            src={imageUrl}
            alt={`${title} image ${index + 1}`}
            width={900}
            height={600}
            style={{ width: "100%", height: "auto" }}
          />
        );
      })}
    </section>
  );
}

//
// ▶️ VIDEO EMBEDS
//
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
            style={{
              width: "100%",
              height: "480px",
              border: "none"
            }}
          />
        </div>
      ))}
    </section>
  );
}