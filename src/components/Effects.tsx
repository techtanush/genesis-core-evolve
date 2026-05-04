import { useEffect, useRef, useState } from "react";

export const GlowCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rx = 0, ry = 0, x = 0, y = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }
    };
    let raf = 0;
    const loop = () => {
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx - 24}px, ${ry - 24}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-12 w-12 rounded-full border border-amber/60 mix-blend-screen"
        style={{ boxShadow: "0 0 30px hsl(45 100% 50% / 0.4)" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-cyan mix-blend-screen"
        style={{ boxShadow: "0 0 12px hsl(186 100% 50% / 0.9)" }}
      />
    </>
  );
};

export const ScrambleText = ({ text, className = "" }: { text: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    let frame = 0, raf = 0;
    const target = text;
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    for (let i = 0; i < target.length; i++) {
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 30) + 10;
      queue.push({ from: "", to: target[i], start, end });
    }
    const update = () => {
      let output = ""; let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const q = queue[i];
        if (frame >= q.end) { complete++; output += q.to; }
        else if (frame >= q.start) {
          if (!q.char || Math.random() < 0.28) q.char = chars[Math.floor(Math.random() * chars.length)];
          output += `<span style="color:hsl(45 100% 50%)">${q.char}</span>`;
        } else output += q.from;
      }
      el.innerHTML = output;
      if (complete === queue.length) { setDone(true); return; }
      frame++;
      raf = requestAnimationFrame(update);
    };
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !done) {
        raf = requestAnimationFrame(update);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, [text, done]);
  return <span ref={ref} className={className}>{text}</span>;
};

export const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in-view"), delay);
          obs.disconnect();
        }
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
};

export const NeuralCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`neural-card ${className}`}
    >
      {children}
    </div>
  );
};
