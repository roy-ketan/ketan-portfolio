"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, type Group, type Mesh, Shape } from "three";
import { Ink, Toon } from "./toon";

const DARK = "#2b1d12";

// Flat triangular sunray.
const rayShape = new Shape();
rayShape.moveTo(-0.18, 0);
rayShape.lineTo(0.18, 0);
rayShape.lineTo(0, 0.72);
rayShape.closePath();

// Open-smile mouth: a filled bottom semicircle.
const mouthShape = new Shape();
mouthShape.moveTo(-0.5, 0);
mouthShape.lineTo(0.5, 0);
mouthShape.absarc(0, 0, 0.5, 0, Math.PI, true);

// Butterfly wing: a teardrop, narrow at the body (0,0), rounded at the tip (+y).
const wingShape = new Shape();
wingShape.moveTo(0, 0);
wingShape.bezierCurveTo(0.44, 0.12, 0.48, 0.8, 0, 1.2);
wingShape.bezierCurveTo(-0.48, 0.8, -0.44, 0.12, 0, 0);

export function Sun() {
  const rays = useRef<Group>(null);
  useFrame((_, dt) => {
    if (rays.current) rays.current.rotation.z += dt * 0.12;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.45}>
      <group ref={rays} position={[0, 0, -0.2]}>
        {Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const len = i % 2 === 0 ? 1 : 0.84;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.44, Math.sin(a) * 1.44, 0]} rotation={[0, 0, a - Math.PI / 2]} scale={[1, len, 1]}>
              <shapeGeometry args={[rayShape]} />
              <Toon color="#f3c63c" side={DoubleSide} />
            </mesh>
          );
        })}
      </group>
      <mesh>
        <sphereGeometry args={[1.46, 48, 48]} />
        <Toon color="#f0d85e" />
        <Ink />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.44, 0.16, 1.3]} scale={[0.82, 1, 0.6]}>
            <sphereGeometry args={[0.2, 24, 24]} />
            <Toon color={DARK} />
          </mesh>
          <mesh position={[s * 0.44 - s * 0.05, 0.28, 1.45]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[s * 0.78, -0.22, 1.18]} scale={[1, 0.62, 0.3]}>
            <sphereGeometry args={[0.21, 20, 20]} />
            <Toon color="#ff9bb0" />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.24, 1.33]}>
        <shapeGeometry args={[mouthShape]} />
        <Toon color={DARK} side={DoubleSide} />
      </mesh>
      <mesh position={[0, -0.56, 1.35]}>
        <circleGeometry args={[0.18, 24]} />
        <meshBasicMaterial color="#ff7a9c" />
      </mesh>
    </Float>
  );
}

function FlowerHead({ petal }: { petal: string }) {
  return (
    <group>
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0]} rotation={[0, 0, a]} scale={[1, 0.72, 0.42]}>
            <sphereGeometry args={[0.44, 24, 24]} />
            <Toon color={petal} />
            <Ink thickness={0.02} />
          </mesh>
        );
      })}
      <mesh position={[0, 0, 0.16]} scale={[1, 1, 0.58]}>
        <sphereGeometry args={[0.36, 24, 24]} />
        <Toon color="#f2a81e" />
        <Ink thickness={0.02} />
      </mesh>
    </group>
  );
}

export function Flower({ petal = "#a62c5f", phase = 0 }: { petal?: string; phase?: number }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.9 + phase) * 0.07;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, -1.25, -0.05]}>
        <cylinderGeometry args={[0.06, 0.08, 2.5, 12]} />
        <Toon color="#3f9a3a" />
        <Ink thickness={0.02} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.32, -1.35 + s * 0.15, 0]} rotation={[0, 0, s * -0.6]} scale={[1, 0.42, 0.22]}>
          <sphereGeometry args={[0.38, 20, 20]} />
          <Toon color="#4cae3f" />
          <Ink thickness={0.02} />
        </mesh>
      ))}
      <FlowerHead petal={petal} />
    </group>
  );
}

// Wing splay: upper pair large, lower pair smaller. Each entry carries an eyespot flag.
const WINGS = [
  { rot: 0.5, s: 1.0, eye: true },
  { rot: -0.5, s: 1.0, eye: true },
  { rot: 2.5, s: 0.74, eye: false },
  { rot: -2.5, s: 0.74, eye: false },
];

