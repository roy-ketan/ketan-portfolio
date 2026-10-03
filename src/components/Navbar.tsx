"use client";

import { Mail, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { links, profile } from "@/data/resume";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

const nav = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export const openChat = () => window.dispatchEvent(new Event("open-chat"));

/** "ACTIVE" during Ketan's waking hours in his timezone, otherwise "AWAY". */
function useStatus() {
  const [active, setActive] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => {
      const hour = Number(
        new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: profile.timezone }).format(
          new Date(),
        ),
      );
      setActive(hour >= 9 && hour < 23);
    };
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, []);
  return active;
}

export default function Navbar() {
  const [current, setCurrent] = useState("");
  const [open, setOpen] = useState(false);
  const active = useStatus();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of nav) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  const iconLink =
    "flex size-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-2 hover:text-ink";

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="clay mx-auto flex h-[58px] max-w-[1100px] items-center gap-3 rounded-full pl-5 pr-3">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <span aria-hidden className="size-3 rounded-full border-2 border-edge bg-[#c8c83a]" />
          {profile.firstName}
        </a>
        <span className="hidden items-center gap-1.5 rounded-full border-2 border-edge px-3 py-0.5 font-display text-[11px] font-bold tracking-wider sm:flex">
          <span
            aria-hidden
            className={`size-1.5 rounded-full ${active === false ? "bg-[#f0a43a]" : "bg-[#3fae4a]"}`}
          />
          {active === false ? "AWAY" : "ACTIVE"} · {profile.tzLabel}
        </span>

        <ul className="mx-auto hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`text-[15px] font-semibold transition-colors hover:text-ink ${
                  current === n.id ? "text-ink underline decoration-2 underline-offset-[6px]" : "text-ink-soft"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <button
            type="button"
            onClick={openChat}
            className="btn-clay btn-green mr-1 !gap-1.5 !px-3.5 !py-1.5 text-sm"
          >
            <MessageCircle className="size-4" aria-hidden /> Chat
          </button>
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={`${iconLink} max-sm:hidden`}>
            <GitHubIcon className="size-[18px]" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`${iconLink} max-sm:hidden`}>
            <LinkedInIcon className="size-[19px]" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className={`${iconLink} max-sm:hidden`}>
            <Mail className="size-[18px]" aria-hidden />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={`${iconLink} lg:hidden`}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="clay mx-auto mt-3 max-w-[1100px] rounded-3xl p-3 lg:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-2.5 font-semibold text-ink-soft hover:bg-cream-2 hover:text-ink"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex gap-1 border-t-2 border-dashed border-edge/30 px-2 pt-3 sm:hidden">
            <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
              <GitHubIcon className="size-[18px]" />
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
              <LinkedInIcon className="size-[19px]" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className={iconLink}>
              <Mail className="size-[18px]" aria-hidden />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
