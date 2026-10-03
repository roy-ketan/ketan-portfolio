"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { Ink, Toon } from "./toon";

const DARK = "#2b1d12";

export function Sun() {
  const rays = useRef<Group>(null);
  useFrame((_, dt) => {
    if (rays.current) rays.current.rotation.z += dt * 0.15;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={rays}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.78, Math.sin(a) * 1.78, -0.25]} rotation={[0, 0, a - Math.PI / 2]}>
              <coneGeometry args={[0.24, 0.62, 16]} />
              <Toon color="#ffbf3c" />
              <Ink thickness={0.03} />
            </mesh>
          );
        })}
      </group>
      <mesh>
        <sphereGeometry args={[1.4, 48, 48]} />
        <Toon color="#ffd84d" />
        <Ink />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.42, 0.28, 1.31]}>
            <sphereGeometry args={[0.16, 24, 24]} />
            <Toon color={DARK} />
          </mesh>
          <mesh position={[s * 0.42 + 0.05, 0.34, 1.45]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[s * 0.8, -0.12, 1.12]} scale={[1, 0.6, 0.3]}>
            <sphereGeometry args={[0.24, 20, 20]} />
            <Toon color="#ff9bb0" />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.12, 1.33]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.38, 0.07, 12, 32, Math.PI]} />
        <Toon color={DARK} />
      </mesh>
    </Float>
  );
}

function FlowerHead({ petal }: { petal: string }) {
  return (
    <group>
      {Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0]} rotation={[0, 0, a]} scale={[1, 0.58, 0.25]}>
            <sphereGeometry args={[0.36, 20, 20]} />
            <Toon color={petal} />
            <Ink thickness={0.02} />
          </mesh>
        );
      })}
      <mesh position={[0, 0, 0.12]} scale={[1, 1, 0.55]}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <Toon color="#ffc93c" />
        <Ink thickness={0.02} />
      </mesh>
    </group>
  );
}

export function Flower({ petal = "#d6336c", phase = 0 }: { petal?: string; phase?: number }) {
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

export function Bee() {
  const body = useRef<Group>(null);
  const wingA = useRef<Mesh>(null);
  const wingB = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (body.current) {
      body.current.position.x = Math.sin(t * 0.6) * 0.45;
      body.current.position.y = Math.sin(t * 1.3) * 0.25;
    }
    const flap = Math.sin(t * 28) * 0.45;
    if (wingA.current) wingA.current.rotation.x = flap;
    if (wingB.current) wingB.current.rotation.x = -flap;
  });
  return (
    <group ref={body} rotation={[0, Math.PI, 0]}>
      <mesh scale={[1.35, 1, 1]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <Toon color="#ffc93c" />
        <Ink />
      </mesh>
      {[-0.18, 0.22].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.51, 0.075, 12, 32]} />
          <Toon color={DARK} />
        </mesh>
      ))}
      <mesh position={[0.82, 0.1, 0]}>
        <sphereGeometry args={[0.36, 24, 24]} />
        <Toon color="#ffc93c" />
        <Ink thickness={0.03} />
      </mesh>
      <mesh position={[0.98, 0.2, 0.22]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[1.05, 0.22, 0.3]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <Toon color={DARK} />
      </mesh>
      <mesh position={[-0.86, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.1, 0.3, 12]} />
        <Toon color={DARK} />
      </mesh>
      <mesh ref={wingA} position={[-0.05, 0.62, 0.15]} scale={[0.6, 1, 0.12]}>
        <sphereGeometry args={[0.42, 20, 20]} />
        <Toon color="#ffffff" opacity={0.75} />
      </mesh>
      <mesh ref={wingB} position={[0.18, 0.6, -0.15]} scale={[0.6, 1, 0.12]}>
        <sphereGeometry args={[0.42, 20, 20]} />
        <Toon color="#ffffff" opacity={0.75} />
      </mesh>
    </group>
  );
}

const codeLines = [
  { w: 1.55, c: "#f6e7b0" },
  { w: 1.1, c: "#b8e986" },
  { w: 1.35, c: "#8ccdff" },
  { w: 0.75, c: "#ffd166" },
  { w: 1.2, c: "#f4a7b9" },
  { w: 0.55, c: "#f6e7b0" },
];

export function Monitor() {
  const cursor = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (cursor.current) cursor.current.visible = Math.floor(clock.elapsedTime * 2) % 2 === 0;
  });
  return (
    <Float speed={1} rotationIntensity={0.12} floatIntensity={0.35}>
      <group rotation={[0.05, 0.35, -0.04]}>
        <RoundedBox args={[2.7, 2.0, 1.0]} radius={0.16} smoothness={4}>
          <Toon color="#4a2e18" />
          <Ink />
        </RoundedBox>
        <RoundedBox args={[2.35, 1.62, 0.1]} radius={0.08} position={[0, 0.02, 0.5]}>
          <Toon color="#22160d" />
        </RoundedBox>
        {[0, 1].map((i) => (
          <mesh key={i} position={[-0.95 + i * 0.16, 0.66, 0.57]}>
            <circleGeometry args={[0.05, 16]} />
            <meshBasicMaterial color="#f6e7b0" />
          </mesh>
        ))}
        {codeLines.map((l, i) => (
          <mesh key={i} position={[-0.98 + l.w / 2, 0.42 - i * 0.21, 0.57]}>
            <planeGeometry args={[l.w, 0.1]} />
            <meshBasicMaterial color={l.c} />
          </mesh>
        ))}
        <mesh ref={cursor} position={[-0.98 + 0.55 + 0.12, 0.42 - 5 * 0.21, 0.57]}>
          <planeGeometry args={[0.07, 0.14]} />
          <meshBasicMaterial color="#f6e7b0" />
        </mesh>
        <mesh position={[0, -1.25, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.4]} />
          <Toon color="#4a2e18" />
          <Ink thickness={0.03} />
        </mesh>
      </group>
    </Float>
  );
}
