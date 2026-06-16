import { useState } from "react";
import { motion } from "framer-motion";
import editHero from "@/assets/edit-hero.jpg";
import editPortrait from "@/assets/edit-portrait.jpg";
import editHome from "@/assets/edit-home.jpg";
import editHand from "@/assets/edit-hand.jpg";
import editCad from "@/assets/edit-cad.jpg";
import editCradle from "@/assets/edit-cradle.jpg";
import robotWalk from "@/assets/edit-robot-walk.mp4.asset.json";
import founderTanush from "@/assets/founder-tanush.png";
import founderAaryan from "@/assets/founder-aaryan.png";
import { WaitlistModal } from "@/components/Waitlist";
import { toast } from "sonner";

// --- editorial primitives --------------------------------------------------
const cream = "bg-[hsl(var(--cream))]";
const ink = "text-[hsl(var(--ink))]";
const serif: React.CSSProperties = { fontFamily: "'Instrument Serif', serif", fontWeight: 400 };

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[hsl(var(--stone))]">{children}</div>
);

// --- page ------------------------------------------------------------------
const Index = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Enter a valid email"); return; }
    setDone(true);
    toast.success("You're on the list.");
  };

  return (
    <div className={`min-h-screen ${cream} ${ink} overflow-x-hidden`} style={{ fontFamily: "'Inter', sans-serif" }}>
      <WaitlistModal open={open} onOpenChange={setOpen} />

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-40">
        <div className="mx-auto max-w-[1600px] flex items-center justify-between px-6 md:px-10 py-5">
          <a href="#" className="font-mono text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--ink))]">
            Roboscale
          </a>
          <nav className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--ink-soft))]">
            <a href="#robot" className="hover:text-[hsl(var(--clay))] transition-colors">Robot</a>
            <a href="#cradle" className="hover:text-[hsl(var(--clay))] transition-colors">Cradle</a>
            <a href="#chip" className="hover:text-[hsl(var(--clay))] transition-colors">Self-Chip</a>
            <a href="#vibe" className="hover:text-[hsl(var(--clay))] transition-colors">Vibe</a>
            <a href="#materials" className="hover:text-[hsl(var(--clay))] transition-colors">Materials</a>
            <a href="#team" className="hover:text-[hsl(var(--clay))] transition-colors">Team</a>
          </nav>
          <button
            onClick={() => setOpen(true)}
            className="font-mono text-[11px] uppercase tracking-[0.32em] px-5 py-2.5 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--cream))] hover:bg-[hsl(var(--clay))] transition-colors"
          >
            Reserve
          </button>
        </div>
      </header>

      {/* HERO — full-bleed editorial portrait */}
      <section className="relative w-full h-[100svh] min-h-[680px] overflow-hidden">
        <img
          src={editHero}
          alt="Humanoid robot beside a young woman, editorial portrait"
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--cream))]/40 via-transparent to-[hsl(var(--cream))]/70" />
        <div className="relative z-10 h-full mx-auto max-w-[1600px] px-6 md:px-10 flex flex-col justify-end pb-16 md:pb-24">
          <Reveal>
            <Eyebrow>Roboscale · Genesis Series</Eyebrow>
            <h1
              className="mt-5 tracking-[-0.02em] leading-[0.92] text-[clamp(3.5rem,12vw,11rem)] text-[hsl(var(--ink))]"
              style={serif}
            >
              A robot that <em className="italic text-[hsl(var(--clay))]">learns</em>
              <br className="hidden md:block" /> like a child.
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-5xl">
              <p className="text-lg md:text-xl text-[hsl(var(--ink-soft))] max-w-xl leading-relaxed">
                Sovereign embodied intelligence. Born in simulation. Refined in your home. Runs entirely on its own silicon.
              </p>
              <button
                onClick={() => setOpen(true)}
                className="self-start font-mono text-[11px] uppercase tracking-[0.32em] px-7 py-4 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--cream))] hover:bg-[hsl(var(--clay))] transition-colors"
              >
                Reserve a unit →
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO STATEMENT */}
      <section id="robot" className="py-32 md:py-48 px-6 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <Eyebrow>01 — The Robot</Eyebrow>
            <h2 className="mt-6 text-[clamp(2.5rem,6vw,5.5rem)] tracking-[-0.02em] leading-[1.02]" style={serif}>
              Quietly capable.<br />
              <span className="italic text-[hsl(var(--clay))]">Patiently curious.</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-12 gap-10">
            <Reveal delay={100}>
              <p className="md:col-span-7 col-start-1 text-xl md:text-2xl text-[hsl(var(--ink-soft))] leading-[1.5] max-w-2xl">
                Today's robots are scripted. Ours is grown. It folds your laundry not because someone wrote folding code — but because it spent a hundred million simulated lifetimes learning that fabric falls.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FULL-BLEED LIVING ROOM */}
      <section className="relative w-full">
        <img src={editHome} alt="Humanoid robot lifting a mug in a sunlit minimalist living room" width={1920} height={1080} loading="lazy" className="w-full h-[70svh] md:h-[88svh] object-cover" />
      </section>

      {/* THREE PILLARS */}
      <section className="py-32 md:py-40 px-6 md:px-10 bg-[hsl(var(--cream-soft))]">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              { tag: "Helpful Hands", title: "Folds, lifts, tidies, cooks.", body: "Trained on the everyday choreography of a home — not a warehouse." },
              { tag: "Always Local", title: "Runs on its own chip.", body: "No cloud round-trip. No data leaving the room. Reflexes in under 2 milliseconds." },
              { tag: "Forever Learning", title: "Curiosity is the reward.", body: "Rewarded for poking the world, not for being right. Common sense is the residue." },
            ].map((p, i) => (
              <Reveal key={p.tag} delay={i * 120}>
                <div>
                  <Eyebrow>{p.tag}</Eyebrow>
                  <h3 className="mt-5 text-3xl md:text-4xl tracking-[-0.02em]" style={serif}>{p.title}</h3>
                  <p className="mt-4 text-base text-[hsl(var(--ink-soft))] leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO BLOCK */}
      <section className="relative w-full bg-[hsl(var(--ink))]">
        <div className="relative aspect-video w-full overflow-hidden">
          <video
            src={robotWalk.url}
            autoPlay
            muted
            loop
            playsInline
            poster={editHome}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 text-[hsl(var(--cream))]">
            <Eyebrow><span className="text-[hsl(var(--cream-warm))]/80">In motion</span></Eyebrow>
            <div className="mt-3 text-2xl md:text-4xl tracking-[-0.02em]" style={serif}>
              A morning, without instruction.
            </div>
          </div>
        </div>
      </section>

      {/* CRADLE — synthetic nursery */}
      <section id="cradle" className="py-32 md:py-48 px-6 md:px-10">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-12 items-center">
          <Reveal>
            <div className="md:col-span-5">
              <Eyebrow>02 — The Cradle</Eyebrow>
              <h2 className="mt-6 text-[clamp(2.25rem,5vw,4.5rem)] tracking-[-0.02em] leading-[1.04]" style={serif}>
                Teach a robot to learn <em className="italic text-[hsl(var(--clay))]">like a baby.</em>
              </h2>
              <p className="mt-8 text-lg text-[hsl(var(--ink-soft))] leading-relaxed">
                The Cradle is our synthetic nursery — a simulation where bodies are born, fall, and try again. We don't reward right answers. We reward <span className="text-[hsl(var(--ink))]">curiosity</span>: the act of poking the world to see what changes.
              </p>
              <p className="mt-4 text-lg text-[hsl(var(--ink-soft))] leading-relaxed">
                A baby drops a cup not to fail, but to learn that cups fall. Every spill, every missed catch, every collapsed knee is paid for — because each one shrinks the unknown.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="md:col-span-7 md:col-start-6">
              <img src={editCradle} alt="Humanoid robot inside a soft white simulation chamber" width={1920} height={1080} loading="lazy" className="w-full" />
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--stone))]">
                <span>Cradle v3.1 · Subject 07</span>
                <span>Curiosity ↑ · Free Energy ↓ 84%</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PORTRAIT + HAND DIPTYCH */}
      <section className="px-6 md:px-10 pb-32 md:pb-48">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-2 gap-6">
          <img src={editPortrait} alt="Close portrait of a fabric-skinned humanoid robot" width={1080} height={1620} loading="lazy" className="w-full h-[60svh] md:h-[80svh] object-cover" />
          <div className="flex flex-col">
            <img src={editHand} alt="Robot hand holding a green leaf" width={1920} height={1280} loading="lazy" className="w-full h-[40svh] md:h-[50svh] object-cover" />
            <div className="bg-[hsl(var(--cream-warm))] flex-1 p-8 md:p-12 flex flex-col justify-end">
              <Eyebrow>A different kind of intelligence</Eyebrow>
              <p className="mt-4 text-2xl md:text-3xl tracking-[-0.01em]" style={serif}>
                It holds a leaf the way it learned to — gently, because the leaf taught it gently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOVEREIGN CHIP */}
      <section id="chip" className="py-32 md:py-48 px-6 md:px-10 bg-[hsl(var(--ink))] text-[hsl(var(--cream))]">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-12 items-center">
          <Reveal>
            <div className="md:col-span-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[hsl(var(--cream-warm))]/70">03 — Sovereign Self-Chip</div>
              <h2 className="mt-6 text-[clamp(2.25rem,5vw,4.5rem)] tracking-[-0.02em] leading-[1.04]" style={serif}>
                It thinks <em className="italic text-[hsl(var(--clay))]">before</em> it moves.
              </h2>
              <p className="mt-8 text-lg text-[hsl(var(--cream))]/80 leading-relaxed max-w-xl">
                Most robots ask the cloud. Ours asks itself. Before the foot lifts, the chip runs the whole motion in its head — scanning the room, simulating a hundred futures through the Cradle, and picking the one that costs the least energy and risks the least harm.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
                {[["1.8 ms", "Reflex"], ["100%", "On-device"], ["−72%", "Watts vs cloud"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="text-3xl md:text-4xl tracking-tight text-[hsl(var(--cream))]" style={serif}>{n}</div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--cream-warm))]/60">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="md:col-span-6">
              <img src={editCad} alt="CAD wireframe and photoreal humanoid robot diptych" width={1920} height={1080} loading="lazy" className="w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* VIBE-CODING */}
      <section id="vibe" className="py-32 md:py-48 px-6 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <Eyebrow>04 — Vibe-Coding</Eyebrow>
            <h2 className="mt-6 text-[clamp(2.5rem,6vw,5.5rem)] tracking-[-0.02em] leading-[1.02]" style={serif}>
              You describe the <em className="italic text-[hsl(var(--clay))]">vibe</em>.<br />
              It compiles the motion.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 grid md:grid-cols-12 gap-10">
              <p className="md:col-span-6 text-lg text-[hsl(var(--ink-soft))] leading-relaxed">
                Don't write code. Don't pick joints. Say <span className="italic">"make me a cup of tea, the slow way."</span> The robot sketches the body it would need, runs the motion in its head through the Cradle, and only then asks its limbs to move.
              </p>
              <div className="md:col-span-6">
                <div className="rounded-md bg-[hsl(var(--ink))] text-[hsl(var(--cream))] p-6 font-mono text-[12px] leading-[1.7]">
                  <div className="text-[hsl(var(--cream-warm))]/60">~ vibe<span className="text-[hsl(var(--clay))]"> ▸</span></div>
                  <div className="mt-2">&gt; "tidy the table, gently"</div>
                  <div className="mt-3 text-[hsl(var(--cream-warm))]/60">// sketching morphology…</div>
                  <div className="text-[hsl(var(--cream-warm))]/60">// simulating 1,204 futures in Cradle…</div>
                  <div className="text-[hsl(var(--cream-warm))]/60">// selected: minimum-energy path</div>
                  <div className="mt-3 text-[hsl(var(--clay))]">✓ compiled · 920ms · runs on-chip</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* MATERIALS */}
      <section id="materials" className="py-32 md:py-40 px-6 md:px-10">
        <div className="mx-auto max-w-[1200px] grid md:grid-cols-12 gap-10 items-end">
          <Reveal>
            <div className="md:col-span-6">
              <Eyebrow>Materials</Eyebrow>
              <h2 className="mt-6 text-[clamp(2rem,4.5vw,4rem)] tracking-[-0.02em] leading-[1.04]" style={serif}>
                The full <em className="italic text-[hsl(var(--clay))]">archive.</em>
              </h2>
              <p className="mt-6 text-lg text-[hsl(var(--ink-soft))] leading-relaxed max-w-md">
                Slide deck, one-pager, manifesto film, and the full presentation — all kept in one quiet folder.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="md:col-span-6 md:col-start-7">
              <ul className="divide-y divide-[hsl(var(--ink))]/10 border-y border-[hsl(var(--ink))]/10">
                {[
                  ["Slide deck", "PDF"],
                  ["One-pager", "PDF"],
                  ["Manifesto", "Video"],
                  ["Presentation", "Video"],
                ].map(([label, kind]) => (
                  <li key={label} className="flex items-baseline justify-between py-5">
                    <span className="text-2xl tracking-[-0.01em]" style={serif}>{label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--stone))]">{kind}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://drive.google.com/drive/folders/12WVfXE1TvM9SP5k6qb9OQZaTUVmMx7AK?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] px-7 py-4 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--cream))] hover:bg-[hsl(var(--clay))] transition-colors"
              >
                Open the folder
                <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>


      {/* TEAM */}
      <section id="team" className="py-32 md:py-40 px-6 md:px-10 bg-[hsl(var(--cream-soft))]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <Eyebrow>Founders</Eyebrow>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.02em]" style={serif}>
              Built by two.
            </h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-2 gap-10 md:gap-16">
            {[
              { img: founderTanush, name: "Tanush", role: "Cradle & World Models" },
              { img: founderAaryan, name: "Aaryan", role: "Self-Chip & Morphology" },
            ].map((f, i) => (
              <Reveal key={f.name} delay={i * 120}>
                <div>
                  <div className="aspect-[4/5] overflow-hidden bg-[hsl(var(--cream-warm))]">
                    <img src={f.img} alt={f.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between">
                    <div className="text-2xl tracking-[-0.01em]" style={serif}>{f.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--stone))]">{f.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section className="py-32 md:py-48 px-6 md:px-10 bg-[hsl(var(--ink))] text-[hsl(var(--cream))]">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[hsl(var(--cream-warm))]/60">Reserve</div>
            <h2 className="mt-6 text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.02em] leading-[1.02]" style={serif}>
              The first units ship to <em className="italic text-[hsl(var(--clay))]">a few homes.</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            {!done ? (
              <form onSubmit={submit} className="mt-12 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@home.com"
                  className="flex-1 bg-transparent border-b border-[hsl(var(--cream))]/30 focus:border-[hsl(var(--clay))] outline-none px-2 py-4 text-lg placeholder:text-[hsl(var(--cream))]/40"
                />
                <button type="submit" className="font-mono text-[11px] uppercase tracking-[0.32em] px-7 py-4 rounded-full bg-[hsl(var(--cream))] text-[hsl(var(--ink))] hover:bg-[hsl(var(--clay))] hover:text-[hsl(var(--cream))] transition-colors">
                  Reserve →
                </button>
              </form>
            ) : (
              <div className="mt-12 font-mono text-sm uppercase tracking-[0.32em] text-[hsl(var(--clay))]">
                ◇ You're on the list ◇
              </div>
            )}
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[hsl(var(--cream-warm))]/50">
              2,847 reservations · Genesis cohort
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-10 border-t border-[hsl(var(--ink))]/10">
        <div className="mx-auto max-w-[1600px] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[hsl(var(--stone))]">
          <div>© Roboscale · Built quietly</div>
          <div>Designed for the home · Made on Earth</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
