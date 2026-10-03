"use client";

import Section from "./Section";
import { experience } from "@/data/resume";

export default function Experience() {
  return (
    <Section id="experience" label="Experience">
      <ol className="relative space-y-12 border-l border-border pl-8">
        {experience.map((r) => (
          <li key={r.title} className="relative">
            <span
              aria-hidden
              className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-accent"
            />
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <h3 className="text-xl font-semibold">
                {r.title} <span className="text-muted">· {r.company}</span>
              </h3>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {r.period}
              </span>
            </div>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-foreground/80">
              {r.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
