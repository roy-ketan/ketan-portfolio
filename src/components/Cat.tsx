"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Original pixel-art cat, drawn on a 24x14 grid.
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

/** Loaf body shared by the lying-down poses. */
function Loaf({ tail, eyes }: { tail: "low" | "up"; eyes: "closed" | "open" }) {
  return (
    <>
      <g className={eyes === "closed" ? "cat-breathe" : undefined}>
        <Blob x={4} y={4} w={16} h={9} />
        <R x={9} y={5} h={2} c={D} />
        <R x={12} y={5} h={2} c={D} />
        <R x={15} y={5} h={2} c={D} />
        <R x={6} y={11} w={12} c={W} />
      </g>
      {tail === "low" ? (
        <>
          <R x={17} y={11} w={6} h={3} c={O} />
          <R x={18} y={12} w={4} c={B} />
        </>
      ) : (
        <g className="cat-tail">
          <R x={20} y={4} w={3} h={9} c={O} />
          <R x={21} y={5} h={7} c={B} />
          <R x={21} y={5} h={2} c={D} />
        </g>
      )}
      <R x={1} y={4} w={2} h={3} c={O} />
      <R x={6} y={4} w={2} h={3} c={O} />
      <R x={2} y={5} c={P} />
      <R x={6} y={5} c={P} />
      <Blob x={0} y={6} w={9} h={7} />
      {eyes === "closed" ? (
        <>
          <R x={2} y={9} w={2} c={E} />
          <R x={5} y={9} w={2} c={E} />
          <R x={4} y={10} c={P} />
        </>
      ) : (
        <>
          <R x={2} y={9} h={2} c={E} />
          <R x={6} y={9} h={2} c={E} />
          <R x={2} y={9} c={W} />
          <R x={6} y={9} c={W} />
          <R x={4} y={11} c={P} />
        </>
      )}
    </>
  );
}

type Pose = "sleeping" | "hovering" | "awake" | "active" | "happy";

const art: Record<Pose, ReactNode> = {
  sleeping: (
    <>
      <Loaf tail="low" eyes="closed" />
      <text className="cat-z" x="10" y="3.5" fontSize="3.4" fontFamily="monospace" fill="#8a7a72">z</text>
      <text className="cat-z cat-z2" x="12.6" y="2" fontSize="2.6" fontFamily="monospace" fill="#8a7a72">z</text>
    </>
  ),
  // Stirred by the pointer: eyes open, still lying down.
  hovering: <Loaf tail="low" eyes="open" />,
  // Click poses
  awake: (
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
  active: <Loaf tail="up" eyes="open" />,
  happy: (
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
};

const order = Object.keys(art) as Pose[];
const clickPoses: Pose[] = ["awake", "active", "happy"];

/**
 * Pixel cat. Behaves like a tiny pet: it dozes until the pointer arrives,
 * stirs when hovered, strikes a random pose when clicked (click again to
 * settle), and goes back to sleep when the pointer leaves.
 */
export default function Cat({ className = "" }: { className?: string }) {
  const [pose, setPose] = useState<Pose>("sleeping");
  const [shown, setShown] = useState(true);
  const [toggled, setToggled] = useState(false);

  const poseRef = useRef<Pose>("sleeping");
  const shownRef = useRef(true);
  const toggledRef = useRef(false);
  const hovering = useRef(false);
  const focused = useRef(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };
  const clearSwap = () => {
    if (swapTimer.current) clearTimeout(swapTimer.current);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    swapTimer.current = null;
    settleTimer.current = null;
  };

  // Crossfade: fade out, swap pose, fade back in.
  const goTo = (next: Pose) => {
    clearSwap();
    if (next === poseRef.current && shownRef.current) return;
    shownRef.current = false;
    setShown(false);
    swapTimer.current = setTimeout(() => {
      poseRef.current = next;
      setPose(next);
      settleTimer.current = setTimeout(() => {
        shownRef.current = true;
        setShown(true);
      }, 16);
    }, 80);
  };

  const stir = (delay: number) => {
    clearHover();
    if (!toggledRef.current) hoverTimer.current = setTimeout(() => goTo("hovering"), delay);
  };

  const rest = () => {
    clearHover();
    toggledRef.current = false;
    setToggled(false);
    hoverTimer.current = setTimeout(() => goTo("sleeping"), 60);
  };

  const onClick = () => {
    clearHover();
    const next = !toggledRef.current;
    toggledRef.current = next;
    setToggled(next);
    goTo(next ? clickPoses[Math.floor(Math.random() * clickPoses.length)] : "hovering");
  };

  useEffect(
    () => () => {
      clearHover();
      clearSwap();
    },
    [],
  );

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={() => {
        hovering.current = true;
        stir(70);
      }}
      onPointerLeave={() => {
        hovering.current = false;
        rest();
      }}
      onFocus={() => {
        focused.current = true;
        if (!hovering.current) stir(0);
      }}
      onBlur={() => {
        focused.current = false;
        if (!hovering.current) rest();
      }}
      aria-label={`Pixel cat is ${pose}. Click to ${toggled ? "return to resting" : "show another pose"}.`}
      className={`cat-arrive cursor-pointer rounded-[20.7px] outline-none transition-transform duration-75 [-webkit-tap-highlight-color:transparent] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#8c75b9] focus-visible:ring-offset-4 focus-visible:ring-offset-paper motion-reduce:transition-none ${className}`}
    >
      <span className="relative block h-full w-full">
        {order.map((p) => (
          <svg
            key={p}
            viewBox="0 0 24 14"
            shapeRendering="crispEdges"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden
            className={`absolute inset-0 h-full w-full overflow-visible transition-[opacity,transform] motion-reduce:transition-none ${
              pose === p && shown
                ? "translate-y-0 scale-100 opacity-100 duration-150 ease-out"
                : "translate-y-0.5 scale-[0.96] opacity-0 duration-[80ms] ease-in"
            }`}
          >
            {art[p]}
          </svg>
        ))}
      </span>
    </button>
  );
}
