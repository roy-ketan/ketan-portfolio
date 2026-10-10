import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Source art is 320x240 and tiles seamlessly. Sizing one tile to the full container
// width keeps a single sun in frame (tiling to height would repeat it ~2.4x); the
// extra image height is cropped by the banner.
const ART_RATIO = 240 / 320;

/** Back to front. `seconds` is how long one tile takes to scroll past; nearer layers move faster. */
const LAYERS = [
  { src: "/banner/sky.png", seconds: 0 },
  { src: "/banner/far-mountains.png", seconds: 200 },
  { src: "/banner/middle-mountains.png", seconds: 130 },
  { src: "/banner/myst.png", seconds: 85 },
  { src: "/banner/far-trees.png", seconds: 58 },
  { src: "/banner/near-trees.png", seconds: 36 },
];

export default function BannerParallax({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(0);

  // The scroll distance must equal exactly one tile width or the loop visibly jumps.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setTile(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("banner-parallax relative w-full overflow-hidden rounded-xl border", className)}
      style={{ "--tile": `${tile}px` } as React.CSSProperties}
    >
      {LAYERS.map((l) => (
        <div
          key={l.src}
          className="absolute inset-0 bg-repeat-x"
          style={{
            backgroundImage: `url(${l.src})`,
            backgroundSize: tile ? `var(--tile) ${Math.round(tile * ART_RATIO)}px` : "100% auto",
            backgroundPositionY: "62%",
            imageRendering: "pixelated",
            ...(l.seconds && tile
              ? { animation: `banner-scroll ${l.seconds}s linear infinite` }
              : null),
          }}
        />
      ))}
    </div>
  );
}
