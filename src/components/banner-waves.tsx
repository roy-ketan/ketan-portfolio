import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** One drifting ridge. Depth drives speed, height and opacity so the layers read as distance. */
const LAYERS = [
  { amp: 0.16, freq: 1.5, speed: 0.012, base: 0.34, alpha: 0.1 },
  { amp: 0.13, freq: 2.1, speed: 0.019, base: 0.46, alpha: 0.16 },
  { amp: 0.11, freq: 2.9, speed: 0.027, base: 0.58, alpha: 0.24 },
  { amp: 0.09, freq: 3.7, speed: 0.037, base: 0.7, alpha: 0.34 },
  { amp: 0.07, freq: 4.9, speed: 0.05, base: 0.82, alpha: 0.46 },
];

function readForeground(): string {
  if (typeof window === "undefined") return "rgb(0,0,0)";
  const el = document.createElement("div");
  el.style.cssText = "color:var(--foreground);position:absolute;visibility:hidden";
  document.body.appendChild(el);
  const c = getComputedStyle(el).color;
  document.body.removeChild(el);
  return c || "rgb(0,0,0)";
}

export default function BannerWaves({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  // Kept as the raw computed string (may be rgb(), oklch(), …); per-layer opacity
  // comes from globalAlpha so we never have to parse the colour format.
  const [color, setColor] = useState("rgb(0,0,0)");

  // Re-read the themed colour whenever the theme class flips.
  useEffect(() => {
    const update = () => setColor(readForeground());
    update();
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const L of LAYERS) {
        const phase = reduce ? 0 : t * L.speed;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 2) {
          const u = x / Math.max(w, 1);
          const y =
            h * L.base +
            Math.sin(u * L.freq * Math.PI * 2 + phase) * h * L.amp +
            Math.sin(u * L.freq * Math.PI * 1.17 - phase * 0.6) * h * L.amp * 0.4;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.globalAlpha = L.alpha;
        ctx.fillStyle = color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let start: number | null = null;
    const loop = (now: number) => {
      if (start === null) start = now;
      draw((now - start) / 100);
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const play = () => {
      if (!raf && visible && !reduce && !document.hidden) raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) {
      draw(0);
    } else {
      play();
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play();
      else stop();
    });
    io.observe(wrap);

    const onVis = () => (document.hidden ? stop() : play());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [color]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={cn("relative w-full overflow-hidden rounded-xl border bg-muted/30", className)}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
