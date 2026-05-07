import { useEffect, useRef, useState } from "react";

const VIBES = [
  { cmd: "vibe 'pick up the red crate, walk around people, set it on the shelf'", out: ["[CAD] designing a body for this job…", "[CAD] 4-finger gripper · 1.7 m frame · ready", "[CRADLE] practicing 1,048,576 times in simulation", "[SELF-CHIP] policy compressed → 18 MB · runs on-device", "[OK] robot trained · ship to Self-Chip"] },
  { cmd: "vibe 'climb the scaffolding and install a solar panel'", out: ["[CAD] auto-evolving limbs for grip + reach", "[CAD] tendon layout v3 · torque OK", "[CRADLE] sim-to-real rehearsals · 412k runs", "[SELF-CHIP] on-device, no cloud, ~15W", "[OK] behavior locked · 312 lines of motor code"] },
];

export const VibeTerminal = () => {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [outLines, setOutLines] = useState<string[]>([]);
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const v = VIBES[idx];
    let i = 0;
    setTyped(""); setOutLines([]);
    const type = () => {
      if (i <= v.cmd.length) {
        setTyped(v.cmd.slice(0, i));
        i++;
        tRef.current = setTimeout(type, 28);
      } else {
        v.out.forEach((line, k) => {
          setTimeout(() => setOutLines((p) => [...p, line]), 400 + k * 500);
        });
        setTimeout(() => setIdx((p) => (p + 1) % VIBES.length), 400 + v.out.length * 500 + 3000);
      }
    };
    type();
    return () => { if (tRef.current) clearTimeout(tRef.current); };
  }, [idx]);

  return (
    <div className="relative corner-frame border border-cyan/30 bg-obsidian-soft/80 backdrop-blur-xl">
      <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
      <div className="flex items-center justify-between border-b border-cyan/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan/70">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        </div>
        <span>roboscale://vibe-shell · v0.7.3-alpha</span>
        <span className="text-amber pulse-amber px-2 py-0.5 rounded-full">●</span>
      </div>
      <div className="p-6 font-mono text-sm min-h-[260px]">
        <div className="text-cyan/70">
          <span className="text-amber">root@genesis</span>:<span className="text-cyan">~/cradle</span>$ <span className="text-foreground">{typed}<span className="inline-block w-2 h-4 bg-amber align-middle ml-0.5 animate-pulse" /></span>
        </div>
        <div className="mt-4 space-y-1 text-foreground/80">
          {outLines.map((l, i) => (
            <div key={i} className={l.startsWith("[OK]") ? "text-amber" : "text-cyan/80"}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
