import { useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, DatabaseZap, Cpu, Orbit, Sparkles } from "lucide-react";
import robotOrganic from "@/assets/robot-organic-1.jpg";
import robotPortrait from "@/assets/robot-organic-2.jpg";
import labWide from "@/assets/lab-wide.jpg";
import parallelWorlds from "@/assets/parallel-worlds.jpg";
import cradleGrasp from "@/assets/cradle-grasp.jpg";
import genesisChip from "@/assets/genesis-core-chip.png";
import tendonMacro from "@/assets/tendon-macro.jpg";
import robotLimb from "@/assets/robot-limb.jpg";
import robotWalk from "@/assets/edit-robot-walk.mp4.asset.json";
import founderTanush from "@/assets/founder-tanush-exact.png";
import founderAaryan from "@/assets/founder-aaryan-exact.png";
import { CradleTraining } from "@/components/CradleTraining";
import { WaitlistModal } from "@/components/Waitlist";
import {
  MarketCurve,
  CradleRibbon,
  ChipBlueprint,
  CompressionDiagram,
  PillarsGrid,
} from "@/components/DeckDiagrams";
import { toast } from "sonner";

const serif: CSSProperties = { fontFamily: "'Instrument Serif', serif", fontWeight: 400 };

const Reveal = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.22 }}
    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, tone = "cyan" }: { children: ReactNode; tone?: "cyan" | "amber" | "muted" }) => (
  <div
    className={`font-mono text-[10px] uppercase tracking-[0.34em] ${
      tone === "amber" ? "text-amber" : tone === "cyan" ? "text-cyan" : "text-muted-foreground"
    }`}
  >
    {children}
  </div>
);

const metricRows = [
  ["CURIOSITY_REWARD", "+0.94"],
  ["ON_DEVICE_REFLEX", "1.8MS"],
  ["PARALLEL_WORLDS", "1,048,576"],
  ["COMMON_SENSE", "0.93"],
];

