// Original generated artwork for each project card (no screenshots needed).

const mono = "var(--font-space-mono), monospace";

function CloudCart() {
  const nodes = [
    [70, 60], [160, 40], [250, 70], [110, 130], [210, 140], [300, 120], [60, 190], [180, 200],
  ];
  const edges = [[0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [3, 7], [4, 7], [5, 4]];
  return (
    <svg viewBox="0 0 360 240" className="h-full w-full" aria-hidden>
      <rect width="360" height="240" fill="#dfeaf6" />
      <rect x="20" y="20" width="320" height="200" rx="14" fill="none" stroke="#4696d3" strokeWidth="1.5" strokeDasharray="5 5" />
      <text x="34" y="40" fontFamily={mono} fontSize="10" fill="#4696d3">EKS CLUSTER</text>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1] + 14} x2={nodes[b][0]} y2={nodes[b][1] + 14} stroke="#8ccdff" strokeWidth="2" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 22} y={y - 4} width="44" height="36" rx="8" fill="#fff" stroke="#4696d3" strokeWidth="1.5" />
          <rect x={x - 14} y={y + 4} width="28" height="5" rx="2.5" fill={i % 3 === 0 ? "#d9f97d" : "#8ccdff"} />
          <rect x={x - 14} y={y + 14} width="18" height="5" rx="2.5" fill="#dfeaf6" />
        </g>
      ))}
    </svg>
  );
}

function DriveCall() {
  const bars = Array.from({ length: 21 }, (_, i) => {
    const h = 20 + Math.abs(Math.sin(i * 0.9) * 90) + (i % 3) * 12;
    return { x: 30 + i * 14, h, d: (i % 7) * 0.12 };
  });
  return (
    <svg viewBox="0 0 360 360" className="h-full w-full" aria-hidden>
      <rect width="360" height="360" fill="#22211f" />
      <text x="28" y="48" fontFamily={mono} fontSize="12" fill="#d9f97d">● LIVE · 20 SESSIONS</text>
      {bars.map((b, i) => (
        <rect
          key={i}
          className="wave-bar"
          style={{ animationDelay: `${b.d}s` }}
          x={b.x}
          y={190 - b.h / 2}
          width="8"
          height={b.h}
          rx="4"
          fill={i % 4 === 0 ? "#d9f97d" : "#fffef3"}
          opacity={i % 4 === 0 ? 1 : 0.85}
        />
      ))}
      <rect x="28" y="290" width="304" height="40" rx="20" fill="#fffef3" />
      <text x="48" y="315" fontFamily={mono} fontSize="12" fill="#22211f">&quot;Book me a service for Friday…&quot;</text>
    </svg>
  );
}

function StudyLink() {
  return (
    <svg viewBox="0 0 340 293" className="h-full w-full" aria-hidden>
      <rect width="340" height="293" fill="#dce2e1" />
      <rect x="24" y="24" width="292" height="245" rx="12" fill="#fff" />
      <path
        d="M52 200 C 80 90, 120 90, 150 170 S 220 250, 250 120 S 280 70, 296 110"
        fill="none"
        stroke="#d6a5db"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M52 218 C 100 160, 150 230, 200 190"
        fill="none"
        stroke="#8ccdff"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="296" cy="110" r="10" fill="#d9f97d" stroke="#181818" strokeWidth="2" />
      <text x="40" y="52" fontFamily={mono} fontSize="11" fill="#6b6b6b">AIR CANVAS</text>
      <g transform="translate(262 222)">
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={i * 16} cy={0} r="6" fill={["#8ccdff", "#d6a5db", "#d9f97d"][i]} stroke="#181818" strokeWidth="1.5" />
        ))}
      </g>
    </svg>
  );
}

function Dassault() {
  const lines = [
    ["rule", "validate(system)", "#d9f97d"],
    ["  require", "invariant.holds()", "#fffef3"],
    ["  deny", "unauthorized.access", "#ffbb00"],
    ["policy", "object ▸ attribute", "#8ccdff"],
    ["ci", "git push → deploy ✓", "#d9f97d"],
  ];
  return (
    <svg viewBox="0 0 756 491" className="h-full w-full" aria-hidden>
      <rect width="756" height="491" fill="#0a5235" />
      <rect x="70" y="70" width="616" height="351" rx="16" fill="#0b261c" />
      <circle cx="104" cy="100" r="6" fill="#ff6b6b" />
      <circle cx="126" cy="100" r="6" fill="#ffbb00" />
      <circle cx="148" cy="100" r="6" fill="#6bd968" />
      {lines.map(([k, v, c], i) => (
        <text key={i} x="104" y={170 + i * 52} fontFamily={mono} fontSize="24" fill={c}>
          <tspan fill="#73a48c">{k} </tspan>
          {v}
        </text>
      ))}
      <rect className="blink" x="104" y="400" width="14" height="4" fill="#d9f97d" />
    </svg>
  );
}

export default function ProjectArt({ slug }: { slug: string }) {
  switch (slug) {
    case "cloudcart":
      return <CloudCart />;
    case "drivecall-ai":
      return <DriveCall />;
    case "studylink":
      return <StudyLink />;
    default:
      return <Dassault />;
  }
}
