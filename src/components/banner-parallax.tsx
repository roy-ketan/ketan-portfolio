import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ART_RATIO = 320 / 240;

// Show only the bottom slice of the scene — mountains, mist and treeline. The sun
// sits in the top ~45%, so cropping it out means the horizontal repeat reads as a
// continuous ridge rather than a row of duplicated suns.
const VISIBLE = 0.55;

/** Back to front. `seconds` is how long one tile takes to scroll past; nearer layers move faster. */
const LAYERS = [
  { src: "/banner/sky.png", seconds: 0 },
  { src: "/banner/far-mountains.png", seconds: 200 },
  { src: "/banner/middle-mountains.png", seconds: 130 },
  { src: "/banner/myst.png", seconds: 85 },
  { src: "/banner/far-trees.png", seconds: 58 },
  { src: "/banner/near-trees.png", seconds: 36 },
];

// Fade the left/right ends and the bottom so the art dissolves into the page
// instead of sitting in a hard-edged box. Both gradients are intersected, so a
// pixel is only painted where it survives each one.
// Extra stops on the vertical gradient ease the top edge in gradually, so the art
// melts into the dark strip above instead of starting on a hard line.
const FADE =
  "linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%), " +
  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.18) 10%, rgba(0,0,0,0.55) 22%, " +
  "rgba(0,0,0,0.85) 32%, #000 42%, #000 52%, transparent 97%)";

const MASK = {
  maskImage: FADE,
  WebkitMaskImage: FADE,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as React.CSSProperties;

export default function BannerParallax({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(0);

  // The scroll distance must equal exactly one tile width or the loop visibly jumps.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setTile(Math.round((el.clientHeight / VISIBLE) * ART_RATIO));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("banner-parallax pointer-events-none relative w-full overflow-hidden", className)}
      style={{ "--tile": `${tile}px`, ...MASK } as React.CSSProperties}
    >
      {LAYERS.map((l) => (
        <div
          key={l.src}
          className="absolute inset-0 bg-repeat-x"
          style={{
            backgroundImage: `url(${l.src})`,
            backgroundSize: tile ? `var(--tile) ${Math.round(tile / ART_RATIO)}px` : "auto 100%",
            backgroundPositionY: "100%",
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
