"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";
import { Butterfly, Flower, Monitor, Sun } from "./Props";

/** Places the props around the viewport edges, drifts them up as the hero scrolls away, and parallaxes them toward the cursor. */
function Layout() {
  const { width: w, height: h } = useThree((s) => s.viewport);
  const root = useRef<Group>(null);
  // Normalized pointer (-1..1). The canvas sits under pointer-events:none layers, so we track the window.
  const pointer = useRef({ x: 0, y: 0 });
  // Click feedback: a pulse that spikes on press and decays, giving the props a little "pop".
  const pop = useRef(0);
  const k = Math.min(1, w / 15);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onDown = () => {
      pop.current = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  useFrame(() => {
    const g = root.current;
    if (!g) return;
    const scroll = Math.min(1.5, window.scrollY / window.innerHeight);
    const tx = pointer.current.x * 0.7;
    const ty = scroll * h * 0.35 - pointer.current.y * 0.45;
    // Rotating the group around its centre lets props further out swing more, which reads as depth.
    const ry = pointer.current.x * 0.14;
    const rx = pointer.current.y * 0.1;
    g.position.x += (tx - g.position.x) * 0.05;
    g.position.y += (ty - g.position.y) * 0.05;
    g.rotation.y += (ry - g.rotation.y) * 0.05;
    g.rotation.x += (rx - g.rotation.x) * 0.05;
    pop.current *= 0.86;
    g.scale.setScalar(1 + pop.current * 0.05);
  });

  return (
    <group ref={root}>
      <group position={[-w / 2 + 2.1 * k, h / 2 - 1.5 * k, -0.5]} scale={1.05 * k}>
        <Monitor />
      </group>
      <group position={[w / 2 - 1.7 * k, h / 2 - 1.7 * k, -1]} scale={1.3 * k}>
        <Sun />
      </group>
      <group position={[-w / 2 + 1.3 * k, -h / 2 + 1.7 * k, 0]} scale={1.3 * k}>
        <Flower />
      </group>
      <group position={[-w / 2 + 2.4 * k, -h / 2 + 3.0 * k, 0.4]} scale={1.05 * k}>
        <Butterfly wing="#7bb0e4" />
      </group>
      <group position={[w / 2 - 1.5 * k, -h / 2 + 1.6 * k, 0]} scale={1.2 * k}>
        <Flower />
      </group>
      <group position={[w / 2 - 2.1 * k, -h / 2 + 3.0 * k, 0.4]} scale={1.05 * k}>
        <Butterfly wing="#eaa23e" flip />
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
