"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/resume";

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pb-12 pt-20 sm:pt-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-4"
      >
        <div
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-orange-700 font-mono text-xl font-bold text-background"
        >
          {profile.initials}
        </div>
        <p className="text-lg text-muted">
          Hi, I&apos;m <span className="text-foreground">{profile.firstName}</span>{" "}
          <span aria-hidden>👋</span>
        </p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl"
      >
        I build scalable backend systems and obsess over{" "}
        <em className="font-serif font-normal italic text-accent">reliability</em>.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="max-w-2xl text-lg leading-relaxed text-muted"
      >
        {profile.summary}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="flex flex-wrap gap-3"
      >
        <a
          href={profile.resumeUrl}
          download
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Download size={16} aria-hidden /> Download Resume
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Get in touch <ArrowUpRight size={16} aria-hidden />
        </a>
      </motion.div>
    </section>
  );
}
