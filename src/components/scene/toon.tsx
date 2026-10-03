"use client";

import { Outlines } from "@react-three/drei";
import { DataTexture, NearestFilter, RedFormat } from "three";

const INK = "#3b2a1a";

const cache: { gradient?: DataTexture } = {};

/** 3-step ramp that gives MeshToonMaterial its flat, cartoon shading (shared by all materials). */
function getGradient() {
  if (!cache.gradient) {
    const t = new DataTexture(new Uint8Array([110, 190, 255]), 3, 1, RedFormat);
    t.minFilter = NearestFilter;
    t.magFilter = NearestFilter;
    t.needsUpdate = true;
    cache.gradient = t;
  }
  return cache.gradient;
}

export function Toon({ color, opacity }: { color: string; opacity?: number }) {
  const map = getGradient();
  return (
    <meshToonMaterial
      color={color}
      gradientMap={map}
      transparent={opacity !== undefined}
      opacity={opacity ?? 1}
    />
  );
}

/** Dark-brown cartoon outline to match the site's clay edges. */
export function Ink({ thickness = 0.035 }: { thickness?: number }) {
  return <Outlines thickness={thickness} color={INK} />;
}
