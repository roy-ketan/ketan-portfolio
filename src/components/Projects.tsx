"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { projects } from "@/data/resume";

export default function Projects() {
  return (
    <Section id="work" label="Selected work">
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <motion.article
            key={p.title}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60"
          >
            <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
              <span className="text-accent">{p.tag}</span>
              <span className="text-muted">{p.date}</span>
            </div>
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted">{p.blurb}</p>
            <ul className="mt-5 space-y-2 text-sm leading-relaxed text-foreground/80">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2 pt-1">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
