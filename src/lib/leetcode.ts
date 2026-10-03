export type HeatDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type LeetCodeStats = {
  solved: { all: number; easy: number; medium: number; hard: number };
  streak: number;
  activeDays: number;
  submissions: number;
  topPercentage: number | null;
  days: HeatDay[];
  rangeStart: string;
  rangeEnd: string;
  endsToday: boolean;
};

const QUERY = `query stats($u: String!) {
  matchedUser(username: $u) {
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar { streak submissionCalendar }
  }
  userContestRanking(username: $u) { topPercentage }
}`;

const DAY = 86400000;
const iso = (d: Date) => d.toISOString().slice(0, 10);

function level(count: number): HeatDay["level"] {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
}

/**
 * Public LeetCode stats plus a 26-week daily submission heatmap.
 * `streak` is LeetCode's userCalendar.streak, which is the max streak.
 * Cached for a day. Returns null on any failure so the page still renders.
 */
export async function getLeetCodeStats(username: string): Promise<LeetCodeStats | null> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (portfolio stats)",
      },
      body: JSON.stringify({ query: QUERY, variables: { u: username } }),
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    const user = json?.data?.matchedUser;
    if (!user) return null;

    const nums: { difficulty: string; count: number }[] = user.submitStatsGlobal?.acSubmissionNum ?? [];
    const get = (d: string) => nums.find((n) => n.difficulty === d)?.count ?? 0;

    const calendar: Record<string, number> = JSON.parse(user.userCalendar?.submissionCalendar || "{}");
    const byDate = new Map<string, number>();
    for (const [ts, count] of Object.entries(calendar)) {
      byDate.set(iso(new Date(Number(ts) * 1000)), count);
    }

    // 26 Sunday-aligned weeks. Normally they end today; if there has been no activity in
    // that window, they end at the week of the latest submission instead, so the card
    // shows real activity. The card labels the actual date range either way.
    const today = new Date(`${iso(new Date())}T00:00:00Z`);
    const WEEKS = 26;
    const windowStart = (end: Date) => new Date(end.getTime() - ((WEEKS - 1) * 7 + end.getUTCDay()) * DAY);
    const latest = [...byDate.entries()].filter(([, c]) => c > 0).map(([d]) => d).sort().at(-1);
    let end = today;
    if (latest && latest < iso(windowStart(today))) {
      const last = new Date(`${latest}T00:00:00Z`);
      end = new Date(last.getTime() + (6 - last.getUTCDay()) * DAY); // that week's Saturday
    }
    const start = windowStart(end);
    const days: HeatDay[] = [];
    let submissions = 0;
    let activeDays = 0;
    for (let t = start.getTime(); t <= end.getTime(); t += DAY) {
      const date = iso(new Date(t));
      const count = byDate.get(date) ?? 0;
      submissions += count;
      if (count > 0) activeDays += 1;
      days.push({ date, count, level: level(count) });
    }

    return {
      solved: { all: get("All"), easy: get("Easy"), medium: get("Medium"), hard: get("Hard") },
      streak: user.userCalendar?.streak ?? 0,
      activeDays,
      submissions,
      topPercentage: json?.data?.userContestRanking?.topPercentage ?? null,
      days,
      rangeStart: days[0]?.date ?? iso(start),
      rangeEnd: iso(end),
      endsToday: end.getTime() === today.getTime(),
    };
  } catch {
    return null;
  }
}
