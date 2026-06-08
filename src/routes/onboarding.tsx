import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wallet, Cpu, ShieldCheck, ShoppingBag, Gift, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Welcome — Medimint" }] }),
  component: Onboarding,
});

const screens = [
  { icon: Sparkles, title: "Welcome to Medimint", desc: "The first super app for tokenized medical assets. Own a fraction. Earn from every scan." },
  { icon: Wallet, title: "Connect Your Wallet", desc: "Securely link your wallet to track MDMT holdings, staking, and on-chain yield." },
  { icon: Cpu, title: "Link Your Assets", desc: "Your Asset IDs are mapped to MRI, CT, and PET machines around the world." },
  { icon: ShieldCheck, title: "How Yield Works", desc: "Every patient transaction on a linked machine generates yield. Each event is hash-anchored on-chain for full transparency." },
  { icon: ShoppingBag, title: "Marketplace Benefits", desc: "Spend MDMT on diagnostics, doctor consults, supplements, and longevity programs." },
  { icon: Gift, title: "Rewards Program", desc: "Walk, move, and stake to earn MDMT every day. Compound your health and wealth." },
];

function Onboarding() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const last = i === screens.length - 1;
  const S = screens[i];
  const Icon = S.icon;

  const finish = () => {
    if (typeof window !== "undefined") localStorage.setItem("medimint_onboarded", "1");
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-6 pt-10 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {screens.map((_, idx) => (
            <span key={idx} className={`h-1 w-6 rounded-full ${idx <= i ? "bg-gradient-brand" : "bg-white/10"}`} />
          ))}
        </div>
        <button onClick={finish} className="text-muted-foreground text-xs">Skip</button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center"
          >
            <span className="bg-gradient-brand shadow-glow grid h-20 w-20 place-items-center rounded-3xl">
              <Icon size={32} className="text-white" />
            </span>
            <h1 className="font-display mt-8 text-3xl font-semibold tracking-tight">{S.title}</h1>
            <p className="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed">{S.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => (last ? finish() : setI(i + 1))}
          className="bg-gradient-brand shadow-glow flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white"
        >
          {last ? "Go to Dashboard" : "Continue"} <ChevronRight size={14} />
        </button>
        {i > 0 && !last && (
          <button onClick={() => setI(i - 1)} className="text-muted-foreground w-full py-2 text-xs">Back</button>
        )}
        {i === 0 && (
          <Link to="/" className="text-muted-foreground block w-full py-2 text-center text-xs">I have an account</Link>
        )}
      </div>
    </div>
  );
}
