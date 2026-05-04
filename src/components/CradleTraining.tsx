import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";

/* ============================================================
   THE CRADLE — A scroll-driven training story.
   Stage 1: Spawn (random twitching)
   Stage 2: Motor babbling (curiosity exploration)
   Stage 3: World model converges (rings stabilize)
   Stage 4: Intentional motion (target reached)
   ============================================================ */

const TELEMETRY = [
  { k: "EPOCH", v: ["000,001", "184,302", "612,990", "1,204,773"] },
  { k: "PARALLEL_TRIALS", v: ["008,192", "065,536", "524,288", "1,048,576"] },
  { k: "CURIOSITY_REWARD", v: ["+0.12", "+0.48", "+0.81", "+0.94"] },
  { k: "COMMON_SENSE", v: ["0.02", "0.34", "0.76", "0.93"] },
  { k: "FREE_ENERGY", v: ["9.412", "4.118", "1.802", "0.241"] },
  { k: "WORLD_MODEL", v: ["v0.0", "v1.2", "v2.7", "v3.1"] },
];

const STAGE_LABELS = [
  {
    tag: "STAGE 01 · SPAWN",
    title: "First it fails at being a body.",
    body: "The Cradle births thousands of unstable copies at once. Some tip over. Some fling a cup into the floor. Some over-grip until the object collapses. Nothing is wasted: every failure becomes a gradient for physics, balance, contact, and consequence.",
    learn: ["The floor pushes back", "Mass resists acceleration", "A cup spills when tilted past its lip"],
  },
  {
    tag: "STAGE 02 · MOTOR BABBLING",
    title: "Curiosity becomes the engine.",
    body: "Agents are rewarded for reducing uncertainty, not merely completing a task. They poke water, drag fabric, drop tools, miss catches, and learn what changes. Parallel worlds explore millions of wrong answers so the surviving policy understands why the right one works.",
    learn: ["Water falls downward and keeps flowing", "Soft objects deform before they move", "Friction changes with surface and force"],
  },
  {
    tag: "STAGE 03 · CONVERGENCE",
    title: "Failures compress into common sense.",
    body: "Pass/fail traces are distilled into parameters: balance margin, spill risk, crush risk, recovery cost, novelty reward. The model learns that a glass can be carried quickly only when orientation, grip pressure, and acceleration agree.",
    learn: ["Fast motion creates slosh", "Grip force must match fragility", "Recovery is cheaper before collapse"],
  },
  {
    tag: "STAGE 04 · INTENT",
    title: "Then it acts like it knows the world.",
    body: "The best policy is not the one that never failed. It is the one trained by every failure. The Cradle releases an embodied agent with a usable prior: how liquids fall, objects break, limbs recover, and curiosity should be spent.",
    learn: ["Plan before contact", "Seek novelty when safe", "Protect the task while exploring"],
  },
];

const PARALLEL_TRIALS = [
  { label: "BALANCE", result: ["FAIL", "FAIL", "PASS", "PASS"], signal: "center_of_mass", lesson: "Feet widen before torque spikes" },
  { label: "CUP/WATER", result: ["FAIL", "FAIL", "FAIL", "PASS"], signal: "spill_risk", lesson: "Tilt + acceleration predicts liquid escape" },
  { label: "FRAGILE GRIP", result: ["FAIL", "PASS", "PASS", "PASS"], signal: "crush_limit", lesson: "Pressure must rise slower than deformation" },
  { label: "SOFT CLOTH", result: ["FAIL", "FAIL", "PASS", "PASS"], signal: "deform_field", lesson: "Pull points create delayed motion" },
  { label: "RECOVERY", result: ["FAIL", "FAIL", "PASS", "PASS"], signal: "fall_vector", lesson: "Catch before the hip exits support" },
  { label: "TOOL USE", result: ["FAIL", "FAIL", "FAIL", "PASS"], signal: "lever_gain", lesson: "Longer radius trades precision for force" },
];

const REWARD_PARAMS = [
  ["curiosity", "+0.94", "Reward novelty that reduces uncertainty"],
  ["task_pass", "+1.00", "Complete the requested behavior"],
  ["safe_fail", "+0.31", "Fail without damaging body or world"],
  ["common_sense", "+0.88", "Transfer learned physics to new scenes"],
];

