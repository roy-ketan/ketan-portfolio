"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { Bee, Flower, Monitor, Sun } from "./Props";

/** Places the props around the viewport edges and drifts them up as the hero scrolls away. */
function Layout() {
  const { width: w, height: h } = useThree((s) => s.viewport);
  const root = useRef<Group>(null);
  const k = Math.min(1, w / 15);

  useFrame(() => {
    if (!root.current) return;
    const p = Math.min(1.5, window.scrollY / window.innerHeight);
    root.current.position.y = p * h * 0.35;
  });

  return (
    <group ref={root}>
      <group position={[-w / 2 + 1.0 * k, h / 2 - 2.2 * k, -0.5]} scale={k}>
        <Monitor />
      </group>
      <group position={[w / 2 - 1.1 * k, h / 2 - 1.3 * k, -1]} scale={1.15 * k}>
        <Sun />
      </group>
      <group position={[-w / 2 + 0.9 * k, -h / 2 + 1.5 * k, 0]} scale={1.1 * k}>
        <Flower />
      </group>
      <group position={[-w / 2 + 2.4 * k, -h / 2 + 0.6 * k, 0.3]} scale={0.75 * k}>
        <Flower petal="#f08c1e" phase={1.7} />
      </group>
      <group position={[w / 2 - 0.9 * k, -h / 2 + 2.4 * k, 0.5]} scale={0.95 * k}>
        <Bee />
      </group>
    </group>
  );
}

export default function Scene({ active }: { active: boolean }) {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 12], fov: 40 }}
      frameloop={reduce ? "demand" : active ? "always" : "never"}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 6, 8]} intensity={1.5} />
      <Layout />
    </Canvas>
  );
}
