"use client";

import { useEffect, useRef } from "react";

// Hotspot of the arrow tip inside the 36x37 box.
const HOT_X = 5.5;
const HOT_Y = 4.2;

const ARROW =
  "M5.5 4.2 L5.5 27.5 Q5.5 29 6.8 28 L11.4 23.6 L15.2 32.2 Q15.8 33.4 17 32.9 L19.6 31.7 Q20.8 31.1 20.3 29.9 L16.6 21.6 L23.3 21.2 Q25 21 23.7 19.8 L7.2 4.3 Q5.5 2.9 5.5 4.2 Z";
// Paw pad: the arrow morphs into this over elements marked data-cursor="paw".
const PAW =
  "M 11.0 5.6 C 4.9 5.6 0.2 11.4 2.4 17.1 C 4.1 21.6 8.2 20.8 11.0 20.8 C 13.8 20.8 17.9 21.6 19.6 17.1 C 21.8 11.4 17.1 5.6 11.0 5.6 Z";

/**
 * Pointer-following arrow. Clicking bursts five lavender rays with a springy
 * squish; over elements marked `data-cursor="paw"` it becomes a paw instead.
 * Only active for real mouse pointers, and the native cursor is hidden only
 * once this one is actually tracking, so the cursor can never vanish.
 */