export const CradleTraining = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 80 });

  const [stage, setStage] = useState(0);
  useEffect(() => {
    return smooth.on("change", (v) => {
      const s = Math.min(3, Math.max(0, Math.floor(v * 4)));
      setStage(s);
    });
  }, [smooth]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "520vh" }}>
      <div className="sticky top-0 min-h-screen w-full overflow-hidden lg:h-screen">
        {/* Atmospheric backdrop */}
        <div className="absolute inset-0 grid-bg-fine opacity-40" />
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(45 100% 50% / 0.10), transparent 70%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />

        {/* Top HUD */}
        <div className="absolute top-6 left-0 right-0 z-20">
          <div className="container flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/70">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-amber pulse-amber" />
              <span>CRADLE://nursery_03 · subject_g047</span>
            </div>
            <div className="flex items-center gap-6">
              <span>SIM_TIME {String(stage * 12 + 4).padStart(2, "0")}:{String((stage * 33) % 60).padStart(2, "0")}:{String(((stage + 1) * 17) % 60).padStart(2, "0")}</span>
              <span className="text-amber">● REC</span>
            </div>
          </div>
        </div>

        <div className="container relative z-10 h-full grid gap-6 pt-24 pb-20 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-20 lg:pb-12">
          {/* LEFT: Narrative copy */}
          <div className="relative min-h-[390px] lg:col-span-4 lg:flex lg:h-full lg:items-center">
            <div className="relative w-full min-h-[360px]">
              {STAGE_LABELS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    opacity: stage === i ? 1 : 0,
                    y: stage === i ? 0 : 20,
                    pointerEvents: stage === i ? "auto" : "none",
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber mb-5">
                    {s.tag}
                  </div>
                  <h3
                    className="text-4xl md:text-6xl font-light tracking-[-0.03em] leading-[1.02] mb-6"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                    {s.body}
                  </p>
                  <div className="mt-7 space-y-2 max-w-md">
                    <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan/70">learned laws written back</div>
                    {s.learn.map((item) => (
                      <div key={item} className="flex items-center gap-3 border-l border-amber/40 bg-obsidian-soft/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        <span className="h-1.5 w-1.5 bg-amber pulse-amber" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Stage progress rail */}
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-border/40 hidden lg:block">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border transition-all duration-500"
                    style={{
                      top: `${15 + i * 25}%`,
                      borderColor: stage >= i ? "hsl(var(--amber))" : "hsl(var(--border))",
                      background: stage === i ? "hsl(var(--amber))" : "transparent",
                      boxShadow: stage === i ? "0 0 16px hsl(var(--amber) / 0.7)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: The simulation chamber */}
          <div className="relative lg:col-span-5">
            <SimChamber stage={stage} />
          </div>

          {/* RIGHT: Telemetry */}
          <div className="hidden lg:col-span-3 lg:block">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              // telemetry
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TELEMETRY.map((t) => (
                <div key={t.k} className="border border-border/60 bg-obsidian-soft/50 p-3">
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                    {t.k}
                  </div>
                  <motion.div
                    key={`${t.k}-${stage}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-mono text-base text-amber tabular-nums"
                  >
                    {t.v[stage]}
                  </motion.div>
                </div>
              ))}
            </div>
            <ParallelTrials stage={stage} compact />
            <RewardConsole stage={stage} />
            <div className="mt-8">
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                FREE_ENERGY ↓
              </div>
              <div className="h-1 bg-obsidian-soft border border-border/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber to-cyan"
                  animate={{ width: `${[15, 45, 75, 97][stage]}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scrub indicator */}
        <div className="absolute bottom-6 left-0 right-0 z-20">
          <div className="container">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="text-cyan">SCROLL</span>
              <div className="flex-1 h-px bg-border/40 relative">
                <motion.div
                  className="absolute top-0 left-0 h-px bg-amber"
                  style={{ width: useTransform(smooth, [0, 1], ["0%", "100%"]) }}
                />
              </div>
              <span>0{stage + 1}/04</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- The simulated body inside the chamber ---------- */
const SimChamber = ({ stage }: { stage: number }) => {
  // Joint targets per stage — random twitch → babble → controlled → reach
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), stage === 0 ? 80 : stage === 1 ? 180 : 400);
    return () => clearInterval(id);
  }, [stage]);

  // simple kinematic arm with 3 joints
  const seed = (n: number) => Math.sin(tick * 0.6 + n * 1.3) * 0.5 + 0.5;
  const jitter = stage === 0 ? 1 : stage === 1 ? 0.6 : stage === 2 ? 0.2 : 0.05;

  const baseAngles = stage === 3
    ? [-Math.PI / 4, -Math.PI / 3, -Math.PI / 6]
    : stage === 2
    ? [Math.PI / 3, -Math.PI / 4, Math.PI / 6]
    : [Math.PI / 2, Math.PI / 3, -Math.PI / 4];

  const a1 = baseAngles[0] + (seed(1) - 0.5) * jitter * 2;
  const a2 = baseAngles[1] + (seed(2) - 0.5) * jitter * 2;
  const a3 = baseAngles[2] + (seed(3) - 0.5) * jitter * 2;

  const cx = 200, cy = 250;
  const L = 60;
  const x1 = cx + Math.cos(a1) * L;
  const y1 = cy + Math.sin(a1) * L;
  const x2 = x1 + Math.cos(a1 + a2) * L;
  const y2 = y1 + Math.sin(a1 + a2) * L;
  const x3 = x2 + Math.cos(a1 + a2 + a3) * L * 0.7;
  const y3 = y2 + Math.sin(a1 + a2 + a3) * L * 0.7;

  return (
    <div className="relative aspect-square w-full max-w-xl mx-auto">
      {/* chamber frame */}
      <div className="absolute inset-0 corner-frame border border-cyan/30 bg-obsidian/40 backdrop-blur-sm">
        <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
      </div>
      {/* glow */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: 0.4 + stage * 0.15,
          background: `radial-gradient(circle at 50% 60%, hsl(45 100% 50% / ${0.1 + stage * 0.05}), transparent 65%)`,
        }}
      />

      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="floor" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(186 100% 50% / 0.3)" />
            <stop offset="100%" stopColor="hsl(186 100% 50% / 0)" />
          </radialGradient>
          <linearGradient id="bone" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(45 100% 50%)" />
            <stop offset="100%" stopColor="hsl(186 100% 50%)" />
          </linearGradient>
        </defs>

        {/* horizon / floor */}
        <ellipse cx="200" cy="320" rx="160" ry="14" fill="url(#floor)" />
        <line x1="40" y1="320" x2="360" y2="320" stroke="hsl(186 100% 50% / 0.25)" strokeDasharray="2 6" />

        {/* World model rings - appear at stage 2+ */}
        {[40, 70, 100, 130].map((r, i) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={stage >= 2 ? "hsl(186 100% 50%)" : "hsl(186 100% 50% / 0.1)"}
            strokeOpacity={stage >= 2 ? 0.15 + i * 0.04 : 0.05}
            strokeDasharray="3 6"
            style={{
              transition: "stroke 1s, stroke-opacity 1s",
              transformOrigin: `${cx}px ${cy}px`,
              animation: stage >= 2 ? `cradle-spin ${20 + i * 5}s linear infinite ${i % 2 ? "reverse" : ""}` : "none",
            }}
          />
        ))}

        {/* Prediction ghost trail (stage 2-3) */}
        {stage >= 2 && (
          <g opacity={stage === 2 ? 0.4 : 0.7}>
            <path
              d={`M ${cx} ${cy} L ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3}`}
              stroke="hsl(186 100% 50%)"
              strokeWidth="1"
              strokeDasharray="2 3"
              fill="none"
              opacity="0.5"
            />
          </g>
        )}

        {/* Skeletal arm */}
        <g style={{ transition: "all 0.3s ease-out" }}>
          {/* shoulder anchor */}
          <circle cx={cx} cy={cy} r="6" fill="hsl(45 100% 50%)" />
          <circle cx={cx} cy={cy} r="14" fill="none" stroke="hsl(45 100% 50% / 0.3)" />

          {/* bones */}
          <line x1={cx} y1={cy} x2={x1} y2={y1} stroke="url(#bone)" strokeWidth="3.5" strokeLinecap="round" />
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#bone)" strokeWidth="3" strokeLinecap="round" />
          <line x1={x2} y1={y2} x2={x3} y2={y3} stroke="url(#bone)" strokeWidth="2.5" strokeLinecap="round" />

          {/* joints */}
          <circle cx={x1} cy={y1} r="4" fill="hsl(186 100% 50%)" />
          <circle cx={x2} cy={y2} r="3.5" fill="hsl(186 100% 50%)" />
          {/* end effector */}
          <circle cx={x3} cy={y3} r="5" fill="hsl(45 100% 50%)">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Target — appears in stage 3 */}
        {stage === 3 && (
          <g>
            <circle cx="320" cy="180" r="10" fill="none" stroke="hsl(45 100% 50%)" strokeWidth="1.2">
              <animate attributeName="r" values="8;14;8" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="320" cy="180" r="3" fill="hsl(45 100% 50%)" />
            <text x="334" y="183" fill="hsl(45 100% 50%)" fontSize="9" fontFamily="JetBrains Mono">
              GOAL
            </text>
            <line x1={x3} y1={y3} x2="320" y2="180" stroke="hsl(45 100% 50% / 0.4)" strokeDasharray="2 3" />
          </g>
        )}

        {/* Stage 0 — chaos sparks */}
        {stage === 0 && Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={i}
            cx={cx + (Math.random() - 0.5) * 120}
            cy={cy + (Math.random() - 0.5) * 120}
            r={Math.random() * 1.5 + 0.5}
            fill="hsl(45 100% 50%)"
            opacity={Math.random() * 0.7}
          />
        ))}

        {/* Stage 1 — exploration trails */}
        {stage === 1 && Array.from({ length: 8 }).map((_, i) => {
          const ang = (tick * 0.1 + i) % (Math.PI * 2);
          const r = 30 + i * 8;
          return (
            <circle
              key={i}
              cx={cx + Math.cos(ang) * r}
              cy={cy + Math.sin(ang) * r}
              r="1.5"
              fill="hsl(186 100% 50%)"
              opacity={0.4}
            />
          );
        })}

        {/* HUD crosshair */}
        <g stroke="hsl(186 100% 50% / 0.3)" strokeWidth="0.5">
          <line x1="20" y1={cy} x2="50" y2={cy} />
          <line x1="350" y1={cy} x2="380" y2={cy} />
          <line x1={cx} y1="20" x2={cx} y2="50" />
        </g>
        <text x="20" y="30" fill="hsl(186 100% 50% / 0.6)" fontSize="8" fontFamily="JetBrains Mono">
          CHAMBER_03
        </text>
        <text x="320" y="30" fill="hsl(186 100% 50% / 0.6)" fontSize="8" fontFamily="JetBrains Mono">
          GRAV 9.81
        </text>
      </svg>

      {/* corner labels */}
      <div className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.25em] text-cyan/60">
        joint_07 · {(a1 * 57.3).toFixed(1)}° / {(a2 * 57.3).toFixed(1)}° / {(a3 * 57.3).toFixed(1)}°
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.25em] text-amber/80">
        Δ{jitter.toFixed(2)} variance
      </div>
    </div>
  );
};

