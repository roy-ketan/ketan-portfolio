import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Cog,
  FolderGit2,
  GraduationCap,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import ChatButton from "@/components/ChatButton";
import ChatWidget from "@/components/ChatWidget";
import Clouds from "@/components/Clouds";
import RuleEngine from "@/components/illustrations/RuleEngine";
import VoicePipeline from "@/components/illustrations/VoicePipeline";
import LeetCodeCard from "@/components/LeetCodeCard";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import SceneLoader from "@/components/scene/SceneLoader";
import SectionHeader from "@/components/SectionHeader";
import {
  achievements,
  education,
  experience,
  links,
  profile,
  projects,
  skills,
  type Experience,
} from "@/data/resume";
import { getLeetCodeStats } from "@/lib/leetcode";

const container = "mx-auto w-full max-w-[1100px] px-5";

function ExperienceRow({ e, flip }: { e: Experience; flip: boolean }) {
  return (
    <Reveal className={`grid items-start gap-8 lg:grid-cols-[1.55fr_1fr] ${flip ? "lg:grid-cols-[1fr_1.55fr]" : ""}`}>
      <article className={`wood p-6 sm:p-7 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex items-start justify-between gap-4">
          <p className="flex items-center gap-2 font-display text-2xl font-bold text-[#0b4f8a]">
            <span aria-hidden>{e.emoji}</span>
            {e.company}
          </p>
          <div className="flex flex-col items-end gap-2 text-right">
            {e.current && (
              <span className="flex items-center gap-1.5 rounded-full border-2 border-edge bg-[#d8efa6] px-2.5 py-0.5 font-display text-[11px] font-bold">
                <span aria-hidden className="size-1.5 rounded-full bg-[#2f9e44]" /> NOW
              </span>
            )}
            <span className="font-mono text-xs text-ink-soft">{e.period}</span>
          </div>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold text-ink">{e.title}</h3>
        <p className="text-sm text-ink-soft">{e.team}</p>
        <p className="mt-4 text-[17px] font-medium leading-relaxed text-ink">{e.summary}</p>
        <ul className="mt-4 space-y-2.5">
          {e.bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-[14.5px] leading-relaxed text-ink">
              <span aria-hidden className="mt-[7px] size-2.5 shrink-0 rounded-full border-2 border-edge bg-[#6cc23b]" />
              {b}
            </li>
          ))}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-2">
          {e.skills.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
      </article>

      <div className={flip ? "lg:order-1" : ""}>
        <div className="clay relative aspect-[4/3] rounded-[22px] p-3">
          {e.illustration === "rules" ? <RuleEngine /> : <VoicePipeline />}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="chip font-mono !text-[11px] tracking-wider">{e.tags[0]}</span>
          <span
            className="chip font-mono !text-[11px] tracking-wider"
            style={{ background: "#0b4f8a", color: "#fff", borderColor: "#0b3a66", boxShadow: "0 2px 0 #0b3a66" }}
          >
            {e.tags[1]}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

export default async function Home() {
  const leetcode = await getLeetCodeStats(profile.leetcode);

  return (
    <>
      <Clouds />
      <Navbar />

      <main>
        {/* Hero */}
        <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
          <SceneLoader />
          <div className={`${container} relative z-10 grid flex-1 items-center gap-10 pb-24 pt-32 lg:grid-cols-[1fr_auto] lg:pt-28`}>
            <div className="max-w-[680px] lg:pt-24">
              <h1 className="font-display text-[clamp(2.6rem,6.2vw,4.6rem)] font-bold leading-[1.05] tracking-tight">
                <span className="grad-a">Hi, I&apos;m {profile.firstName}.</span>
                <br />
                <span className="grad-b">{profile.role}.</span>
              </h1>
              <p className="mt-6 text-[18px] leading-[1.75] text-ink">{profile.bio}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#experience" className="btn-clay btn-green">
                  See my journey <ArrowRight className="size-4" aria-hidden />
                </a>
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-clay btn-yellow">
                  <Sparkles className="size-4" aria-hidden /> View LinkedIn
                </a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-ink-soft">
                  Now &amp; before
                </span>
                <span className="font-display text-2xl font-bold tracking-tight text-[#0b4f8a]">Dassault Systèmes</span>
                <span className="font-display text-2xl font-bold tracking-tight text-[#7a2e2e]">NIT Rourkela</span>
              </div>
            </div>
            <div className="flex justify-center lg:-mt-40 lg:justify-end">
              <LeetCodeCard stats={leetcode} profileUrl={links.leetcode} />
            </div>
          </div>
          <a
            href="#experience"
            className="relative z-10 mx-auto mb-8 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-ink-soft"
          >
            Scroll ↓
          </a>
        </section>

        {/* 01 Experience */}
        <section id="experience" className="relative py-28">
          <div className={container}>
            <SectionHeader
              num="01"
              label="Experience"
              icon={<Briefcase />}
              title="Where I've been building"
              subtitle="The roles in order, and what I actually built at each."
            />
            <div className="space-y-16">
              {experience.map((e, i) => (
                <ExperienceRow key={e.id} e={e} flip={i % 2 === 1} />
              ))}
            </div>
          </div>
        </section>

        {/* 02 Skills */}
        <section id="skills" className="relative py-28">
          <div className={container}>
            <SectionHeader
              num="02"
              label="Skills"
              icon={<Cog />}
              title="The stack I ship with"
              subtitle="Python and C++ at the core, cloud-native infrastructure underneath, and enough frontend to ship the whole thing."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="wood h-full p-6">
                    <div className="flex items-center gap-3">
                      <span className="clay flex size-11 items-center justify-center rounded-xl text-xl" aria-hidden>
                        {s.emoji}
                      </span>
                      <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.items.map((it) => (
                        <li key={it} className="chip">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Projects */}
        <section id="projects" className="relative py-28">
          <div className={container}>
            <SectionHeader
              num="03"
              label="Projects"
              icon={<FolderGit2 />}
              title="Projects & side quests"
              subtitle="Cloud-native systems, real-time AI and full-stack apps. Everything links straight to GitHub."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <Reveal key={p.title} delay={(i % 3) * 60}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wood group flex h-full flex-col p-6 transition-transform hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-3xl" aria-hidden>
                        {p.emoji}
                      </span>
                      <ArrowUpRight
                        className="size-5 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
                      <span className="shrink-0 font-mono text-[11px] uppercase text-ink-soft">{p.date}</span>
                    </div>
                    <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink">{p.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 04 Education */}
        <section id="education" className="relative py-28">
          <div className={container}>
            <SectionHeader num="04" label="Education" icon={<GraduationCap />} title="Where I learned the fundamentals" />
            <div className="mx-auto grid max-w-[980px] gap-5 md:grid-cols-2">
              {education.map((e, i) => (
                <Reveal key={e.school} delay={i * 80}>
                  <article className="wood h-full p-6">
                    <p className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden>
                        {e.emoji}
                      </span>
                      <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#7a2e2e]">{e.label}</span>
                    </p>
                    <h3 className="mt-4 font-display text-xl font-bold text-ink">{e.degree}</h3>
                    <p className="text-[15px] text-ink-soft">{e.school}</p>
                    <p className="mt-3 font-mono text-xs text-ink-soft">{e.period}</p>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-ink">{e.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 05 Achievements */}
        <section id="achievements" className="relative py-20">
          <div className={container}>
            <SectionHeader num="05" label="Achievements" icon={<Award />} title="Hackathons & contests" small />
            <div className="mx-auto grid max-w-[980px] gap-5 md:grid-cols-3">
              {achievements.map((a, i) => (
                <Reveal key={a.title} delay={i * 70}>
                  <article className="wood h-full p-6">
                    <span className="text-2xl" aria-hidden>
                      {a.emoji}
                    </span>
                    <h3 className="mt-3 font-display text-base font-bold text-ink">{a.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink">{a.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 06 Contact */}
        <section id="contact" className="relative py-28">
          <div className={container}>
            <Reveal>
              <div className="wood mx-auto max-w-[850px] px-6 py-12 text-center sm:px-12">
                <span className="clay inline-flex items-center gap-2 rounded-full px-4 py-1 font-mono text-[12px] font-semibold uppercase tracking-[0.25em]">
                  <Send className="size-3.5 text-ink-soft" aria-hidden /> 06 · Let&apos;s talk
                </span>
                <h2 className="grad-a mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">Get in touch</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-ink">
                  Open to chatting about backend systems, cloud infrastructure, voice AI, or anything you think I&apos;d
                  find interesting. <span aria-hidden>✉️</span>
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a href={`mailto:${profile.email}`} className="btn-clay btn-green">
                    <Mail className="size-4" aria-hidden /> {profile.email}
                  </a>
                  <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-clay btn-yellow">
                    <LinkedInIcon className="size-4" /> LinkedIn
                  </a>
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn-clay btn-yellow">
                    <GitHubIcon className="size-4" /> GitHub
                  </a>
                  <ChatButton />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="pb-24 text-center text-sm font-semibold text-ink-soft">
        © {new Date().getFullYear()} {profile.name} · Built with Next.js &amp; Three.js ·{" "}
        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
          Resume
        </a>
      </footer>

      <ChatWidget />
    </>
  );
}
