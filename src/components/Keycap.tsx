"use client";

import { useState } from "react";

export default function Keycap({ label }: { label: string }) {
  const [down, setDown] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Press ${label} keycap`}
      onPointerDown={() => setDown(true)}
      onPointerUp={() => setDown(false)}
      onPointerLeave={() => setDown(false)}
      className="relative mx-0.5 inline-flex h-6 w-7 translate-y-[0.2em] cursor-pointer border-0 bg-transparent align-baseline leading-none outline-none"
    >
      <span
        className="absolute left-0 top-0 flex h-[22px] w-6 items-center justify-center rounded-[4px] border border-[#dedbd2] bg-gradient-to-b from-white to-[#f4f2ea] font-mono text-[10px] tracking-[-0.08em] text-black/65 transition-all duration-75"
        style={{
          transform: down ? "translateY(2px)" : undefined,
          boxShadow: down
            ? "inset 0 1px 0 #fff, 0 0 0 #d6d2c8"
            : "inset 0 1px 0 #fff, 0 2px 0 #d6d2c8, 0 3px 4px rgb(0 0 0 / 8%)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
