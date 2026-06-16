// Creative diagrams sourced from the Roboscale Genesis Core seed deck.
// All visuals are pure SVG so they stay crisp, animate, and theme on the dark stack.

const amber = "hsl(45 100% 55%)";
const cyan = "hsl(186 100% 55%)";
const dim = "hsl(0 0% 100% / 0.18)";
const dimmer = "hsl(0 0% 100% / 0.08)";

// 1 — Market / TAM expansion ($1.4T → $24.4T, 2026 → 2033)
export const MarketCurve = () => {
  const years = [
    ["2026", 1.4],
    ["2027", 2.1],
    ["2028", 3.6],
    ["2029", 5.4],
    ["2030", 7.9],
    ["2031", 11.6],
    ["2032", 16.2],
    ["2033", 24.4],
  ] as const;
  const max = 24.4;
  const w = 800;
  const h = 340;
  const padL = 56;
  const padB = 44;
  const padT = 24;
  const innerW = w - padL - 24;
  const innerH = h - padT - padB;
  const x = (i: number) => padL + (i / (years.length - 1)) * innerW;
  const y = (v: number) => padT + innerH - (v / max) * innerH;

  const linePath = years.map(([, v], i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
  const areaPath = `${linePath} L ${x(years.length - 1)} ${padT + innerH} L ${x(0)} ${padT + innerH} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full">
      <defs>
        <linearGradient id="tamFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={amber} stopOpacity="0.42" />
          <stop offset="100%" stopColor={amber} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* gridlines */}
      {[0, 6, 12, 18, 24].map((v) => (
        <g key={v}>
          <line x1={padL} x2={w - 24} y1={y(v)} y2={y(v)} stroke={dimmer} strokeDasharray="2 4" />
          <text x={padL - 10} y={y(v) + 4} textAnchor="end" fontSize="10" fontFamily="ui-monospace,monospace" fill="hsl(0 0% 100% / 0.45)">
            ${v}T
          </text>
        </g>
      ))}

      {/* area + line */}
      <path d={areaPath} fill="url(#tamFill)" />
      <path d={linePath} stroke={amber} strokeWidth="1.6" fill="none" />

      {/* points + year labels */}
      {years.map(([yr, v], i) => (
        <g key={yr}>
          <circle cx={x(i)} cy={y(v)} r={i === years.length - 1 ? 6 : 3} fill={i === years.length - 1 ? cyan : amber} />
          <text x={x(i)} y={h - 18} textAnchor="middle" fontSize="10" fontFamily="ui-monospace,monospace" fill="hsl(0 0% 100% / 0.55)">
            {yr}
          </text>
          {i === years.length - 1 && (
            <text x={x(i) - 12} y={y(v) - 14} textAnchor="end" fontSize="14" fontFamily="ui-monospace,monospace" fill={cyan}>
              $24.4T
            </text>
          )}
        </g>
      ))}

      {/* anchor */}
      <text x={padL} y={y(1.4) - 12} fontSize="10" fontFamily="ui-monospace,monospace" fill="hsl(0 0% 100% / 0.55)">
        $1.4T · today
      </text>
    </svg>
  );
};

// 2 — Cradle five-stage curriculum ribbon (Babble → Predict → Dream → Distill → Embody)
export const CradleRibbon = () => {
  const stages = [
    { n: "01", k: "BABBLE", spec: "10K phantoms · 200ms each", body: "Random motor exploration. Every action is a hypothesis about the body." },
    { n: "02", k: "PREDICT", spec: "2.0s convergence", body: "A Bayesian world model learns if-I-do-X-then-Y. Free energy drops on every step." },
    { n: "03", k: "DREAM", spec: "10K parallel futures", body: "Imagined trajectories run on-chip. The robot picks the one that surprises its model the least." },
    { n: "04", k: "DISTILL", spec: "12 GB → 38 KB · 316,000×", body: "A lifetime of dreamed experience compresses into pure synaptic muscle memory." },
    { n: "05", k: "EMBODY", spec: "8.3s patch latency", body: "Weights flash to the sovereign self-chip. The robot moves from intuition, not instructions." },
  ];
  return (
    <div className="relative">
      <svg viewBox="0 0 1000 60" className="absolute inset-x-0 top-12 hidden h-12 w-full md:block" preserveAspectRatio="none">
        <path d="M 20 30 Q 250 -10 500 30 T 980 30" stroke={amber} strokeWidth="1" fill="none" strokeDasharray="3 5" opacity="0.5" />
        <circle r="3" fill={cyan}>
          <animateMotion dur="6s" repeatCount="indefinite" path="M 20 30 Q 250 -10 500 30 T 980 30" />
        </circle>
      </svg>
      <ol className="relative grid gap-4 md:grid-cols-5">
        {stages.map((s) => (
          <li key={s.n} className="relative border border-border bg-card/60 p-5">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] tracking-[0.28em] text-amber">{s.n}</span>
              <span className="font-mono text-[9px] tracking-[0.22em] text-muted-foreground">CRADLE</span>
            </div>
            <div className="mt-4 font-mono text-base tracking-[0.18em] text-foreground">{s.k}</div>
            <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan/80">{s.spec}</div>
            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

// 3 — Sovereign chip die blueprint (Cradle Block / Imprint Bus / REPL Core / Fleet Link)
export const ChipBlueprint = () => (
  <svg viewBox="0 0 520 520" className="h-auto w-full">
    <defs>
      <linearGradient id="dieGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={cyan} stopOpacity="0.6" />
        <stop offset="100%" stopColor={amber} stopOpacity="0.55" />
      </linearGradient>
    </defs>

    {/* substrate */}
    <rect x="40" y="40" width="440" height="440" fill="none" stroke="url(#dieGrad)" strokeWidth="1" />
    <rect x="60" y="60" width="400" height="400" fill="none" stroke={dim} strokeDasharray="2 4" />

    {/* pins */}
    {Array.from({ length: 16 }).map((_, i) => {
      const p = 60 + i * 25;
      return (
        <g key={i} stroke={cyan} strokeOpacity="0.45">
          <line x1={p} y1="20" x2={p} y2="40" />
          <line x1={p} y1="480" x2={p} y2="500" />
          <line x1="20" y1={p} x2="40" y2={p} />
          <line x1="480" y1={p} x2="500" y2={p} />
        </g>
      );
    })}

    {/* four functional blocks */}
    {[
      { x: 80, y: 80, w: 160, h: 160, label: "CRADLE BLOCK", sub: "on-die curriculum" },
      { x: 280, y: 80, w: 160, h: 160, label: "IMPRINT BUS", sub: "12GB → 38KB" },
      { x: 80, y: 280, w: 160, h: 160, label: "REPL CORE", sub: "2.1ms hot-swap" },
      { x: 280, y: 280, w: 160, h: 160, label: "FLEET LINK", sub: "5MB/wk deltas" },
    ].map((b) => (
      <g key={b.label}>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={amber} fillOpacity="0.05" stroke={amber} strokeOpacity="0.7" />
        <text x={b.x + b.w / 2} y={b.y + b.h / 2 - 4} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="13" fill={amber}>
          {b.label}
        </text>
        <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 16} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="hsl(0 0% 100% / 0.55)">
          {b.sub}
        </text>
      </g>
    ))}

    {/* central interconnect */}
    <circle cx="260" cy="260" r="22" fill="hsl(0 0% 0%)" stroke={cyan} />
    <circle cx="260" cy="260" r="6" fill={cyan}>
      <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
    </circle>
    <line x1="240" y1="240" x2="160" y2="160" stroke={cyan} strokeOpacity="0.7" />
    <line x1="280" y1="240" x2="360" y2="160" stroke={cyan} strokeOpacity="0.7" />
    <line x1="240" y1="280" x2="160" y2="360" stroke={cyan} strokeOpacity="0.7" />
    <line x1="280" y1="280" x2="360" y2="360" stroke={cyan} strokeOpacity="0.7" />

    {/* corner spec ticks */}
    <text x="48" y="32" fontFamily="ui-monospace,monospace" fontSize="9" fill="hsl(0 0% 100% / 0.6)">GENESIS_CORE · GEN-1</text>
    <text x="472" y="32" textAnchor="end" fontFamily="ui-monospace,monospace" fontSize="9" fill="hsl(0 0% 100% / 0.6)">TSMC N7 · 120mm²</text>
    <text x="48" y="498" fontFamily="ui-monospace,monospace" fontSize="9" fill="hsl(0 0% 100% / 0.6)">8.4B TRANSISTORS</text>
    <text x="472" y="498" textAnchor="end" fontFamily="ui-monospace,monospace" fontSize="9" fill="hsl(0 0% 100% / 0.6)">12W PEAK · 4.7W IDLE</text>
  </svg>
);

// 4 — Compression visualization: 12 GB dreamed experience → 38 KB synaptic weights
export const CompressionDiagram = () => (
  <svg viewBox="0 0 600 220" className="h-auto w-full">
    <defs>
      <radialGradient id="bigBlob" cx="50%" cy="50%">
        <stop offset="0%" stopColor={cyan} stopOpacity="0.5" />
        <stop offset="100%" stopColor={cyan} stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* dreamed experience cloud */}
    <circle cx="130" cy="110" r="92" fill="url(#bigBlob)" />
    <circle cx="130" cy="110" r="92" fill="none" stroke={cyan} strokeOpacity="0.6" strokeDasharray="3 4" />
    {Array.from({ length: 60 }).map((_, i) => {
      const a = (i / 60) * Math.PI * 2;
      const r = 30 + (i % 4) * 18;
      return <circle key={i} cx={130 + Math.cos(a) * r} cy={110 + Math.sin(a) * r} r="1.4" fill={cyan} opacity="0.7" />;
    })}
    <text x="130" y="110" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="22" fill={cyan}>12 GB</text>
    <text x="130" y="132" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="hsl(0 0% 100% / 0.6)">DREAMED EXPERIENCE</text>

    {/* funnel */}
    <path d="M 230 60 L 380 100 L 380 120 L 230 160 Z" fill={amber} fillOpacity="0.08" stroke={amber} strokeOpacity="0.7" />
    <text x="305" y="44" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill={amber}>DISTILL</text>
    <text x="305" y="186" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="hsl(0 0% 100% / 0.55)">316,000× COMPRESSION</text>

    {/* synaptic weights */}
    <rect x="430" y="92" width="80" height="36" fill="none" stroke={amber} />
    <text x="470" y="115" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="14" fill={amber}>38 KB</text>
    <text x="470" y="146" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="hsl(0 0% 100% / 0.55)">SYNAPTIC WEIGHTS</text>

    {/* moving photon */}
    <circle r="3" fill={amber}>
      <animateMotion dur="3.6s" repeatCount="indefinite" path="M 220 110 L 430 110" />
    </circle>
  </svg>
);

// 5 — Four pillars of Roboscale architecture
export const PillarsGrid = () => {
  const pillars = [
    { n: "01", k: "CURRICULUM", title: "The Cradle", body: "A robot's first childhood, compressed into eight seconds." },
    { n: "02", k: "SILICON", title: "Self-Sovereign Chip", body: "Where the mind lives. Trains, imprints, recalls — on one die." },
    { n: "03", k: "SIM-TO-REAL", title: "Morphogenetic Debugger", body: "When reality breaks the model, dream hundreds of thousands of futures in seconds." },
    { n: "04", k: "GO-TO-MARKET", title: "Genesis Vibe Coding", body: "An operator types intent in plain English. The robot learns it in eight seconds." },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {pillars.map((p) => (
        <div key={p.n} className="group relative h-full border border-border bg-card/55 p-6 transition-colors hover:border-cyan/60">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10px] tracking-[0.28em] text-cyan">PILLAR {p.n}</span>
            <span className="font-mono text-[9px] tracking-[0.22em] text-muted-foreground">{p.k}</span>
          </div>
          <div className="mt-10 text-2xl leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            {p.title}
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">{p.body}</p>
          <span className="absolute right-4 top-1/2 h-px w-6 -translate-y-1/2 bg-amber/0 transition-colors group-hover:bg-amber" />
        </div>
      ))}
    </div>
  );
};