/* ============================================================
   GENERIC CHAPTER — used for pillars 02, 03, 04
   ============================================================ */
export const Chapter = ({
  num,
  tag,
  eyebrow,
  title,
  italic,
  body,
  metrics,
  visual,
  reverse = false,
}: {
  num: string;
  tag: string;
  eyebrow: string;
  title: string;
  italic: string;
  body: string;
  metrics: [string, string][];
  visual: React.ReactNode;
  reverse?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section ref={ref} className="relative py-32 md:py-40 border-b border-border/30 overflow-hidden">
      <div className="container">
        {/* chapter header strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between mb-16 pb-6 border-b border-border/30"
        >
          <div className="flex items-baseline gap-6">
            <span
              className="text-7xl md:text-8xl font-light text-amber/80 tabular-nums leading-none"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {num}
            </span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-1.5">
                CHAPTER · {tag}
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {eyebrow}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-12 bg-border" />
            <span>{num}/04</span>
          </div>
        </motion.div>

        <div className={`grid lg:grid-cols-12 gap-12 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            {visual}
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="lg:col-span-6"
          >
            <h3
              className="text-4xl md:text-6xl tracking-[-0.03em] leading-[1.02] mb-8"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              {title}{" "}
              <span className="italic text-amber text-glow-amber">{italic}</span>
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
              {body}
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-md">
              {metrics.map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="border border-border/60 bg-obsidian-soft/60 p-3 backdrop-blur-sm"
                >
                  <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1.5">
                    {k}
                  </div>
                  <div className="font-mono text-base text-amber">{v}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* spin keyframes */}
      <style>{`
        @keyframes cradle-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};
