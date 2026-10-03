// Fixed layer of soft, slowly drifting clouds behind all content.
const clouds = [
  { top: "8%", left: "18%", w: 160, h: 46, d: "80s" },
  { top: "14%", left: "70%", w: 220, h: 60, d: "110s" },
  { top: "36%", left: "4%", w: 200, h: 56, d: "95s" },
  { top: "40%", left: "58%", w: 180, h: 50, d: "120s" },
  { top: "60%", left: "30%", w: 240, h: 64, d: "100s" },
  { top: "66%", left: "84%", w: 170, h: 48, d: "85s" },
  { top: "84%", left: "10%", w: 210, h: 58, d: "115s" },
  { top: "88%", left: "62%", w: 190, h: 52, d: "90s" },
];

export default function Clouds() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {clouds.map((c, i) => (
        <span
          key={i}
          className="cloud"
          style={
            {
              top: c.top,
              left: c.left,
              width: c.w,
              height: c.h,
              "--d": c.d,
              animationDelay: `-${i * 7}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
