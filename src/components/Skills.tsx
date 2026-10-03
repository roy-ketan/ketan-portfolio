"use client";

import Section from "./Section";
import { skills } from "@/data/resume";

export default function Skills() {
  return (
    <Section id="skills" label="Skills">
      <dl className="space-y-8">
        {skills.map(({ group, items }) => (
          <div key={group} className="grid gap-3 sm:grid-cols-[200px_1fr]">
            <dt className="font-mono text-xs uppercase tracking-widest text-accent">
              {group}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {items.map((i) => (
                  <li
                    key={i}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-sm"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
