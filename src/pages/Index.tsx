import { useState } from "react";
import { motion } from "framer-motion";
import chipImg from "@/assets/genesis-core-chip.png";
import robot1 from "@/assets/robot-organic-1.jpg";
import robot2 from "@/assets/robot-organic-2.jpg";
import robotLimb from "@/assets/robot-limb.jpg";
import { GlowCursor, ScrambleText, Reveal } from "@/components/Effects";
import { WireframeChip } from "@/components/TechDiagrams";
import { VibeTerminal } from "@/components/VibeTerminal";
import { CradleTraining, Chapter } from "@/components/CradleTraining";
import { WaitlistModal, FloatingAccess } from "@/components/Waitlist";
import { toast } from "sonner";

const PILLARS = [
  {
    n: "01",
    tag: "THE CRADLE",
    title: "Physics-First Foundation Models",
    sub: "The Synthetic Nursery",
    body: "Move beyond brittle reward functions. The Cradle is a generative simulation environment where agents undergo Motor Babbling — a curiosity-driven exploration phase. By minimizing Variational Free Energy (Active Inference), the robot develops an internal World Model of gravity, friction, and mass before ever touching physical silicon.",
    metrics: [["EPOCHS", "1.2M"], ["FREE_ENERGY", "↓ 84%"], ["WORLD_MODEL", "v3.1"]],
    accent: "amber",
  },
  {
    n: "02",
    tag: "MORPHOGENETIC DEBUGGER",
    title: "Software Rewriting Hardware DNA",
    sub: "Hardware that Heals",
    body: "When a task fails due to physical constraints, Roboscale doesn't retrain — it redesigns the vessel. The Morphogenetic Debugger identifies torque bottlenecks and kinematic inefficiencies, automatically outputting generative CAD patches to evolve the robot's physical morphology in real-time.",
    metrics: [["CAD_PATCHES", "7,402"], ["TORQUE_Δ", "+31.2 Nm"], ["GENERATION", "G_47"]],
    accent: "cyan",
  },
  {
    n: "03",
    tag: "SOVEREIGN SELF-CHIP",
    title: "The Reflexive REPL Core",
    sub: "Neuromorphic Instinct",
    body: "Intelligence belongs at the Edge. The Sovereign Self-Chip is a custom neuromorphic substrate hosting a local Mental REPL. The agent runs 2-second 'what-if' counterfactual simulations locally, patching motor policies at the millisecond level — without cloud latency or data leakage.",
    metrics: [["LATENCY", "1.8s"], ["TDP", "150W"], ["SYNAPSES", "1.02T/mm²"]],
    accent: "amber",
  },
  {
    n: "04",
    tag: "VIBE-CODING",
    title: "Natural Language Kinematics",
    sub: "Intent-Based Deployment",
    body: "Eliminate the abstraction layer between human intent and robotic execution. Vibe-Coding lets operators deploy complex physical behaviors via high-level linguistic 'Vibes' — automatically compiled into low-level kinematic instructions across the Cradle and the Self-Chip.",
    metrics: [["TOKENS/s", "2.4k"], ["COMPILE", "920ms"], ["FIDELITY", "99.4%"]],
    accent: "cyan",
  },
];

