import { BadgeCheck, FileText, Link2 } from "lucide-react";
import type { ReactNode } from "react";
import Cat from "@/components/Cat";
import Collapsible from "@/components/Collapsible";
import ContributionGraph from "@/components/ContributionGraph";
import { Icon, TechIcon } from "@/components/Icons";
import ScrollTop from "@/components/ScrollTop";
import Tag, { type TagColor } from "@/components/Tag";
import {
  awards,
  education,
  experience,
  overview,
  profile,
  projects,
  socials,
  stack,
} from "@/data/resume";
import { getContributions } from "@/lib/github";

const nav: { label: string; href: string; color: TagColor; download?: boolean }[] = [
  { label: "EXPERIENCE", href: "#experience", color: "blue" },
  { label: "PROJECTS", href: "#projects", color: "purple" },
  { label: "STACK", href: "#stack", color: "lime" },
  { label: "RESUME", href: profile.resumeUrl, color: "peach", download: true },
  { label: "CONTACT", href: "#contact", color: "amber" },
];

/** Renders **bold** segments from the resume text. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-medium text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-line bg-tint/70 px-1.5 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li key={s}>
          <Chip>{s}</Chip>
        </li>
      ))}
    </ul>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-ink/70 marker:text-ink/25">
      {items.map((b) => (
        <li key={b} className="pl-1">
          <Rich text={b} />
        </li>
      ))}
    </ul>
  );
}

function IconBox({ children }: { children: ReactNode }) {
  return (
    <span className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-md border border-line bg-paper text-muted">
      {children}
    </span>
  );
}

function Stripe() {
  return <div aria-hidden className="stripe-divider w-full border-x border-line" />;
}

function PanelTitle({ id, children, count }: { id: string; children: ReactNode; count?: number }) {
  return (
    <header className="screen-line-bottom px-4">
      <h2 className="text-3xl font-medium leading-[1.3] tracking-tight">
        <a href={`#${id}`} className="outline-none focus-visible:underline">
          {children}
        </a>
        {count !== undefined && (
          <span className="relative -top-3 ml-1 font-mono text-xs font-normal text-muted">({count})</span>
        )}
      </h2>
    </header>
  );
}

/** Vertical rule from an icon down to the chips row, ending in an elbow. */
function TreeLine() {
  return (
    <>
      <span aria-hidden className="absolute bottom-[11px] left-[11.5px] top-7 w-px bg-line" />
      <span aria-hidden className="absolute bottom-[11px] left-[11.5px] h-px w-4 bg-line" />
    </>
  );
}

