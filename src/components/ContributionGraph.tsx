"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Contributions, Day } from "@/lib/github";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const LEVEL_FILL = ["var(--c0)", "var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)"];

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);
const parse = (s: string) => new Date(`${s}T00:00:00Z`);

function buildWeeks(byDate: Map<string, Day>, start: Date, end: Date) {
  // Columns run Sunday→Saturday, like GitHub's graph.
  const first = addDays(start, -start.getUTCDay());
  const weeks: (Day | null)[][] = [];
  for (let d = first; d <= end; d = addDays(d, 7)) {
    const week: (Day | null)[] = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(d, i);
      const key = iso(day);
      week.push(day < start || day > end ? null : (byDate.get(key) ?? { date: key, count: 0, level: 0 }));
    }
    weeks.push(week);
  }
  return weeks;
}

export default function ContributionGraph({
  data,
  today,
  user,
}: {
  data: Contributions;
  today: string;
  user: string;
}) {
  const years = Object.keys(data.totals).sort().reverse();
  const [range, setRange] = useState<"last" | string>("last");
  const scroller = useRef<HTMLDivElement>(null);

  const { weeks, total, months } = useMemo(() => {
    const byDate = new Map(data.days.map((d) => [d.date, d]));
    const end = range === "last" ? parse(today) : parse(`${range}-12-31`);
    const start = range === "last" ? addDays(end, -364) : parse(`${range}-01-01`);
    const capped = end > parse(today) ? parse(today) : end;
    const weeks = buildWeeks(byDate, start, capped);
    let total = 0;
    for (const w of weeks) for (const d of w) if (d) total += d.count;

    // Label a month above the first week that starts in it (skip if too close to the previous label).
    const months: { x: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((w, i) => {
      const firstDay = w.find(Boolean);
      if (!firstDay) return;
      const m = parse(firstDay.date).getUTCMonth();
      if (m !== lastMonth) {
        const x = i * STEP;
        if (!months.length || x - months[months.length - 1].x > STEP * 2.5) {
          months.push({ x, label: MONTHS[m] });
        }
        lastMonth = m;
      }
    });
    return { weeks, total, months };
  }, [data.days, range, today]);

  // On narrow screens, start scrolled to the most recent weeks (like GitHub).
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [range]);

  const width = weeks.length * STEP - GAP;
  const height = 7 * STEP - GAP;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="min-w-0 flex-1">
        <div ref={scroller} className="overflow-x-auto pb-1 [scrollbar-width:thin]">
          <svg
            width={width}
            height={height + 20}
            viewBox={`0 -20 ${width} ${height + 20}`}
            role="img"
            aria-label={`${total} contributions ${range === "last" ? "in the last year" : `in ${range}`}`}
            className="block"
          >
            {months.map((m) => (
              <text key={`${m.label}-${m.x}`} x={m.x} y={-7} className="fill-muted text-[12px]">
                {m.label}
              </text>
            ))}
            {weeks.map((w, i) =>
              w.map((d, j) =>
                d ? (
                  <rect
                    key={d.date}
                    x={i * STEP}
                    y={j * STEP}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    fill={LEVEL_FILL[d.level]}
                  >
                    <title>{`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}</title>
                  </rect>
                ) : null,
              ),
            )}
          </svg>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
          <a
            href={`https://github.com/${user}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            {total} contribution{total === 1 ? "" : "s"} {range === "last" ? "in the last year" : `in ${range}`}
          </a>
          <div className="flex items-center gap-[3px] text-xs">
            <span className="mr-1">Less</span>
            {LEVEL_FILL.map((f) => (
              <span key={f} className="inline-block size-[11px] rounded-[2px]" style={{ background: f }} />
            ))}
            <span className="ml-1">More</span>
          </div>
        </div>
      </div>

      <ul className="flex shrink-0 gap-1 overflow-x-auto sm:flex-col" aria-label="Contribution year">
        {["last", ...years].map((y) => (
          <li key={y}>
            <button
              type="button"
              onClick={() => setRange(y)}
              aria-pressed={range === y}
              className={`w-full rounded-md px-2.5 py-1 text-left font-mono text-xs tabular-nums transition-colors ${
                range === y ? "bg-tint font-medium text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {y === "last" ? "Last year" : y}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
