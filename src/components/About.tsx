"use client";

import Section from "./Section";
import { achievements, education } from "@/data/resume";

export default function About() {
  return (
    <Section id="about" label="About">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="mb-5 text-xl font-semibold">Education</h3>
          <ul className="space-y-6">
            {education.map((e) => (
              <li key={e.school}>
                <p className="font-medium">{e.school}</p>
                <p className="text-sm text-muted">
                  {e.detail} · {e.score}
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  {e.period}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 text-xl font-semibold">Achievements</h3>
          <ul className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            {achievements.map((a) => (
              <li key={a} className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
