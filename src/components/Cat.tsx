"use client";

import { useState, type ReactNode } from "react";

// Original pixel-art cat, drawn on a 24x14 grid. Click to cycle poses.
const O = "#3b2a26"; // outline
const B = "#ffb766"; // fur
const D = "#f08c3a"; // stripes
const W = "#fff4e0"; // belly / paws
const P = "#ff9fb0"; // nose / ears
const E = "#2a1f1d"; // eyes

function R({ x, y, w = 1, h = 1, c }: { x: number; y: number; w?: number; h?: number; c: string }) {
  return <rect x={x} y={y} width={w} height={h} fill={c} />;
}

/** Rounded pixel blob: outline plus-shape with a fill plus-shape inset by one. */
function Blob({ x, y, w, h, fill = B }: { x: number; y: number; w: number; h: number; fill?: string }) {
  return (
    <>
      <R x={x + 1} y={y} w={w - 2} h={h} c={O} />
      <R x={x} y={y + 1} w={w} h={h - 2} c={O} />
      <R x={x + 2} y={y + 1} w={w - 4} h={h - 2} c={fill} />
      <R x={x + 1} y={y + 2} w={w - 2} h={h - 4} c={fill} />
    </>
  );
}

const poses: { label: string; art: ReactNode }[] = [
  {
    label: "sleeping",
    art: (
      <>
        <g className="cat-breathe">
          <Blob x={4} y={4} w={16} h={9} />
          <R x={9} y={5} h={2} c={D} />
          <R x={12} y={5} h={2} c={D} />
          <R x={15} y={5} h={2} c={D} />
          <R x={6} y={11} w={12} c={W} />
        </g>
        <R x={17} y={11} w={6} h={3} c={O} />
        <R x={18} y={12} w={4} c={B} />
        <R x={1} y={4} w={2} h={3} c={O} />
        <R x={6} y={4} w={2} h={3} c={O} />
        <R x={2} y={5} c={P} />
        <R x={6} y={5} c={P} />
        <Blob x={0} y={6} w={9} h={7} />
        <R x={2} y={9} w={2} c={E} />
        <R x={5} y={9} w={2} c={E} />
        <R x={4} y={10} c={P} />
        <text className="cat-z" x="10" y="3.5" fontSize="3.4" fontFamily="monospace" fill="#8a7a72">z</text>
        <text className="cat-z cat-z2" x="12.6" y="2" fontSize="2.6" fontFamily="monospace" fill="#8a7a72">z</text>
      </>
    ),
  },
  {
    label: "awake",
    art: (
      <>
        <Blob x={4} y={4} w={16} h={9} />
        <R x={9} y={5} h={2} c={D} />
        <R x={12} y={5} h={2} c={D} />
        <R x={15} y={5} h={2} c={D} />
        <R x={6} y={11} w={12} c={W} />
        <g className="cat-tail">
          <R x={20} y={4} w={3} h={9} c={O} />
          <R x={21} y={5} h={7} c={B} />
          <R x={21} y={5} h={2} c={D} />
        </g>
        <R x={1} y={4} w={2} h={3} c={O} />
        <R x={6} y={4} w={2} h={3} c={O} />
        <R x={2} y={5} c={P} />
        <R x={6} y={5} c={P} />
        <Blob x={0} y={6} w={9} h={7} />
        <R x={2} y={9} h={2} c={E} />
        <R x={6} y={9} h={2} c={E} />
        <R x={2} y={9} c={W} />
        <R x={6} y={9} c={W} />
        <R x={4} y={11} c={P} />
      </>
    ),
  },
  {
    label: "sitting",
    art: (
      <>
        <R x={16} y={10} w={6} h={3} c={O} />
        <R x={17} y={11} w={4} c={B} />
        <R x={21} y={8} w={2} h={4} c={O} />
        <R x={22} y={9} h={2} c={B} />
        <Blob x={7} y={6} w={10} h={8} />
        <R x={10} y={9} w={4} h={4} c={W} />
        <R x={8} y={13} w={3} c={W} />
        <R x={13} y={13} w={3} c={W} />
        <R x={7} y={0} w={3} h={3} c={O} />
        <R x={14} y={0} w={3} h={3} c={O} />
        <R x={8} y={1} c={P} />
        <R x={15} y={1} c={P} />
        <Blob x={6} y={1} w={12} h={8} />
        <R x={9} y={4} h={2} c={E} />
        <R x={14} y={4} h={2} c={E} />
        <R x={9} y={4} c={W} />
        <R x={14} y={4} c={W} />
        <R x={11} y={6} w={2} c={P} />
      </>
    ),
  },
  {
    label: "stretching",
    art: (
      <>
        <g className="cat-tail">
          <R x={21} y={0} w={3} h={5} c={O} />
          <R x={22} y={1} h={4} c={B} />
        </g>
        <Blob x={13} y={3} w={9} h={10} />
        <R x={16} y={4} h={2} c={D} />
        <R x={19} y={4} h={2} c={D} />
        <Blob x={5} y={7} w={10} h={6} />
        <R x={7} y={8} h={2} c={D} />
        <R x={10} y={8} h={2} c={D} />
        <R x={1} y={6} w={2} h={2} c={O} />
        <R x={4} y={6} w={2} h={2} c={O} />
        <R x={2} y={7} c={P} />
        <Blob x={0} y={8} w={7} h={5} />
        <R x={2} y={10} c={E} />
        <R x={4} y={10} c={E} />
        <R x={3} y={11} c={P} />
      </>
    ),
  },
];

export default function Cat({ className = "", start = 0 }: { className?: string; start?: number }) {
  const [i, setI] = useState(start);
  const p = poses[i];
  return (
    <button
      type="button"
      onClick={() => setI((n) => (n + 1) % poses.length)}
      aria-label={`Pixel cat is ${p.label}. Click to show another pose.`}
      className={`cursor-pointer rounded-[20px] outline-none transition-transform duration-75 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#8c75b9] focus-visible:ring-offset-4 focus-visible:ring-offset-paper ${className}`}
    >
      <svg
        viewBox="0 0 24 14"
        className="h-full w-full overflow-visible"
        shapeRendering="crispEdges"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
      >
        {p.art}
      </svg>
    </button>
  );
}