export default async function Home() {
  const contributions = await getContributions(profile.github);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      {/* Top band: only the sticker nav and the cat. */}
      <header className="band relative border-b border-line">
        <ul
          aria-label="Primary navigation"
          className="tag-row relative z-20 m-0 mx-auto flex w-[min(320px,calc(100%-32px))] list-none flex-wrap justify-center gap-[7.2px] p-0 pt-8 min-[601px]:absolute min-[601px]:left-1/2 min-[601px]:top-[50px] min-[601px]:w-max min-[601px]:-translate-x-1/2 min-[601px]:gap-[13px] min-[601px]:pt-0"
        >
          {nav.map((n, i) => (
            <li key={n.label}>
              <a
                href={n.href}
                download={n.download}
                className="tag-link block rounded-[1px] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
              >
                <Tag color={n.color} delay={i * 55}>
                  {n.label}
                </Tag>
              </a>
            </li>
          ))}
        </ul>
        <div className="px-2">
          <div className="relative mx-auto h-[180px] max-w-4xl border-x border-black/[0.06] min-[601px]:h-[280px]">
            <Cat className="absolute bottom-0 right-4 h-[64px] w-[80px] min-[601px]:right-6 min-[601px]:h-[102.6px] min-[601px]:w-[127.8px]" />
          </div>
        </div>
      </header>

      <main className="overflow-x-clip px-2">
        <div className="mx-auto max-w-4xl border-x border-line">
          {/* Profile */}
          <section aria-label="Profile" className="screen-line-bottom flex items-end gap-4 px-4 pb-4">
            <div className="-mt-12 size-24 shrink-0 overflow-hidden rounded-full shadow-xl ring-4 ring-paper sm:-mt-16 sm:size-28">
              {profile.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photo} alt={profile.name} className="size-full object-cover" />
              ) : (
                <div
                  role="img"
                  aria-label={profile.name}
                  className="flex size-full items-center justify-center bg-gradient-to-br from-[#d9f97d] via-[#8ccdff] to-[#d6a5db] font-mono text-3xl font-bold text-black/70"
                >
                  {profile.initials}
                </div>
              )}
            </div>
            <div className="min-w-0 pb-1">
              <h1 className="text-[1.75rem]/[1.1] font-semibold tracking-tight sm:text-[2rem]/none">
                {profile.name.split(" ").slice(0, -1).join(" ")}{" "}
                {/* Keep the badge glued to the last word so it never wraps alone. */}
                <span className="whitespace-nowrap">
                  {profile.name.split(" ").at(-1)}
                  <BadgeCheck
                    className="ml-2 inline size-6 fill-[#4696d3] align-[-0.12em] text-paper"
                    aria-label="Verified"
                  />
                </span>
              </h1>
              <p className="mt-2 font-mono text-sm text-muted">{profile.tagline}</p>
            </div>
          </section>

          <Stripe />

          {/* Overview, socials, contributions */}
          <section aria-label="Overview" className="screen-line-top screen-line-bottom">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 p-4 text-sm text-muted">
              {overview.map((o) => (
                <li key={o.label + (o.before ?? "")} className="flex items-center gap-1.5">
                  <Icon name={o.icon} className="size-4 shrink-0 text-ink/60" />
                  {o.before && <span>{o.before}</span>}
                  <a
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink underline decoration-ink/30 underline-offset-[3px] transition-colors hover:decoration-ink"
                  >
                    {o.label}
                  </a>
                  {o.after && <span>{o.after}</span>}
                </li>
              ))}
            </ul>

            <div className="screen-line-top">
              <h2 className="sr-only">Social links</h2>
              <ul className="flex flex-wrap gap-2 p-4">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") || s.icon === "resume" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="flex size-9 items-center justify-center rounded-lg border border-line bg-paper text-ink/80 transition-colors hover:bg-tint hover:text-ink"
                    >
                      <Icon name={s.icon} className="size-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="screen-line-top p-4">
              <h2 className="sr-only">GitHub Contributions</h2>
              {contributions ? (
                <ContributionGraph data={contributions} today={today} user={profile.github} />
              ) : (
                <a
                  href={`https://github.com/${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted underline underline-offset-4 hover:text-ink"
                >
                  View contributions on GitHub
                </a>
              )}
            </div>
          </section>

          <Stripe />

          {/* Experience */}
          <section id="experience" className="screen-line-top screen-line-bottom scroll-mt-4">
            <PanelTitle id="experience">Experience</PanelTitle>
            {experience.map((c) => (
              <div key={c.id} id={`experience-${c.id}`} className="screen-line-bottom space-y-4 px-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-ink text-paper">
                    <Icon name="building" className="size-3.5" />
                  </span>
                  <h3 className="text-xl/6 font-medium">
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-ink/40"
                    >
                      {c.company}
                    </a>
                  </h3>
                  {c.current && (
                    <span className="ml-auto flex items-center gap-2 text-sm text-muted">
                      Current
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4696d3] opacity-60 motion-reduce:hidden" />
                        <span className="relative inline-flex size-2 rounded-full bg-[#4696d3]" />
                      </span>
                    </span>
                  )}
                </div>

                {c.roles.map((r, i) => (
                  <div key={r.title} className="relative space-y-3">
                    <TreeLine />
                    <Collapsible
                      defaultOpen={i === 0}
                      label={r.title}
                      header={
                        <span className="flex items-start gap-3">
                          <IconBox>
                            <Icon name={r.icon} className="size-3.5" />
                          </IconBox>
                          <span className="min-w-0">
                            <span className="block font-medium text-balance">{r.title}</span>
                            <span className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                              <span>{r.type}</span>
                              <span aria-hidden className="h-3.5 w-px bg-line" />
                              <span>{r.period}</span>
                            </span>
                          </span>
                        </span>
                      }
                    >
                      <div className="pl-9 pt-3">
                        <Bullets items={r.bullets} />
                      </div>
                    </Collapsible>
                    <div className="pl-9">
                      <Chips items={r.skills} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </section>

          <Stripe />

          {/* Projects */}
          <section id="projects" className="screen-line-top screen-line-bottom scroll-mt-4">
            <PanelTitle id="projects" count={projects.length}>
              Projects
            </PanelTitle>
            {projects.map((p, i) => (
              <Collapsible
                key={p.id}
                defaultOpen={i === 0}
                label={p.name}
                className="screen-line-bottom"
                headerClassName="items-center pr-4 transition-colors hover:bg-tint/70"
                header={
                  <span id={`project-${p.id}`} className="flex items-stretch">
                    <span className="flex w-14 shrink-0 items-center justify-center border-r border-dashed border-line">
                      <span className="flex size-7 items-center justify-center rounded-md border border-line bg-paper font-mono text-xs text-muted">
                        {p.name[0]}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1 py-4 pl-4">
                      <span className="mb-1 block font-medium leading-snug text-balance">{p.name}</span>
                      <span className="mb-2 block text-sm text-muted">
                        {p.date} · {p.subtitle}
                      </span>
                      <Chips items={p.skills} />
                    </span>
                  </span>
                }
              >
                <div className="border-t border-line px-4 py-4">
                  <Bullets items={p.bullets} />
                </div>
              </Collapsible>
            ))}
          </section>

          <Stripe />

          {/* Stack */}
          <section id="stack" className="screen-line-top screen-line-bottom scroll-mt-4">
            <PanelTitle id="stack">Stack</PanelTitle>
            {stack.map((g, i) => (
              <div key={g.id} id={`stack-${g.id}`} className="screen-line-bottom sm:flex">
                <div className="border-b border-dashed border-line px-4 py-3 text-sm text-muted sm:w-48 sm:shrink-0 sm:border-b-0 sm:border-r">
                  <span className="mr-1.5 font-mono text-amber">{String(i + 1).padStart(2, "0")}</span>
                  {g.group}
                </div>
                <ul className="flex flex-wrap gap-1.5 px-4 py-3">
                  {g.items.map((t) => {
                    const inner = (
                      <>
                        <TechIcon slug={t.icon} />
                        {t.name}
                      </>
                    );
                    const cls =
                      "inline-flex h-7 items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 font-mono text-xs text-ink/80";
                    return (
                      <li key={t.name}>
                        {t.href ? (
                          <a
                            href={t.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${cls} transition-colors hover:bg-tint hover:text-ink`}
                          >
                            {inner}
                          </a>
                        ) : (
                          <span className={cls}>{inner}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </section>

          <Stripe />

          {/* Education */}
          <section id="education" className="screen-line-top screen-line-bottom scroll-mt-4">
            <PanelTitle id="education">Education</PanelTitle>
            {education.map((e) => (
              <div key={e.id} id={`education-${e.id}`} className="screen-line-bottom p-4">
                <div className="relative space-y-3">
                  {e.skills.length > 0 && <TreeLine />}
                  <div className="flex items-start gap-3">
                    <IconBox>
                      <Icon name={e.icon} className="size-3.5" />
                    </IconBox>
                    <div className="min-w-0">
                      <h3 className="font-medium text-balance">
                        {e.href ? (
                          <a
                            href={e.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-ink/40"
                          >
                            {e.school}
                          </a>
                        ) : (
                          e.school
                        )}
                      </h3>
                      <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                        <span>
                          {e.period[0]} – {e.period[1]}
                        </span>
                        <span aria-hidden className="h-3.5 w-px bg-line" />
                        <span>{e.degree}</span>
                        <span aria-hidden className="h-3.5 w-px bg-line" />
                        <span>{e.score}</span>
                      </p>
                    </div>
                  </div>
                  {e.skills.length > 0 && (
                    <div className="pl-9">
                      <Chips items={e.skills} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>

          <Stripe />

          {/* Awards */}
          <section id="awards" className="screen-line-top screen-line-bottom scroll-mt-4">
            <PanelTitle id="awards" count={awards.length}>
              Awards
            </PanelTitle>
            {awards.map((a) => (
              <div key={a.title} className="screen-line-bottom flex items-stretch">
                <div className="flex w-14 shrink-0 items-center justify-center border-r border-dashed border-line">
                  <span className="flex size-7 items-center justify-center rounded-md border border-line bg-paper text-muted">
                    <Icon name={a.icon} className="size-3.5" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 px-4 py-4">
                  <h3 className="font-medium text-balance">{a.title}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                    <span>{a.prize}</span>
                    <span aria-hidden className="h-3.5 w-px bg-line" />
                    <span>{a.category}</span>
                  </p>
                </div>
                {a.href && (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open reference for ${a.title}`}
                    className="flex items-center px-4 text-muted transition-colors hover:text-ink"
                  >
                    <Link2 className="size-4" strokeWidth={1.75} aria-hidden />
                  </a>
                )}
              </div>
            ))}
          </section>

          <Stripe />

          {/* Footer */}
          <footer id="contact" className="screen-line-top scroll-mt-4">
            <p className="screen-line-bottom px-4 py-8 text-center font-mono text-sm text-muted">
              Crafted by{" "}
              <a
                href="https://linkedin.com/in/ketan-roy/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-ink underline underline-offset-4"
              >
                {profile.name}
              </a>
            </p>
            <div className="screen-line-bottom flex justify-center">
              <ul className="flex divide-x divide-line border-x border-line">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") || s.icon === "resume" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="flex size-11 items-center justify-center text-muted transition-colors hover:bg-tint hover:text-ink"
                    >
                      <Icon name={s.icon} className="size-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </footer>
        </div>

        {/* Oversized outlined wordmark, cropped at the bottom like the inspiration. */}
        <div
          aria-hidden
          className="pointer-events-none mt-10 h-[16.5vw] select-none overflow-hidden whitespace-nowrap border-b border-line text-center"
        >
          <span className="wordmark inline-block text-[20vw] font-semibold leading-[0.95] tracking-tighter">
            ketanroy
          </span>
        </div>
      </main>

      {/* Floating resume shortcut */}
      <a
        href={profile.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-4 z-60 flex items-center gap-2 rounded-xl border border-line bg-paper/95 py-2 pl-2.5 pr-3 text-sm font-medium text-ink/80 shadow-lg backdrop-blur transition-colors hover:border-ink/30 hover:text-ink"
      >
        <FileText className="size-4" strokeWidth={1.75} aria-hidden />
        Resume
      </a>
      <ScrollTop />
    </>
  );
}