const Index = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email");
      return;
    }
    setDone(true);
    toast.success("You're on the list.");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/25 selection:text-primary">
      <WaitlistModal open={open} onOpenChange={setOpen} />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/55 backdrop-blur-2xl">
        <div className="container flex h-16 items-center justify-between">
          <a href="#" className="font-mono text-[11px] uppercase tracking-[0.34em] text-foreground">
            Roboscale
          </a>
          <nav className="hidden items-center gap-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:flex">
            <a className="transition-colors hover:text-cyan" href="#pillars">Pillars</a>
            <span className="text-border">/</span>
            <a className="transition-colors hover:text-cyan" href="#cradle">Cradle</a>
            <span className="text-border">/</span>
            <a className="transition-colors hover:text-cyan" href="#chip">Self-Chip</a>
            <span className="text-border">/</span>
            <a className="transition-colors hover:text-cyan" href="#market">Market</a>
            <span className="text-border">/</span>
            <a className="transition-colors hover:text-cyan" href="#materials">Materials</a>
            <span className="text-border">/</span>
            <a className="transition-colors hover:text-cyan" href="#team">Team</a>
          </nav>
          <button
            onClick={() => setOpen(true)}
            className="border border-primary/50 bg-primary px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-primary-foreground shadow-[var(--glow-amber-soft)] transition-all hover:border-secondary hover:bg-secondary"
          >
            Reserve
          </button>
        </div>
      </header>

      <section id="robot" className="relative overflow-hidden pt-16" style={{ minHeight: "100vh" }}>
        <div className="absolute inset-y-0 right-0 w-full md:w-[68%]">
          <img
            src={robotOrganic}
            alt="Futuristic humanoid robot in a dark laboratory"
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-80"
            style={{ objectPosition: "58% 50%" }}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_34%,hsl(var(--cyan)/0.2),transparent_28%),linear-gradient(90deg,hsl(var(--background))_0%,hsl(var(--background))_33%,hsl(var(--background)/0.74)_48%,transparent_72%),linear-gradient(0deg,hsl(var(--background))_0%,transparent_45%)]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container relative z-10 flex items-end pb-10 pt-20 md:pb-16" style={{ minHeight: "calc(100vh - 4rem)" }}>
          <div className="w-full max-w-2xl">
            <Reveal>
              <Eyebrow>Roboscale · Genesis Core · Seed 2026</Eyebrow>
              <h1
                className="mt-6 font-black uppercase tracking-normal"
                style={{ fontSize: "clamp(3.25rem, 6.6vw, 7rem)", lineHeight: 0.86 }}
              >
                A mind
                <br />
                of its own.
              </h1>
              <div className="mt-5 font-mono text-sm uppercase tracking-[0.24em] text-amber text-glow-amber md:text-base">
                The cognitive substrate for physical AI
              </div>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Genesis Core lets an industrial robot learn the world like a child does — through curiosity, in real time, on a single sovereign chip. No cloud. No pass / fail. Just physics becoming instinct.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center gap-3 border border-primary/60 bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-primary-foreground shadow-[var(--glow-amber-soft)] transition-all hover:border-secondary hover:bg-secondary hover:shadow-[var(--glow-cyan-soft)]"
                >
                  Reserve Genesis <ArrowUpRight className="h-4 w-4" />
                </button>
                <a
                  href="#materials"
                  className="inline-flex items-center justify-center gap-3 border border-border bg-card/45 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground transition-colors hover:border-secondary hover:text-cyan"
                >
                  Open archive
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={320} className="absolute bottom-16 right-8 hidden w-[360px] lg:block xl:right-16">
            <div className="border border-border/70 bg-background/80 p-4 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                <span>Live policy</span>
                <span className="text-cyan">● Online</span>
              </div>
              <div className="space-y-3">
                {metricRows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[1fr_auto] items-center gap-4 border border-border/50 bg-obsidian-soft/70 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.14em]">
                    <span className="min-w-0 text-muted-foreground">{label}</span>
                    <span className="text-amber">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-obsidian-soft py-6">
        <div className="container grid gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:grid-cols-4">
          {["Curiosity is rewarded", "Not pass / fail obedience", "Born in simulation", "Runs on its own silicon"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-cyan shadow-[var(--glow-cyan-soft)]" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-28 md:py-40">
        <div className="absolute inset-0 grid-bg-fine opacity-30" />
        <div className="container relative z-10 grid gap-12 md:grid-cols-12 md:items-center">
          <Reveal>
            <div className="md:col-span-5">
              <Eyebrow tone="amber">01 · The robot</Eyebrow>
              <h2 className="mt-6 text-5xl leading-[0.96] tracking-normal md:text-7xl" style={serif}>
                It does not memorize chores. It builds common sense.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="md:col-span-7">
              <div className="grid gap-4 md:grid-cols-2">
                <img src={robotPortrait} alt="Close portrait of a futuristic humanoid robot" width={1024} height={1024} loading="lazy" className="aspect-square w-full object-cover scan-line" />
                <div className="border border-border bg-card p-6 md:p-8">
                  <Cpu className="mb-10 h-7 w-7 text-cyan" />
                  <p className="text-xl leading-relaxed text-foreground md:text-2xl" style={serif}>
                    The body learns from falling, touching, spilling, grasping, recovering — the same way infants turn physics into instinct.
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                    Every mistake becomes signal. Every safe experiment buys a smaller unknown.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-obsidian">
        <video
          src={robotWalk.url}
          autoPlay
          muted
          loop
          playsInline
          poster={labWide}
          className="h-[72svh] min-h-[520px] w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,hsl(var(--background))_0%,transparent_42%),linear-gradient(90deg,hsl(var(--background)/0.82)_0%,transparent_55%)]" />
        <div className="container absolute inset-x-0 bottom-0 pb-12 md:pb-16">
          <Reveal>
            <Eyebrow>In motion</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-4xl leading-[1] tracking-normal md:text-7xl" style={serif}>
              A morning behavior, compiled from curiosity.
            </h2>
          </Reveal>
        </div>
      </section>

      <CradleTraining />

      <section id="chip" className="relative overflow-hidden py-28 md:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--amber)/0.14),transparent_30%),radial-gradient(circle_at_80%_60%,hsl(var(--cyan)/0.13),transparent_34%)]" />
        <div className="container relative z-10 grid gap-12 md:grid-cols-12 md:items-center">
          <Reveal>
            <div className="md:col-span-6">
              <Eyebrow>02 · Sovereign self-chip</Eyebrow>
              <h2 className="mt-6 text-5xl leading-[0.96] tracking-normal md:text-7xl" style={serif}>
                It thinks before it moves.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Before the foot lifts, the chip simulates the motion locally — scanning the room, predicting contact, and choosing the safest low-energy path without asking the cloud.
              </p>
              <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
                {[["1.8MS", "reflex"], ["100%", "on-device"], ["−72%", "watts"]].map(([n, l]) => (
                  <div key={l} className="border border-border bg-card/70 p-4">
                    <div className="font-mono text-xl text-amber md:text-2xl">{n}</div>
                    <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.26em] text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="md:col-span-6">
              <div className="corner-frame relative border border-border bg-card/40 p-3 scan-line">
                <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
                <img src={genesisChip} alt="Futuristic on-device robot processor architecture" width={1447} height={1084} loading="lazy" className="w-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="cradle" className="relative border-y border-border bg-obsidian-soft py-28 md:py-40">
        <div className="container grid gap-8 md:grid-cols-3">
          {[
            { icon: Orbit, tag: "Cradle", title: "A synthetic nursery", img: parallelWorlds, body: "Millions of simulated bodies explore, collapse, recover, and write physics back into the model." },
            { icon: Sparkles, tag: "Reward", title: "Curiosity first", img: cradleGrasp, body: "The system is not paid only for right or wrong. It is paid for poking the world and shrinking uncertainty." },
            { icon: DatabaseZap, tag: "Transfer", title: "Common sense survives", img: tendonMacro, body: "The learned prior moves from simulation to the real robot: grip, balance, softness, spill risk, recovery." },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 130}>
              <article className="neural-card h-full overflow-hidden border border-border bg-card">
                <img src={card.img} alt={card.title} width={1280} height={896} loading="lazy" className="aspect-[4/3] w-full object-cover opacity-80" />
                <div className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <Eyebrow tone={i === 1 ? "amber" : "cyan"}>{card.tag}</Eyebrow>
                    <card.icon className="h-5 w-5 text-cyan" />
                  </div>
                  <h3 className="text-3xl leading-none" style={serif}>{card.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="vibe" className="relative overflow-hidden py-28 md:py-40">
        <div className="container grid gap-12 md:grid-cols-12 md:items-center">
          <Reveal>
            <div className="md:col-span-5">
              <Eyebrow tone="amber">03 · Vibe-coding</Eyebrow>
              <h2 className="mt-6 text-5xl leading-[0.96] tracking-normal md:text-7xl" style={serif}>
                Say the vibe. The body compiles the motion.
              </h2>
              <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
                “Tidy the table gently” becomes a morphology sketch, a Cradle simulation batch, then a low-risk motion policy running on-chip.
              </p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="md:col-span-7">
              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <img src={robotLimb} alt="Robot limb assembly with glowing technical detail" width={1024} height={1024} loading="lazy" className="h-full min-h-[420px] w-full object-cover" />
                <div className="border border-border bg-obsidian p-6 font-mono text-[12px] leading-[1.8] shadow-[var(--glow-cyan-soft)]">
                  <div className="text-muted-foreground">roboscale@genesis:~$ vibe</div>
                  <div className="mt-3 text-foreground">&gt; "make tea, slow and careful"</div>
                  <div className="mt-5 text-muted-foreground">// sketching body constraints</div>
                  <div className="text-muted-foreground">// running 1,204,773 cradle futures</div>
                  <div className="text-muted-foreground">// novelty budget: safe</div>
                  <div className="text-muted-foreground">// spill risk minimized</div>
                  <div className="mt-5 text-amber">✓ compiled · 920ms · local silicon</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="materials" className="border-y border-border bg-card py-24 md:py-32">
        <div className="container grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal>
            <div className="md:col-span-6">
              <Eyebrow>Materials</Eyebrow>
              <h2 className="mt-6 text-5xl leading-none tracking-normal md:text-7xl" style={serif}>
                The full archive.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                Slide deck, one-pager, manifesto video, and presentation video.
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="md:col-span-6 md:col-start-7">
              <ul className="divide-y divide-border border-y border-border">
                {[["Slide deck", "PDF"], ["One-pager", "PDF"], ["Manifesto", "Video"], ["Presentation", "Video"]].map(([label, kind]) => (
                  <li key={label} className="flex items-baseline justify-between py-5">
                    <span className="text-2xl" style={serif}>{label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{kind}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://drive.google.com/drive/folders/12WVfXE1TvM9SP5k6qb9OQZaTUVmMx7AK?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 border border-primary/50 bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-primary-foreground shadow-[var(--glow-amber-soft)] transition-all hover:border-secondary hover:bg-secondary"
              >
                Open folder <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="team" className="py-28 md:py-40">
        <div className="container">
          <Reveal>
            <Eyebrow tone="muted">Founders</Eyebrow>
            <h2 className="mt-6 text-5xl leading-none tracking-normal md:text-7xl" style={serif}>Built by two.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { img: founderTanush, name: "Tanush", role: "Cradle & World Models" },
              { img: founderAaryan, name: "Aaryan", role: "Self-Chip & Morphology" },
            ].map((f, i) => (
              <Reveal key={f.name} delay={i * 120}>
                <div className="border border-border bg-card p-4">
                  <img src={f.img} alt={f.name} loading="lazy" className="aspect-square w-full object-cover" />
                  <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                    <div className="text-3xl" style={serif}>{f.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">{f.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border bg-obsidian py-28 md:py-40">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="container relative z-10 grid gap-10 md:grid-cols-12 md:items-center">
          <Reveal>
            <div className="md:col-span-7">
              <Eyebrow tone="amber">Reserve</Eyebrow>
              <h2 className="mt-6 text-5xl leading-[0.96] tracking-normal md:text-7xl" style={serif}>
                The first curious machines ship to a few homes.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="md:col-span-5">
              {!done ? (
                <form onSubmit={submit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@home.com"
                    className="w-full border border-border bg-background px-4 py-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  />
                  <button type="submit" className="w-full border border-primary/50 bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-primary-foreground shadow-[var(--glow-amber-soft)] transition-all hover:border-secondary hover:bg-secondary">
                    Reserve Genesis
                  </button>
                </form>
              ) : (
                <div className="border border-primary/50 bg-card p-6 font-mono text-[12px] uppercase tracking-[0.3em] text-amber">
                  ◇ You're on the list ◇
                </div>
              )}
              <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                2,847 reservations · Genesis cohort
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="container flex flex-col justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
          <div>© Roboscale · Built quietly</div>
          <div>Curiosity rewarded · Made on Earth</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;