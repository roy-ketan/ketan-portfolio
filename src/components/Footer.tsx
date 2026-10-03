"use client";

import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import { links, profile } from "@/data/resume";

export default function Footer() {
  return (
    <>
      <Section id="contact" label="Contact">
        <p className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Let&apos;s build something <em className="font-serif font-normal italic text-accent">solid</em>.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-6 inline-block text-lg text-muted underline decoration-border underline-offset-4 transition-colors hover:text-accent"
        >
          {profile.email}
        </a>
        <ul className="mt-10 flex flex-wrap gap-3">
          {links
            .filter((l) => l.label !== "Email")
            .map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {l.label} <ArrowUpRight size={14} aria-hidden />
                </a>
              </li>
            ))}
        </ul>
      </Section>
      <footer className="mx-auto w-full max-w-5xl border-t border-border px-6 py-8 font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
