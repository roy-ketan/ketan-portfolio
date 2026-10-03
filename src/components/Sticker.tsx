"use client";

import { useState } from "react";

// A tiny terminal "pet" that cycles through moods on click, in place of the
// inspiration's pixel cat.
const moods = [
  { label: "sleeping", face: "-_-", line: "zzz…" },
  { label: "compiling", face: "o_o", line: "building…" },
  { label: "shipped", face: "^_^", line: "deployed ✓" },
  { label: "debugging", face: ">_<", line: "segfault?!" },
];

export default function Sticker() {
  const [i, setI] = useState(0);
  const m = moods[i];
  return (
    <button
      type="button"
      onClick={() => setI((n) => (n + 1) % moods.length)}
      aria-label={`Terminal pet is ${m.label}. Click to change its mood.`}
      className="relative inline-block h-[1em] w-[1.9em] translate-y-[0.08em] cursor-pointer rounded-md align-baseline outline-none transition-transform duration-75 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[#8c75b9] focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
    >
      <svg viewBox="0 0 76 40" className="h-full w-full" aria-hidden>
        <rect x="1" y="1" width="74" height="38" rx="5" fill="#181818" />
        <rect x="1" y="1" width="74" height="9" rx="5" fill="#2c2c2c" />
        <circle cx="8" cy="5.5" r="1.8" fill="#ff6b6b" />
        <circle cx="14" cy="5.5" r="1.8" fill="#ffbb00" />
        <circle cx="20" cy="5.5" r="1.8" fill="#6bd968" />
        <text
          x="38"
          y="26"
          textAnchor="middle"
          fontFamily="var(--font-space-mono), monospace"
          fontSize="13"
          fill="#d9f97d"
        >
          {m.face}
        </text>
        <text
          x="8"
          y="35"
          fontFamily="var(--font-space-mono), monospace"
          fontSize="5.5"
          fill="#9a9a9a"
        >
          {m.line}
          <tspan className="blink" fill="#d9f97d">
            ▌
          </tspan>
        </text>
      </svg>
    </button>
  );
}
