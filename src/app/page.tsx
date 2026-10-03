import Link from "next/link";
import Cat from "@/components/Cat";
import Keycap from "@/components/Keycap";
import ProjectArt from "@/components/ProjectArt";
import Reveal from "@/components/Reveal";
import Tag, { type TagColor } from "@/components/Tag";
import { lists, profile, socials, works } from "@/data/resume";

const nav: { label: string; href: string; color: TagColor; download?: boolean }[] = [
  { label: "WORK", href: "#work", color: "blue" },
  { label: "ABOUT", href: "#about", color: "purple" },
  { label: "EXPERIENCE", href: "#experience", color: "lime" },
  { label: "RESUME", href: profile.resumeUrl, color: "peach", download: true },
  { label: "CONTACT", href: "#contact", color: "amber" },
];

function WorkCard({ w }: { w: (typeof works)[number] }) {
  return (
    <Reveal>
      <Link
        href={`/case/${w.slug}`}
        data-cursor="paw"
        aria-label={`View ${w.title}`}
        className="group block rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
      >
        <figure>
          <div
            className="w-full overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.012]"
            style={{ aspectRatio: w.aspect, background: w.bg }}
          >
            <ProjectArt slug={w.slug} />
          </div>
          <figcaption className="mt-3 flex gap-4 px-[3px]">
            <h2 className="font-serif text-[19.8px] font-medium leading-[22px] tracking-[-0.02em] text-black/70 max-[600px]:text-[18px]">
              {w.title}
            </h2>
            <span className="font-mono text-[16.2px] leading-[27px] tracking-[-0.06em] text-black/40 max-[600px]:text-[12.6px]">
              {w.tag}
            </span>
          </figcaption>
        </figure>
      </Link>
    </Reveal>
  );
}

