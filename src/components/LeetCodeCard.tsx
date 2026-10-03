import { Code2, Flame } from "lucide-react";
import type { HeatDay, LeetCodeStats } from "@/lib/leetcode";

const FILL = ["#fbf0cf", "#d8efa6", "#a9d977", "#6bb34a", "#2f7d32"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const CELL = 10;
const GAP = 2.5;
const STEP = CELL + GAP;
const LEFT = 30; // room for day labels
const TOP = 16; // room for month labels

/** Groups days into Sunday-first weeks, labelling a week when a new month starts. */
function toWeeks(days: HeatDay[]) {
  const weeks: { days: HeatDay[]; label: string }[] = [];
  let lastMonth = -1;
  for (let i = 0; i < days.length; i += 7) {
    const w = days.slice(i, i + 7);
    const m = new Date(`${w[0].date}T00:00:00Z`).getUTCMonth();
    // Skip the very first partial month label so it can't collide with the next one.
    weeks.push({ days: w, label: m !== lastMonth && i > 0 ? MONTHS[m] : "" });
    lastMonth = m;
  }
  return weeks;
}

const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Sep '25 – Feb '26" for a past window, "last 6 months" when it ends today. */
function rangeLabel(stats: LeetCodeStats) {
  if (stats.endsToday) return "last 6 months";
  const fmt = (d: string) => {
    const date = new Date(`${d}T00:00:00Z`);
    return `${SHORT[date.getUTCMonth()]} '${String(date.getUTCFullYear()).slice(2)}`;
  };
  return `${fmt(stats.rangeStart)} – ${fmt(stats.rangeEnd)}`;
}

/** Tilted "I love solving problems. A lot." card with a 26-week LeetCode heatmap. */
export default function LeetCodeCard({ stats, profileUrl }: { stats: LeetCodeStats | null; profileUrl: string }) {
  const weeks = stats ? toWeeks(stats.days) : [];
  const width = LEFT + weeks.length * STEP;
  const height = TOP + 7 * STEP;

  return (
    <div className="w-full max-w-[470px] lg:-rotate-[3deg]">
      <p className="mb-3 ml-2 font-display text-[26px] font-bold leading-none tracking-tight text-ink">
        I love solving problems. <span className="text-[#f08c1e]">A lot.</span>
      </p>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LeetCode profile"
        className="clay block rounded-[22px] p-5 transition-transform hover:-translate-y-0.5"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="flex items-start gap-2 font-display text-[12.5px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
            <Code2 className="mt-0.5 size-4 shrink-0" aria-hidden />
            LeetCode · {stats ? rangeLabel(stats) : "profile"}
          </p>
          {stats && stats.streak > 0 && (
            <p className="flex items-center gap-1 text-right font-display text-xs font-bold leading-tight">
              <Flame className="size-4 text-[#f08c1e]" aria-hidden />
              {stats.streak}d
              <br />
              max streak
            </p>
          )}
        </div>

        {stats ? (
          <>
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="mt-4 block h-auto w-full"
              role="img"
              aria-label={`${stats.submissions} LeetCode submissions over ${stats.activeDays} active days in the last 12 months`}
            >
              {["MON", "WED", "FRI"].map((d, i) => (
                <text key={d} x={0} y={TOP + (1 + i * 2) * STEP + CELL - 1} className="fill-ink-soft font-display text-[8.5px] font-semibold">
                  {d}
                </text>
              ))}
              {weeks.map((w, i) => (
                <g key={w.days[0].date} transform={`translate(${LEFT + i * STEP} 0)`}>
                  {w.label && (
                    <text x={0} y={10} className="fill-ink font-display text-[9px] font-bold">
                      {w.label}
                    </text>
                  )}
                  {w.days.map((d, j) => (
                    <rect
                      key={d.date}
                      y={TOP + j * STEP}
                      width={CELL}
                      height={CELL}
                      rx={2.5}
                      fill={FILL[d.level]}
                      stroke="rgb(107 68 35 / 0.15)"
                      strokeWidth={0.6}
                    >
                      <title>{`${d.count} submission${d.count === 1 ? "" : "s"} on ${d.date}`}</title>
                    </rect>
                  ))}
                </g>
              ))}
            </svg>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full border-2 border-edge bg-[#fff8e2] px-3 py-0.5 font-display text-xs font-bold">
                {stats.solved.all} solved · {stats.activeDays} active days
              </span>
              <span className="flex items-center gap-1 font-display text-[10px] text-ink-soft">
                Less
                {FILL.map((f) => (
                  <span key={f} className="size-2.5 rounded-[3px] border border-edge/15" style={{ background: f }} />
                ))}
                More
              </span>
            </div>
            <p className="mt-3 flex gap-3 font-mono text-[11px] text-ink-soft">
              <span>
                <b className="text-[#3fae4a]">Easy</b> {stats.solved.easy}
              </span>
              <span>
                <b className="text-[#e8a317]">Medium</b> {stats.solved.medium}
              </span>
              <span>
                <b className="text-[#e5484d]">Hard</b> {stats.solved.hard}
              </span>
            </p>
          </>
        ) : (
          <p className="mt-4 text-sm text-ink-soft">
            527 problems solved and a top 4.3% weekly-contest finish. See the full profile on LeetCode.
          </p>
        )}
      </a>
    </div>
  );
}
