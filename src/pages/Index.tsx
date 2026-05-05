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

      {/* LEAK BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber text-obsidian overflow-hidden border-b border-amber-glow/40">
        <div className="flex whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.4em] py-1.5 animate-[data-stream_40s_linear_infinite] [animation-direction:reverse]">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="px-6 flex items-center gap-6">
              <span className="font-bold">◆ LEAKED FROM 2036</span>
              <span>· Internal Mirror · Roboscale.Labs ·</span>
              <span>· Clearance T-3 ·</span>
              <span>· Document Class // GENESIS_CORE ·</span>
              <span>· Do Not Distribute ·</span>
              <span className="font-bold">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <header className="fixed top-[26px] left-0 right-0 z-40 border-b border-border/40 bg-obsidian/60 backdrop-blur-xl">
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
              <span className="text-amber">◆ LEAKED FROM 2036</span>
              <span className="text-muted-foreground/70">// Genesis Core · v1.0 · Sovereign Stack</span>
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
      <section id="manifest" className="relative py-32 md:py-40 border-y border-border/30">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-amber mb-6">// 00 · Manifest</div>
              <h2
                className="text-5xl md:text-7xl tracking-[-0.03em] mb-8 leading-[1.02]"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                Robots are not <span className="line-through text-muted-foreground/40">programmed</span>.<br />
                They are <span className="italic text-cyan text-glow-cyan">grown</span>.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The current paradigm — write code, ship binary, hope for the best — has plateaued. Embodied intelligence requires a vertically integrated organism: a simulation that births the agent, hardware the agent can rewrite, silicon that thinks at the speed of reflex.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Roboscale is the first <span className="text-amber">sovereign stack</span> for physical intelligence — told in four chapters.
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

      {/* CHAPTER INDEX */}
      <section className="py-24 relative">
        <div className="container">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 items-end mb-12 pb-8 border-b border-border/30">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-4">// The Sovereign Stack · Four Chapters</div>
                <h2
                  className="text-4xl md:text-6xl tracking-[-0.03em] leading-[1.02]"
                  style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                >
                  How an organism <span className="italic text-amber">comes alive</span>.
                </h2>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Read it like a story. Each chapter unfolds a layer of the sovereign stack — from the synthetic nursery where bodies first learn to feel, to the linguistic compiler that turns human intent into kinematic action.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-px bg-border/40">
            {[
              ["01", "THE CRADLE", "The synthetic nursery"],
              ["02", "MORPHOGENETIC DEBUGGER", "Hardware that heals"],
              ["03", "SOVEREIGN SELF-CHIP", "Neuromorphic instinct"],
              ["04", "VIBE-CODING", "Intent → kinematics"],
            ].map(([n, t, s], i) => (
              <motion.a
                key={n}
                href={`#chapter-${n}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-obsidian p-6 hover:bg-obsidian-soft transition-colors relative"
              >
                <div
                  className="text-5xl font-light text-amber/70 group-hover:text-amber transition-colors mb-4"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {n}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan mb-2">{t}</div>
                <div className="text-sm text-muted-foreground">{s}</div>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 group-hover:text-amber transition-colors">
                  Read chapter →
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTER 01 — CRADLE (scroll-driven training) */}
      <div id="chapter-01" className="border-t border-border/30">
        <div className="container py-14 md:py-20">
          <div className="flex items-baseline justify-between pb-6 border-b border-border/30">
            <div className="flex items-baseline gap-6">
              <span
                className="text-7xl md:text-8xl font-light text-amber/80 tabular-nums leading-none"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                01
              </span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-1.5">CHAPTER · THE CRADLE</div>
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">A body learns it has a self</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-12 bg-border" />
              <span>01/04</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 pt-10 md:pt-14 items-end">
            <div className="lg:col-span-7">
              <h2
                className="text-4xl md:text-7xl leading-[1.02] tracking-[-0.03em] mb-6"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                The Cradle is not one simulation. It is a <span className="italic text-amber text-glow-amber">failure engine</span> running in parallel.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Every dropped cup, collapsed knee, over-tight grip, spilled liquid, missed catch, and recovered fall writes a small law of physics back into the agent. Curiosity is rewarded, task success is rewarded, and safe failure is preserved until common sense emerges.
              </p>
            </div>
            <div className="lg:col-span-5 grid sm:grid-cols-3 lg:grid-cols-1 gap-3 font-mono text-[10px] uppercase tracking-[0.24em]">
              {[
                ["parallel worlds", "1,048,576", "failed tests still train"],
                ["physics priors", "gravity · water · friction", "laws learned by contact"],
                ["reward shape", "curiosity + task + safe_fail", "common sense parameters"],
              ].map(([k, v, s]) => (
                <div key={k} className="border border-border/60 bg-obsidian-soft/50 p-4">
                  <div className="text-muted-foreground mb-2">{k}</div>
                  <div className="text-amber mb-2">{v}</div>
                  <div className="text-cyan/70 text-[8px] tracking-[0.2em]">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <CradleTraining />
      </div>

      {/* CHAPTER 02 — MORPHOGENETIC DEBUGGER */}
      <div id="chapter-02">
        <Chapter
          num="02"
          tag="MORPHOGENETIC DEBUGGER"
          eyebrow="Software rewriting hardware DNA"
          title="When the body fails,"
          italic="evolve the body."
          body="A traditional system retrains until it overfits to bad hardware. Roboscale doesn't. The Morphogenetic Debugger inspects every kinematic failure — torque saturation, lever inefficiency, joint geometry — and emits a generative CAD patch. The next vessel is not a tweak. It is a new organism, designed by the previous one's regrets."
          metrics={[["CAD_PATCHES", "7,402"], ["TORQUE_Δ", "+31.2 Nm"], ["GENERATION", "G_47"]]}
          reverse
          visual={
            <div className="relative corner-frame border border-cyan/40 bg-obsidian-soft/60 aspect-[4/5] overflow-hidden">
              <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
              <img src={robotLimb} alt="Morphogenetic limb wireframe" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-tr from-obsidian via-transparent to-cyan/10" />
              <div className="absolute inset-0 grid-bg-fine opacity-50 mix-blend-screen" />
              {/* annotation lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500">
                <g stroke="hsl(186 100% 50% / 0.7)" strokeWidth="0.6" fill="none">
                  <line x1="80" y1="120" x2="200" y2="180" />
                  <circle cx="200" cy="180" r="4" fill="hsl(186 100% 50%)" />
                  <line x1="320" y1="280" x2="240" y2="260" />
                  <circle cx="240" cy="260" r="4" fill="hsl(45 100% 50%)" />
                  <line x1="60" y1="380" x2="180" y2="350" />
                  <circle cx="180" cy="350" r="4" fill="hsl(186 100% 50%)" />
                </g>
                <text x="20" y="115" fill="hsl(186 100% 50%)" fontSize="9" fontFamily="JetBrains Mono">JOINT_07 · TORQUE</text>
                <text x="280" y="295" fill="hsl(45 100% 50%)" fontSize="9" fontFamily="JetBrains Mono">CAD_PATCH_412</text>
                <text x="20" y="395" fill="hsl(186 100% 50%)" fontSize="9" fontFamily="JetBrains Mono">LEVER_RATIO 1.42</text>
              </svg>
              <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/80">◇ debugger.viz · G_46 → G_47</div>
              <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.3em] text-amber pulse-amber">● PATCHING</div>
            </div>
          }
        />
      </div>

      {/* CHAPTER 03 — SOVEREIGN SELF-CHIP */}
      <div id="chapter-03">
        <Chapter
          num="03"
          tag="SOVEREIGN SELF-CHIP"
          eyebrow="The reflexive REPL core"
          title="A mind that thinks"
          italic="at the speed of reflex."
          body="Cloud latency is fatal in the physical world. The Sovereign Self-Chip is a custom neuromorphic substrate — a Mental REPL that runs counterfactual simulations locally. The agent imagines two seconds into the future, adjusts a motor policy mid-stride, and never asks the cloud for permission. Sovereignty is the latency budget."
          metrics={[["LATENCY", "1.8s"], ["TDP", "150W"], ["SYNAPSES", "1.02T/mm²"]]}
          visual={
            <div className="relative corner-frame border border-amber/40 bg-obsidian-soft/60 aspect-square overflow-hidden">
              <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
              <div className="absolute inset-0 grid-bg-fine opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center p-10">
                <WireframeChip />
              </div>
              <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-amber/80">◇ self_chip.die · 3nm class</div>
              <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan pulse-cyan">● REPL ACTIVE</div>
            </div>
          }
        />
      </div>

      {/* CHAPTER 04 — VIBE-CODING */}
      <div id="chapter-04">
        <Chapter
          num="04"
          tag="VIBE-CODING"
          eyebrow="Natural language kinematics"
          title="Type a vibe."
          italic="Compile a behavior."
          body="The abstraction between human intent and robotic execution — eliminated. Operators describe outcomes in plain language. Roboscale orchestrates the Cradle, the Debugger, and the Self-Chip to compile, simulate, and deploy. No SDK. No teleop. Just intent."
          metrics={[["TOKENS/s", "2.4k"], ["COMPILE", "920ms"], ["FIDELITY", "99.4%"]]}
          reverse
          visual={
            <div id="vibe">
              <VibeTerminal />
            </div>
          }
        />
      </div>

      {/* CINEMATIC CLOSER */}
      <section className="py-32 relative">
        <div className="container">
          <Reveal>
            <div className="relative corner-frame border border-cyan/30 p-2 max-w-6xl mx-auto">
              <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
              <img src={robot1} alt="Sovereign organic robot" width={1920} height={1080} loading="lazy" className="w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-3">// Field Capture · Lab_03 · 2036.04.18</div>
                  <h3
                    className="text-3xl md:text-6xl tracking-tight max-w-3xl leading-[1.02]"
                    style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                  >
                    An organism that knows <span className="italic text-amber">it has a body.</span>
                  </h3>
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

export default Index;
