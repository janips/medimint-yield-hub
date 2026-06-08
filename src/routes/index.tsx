import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Coins, Sparkles, TrendingUp, Cpu, ShoppingBag, Layers, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AreaChart } from "@/components/AreaChart";
import { HashChip } from "@/components/HashChip";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { portfolio, linkedAssets, yieldEvents, txSeries, yieldSeries, txSeries30, yieldSeries30, fmtUsd, user } from "@/lib/mockData";
import { useLiveYield } from "@/lib/liveYield";
import { useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Medimint — Token Holder Cockpit" },
      { name: "description", content: "Track MDMT holdings, live machine yield, and asset performance in one premium dashboard." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [range, setRange] = useState<"7D" | "30D" | "90D">("7D");
  const [graph, setGraph] = useState<"tx" | "yield">("tx");
  const live = useLiveYield();

  const data = range === "30D" || range === "90D"
    ? (graph === "tx" ? txSeries30 : yieldSeries30)
    : (graph === "tx" ? txSeries : yieldSeries);
  const labels = range === "7D" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : undefined;

  return (
    <AppShell>
      <p className="text-muted-foreground mt-2 text-xs">Good morning</p>
      <h2 className="font-display text-2xl font-semibold">{user.name} 👋</h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-hero shadow-glow relative mt-5 overflow-hidden rounded-3xl border border-white/10 p-5"
      >
        <div className="bg-gradient-brand absolute -top-20 -right-16 h-48 w-48 rounded-full opacity-30 blur-3xl" />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs tracking-wide uppercase">Total Holdings</span>
          <span className="bg-success/20 text-success inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium">
            <span className="bg-success h-1.5 w-1.5 animate-pulse rounded-full" /> Yield Active
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-4xl font-semibold tracking-tight">
            {portfolio.totalTokens.toLocaleString()}
          </span>
          <span className="text-muted-foreground text-sm">MDMT</span>
        </div>
        <div className="text-muted-foreground mt-1 text-sm">
          ≈ {fmtUsd(portfolio.totalValueUsd)}{" "}
          <span className="text-success ml-1 inline-flex items-center text-xs">
            <ArrowUpRight size={12} /> +{portfolio.appreciationMonth}% this month
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-muted-foreground text-[10px] tracking-wide uppercase">Yield Today</p>
            <p className="font-display mt-1 text-lg font-semibold tabular-nums">
              <AnimatedNumber value={live.today} decimals={4} prefix="+" />
            </p>
            <p className="text-muted-foreground text-[10px]">MDMT · live</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-muted-foreground text-[10px] tracking-wide uppercase">Lifetime Yield</p>
            <p className="font-display mt-1 text-lg font-semibold tabular-nums">
              <AnimatedNumber value={live.lifetime} decimals={4} locale />
            </p>
            <p className="text-muted-foreground text-[10px]">MDMT</p>
          </div>
        </div>
      </motion.div>

      {/* Linked assets summary */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/assets" className="bg-gradient-card flex items-center gap-3 rounded-2xl border border-white/10 p-3">
          <span className="bg-gradient-brand-soft grid h-10 w-10 place-items-center rounded-xl">
            <Cpu size={16} />
          </span>
          <div>
            <p className="text-muted-foreground text-[10px] uppercase">Linked</p>
            <p className="text-sm font-medium">{linkedAssets.machines} machines</p>
            <p className="text-muted-foreground text-[10px]">{linkedAssets.assetIds} asset IDs · {portfolio.activeAssets} active</p>
          </div>
        </Link>
        <Link to="/staking" className="bg-gradient-card flex items-center gap-3 rounded-2xl border border-white/10 p-3">
          <span className="bg-gradient-brand-soft grid h-10 w-10 place-items-center rounded-xl">
            <Coins size={16} />
          </span>
          <div>
            <p className="text-muted-foreground text-[10px] uppercase">Staked</p>
            <p className="text-sm font-medium">{portfolio.staked.toLocaleString()}</p>
            <p className="text-muted-foreground text-[10px]">MDMT</p>
          </div>
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Highlight label="Tx Today" value={String(portfolio.txToday)} />
        <Highlight label="Yield Events" value={String(portfolio.yieldEventsToday)} />
        <Highlight label="Top Machine" value={portfolio.topMachine} small />
      </div>

      <section className="bg-gradient-card mt-5 rounded-3xl border border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="bg-secondary/60 inline-flex rounded-full p-1 text-xs">
            <ToggleBtn active={graph === "tx"} onClick={() => setGraph("tx")}>Transactions</ToggleBtn>
            <ToggleBtn active={graph === "yield"} onClick={() => setGraph("yield")}>Yield</ToggleBtn>
          </div>
          <div className="bg-secondary/60 inline-flex rounded-full p-1 text-[10px]">
            {(["7D", "30D", "90D"] as const).map((r) => (
              <ToggleBtn key={r} active={range === r} onClick={() => setRange(r)}>{r}</ToggleBtn>
            ))}
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold">
            {graph === "tx" ? data.reduce((a, b) => a + b, 0) : data.reduce((a, b) => a + b, 0).toFixed(1)}
          </span>
          <span className="text-muted-foreground text-xs">
            {graph === "tx" ? `transactions · ${range}` : `MDMT yield · ${range}`}
          </span>
          <span className="text-success ml-auto text-xs">+12.4%</span>
        </div>
        <div className="mt-2">
          <AreaChart data={data} labels={labels} />
        </div>
      </section>

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Live Yield Feed</h3>
          <Link to="/activity" className="text-muted-foreground text-xs">View all →</Link>
        </div>
        <div className="space-y-2">
          {yieldEvents.slice(0, 5).map((e, i) => (
            <motion.div
              key={e.eventId}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gradient-card flex items-center gap-3 rounded-2xl border border-white/10 p-3"
            >
              <span className="bg-gradient-brand grid h-9 w-9 shrink-0 place-items-center rounded-xl">
                <Sparkles size={15} className="text-white" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate font-mono text-sm font-medium">{e.machine}</p>
                  <p className="text-success text-sm font-semibold">+{e.amount.toFixed(3)}</p>
                </div>
                <div className="text-muted-foreground mt-0.5 flex items-center gap-2 text-[11px]">
                  <span>{e.time}</span>
                  <HashChip hash={e.hash} full={e.fullHash} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <QuickAction to="/staking" icon={<Coins size={18} />} label="Stake MDMT" />
        <QuickAction to="/rewards" icon={<TrendingUp size={18} />} label="Claim Rewards" />
        <QuickAction to="/marketplace" icon={<ShoppingBag size={18} />} label="Marketplace" />
        <QuickAction to="/assets" icon={<Layers size={18} />} label="View Assets" />
      </section>

      <Link to="/transparency" className="bg-gradient-card mt-4 flex items-center gap-3 rounded-2xl border border-white/10 p-4">
        <span className="bg-gradient-brand-soft grid h-10 w-10 place-items-center rounded-xl">
          <ShieldCheck size={16} />
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium">Transparency Hub</p>
          <p className="text-muted-foreground text-[11px]">Verify every yield event on-chain</p>
        </div>
        <ArrowUpRight size={14} className="text-muted-foreground" />
      </Link>
    </AppShell>
  );
}

function Highlight({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="bg-gradient-card rounded-2xl border border-white/10 p-3">
      <p className="text-muted-foreground text-[10px] tracking-wide uppercase">{label}</p>
      <p className={`font-display mt-1 truncate font-semibold ${small ? "text-xs" : "text-lg"}`}>{value}</p>
    </div>
  );
}

function ToggleBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 transition-all ${
        active ? "bg-gradient-brand text-white shadow-glow" : "text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function QuickAction({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  return (
    <Link to={to} className="bg-gradient-card hover:border-primary/40 group flex items-center gap-3 rounded-2xl border border-white/10 p-4 transition-colors">
      <span className="bg-gradient-brand-soft grid h-10 w-10 place-items-center rounded-xl">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
      <ArrowUpRight size={14} className="text-muted-foreground ml-auto transition-transform group-hover:rotate-45" />
    </Link>
  );
}
