"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fade/blur-in on scroll. Content is visible by default (SSR, no-JS, crawlers);
 * only elements that start below the fold are hidden after hydration and then
 * revealed as they approach the viewport.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight - 40) return;

    el.style.transitionDelay = `${delay}s`;
    el.dataset.reveal = "hidden";
    const show = () => {
      el.dataset.reveal = "shown";
      io.disconnect();
    };
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && show(),
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