/** Butterfly: slender dark body, antennae and four outlined translucent wings with eyespots. */
export function Butterfly({ body = DARK, wing = "#7bb0e4", flip = false }: { body?: string; wing?: string; flip?: boolean }) {
  const root = useRef<Group>(null);
  const wings = useRef<Group>(null);
  const ph = flip ? 1.7 : 0;
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + ph;
    if (root.current) {
      root.current.position.x = Math.sin(t * 0.9) * 0.18;
      root.current.position.y = Math.sin(t * 1.35) * 0.16;
      root.current.rotation.z = (flip ? -1 : 1) * 0.12 + Math.sin(t * 0.7) * 0.09;
    }
    // Narrowing the wings toward the body reads as a flap for the flat 2D wings.
    if (wings.current) wings.current.scale.x = 0.55 + 0.45 * Math.abs(Math.cos(t * 6));
  });
  return (
    <Float speed={1} rotationIntensity={0.08} floatIntensity={0.4}>
      <group ref={root}>
        <mesh position={[0, 0.12, 0]}>
          <capsuleGeometry args={[0.1, 0.9, 8, 16]} />
          <Toon color={body} />
          <Ink thickness={0.03} />
        </mesh>
        <mesh position={[0, 0.74, 0]}>
          <sphereGeometry args={[0.16, 20, 20]} />
          <Toon color={body} />
          <Ink thickness={0.03} />
        </mesh>
        {[-1, 1].map((s) => (
          <group key={s}>
            <mesh position={[s * 0.12, 0.98, 0]} rotation={[0, 0, s * -0.5]}>
              <cylinderGeometry args={[0.014, 0.014, 0.4, 8]} />
              <Toon color={body} />
            </mesh>
            <mesh position={[s * 0.26, 1.18, 0]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <Toon color={body} />
            </mesh>
          </group>
        ))}
        <group ref={wings} position={[0, 0.22, -0.04]}>
          {WINGS.map((wg, i) => (
            <group key={i} rotation={[0, 0, wg.rot]} scale={[wg.s, wg.s, 1]}>
              <mesh>
                <extrudeGeometry args={[wingShape, { depth: 0.05, bevelEnabled: false }]} />
                <meshBasicMaterial color={wing} transparent opacity={0.66} side={DoubleSide} />
                <Ink thickness={0.05} />
              </mesh>
              {wg.eye && (
                <>
                  <mesh position={[0, 0.72, 0.1]}>
                    <circleGeometry args={[0.16, 20]} />
                    <meshBasicMaterial color="#ffffff" />
                  </mesh>
                  <mesh position={[0, 0.72, 0.11]}>
                    <circleGeometry args={[0.08, 16]} />
                    <meshBasicMaterial color={DARK} />
                  </mesh>
                </>
              )}
            </group>
          ))}
        </group>
      </group>
    </Float>
  );
}

const codeLines = [
  { w: 1.65, x: 0, c: "#f0a0b8" },
  { w: 1.05, x: 0.32, c: "#9fe08a" },
  { w: 1.4, x: 0.32, c: "#8cc7ff" },
  { w: 0.8, x: 0.62, c: "#ffd36a" },
  { w: 1.25, x: 0.32, c: "#f0a0b8" },
  { w: 0.95, x: 0, c: "#c9b8ff" },
];

/** Flat, tilted code-editor window: title bar, traffic lights and syntax bars. */
export function Monitor() {
  const cursor = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (cursor.current) cursor.current.visible = Math.floor(clock.elapsedTime * 2) % 2 === 0;
  });
  const last = codeLines.length - 1;
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group rotation={[0.03, -0.14, 0.08]}>
        <RoundedBox args={[3.0, 2.25, 0.28]} radius={0.14} smoothness={4}>
          <Toon color="#2a1c11" />
          <Ink />
        </RoundedBox>
        <RoundedBox args={[2.74, 1.98, 0.14]} radius={0.09} position={[0, -0.02, 0.1]}>
          <Toon color="#140d07" />
        </RoundedBox>
        <mesh position={[0, 0.82, 0.19]}>
          <planeGeometry args={[2.74, 0.32]} />
          <meshBasicMaterial color="#221811" />
        </mesh>
        {["#e0705c", "#e6b24d", "#8fc866"].map((c, i) => (
          <mesh key={c} position={[-1.18 + i * 0.22, 0.82, 0.21]}>
            <circleGeometry args={[0.065, 20]} />
            <meshBasicMaterial color={c} />
          </mesh>
        ))}
        {codeLines.map((l, i) => (
          <mesh key={i} position={[-1.18 + l.x + l.w / 2, 0.4 - i * 0.24, 0.19]}>
            <planeGeometry args={[l.w, 0.12]} />
            <meshBasicMaterial color={l.c} />
          </mesh>
        ))}
        <mesh ref={cursor} position={[-1.18 + codeLines[last].x + codeLines[last].w + 0.12, 0.4 - last * 0.24, 0.19]}>
          <planeGeometry args={[0.06, 0.16]} />
          <meshBasicMaterial color="#f6e7b0" />
        </mesh>
      </group>
    </Float>
  );
}
