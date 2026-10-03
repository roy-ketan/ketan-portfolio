"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, type Group, type Mesh, Shape } from "three";
import { Ink, Toon } from "./toon";

const DARK = "#2b1d12";

// Flat triangular sunray.
const rayShape = new Shape();
rayShape.moveTo(-0.2, 0);
rayShape.lineTo(0.2, 0);
rayShape.lineTo(0, 0.82);
rayShape.closePath();

// Open-smile mouth: a filled bottom semicircle.
const mouthShape = new Shape();
mouthShape.moveTo(-0.5, 0);
mouthShape.lineTo(0.5, 0);
mouthShape.absarc(0, 0, 0.5, 0, Math.PI, true);

export function Sun() {
  const rays = useRef<Group>(null);
  useFrame((_, dt) => {
    if (rays.current) rays.current.rotation.z += dt * 0.12;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.45}>
      <group ref={rays} position={[0, 0, -0.2]}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const len = i % 2 === 0 ? 1 : 0.78;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.42, Math.sin(a) * 1.42, 0]} rotation={[0, 0, a - Math.PI / 2]} scale={[1, len, 1]}>
              <shapeGeometry args={[rayShape]} />
              <Toon color="#f4c537" side={DoubleSide} />
            </mesh>
          );
        })}
      </group>
      <mesh>
        <sphereGeometry args={[1.46, 48, 48]} />
        <Toon color="#f1d250" />
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

/** Floppy-eared dog mascot: orange body, one navy ear, one cream ear, one big eye. */
export function Dog() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime;
      ref.current.rotation.z = Math.sin(t * 0.8) * 0.05;
      ref.current.position.y = Math.sin(t * 1.1) * 0.12;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={ref}>
        <mesh scale={[1, 1.08, 0.9]}>
          <sphereGeometry args={[0.95, 40, 40]} />
          <Toon color="#e2883a" />
          <Ink />
        </mesh>
        <mesh position={[0.05, -0.32, 0.5]} scale={[0.78, 0.72, 0.5]}>
          <sphereGeometry args={[0.62, 32, 32]} />
          <Toon color="#f0b575" />
        </mesh>
        <group position={[-0.82, 0.32, 0.08]} rotation={[0, 0, 0.55]}>
          <mesh scale={[0.46, 0.98, 0.3]}>
            <sphereGeometry args={[0.6, 28, 28]} />
            <Toon color="#30407d" />
            <Ink thickness={0.03} />
          </mesh>
        </group>
        <group position={[0.92, 0.02, 0.08]} rotation={[0, 0, -1.02]}>
          <mesh scale={[0.56, 1.4, 0.32]}>
            <sphereGeometry args={[0.64, 28, 28]} />
            <Toon color="#ecd0a4" />
            <Ink thickness={0.03} />
          </mesh>
        </group>
        <mesh position={[0.1, 0.08, 0.85]} scale={[1, 1.12, 1]}>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.13, 0.04, 1.0]}>
          <sphereGeometry args={[0.095, 16, 16]} />
          <Toon color={DARK} />
        </mesh>
        <mesh position={[0.16, 0.09, 1.07]}>
          <sphereGeometry args={[0.032, 10, 10]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.08, -0.42, 0.82]}>
          <sphereGeometry args={[0.14, 20, 20]} />
          <Toon color={DARK} />
        </mesh>
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
