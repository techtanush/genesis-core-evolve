import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const WaitlistModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid signature. Provide a valid identifier.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("waitlist_signups").insert({
      email: email.trim().toLowerCase(),
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
    });
    setLoading(false);
    if (error) {
      if ((error as any).code === "23505") {
        toast.error("Identifier already registered in cohort.");
      } else {
        toast.error("Transmission failed. Retry handshake.");
      }
      return;
    }
    setSent(true);
    toast.success("ACCESS GRANTED // Identifier registered.");
    setTimeout(() => { onOpenChange(false); setSent(false); setEmail(""); }, 2200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-cyan/40 bg-obsidian/80 backdrop-blur-2xl max-w-md p-0 overflow-hidden">
        <div className="grid-bg-fine relative p-8">
          <div className="corner-frame absolute inset-0">
            <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
          </div>
          <DialogTitle className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-2">// BUILDER_GATEWAY</DialogTitle>
          <DialogDescription className="text-2xl font-semibold text-foreground mb-1 tracking-tight">Build and train embodied AI.</DialogDescription>
          <p className="text-sm text-muted-foreground mb-6 font-mono">Early access to the framework, compute, and curriculum. For developers, researchers, and anyone creating the future of robotics.</p>

          {!sent ? (
            <form onSubmit={submit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="builder@lab.com"
                  required
                  maxLength={120}
                  className="w-full bg-transparent border border-cyan/30 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-amber focus:shadow-[0_0_20px_hsl(45_100%_50%/0.4)] transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber text-obsidian font-mono text-sm font-semibold uppercase tracking-[0.2em] py-3 hover:shadow-[0_0_30px_hsl(45_100%_50%/0.7)] transition-all disabled:opacity-50"
              >
                {loading ? "Transmitting…" : "Request Access →"}
              </button>
            </form>
          ) : (
            <div className="border border-amber/60 bg-amber/5 p-6 text-center font-mono">
              <div className="text-amber text-xs uppercase tracking-[0.3em] mb-2">// BUILDER_REGISTERED</div>
              <div className="text-2xl text-foreground text-glow-amber">ACCESS GRANTED</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const FloatingAccess = ({ onOpen }: { onOpen: () => void }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={onOpen}
      className={`fixed bottom-8 right-8 z-50 group ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"} transition-all duration-500`}
    >
      <div className="absolute inset-0 bg-amber/40 blur-xl group-hover:bg-amber/70 transition-all" />
      <div className="relative flex items-center gap-3 bg-obsidian border border-amber px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] text-amber group-hover:bg-amber group-hover:text-obsidian transition-all">
        <span className="h-2 w-2 rounded-full bg-amber pulse-amber" />
        Join the builder program
      </div>
    </button>
  );
};