export default function CustomCursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const arrow = useRef<SVGPathElement>(null);
  const toes = useRef<SVGGElement>(null);
  const rays = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const bodyEl = body.current;
    const arrowEl = arrow.current;
    const toesEl = toes.current;
    const raysEl = rays.current;
    if (!el || !bodyEl || !arrowEl || !toesEl || !raysEl) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    const canMorph = CSS.supports("d", `path("${ARROW}")`);
    const rayEls = Array.from(raysEl.querySelectorAll<SVGPathElement>("[data-ray]"));

    let px = 0;
    let py = 0;
    let visible = false;
    let isPaw = false;
    let last: EventTarget | null = null;
    let scrollRaf = 0;
    let anims: Animation[] = [];

    const setD = (d: string) => {
      if (canMorph) arrowEl.style.setProperty("d", `path("${d}")`);
      else arrowEl.setAttribute("d", d);
    };

    const setPaw = (target: EventTarget | null) => {
      last = target;
      const next = !!(target instanceof Element && target.closest('[data-cursor="paw"]'));
      if (next === isPaw) return;
      isPaw = next;
      el.dataset.paw = String(next);
      setD(next ? PAW : ARROW);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
        root.classList.add("custom-cursor");
      }
      if (e.target !== last) setPaw(e.target);
      el.style.transform = `translate3d(${px - HOT_X}px, ${py - HOT_Y}px, 0)`;
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      move(e);
      anims.forEach((a) => a.cancel());
      anims = [];
      rayEls.forEach((r) => {
        r.style.opacity = "0";
      });
      if (reduce.matches) return;

      if (isPaw) {
        // Paw: a quick squish, no rays.
        const opts = { duration: 180, easing: "cubic-bezier(0.2, 0, 0.2, 1)" };
        anims = [
          toesEl.animate(
            [{ transform: "scale(1)" }, { transform: "scale(0.88, 0.82)", offset: 0.35 }, { transform: "scale(1)" }],
            opts,
          ),
          arrowEl.animate(
            [{ transform: "scale(1)" }, { transform: "scale(0.96, 0.94)", offset: 0.35 }, { transform: "scale(1)" }],
            opts,
          ),
        ];
        return;
      }

      // Arrow: spring-like pulse plus five rays drawing out and fading.
      anims = [
        bodyEl.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(0.84)", offset: 0.22 },
            { transform: "scale(1.04)", offset: 0.6 },
            { transform: "scale(1)" },
          ],
          { duration: 300, easing: "ease-out" },
        ),
        ...rayEls.map((r) =>
          r.animate(
            [
              { opacity: 1, strokeDasharray: "0 1", strokeDashoffset: "0", easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
              { opacity: 1, strokeDasharray: "1 1", strokeDashoffset: "0", offset: 0.44 },
              { opacity: 1, strokeDasharray: "1 1", strokeDashoffset: "0", offset: 0.54, easing: "cubic-bezier(0.4, 0, 1, 1)" },
              { opacity: 1, strokeDasharray: "0 1", strokeDashoffset: "-1" },
            ],
            { duration: 280 },
          ),
        ),
      ];
    };

    const hide = () => {
      visible = false;
      last = null;
      el.style.opacity = "0";
    };

    // Re-evaluate what is under a stationary pointer after the page scrolls.
    const onScroll = () => {
      if (!visible || scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        setPaw(document.elementFromPoint(px, py));
      });
    };

    window.addEventListener("pointermove", move, { capture: true, passive: true });
    window.addEventListener("pointerdown", down, { capture: true, passive: true });
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("blur", hide);
    root.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("pointermove", move, true);
      window.removeEventListener("pointerdown", down, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("blur", hide);
      root.removeEventListener("mouseleave", hide);
      cancelAnimationFrame(scrollRaf);
      anims.forEach((a) => a.cancel());
      root.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      data-paw="false"
      className="group/cursor pointer-events-none fixed left-0 top-0 z-[2147483647] hidden h-[37px] w-[36px] opacity-0 will-change-transform [@media(pointer:fine)]:block"
    >
      <div ref={body} className="h-full w-full" style={{ transformOrigin: `${HOT_X}px ${HOT_Y}px` }}>
        <svg viewBox="0 0 36 37" className="block h-full w-full overflow-visible" shapeRendering="geometricPrecision">
          <defs>
            <filter id="cursor-shadow" x="-6" y="-8" width="52" height="56" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="1.6" stdDeviation="2.4" floodOpacity="0.22" />
            </filter>
          </defs>
          <g filter="url(#cursor-shadow)">
            <path
              ref={arrow}
              d={ARROW}
              fill="#060606"
              stroke="#fff"
              strokeWidth="1.9"
              strokeLinejoin="round"
              style={{ transformOrigin: "11px 14px" }}
              className="transition-[stroke] duration-150 ease-out group-data-[paw=true]/cursor:stroke-[#C8B5E9] [@supports(d:path('M0 0'))]:transition-[d,stroke]"
            />
            <g
              ref={toes}
              fill="#060606"
              stroke="#C8B5E9"
              strokeWidth="1.6"
              style={{ transformOrigin: "11px 14px" }}
              className="opacity-0 transition-opacity duration-100 ease-out group-data-[paw=true]/cursor:opacity-100"
            >
              <ellipse cx="2.4" cy="8.7" rx="2.8" ry="3.9" transform="rotate(-20 2.4 8.7)" />
              <ellipse cx="7.5" cy="2.5" rx="2.8" ry="3.9" transform="rotate(-8 7.5 2.5)" />
              <ellipse cx="14.5" cy="2.5" rx="2.8" ry="3.9" transform="rotate(8 14.5 2.5)" />
              <ellipse cx="19.6" cy="8.7" rx="2.8" ry="3.9" transform="rotate(20 19.6 8.7)" />
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
            <path data-ray pathLength="1" opacity="0" strokeDasharray="0 1" d="M5.5 -0.6 V-7" />
            <path data-ray pathLength="1" opacity="0" strokeDasharray="0 1" d="M0.8 0.8 L-3.8 -3.8" />
            <path data-ray pathLength="1" opacity="0" strokeDasharray="0 1" d="M10.4 0.8 L15 -3.8" />
            <path data-ray pathLength="1" opacity="0" strokeDasharray="0 1" d="M-1.2 5.4 H-7.4" />
            <path data-ray pathLength="1" opacity="0" strokeDasharray="0 1" d="M0.8 10 L-3.8 14.6" />
          </g>
        </svg>
      </div>
    </div>
  );
}
