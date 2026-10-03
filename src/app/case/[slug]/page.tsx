import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectArt from "@/components/ProjectArt";
import Tag from "@/components/Tag";
import { works } from "@/data/resume";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const w = works.find((x) => x.slug === slug);
  if (!w) return {};
  return { title: `${w.title} — Ketan Ratan Roy`, description: w.blurb };
}

export default async function Case({ params }: PageProps<"/case/[slug]">) {
  const { slug } = await params;
  const i = works.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const w = works[i];
  const next = works[(i + 1) % works.length];

  return (
    <main className="min-h-screen bg-paper text-black/90">
      <div className="mx-auto w-[min(780px,calc(100%-32px))] pb-[120px] pt-8 min-[601px]:pt-12">
        <Link
          href="/"
          className="tag-link inline-block outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
        >
          <Tag color="blue">← BACK</Tag>
        </Link>

        <header className="mt-14">
          <p className="font-mono text-[15px] tracking-[-0.04em] text-black/40">
            {w.tag} · {w.date}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(36px,6vw,56px)] font-normal leading-none tracking-[-0.04em] text-black/80">
            {w.title}
          </h1>
          <p className="mt-5 max-w-[620px] text-[clamp(18px,2vw,22px)] leading-[1.4] tracking-[-0.03em] text-black/70">
            {w.blurb}
          </p>
        </header>

        <div
          className="mt-10 w-full overflow-hidden"
          style={{ aspectRatio: w.aspect, background: w.bg }}
        >
          <ProjectArt slug={w.slug} />
        </div>

        <section className="mt-14 max-w-[620px]" aria-label="Highlights">
          <h2 className="mb-4 text-base font-bold tracking-[-0.02em] text-black/80">What I did</h2>
          <ul className="space-y-3 text-[17px] leading-[1.45] tracking-[-0.02em] text-black/75">
            {w.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-black/40" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {w.more && (
          <section className="mt-12 max-w-[620px]" aria-label={w.more.heading}>
            <h2 className="mb-4 text-base font-bold tracking-[-0.02em] text-black/80">
              {w.more.heading}
            </h2>
            <ul className="space-y-3 text-[17px] leading-[1.45] tracking-[-0.02em] text-black/75">
              {w.more.items.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-black/40" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12" aria-label="Built with">
          <h2 className="mb-4 text-base font-bold tracking-[-0.02em] text-black/80">Built with</h2>
          <ul className="flex flex-wrap gap-2">
            {w.stack.map((s) => (
              <li
                key={s}
                className="rounded-[1px] bg-[#f2efe4] px-[6px] py-[1px] font-mono text-[14px] tracking-[-0.02em] text-black/70"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        <nav className="mt-20 border-t border-black/10 pt-6" aria-label="Next project">
          <Link
            href={`/case/${next.slug}`}
            className="group flex items-baseline justify-between gap-4 transition-opacity hover:opacity-60"
          >
            <span className="font-mono text-[15px] tracking-[-0.04em] text-black/40">NEXT</span>
            <span className="font-serif text-[24px] font-medium tracking-[-0.02em] text-black/70">
              {next.title} →
            </span>
          </Link>
        </nav>
      </div>
    </main>
  );
}