export default function Home() {
  const left = works.filter((_, i) => i % 2 === 0);
  const right = works.filter((_, i) => i % 2 === 1);

  return (
    <main className="bg-paper text-black/90">
      {/* Hero */}
      <section
        className="relative overflow-hidden pb-[140px] pt-8 max-[800px]:pb-20 min-[601px]:pt-[510px]"
        aria-labelledby="intro-title"
      >
        <ul
          aria-label="Primary navigation"
          className="tag-row m-0 mx-auto mb-[100px] flex w-[min(300px,calc(100%-32px))] list-none flex-wrap justify-center gap-[7.2px] p-0 min-[601px]:absolute min-[601px]:left-1/2 min-[601px]:top-[50px] min-[601px]:mb-0 min-[601px]:w-max min-[601px]:-translate-x-1/2 min-[601px]:gap-[13px]"
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

        <div className="mx-auto mb-16 w-[min(1388px,calc(100vw-48px))] max-[600px]:w-[calc(100vw-32px)] min-[601px]:absolute min-[601px]:left-1/2 min-[601px]:top-[330px] min-[601px]:mb-0 min-[601px]:-translate-x-1/2">
          <h1
            id="intro-title"
            className="relative w-[min(531px,100%)] font-serif text-[clamp(36px,2.9754vw,45px)] font-normal leading-none tracking-[-0.04em] text-black/80"
          >
            I&apos;m{" "}
            <span className="group relative inline-block rounded-sm">
              {profile.firstName}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 h-[136px] w-[102px] -translate-x-1/2 rotate-[-4deg] scale-90 overflow-hidden rounded-[13px] border-[5px] border-white bg-white opacity-0 shadow-[0_16px_38px_rgb(0_0_0/18%),0_2px_7px_rgb(0_0_0/10%)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[3deg] group-hover:scale-100 group-hover:opacity-100"
              >
                {profile.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.photo} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#d9f97d] via-[#8ccdff] to-[#d6a5db] font-mono text-3xl font-bold text-black/70">
                    {profile.initials}
                  </span>
                )}
              </span>
            </span>
            . I build backend systems and obsess over{" "}
            <span className="relative mr-2 hidden h-[1em] w-[1.6em] align-[-0.1em] max-[600px]:inline-block">
              <Cat className="absolute inset-0 h-full w-full" />
            </span>
            <em className="font-medium italic">reliability</em>.
          </h1>
          {/* Second, larger cat perched at the right edge above the grid (desktop only). */}
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[143px] min-[601px]:block">
            <Cat className="pointer-events-auto absolute -right-[5px] bottom-0 h-[102.6px] w-[127.8px]" />
          </div>
        </div>

        {/* Work */}
        <div
          id="work"
          aria-label="Selected work"
          className="relative mx-auto w-[min(1388px,calc(100vw-48px))] scroll-mt-10 max-[600px]:w-[calc(100vw-32px)]"
        >
          {/* Desktop: two independent columns, so differing aspect ratios stack like the inspiration. */}
          <div className="grid grid-cols-2 items-start gap-4 max-[800px]:hidden">
            <div className="flex flex-col gap-4">
              {left.map((w) => (
                <WorkCard key={w.slug} w={w} />
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {right.map((w) => (
                <WorkCard key={w.slug} w={w} />
              ))}
            </div>
          </div>
          {/* Mobile: single column in source order. */}
          <div className="hidden flex-col gap-6 max-[800px]:flex">
            {works.map((w) => (
              <WorkCard key={w.slug} w={w} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        aria-label={`About ${profile.firstName}`}
        className="relative mx-auto w-[min(621px,calc(100%-48px))] scroll-mt-[clamp(96px,17svh,160px)] pb-[120px] max-[800px]:pb-20 max-[600px]:w-[calc(100%-32px)] max-[600px]:pb-12"
      >
        <Reveal>
          <p className="text-[clamp(18px,1.65vw,28px)] font-normal leading-[1.4] tracking-[-0.035em] text-black/80 max-[600px]:text-[16.2px]">
            I&apos;ve been writing production code <Keycap label="</>" /> since 2025, mostly
            Python and C++. Along the way, fell in love with distributed systems, cloud
            infrastructure, real-time AI, and all the small details in between. Right now,
            I&apos;m building at{" "}
            <span className="font-medium text-black/90">Dassault Systèmes</span>
            <span className="underline decoration-black/25 decoration-1 underline-offset-4">
              {" "}
              as a software engineer
            </span>
            .
          </p>
        </Reveal>
      </section>

      {/* Lists */}
      {lists.map((l) => (
        <section
          key={l.title}
          id={l.id}
          aria-label={l.title}
          className="mx-auto w-[min(520px,calc(100%-48px))] scroll-mt-24 pb-[120px] max-[800px]:pb-20 max-[600px]:w-[min(520px,calc(100%-32px))] max-[600px]:pb-12"
        >
          <Reveal>
            <h2 className="mb-6 text-base font-bold leading-6 tracking-[-0.02em] text-black/80 max-[600px]:mb-3 max-[600px]:text-[14.4px]">
              {l.title}
            </h2>
            <ol>
              {l.rows.map((r) => {
                const inner = (
                  <>
                    <span className="text-black/85">{r.name}</span>
                    <span className="text-sm font-medium tracking-normal text-black/45 max-[600px]:text-[11.7px]">
                      {r.meta}
                    </span>
                  </>
                );
                const cls =
                  "flex justify-between gap-6 rounded-sm py-[7.6px] text-base font-medium leading-6 tracking-[-0.02em] max-[600px]:gap-3 max-[600px]:py-1 max-[600px]:text-[13.5px] max-[600px]:leading-[22px]";
                return (
                  <li key={r.name + r.meta}>
                    {r.href ? (
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${cls} transition-opacity hover:opacity-60`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </section>
      ))}

      {/* Footer */}
      <footer
        id="contact"
        aria-labelledby="footer-title"
        className="relative isolate h-[420px] overflow-hidden bg-cream text-black/90 max-[600px]:h-auto max-[600px]:px-4 max-[600px]:pb-12 max-[600px]:pt-12"
      >
        <div className="absolute left-16 top-40 z-20 max-[700px]:left-6 max-[700px]:right-6 max-[600px]:relative max-[600px]:inset-auto">
          <h2
            id="footer-title"
            className="m-0 text-[28.8px] font-normal leading-[34.2px] tracking-[-0.04em] max-[700px]:max-w-[390px] max-[700px]:text-[clamp(23.4px,7.2vw,28.8px)] max-[700px]:leading-[1.12]"
          >
            Let&apos;s build something people love &lt;3
          </h2>
        </div>
        <div className="absolute right-[92px] top-40 z-20 max-[900px]:right-auto max-[900px]:left-16 max-[900px]:top-[230px] max-[700px]:left-6 max-[600px]:relative max-[600px]:inset-auto max-[600px]:mt-6">
          <ul
            aria-label="Social links"
            className="tag-row m-0 flex list-none flex-wrap items-center gap-[14.4px] p-0 max-[700px]:gap-[9px]"
          >
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="tag-link block outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  <Tag color={s.color}>{s.label}</Tag>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="absolute bottom-6 left-16 font-mono text-xs text-black/40 max-[700px]:left-6 max-[600px]:relative max-[600px]:inset-auto max-[600px]:mt-16">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </footer>
    </main>
  );
}
