export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type Contributions = {
  totals: Record<string, number>;
  days: Day[];
};

/**
 * Public contribution history for a GitHub user, via the free
 * github-contributions-api (no token needed). Cached and refreshed daily.
 * Returns null on any failure so the page still renders.
 */
export async function getContributions(user: string): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=all`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { total: Record<string, number>; contributions: Day[] };
    if (!data?.contributions?.length) return null;
    const days = [...data.contributions].sort((a, b) => a.date.localeCompare(b.date));
    return { totals: data.total, days };
  } catch {
    return null;
  }
}