const HEX_STREAM = Array.from({ length: 40 }).map(() =>
  Array.from({ length: 6 }).map(() => Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0").toUpperCase()).join(" ")
);

const Index = () => {
  const [open, setOpen] = useState(false);
  const [waitEmail, setWaitEmail] = useState("");
  const [waitDone, setWaitDone] = useState(false);

  const submitInline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(waitEmail)) { toast.error("Invalid identifier."); return; }
    setWaitDone(true);
    toast.success("ACCESS GRANTED");
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <GlowCursor />
      <WaitlistModal open={open} onOpenChange={setOpen} />
      <FloatingAccess onOpen={() => setOpen(true)} />

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/40 bg-obsidian/60 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 border border-amber rotate-45 relative">
              <div className="absolute inset-1 bg-amber pulse-amber" />
            </div>
            <div className="font-mono text-sm tracking-[0.3em] uppercase">
              Roboscale<span className="text-amber">.</span>Labs
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <a href="#manifest" className="hover:text-amber transition-colors">Manifest</a>
            <a href="#pillars" className="hover:text-amber transition-colors">Pillars</a>
            <a href="#vibe" className="hover:text-amber transition-colors">Vibe-Code</a>
            <a href="#chip" className="hover:text-amber transition-colors">Genesis Core</a>
          </nav>
          <button onClick={() => setOpen(true)} className="font-mono text-xs uppercase tracking-[0.25em] border border-cyan/40 px-4 py-2 text-cyan hover:bg-cyan hover:text-obsidian transition-all">
            Alpha Access
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 30%, hsl(45 100% 50% / 0.12), transparent 70%)" }} />

        <div className="container relative z-10">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-8 font-mono text-[11px] uppercase tracking-[0.4em] text-cyan/80">
              <span className="h-px w-12 bg-cyan/40" />
              <span>// Genesis Core · v1.0 · Sovereign Stack</span>
              <span className="h-px w-12 bg-cyan/40" />
            </div>
          </Reveal>

          <h1 className="text-center font-bold tracking-[-0.04em] leading-[0.92] text-[clamp(3rem,9vw,9rem)] mb-8">
            <ScrambleText text="Evolution," className="block" />
            <span className="block text-amber text-glow-amber italic font-light"><ScrambleText text="Not Programming." /></span>
          </h1>

          <Reveal delay={300}>
            <p className="text-center text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light">
              Building <span className="text-foreground">sovereign organisms</span> with physical intuition. A vertically-integrated stack where software rewrites hardware, and silicon learns to feel.
            </p>
          </Reveal>

          {/* Inline Waitlist */}
          <Reveal delay={500}>
            <div className="max-w-xl mx-auto mb-20">
              {!waitDone ? (
                <form onSubmit={submitInline} className="relative group">
                  <div className="absolute -inset-px bg-gradient-to-r from-amber/0 via-amber/60 to-cyan/0 opacity-0 group-focus-within:opacity-100 blur-md transition-opacity" />
                  <div className="relative flex items-center border border-cyan/30 bg-obsidian/60 backdrop-blur-xl group-focus-within:border-amber transition-colors">
                    <span className="pl-4 font-mono text-xs text-cyan/70">&gt;_</span>
                    <input
                      type="email"
                      value={waitEmail}
                      onChange={(e) => setWaitEmail(e.target.value)}
                      placeholder="Join the Genesis Waitlist"
                      maxLength={120}
                      className="flex-1 bg-transparent px-3 py-4 font-mono text-sm focus:outline-none placeholder:text-muted-foreground/50"
                    />
                    <button type="submit" className="bg-amber text-obsidian font-mono text-xs uppercase tracking-[0.25em] px-5 py-4 hover:shadow-[0_0_30px_hsl(45_100%_50%/0.7)] transition-all">
                      Request Access →
                    </button>
                  </div>
                </form>
              ) : (
                <div className="border border-amber bg-amber/5 py-4 text-center font-mono text-sm uppercase tracking-[0.3em] text-amber text-glow-amber">
                  ◆ Access Granted ◆
                </div>
              )}
              <div className="mt-3 flex items-center justify-center gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
                <span>· 2,847 operators queued ·</span>
                <span className="text-cyan">2036 cohort</span>
              </div>
            </div>
          </Reveal>

          {/* HERO IMAGE FRAME — Genesis Core chip */}
          <Reveal delay={700}>
            <div className="relative max-w-6xl mx-auto" id="chip">
              {/* Floating tech labels */}
              <div className="absolute -top-6 left-0 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/70 hidden md:block">
                ◇ Schematic_Rev 1.0 · 2025-05-24
              </div>
              <div className="absolute -top-6 right-0 font-mono text-[10px] uppercase tracking-[0.3em] text-amber/80 hidden md:block">
                Live Telemetry ●
              </div>

              <div className="corner-frame relative border border-cyan/40 p-3 bg-obsidian-soft/50 backdrop-blur-xl">
                <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
                <div className="absolute inset-0 -z-10 blur-3xl opacity-60" style={{ background: "radial-gradient(ellipse at center, hsl(45 100% 50% / 0.25), hsl(186 100% 50% / 0.15) 40%, transparent 70%)" }} />
                <div className="scan-line relative">
                  <img src={chipImg} alt="Roboscale Genesis Core neuromorphic processor blueprint" width={1920} height={1080} className="w-full block" />
                </div>
              </div>

              {/* Bottom strip - data */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-[10px] uppercase tracking-[0.25em]">
                {[
                  ["NODE", "3nm CLASS"], ["DIE STACK", "4-TIER 3D"], ["BANDWIDTH", "71.2 TB/s"], ["TDP", "150W"]
                ].map(([k, v]) => (
                  <div key={k} className="border border-border/60 bg-obsidian-soft/60 p-3 flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="text-cyan">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MANIFEST */}
      <section id="manifest" className="relative py-32 border-y border-border/30">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-amber mb-6">// 00 · Manifest</div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-[-0.03em] mb-8 leading-[1.05]">
                Robots are not <span className="line-through text-muted-foreground/40">programmed</span>. <br/>
                They are <span className="text-cyan text-glow-cyan italic font-light">grown</span>.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The current paradigm — write code, ship binary, hope for the best — has plateaued. Embodied intelligence requires a vertically integrated organism: simulation that birthed the agent, hardware that the agent can rewrite, silicon that thinks at the speed of reflex.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Roboscale is the first <span className="text-amber">sovereign stack</span> for physical intelligence.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative corner-frame border border-amber/30 p-2 bg-obsidian-soft/50">
              <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
              <img src={robot2} alt="Biomechanical sovereign organism close-up" width={1024} height={1024} loading="lazy" className="w-full grayscale-[20%]" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-amber bg-obsidian/80 px-2 py-1">
                ◇ Subject_07 · Generation G_47
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEURAL FLOW DIAGRAM */}
      <section className="py-24 relative">
        <div className="container">
          <Reveal>
            <div className="text-center mb-12">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-3">// Technical Flow · Active Inference Loop</div>
              <h3 className="text-3xl md:text-4xl font-light tracking-tight">From <span className="text-amber">curiosity</span> to <span className="text-cyan">kinematics</span>.</h3>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="max-w-4xl mx-auto corner-frame border border-border/60 p-8 bg-obsidian-soft/50">
              <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
              <NeuralFlow />
              <div className="mt-6 grid grid-cols-3 gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <div><span className="text-cyan">[I]</span> SENSORY_TENSOR</div>
                <div className="text-center"><span className="text-amber">[H]</span> WORLD_MODEL · 5 LAYERS</div>
                <div className="text-right"><span className="text-cyan">[O]</span> MOTOR_POLICY</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="py-32 relative">
        <div className="container">
          <Reveal>
            <div className="text-center mb-20">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-amber mb-4">// Architecture · Four Pillars</div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.03em] leading-[0.95]">
                The <span className="text-glow-amber text-amber">Sovereign</span> Stack.
              </h2>
            </div>
          </Reveal>

          <div className="space-y-32">
            {PILLARS.map((p, i) => (
              <PillarRow key={p.n} pillar={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* VIBE TERMINAL */}
      <section id="vibe" className="py-32 border-y border-border/30 bg-obsidian-soft/30 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-fine opacity-40" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-4">// Pillar 04 · Live Demo</div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] mb-6 leading-[1]">
                  Type a <span className="text-amber italic font-light">vibe</span>.<br/>Compile a <span className="text-cyan">behavior</span>.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  The abstraction layer between human intent and robotic execution — eliminated. Operators describe outcomes in natural language. Roboscale orchestrates the Cradle, the Debugger, and the Self-Chip to compile, simulate, and deploy.
                </p>
                <div className="font-mono text-xs text-muted-foreground space-y-1">
                  <div><span className="text-amber">▸</span> 2.4k tokens/s linguistic compiler</div>
                  <div><span className="text-amber">▸</span> 99.4% kinematic translation fidelity</div>
                  <div><span className="text-amber">▸</span> Zero-shot deployment to G_47 vessels</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <VibeTerminal />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CINEMATIC IMAGE BREAK */}
      <section className="py-32 relative">
        <div className="container">
          <Reveal>
            <div className="relative corner-frame border border-cyan/30 p-2 max-w-6xl mx-auto">
              <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
              <img src={robot1} alt="Sovereign organic robot" width={1920} height={1080} loading="lazy" className="w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-2">// Field Capture · Lab_03 · 2036.04.18</div>
                  <h3 className="text-3xl md:text-5xl font-light tracking-tight max-w-2xl">An organism that knows it has a body.</h3>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber">
                  ● REC · 04:18:22:11
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsl(45 100% 50% / 0.15), transparent 60%)" }} />
        <div className="container relative z-10 text-center">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-6">// Cohort 2036 · Now Open</div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-[-0.04em] leading-[0.95] mb-8">
              The future is <br/><span className="text-amber text-glow-amber italic font-light">sovereign.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Limited alpha. Operators, researchers, and capital allocators only.
            </p>
            <button onClick={() => setOpen(true)} className="group relative inline-block">
              <div className="absolute -inset-1 bg-amber/40 blur-xl group-hover:bg-amber/70 transition-all" />
              <div className="relative bg-obsidian border border-amber px-10 py-5 font-mono text-sm uppercase tracking-[0.3em] text-amber group-hover:bg-amber group-hover:text-obsidian transition-all">
                Request Sovereign Access →
              </div>
            </button>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 border border-amber rotate-45 relative">
              <div className="absolute inset-1 bg-amber" />
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              2036 Roboscale Labs · <span className="text-amber">Evolution is sovereign.</span>
            </div>
          </div>
          <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <a href="#" className="hover:text-cyan transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-cyan transition-colors">Research Outreach</a>
            <a href="#" className="hover:text-cyan transition-colors">Press</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

const PillarRow = ({ pillar, index }: { pillar: typeof PILLARS[number]; index: number }) => {
  const reverse = index % 2 === 1;
  const accent = pillar.accent === "amber" ? "amber" : "cyan";
  const accentClass = accent === "amber" ? "text-amber" : "text-cyan";
  const accentBorder = accent === "amber" ? "border-amber/40" : "border-cyan/40";

  return (
    <Reveal>
      <div className={`grid lg:grid-cols-12 gap-8 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* Visual */}
        <div className="lg:col-span-5">
          <NeuralCard className={`relative corner-frame border ${accentBorder} bg-obsidian-soft/60 aspect-square overflow-hidden`}>
            <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
            <PillarVisual index={index} />
            <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
              ◇ {pillar.tag.toLowerCase().replace(/\s/g, "_")}.viz
            </div>
            <div className={`absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.3em] ${accentClass} pulse-amber`}>
              ● ACTIVE
            </div>
          </NeuralCard>
        </div>

        {/* Content */}
        <div className="lg:col-span-5">
          <div className={`font-mono text-xs uppercase tracking-[0.4em] mb-4 ${accentClass}`}>
            // Pillar {pillar.n} · {pillar.tag}
          </div>
          <div className="text-sm font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">{pillar.sub}</div>
          <h3 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-6 leading-[1.05]">
            {pillar.title}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">{pillar.body}</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {pillar.metrics.map(([k, v]) => (
              <div key={k} className="border border-border/70 bg-obsidian-soft/60 p-3">
                <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">{k}</div>
                <div className={`font-mono text-base ${accentClass}`}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Sidebar */}
        <div className="lg:col-span-2">
          <div className="border border-border/40 bg-obsidian-soft/50 p-3 h-72 overflow-hidden relative">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">// data_stream</div>
            <div className="data-stream font-mono text-[9px] leading-relaxed text-cyan/50">
              {[...HEX_STREAM, ...HEX_STREAM].map((line, i) => (
                <div key={i} className={i % 7 === 0 ? "text-amber/70" : ""}>{line}</div>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-obsidian-soft to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-8 h-8 bg-gradient-to-b from-obsidian-soft to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </Reveal>
  );
};

const PillarVisual = ({ index }: { index: number }) => {
  if (index === 0) {
    // Cradle - particle field
    return (
      <div className="absolute inset-0 grid-bg-fine flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-3/4 h-3/4">
          {Array.from({ length: 50 }).map((_, i) => {
            const x = Math.random() * 200, y = Math.random() * 200;
            return <circle key={i} cx={x} cy={y} r={Math.random() * 2 + 0.5} fill={i % 5 === 0 ? "hsl(45 100% 50%)" : "hsl(186 100% 50% / 0.5)"}>
              <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" />
            </circle>;
          })}
          <circle cx="100" cy="100" r="30" fill="none" stroke="hsl(45 100% 50% / 0.3)" strokeDasharray="2 4">
            <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="100" r="50" fill="none" stroke="hsl(186 100% 50% / 0.3)" strokeDasharray="3 6">
            <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="30s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="100" r="6" fill="hsl(45 100% 50%)" />
        </svg>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="absolute inset-0 grid-bg-fine">
        <img src={robotLimb} alt="Morphogenetic limb wireframe" className="w-full h-full object-cover opacity-70 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-amber/10" />
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="absolute inset-0 grid-bg-fine flex items-center justify-center p-8">
        <WireframeChip />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 grid-bg-fine flex items-center justify-center font-mono p-6">
      <div className="text-cyan/70 text-xs space-y-1.5 w-full">
        <div className="text-amber">$ vibe-compile</div>
        <div className="text-foreground/80">→ parsing intent_tree…</div>
        <div className="text-foreground/80">→ kinematic graph: 47 nodes</div>
        <div className="text-foreground/80">→ binding to chassis G_47</div>
        <div className="text-amber pulse-amber">[OK] policy.bin · 312 lines</div>
        <div className="mt-4 h-px bg-cyan/30" />
        <div className="text-cyan/60 mt-2">FIDELITY ████████░░ 99.4%</div>
        <div className="text-amber/80">LATENCY  ███████░░░ 0.92s</div>
        <div className="text-cyan/60">REPL     █████████░ 1.8s</div>
      </div>
    </div>
  );
};

export default Index;
