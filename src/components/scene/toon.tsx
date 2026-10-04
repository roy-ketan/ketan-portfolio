"use client";

import { Outlines } from "@react-three/drei";
import { type Side } from "three";

const INK = "#3b2a1a";

/**
 * Flat, unlit fill. Using an unlit material (no lighting, no toon ramp) makes even
 * spheres read as flat 2D cutouts, which is the cartoon look of the reference.
 */
export function Toon({ color, opacity, side }: { color: string; opacity?: number; side?: Side }) {
  return (
    <meshBasicMaterial
      color={color}
      transparent={opacity !== undefined}
      opacity={opacity ?? 1}
      side={side}
    />
  );
}

/** Dark cartoon outline around a shape's silhouette. */
export function Ink({ thickness = 0.04 }: { thickness?: number }) {
  return <Outlines thickness={thickness} color={INK} />;
}
