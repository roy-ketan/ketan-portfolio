// Illustrative mock of a voice → intent → action pipeline.
const bars = [8, 14, 22, 30, 18, 34, 26, 12, 28, 36, 20, 10, 24, 32, 16, 8];

export default function VoicePipeline() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden rounded-xl bg-[#0d1b2e] p-4 font-mono text-[11px] text-[#bfe3ff]">
      <div className="rounded-lg border border-[#2b4c74] p-3">
        <p className="mb-2 text-[10px] text-[#7fb2e5]">① speech · stt</p>
        <div className="flex h-10 items-center gap-[3px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="w-[5px] animate-pulse rounded-full bg-[#4fb3ff]"
              style={{ height: h, animationDelay: `${i * 90}ms` }}
            />
          ))}
          <span className="ml-3 text-[#e7f4ff]">&quot;create a new part&quot;</span>
        </div>
      </div>
      <p className="text-center text-[10px] text-[#7fb2e5]">↓ nlp</p>
      <div className="flex items-center justify-between rounded-lg border border-[#2b4c74] p-3">
        <span>
          <span className="text-[#7fb2e5]">② intent</span> create_object
        </span>
        <span className="rounded-full border border-[#3fae4a] px-2 py-0.5 text-[10px] text-[#7ee08a]">97% acc</span>
      </div>
      <p className="text-center text-[10px] text-[#7fb2e5]">↓ ekl + python api</p>
      <div className="flex items-center justify-between rounded-lg border border-[#2b4c74] p-3">
        <span>
          <span className="text-[#7fb2e5]">③ action</span> dispatched ✓
        </span>
        <span className="rounded-full border border-[#4fb3ff] px-2 py-0.5 text-[10px]">−30% latency</span>
      </div>
    </div>
  );
}
