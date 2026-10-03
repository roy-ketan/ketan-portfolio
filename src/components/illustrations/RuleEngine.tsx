// Illustrative mock of a rule-validation run (not a real product screenshot).
const rules = [
  { name: "schema.invariants", ok: true },
  { name: "references.resolved", ok: true },
  { name: "ids.unique", ok: true },
  { name: "attribute.permissions", ok: true },
  { name: "deprecated_api.usage", ok: false },
];

export default function RuleEngine() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white font-mono text-[11.5px] text-[#24324a]">
      <div className="flex items-center justify-between bg-[#0b4f8a] px-4 py-2.5 text-white">
        <span className="flex items-center gap-2 font-bold">
          <span className="flex size-5 items-center justify-center rounded bg-white text-[10px] text-[#0b4f8a]">R</span>
          rules · validate
        </span>
        <span className="flex items-center gap-1.5 text-[10px] opacity-80">
          running <span className="size-1.5 animate-pulse rounded-full bg-[#7ee08a]" />
        </span>
      </div>
      <div className="grid flex-1 grid-cols-[1fr_auto] gap-4 p-4">
        <ul className="space-y-1.5">
          {rules.map((r) => (
            <li
              key={r.name}
              className={`flex items-center justify-between rounded-md border px-2.5 py-1.5 ${
                r.ok ? "border-[#cfe3f5] bg-[#f4f9fe]" : "border-[#f3c9a9] bg-[#fff6ee]"
              }`}
            >
              <span>{r.name}</span>
              <span className={r.ok ? "text-[#2f9e44]" : "text-[#d9480f]"}>{r.ok ? "✓ pass" : "↻ fixed"}</span>
            </li>
          ))}
        </ul>
        <div className="flex w-24 flex-col items-center justify-center gap-1 rounded-lg border border-[#cfe3f5] bg-[#f4f9fe] p-2 text-center">
          <span className="font-display text-2xl font-bold text-[#2f9e44]">−30%</span>
          <span className="text-[10px] leading-tight text-[#5b6b84]">validation errors</span>
        </div>
      </div>
      <div className="border-t border-[#e3ecf5] px-4 py-2 text-[10.5px] text-[#5b6b84]">
        $ python -m rules.run --all <span className="animate-pulse">▌</span>
      </div>
    </div>
  );
}
