import type { Img } from "@/lib/images";

type Props = {
  img: Img;
  alt: string;
  pendingLabel: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Renders the real photo once it exists in /public, otherwise a material-textured placeholder
 * that shows which file is expected (same aspect ratio → no layout shift when swapped).
 */
export default function Photo({ img, alt, pendingLabel, className = "", priority = false }: Props) {
  const style = { aspectRatio: `${img.width} / ${img.height}` };
  if (img.exists) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={`photo ${className}`}
        src={img.src}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={style}
      />
    );
  }
  return (
    <div className={`photo photo--ph tone-${img.tone} ${className}`} style={style} role="img" aria-label={alt}>
      <span className="photo__tag" aria-hidden="true">
        <span>{pendingLabel}</span>
        <code>{img.src.replace("/images/", "")}</code>
        <small>
          {img.width}×{img.height}
        </small>
      </span>
    </div>
  );
}
