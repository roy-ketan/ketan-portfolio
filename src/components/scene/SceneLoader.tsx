"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Mounts the 3D hero scene only on wider screens with WebGL, and pauses
 * rendering whenever the hero is scrolled out of view.
 */
export default function SceneLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const update = () => setEnabled(wide.matches && supportsWebGL());
    update();
    wide.addEventListener("change", update);

    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    return () => {
      wide.removeEventListener("change", update);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {enabled && <Scene active={visible} />}
    </div>
  );
}
