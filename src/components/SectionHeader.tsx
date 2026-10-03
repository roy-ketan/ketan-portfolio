import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeader({
  num,
  label,
  icon,
  title,
  subtitle,
  small = false,
}: {
  num: string;
  label: string;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  small?: boolean;
}) {
  return (
    <Reveal className="mb-14 flex flex-col items-center text-center">
      <span className="clay inline-flex items-center gap-2 rounded-full px-4 py-1 font-mono text-[12px] font-semibold uppercase tracking-[0.25em] text-ink">
        <span aria-hidden className="text-ink-soft [&_svg]:size-3.5">
          {icon}
        </span>
        {num} · {label}
      </span>
      <h2
        className={`grad-a mt-5 font-display font-bold tracking-tight ${
          small ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"
        }`}
      >
        {title}
      </h2>
      {subtitle && <p className="mt-4 max-w-2xl text-lg text-ink-soft">{subtitle}</p>}
    </Reveal>
  );
}
