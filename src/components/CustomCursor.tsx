"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, summary, [role='button'], input, select, textarea, label";

/**
 * Soft-following arrow cursor. On click it bursts five lavender rays; over
 * links and buttons it turns into a paw. Only on devices with a fine pointer,
 * and the native cursor is restored if anything goes wrong.
 */
export default function CustomCursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const rays = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = wrap.current;
    const body = inner.current;
    if (!el || !body) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    let tx = -100;
    let ty = -100;
    let x = tx;
    let y = ty;
    let raf = 0;
    let seen = false;

    const frame = () => {
      x += (tx - x) * (reduce ? 1 : 0.35);
      y += (ty - y) * (reduce ? 1 : 0.35);
      el.style.transform = `translate3d(${x - 5}px, ${y - 4}px, 0)`;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        x = tx;
        y = ty;
        el.style.opacity = "1";
        root.classList.add("custom-cursor");
      }
      const target = e.target as Element | null;
      el.dataset.paw = String(!!target?.closest?.(INTERACTIVE));
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    const onEnter = () => {
      if (seen) el.style.opacity = "1";
    };
    const onDown = () => {
      body.style.transform = "scale(0.86)";
      const g = rays.current;
      if (g && !reduce) {
        g.classList.remove("cursor-burst");
        void g.getBoundingClientRect();
        g.classList.add("cursor-burst");
      }
    };
    const onUp = () => {
      body.style.transform = "";
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      data-paw="false"
      className="group/cursor pointer-events-none fixed left-0 top-0 z-[2147483647] hidden h-[37px] w-[36px] opacity-0 will-change-transform [@media(pointer:fine)]:block"
      style={{ transition: "opacity 150ms" }}
    >
      <div
        ref={inner}
        className="h-full w-full transition-transform duration-100 ease-out"
        style={{ transformOrigin: "5px 4px" }}
      >
        <svg viewBox="0 0 36 37" className="block h-full w-full overflow-visible" shapeRendering="geometricPrecision">
          <defs>
            <filter id="cursor-shadow" x="-4" y="-2" width="50" height="50" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="1.6" stdDeviation="2.4" floodOpacity="0.22" />
            </filter>
          </defs>
          <g filter="url(#cursor-shadow)">
            <path
              d="M5.5 4.2 L5.5 27.5 Q5.5 29 6.8 28 L11.4 23.6 L15.2 32.2 Q15.8 33.4 17 32.9 L19.6 31.7 Q20.8 31.1 20.3 29.9 L16.6 21.6 L23.3 21.2 Q25 21 23.7 19.8 L7.2 4.3 Q5.5 2.9 5.5 4.2 Z"
              fill="#060606"
              strokeWidth="1.9"
              strokeLinejoin="round"
              className="stroke-white transition-[stroke] duration-150 group-data-[paw=true]/cursor:stroke-[#C8B5E9]"
            />
            <g
              className="opacity-0 transition-opacity duration-100 group-data-[paw=true]/cursor:opacity-100"
              fill="#060606"
              stroke="#C8B5E9"
              strokeWidth="1.5"
              transform="translate(9 8) scale(0.34)"
            >
              <ellipse cx="16" cy="28" rx="5" ry="7" transform="rotate(-20 16 28)" />
              <ellipse cx="26" cy="20" rx="5" ry="7" transform="rotate(-8 26 20)" />
              <ellipse cx="38" cy="20" rx="5" ry="7" transform="rotate(8 38 20)" />
              <ellipse cx="48" cy="28" rx="5" ry="7" transform="rotate(20 48 28)" />
              <path d="M32 33 C22 33 16 42 20 48 C24 53 28 51 32 51 C36 51 40 53 44 48 C48 42 42 33 32 33 Z" />
            </g>
          </g>
          <g
            ref={rays}
            stroke="#C8B5E9"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
            className="group-data-[paw=true]/cursor:opacity-0"
          >
            <path className="cursor-ray" pathLength="1" d="M5.5 -1 V-7" />
            <path className="cursor-ray" pathLength="1" d="M0.5 0.5 L-4 -4" />
            <path className="cursor-ray" pathLength="1" d="M10.5 0.5 L15 -4" />
            <path className="cursor-ray" pathLength="1" d="M-1 5 H-7" />
            <path className="cursor-ray" pathLength="1" d="M0.5 9.5 L-4 14" />
          </g>
        </svg>
      </div>
    </div>
  );
}
