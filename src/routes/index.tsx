import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Coins, TrendingUp, Cpu, ShoppingBag, Layers, ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { HashChip } from "@/components/HashChip";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { LiveNetworkStatus } from "@/components/LiveNetworkStatus";
import { LiveActivityFeed } from "@/components/LiveActivityFeed";
import { RangeChart } from "@/components/RangeChart";
import { portfolio, assetBuckets, fmtUsd, user } from "@/lib/mockData";
import { useLiveYield } from "@/lib/liveYield";
import type { ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Medimint Investor Platform" },
      { name: "description", content: "Real-time view of MDMT holdings, live machine yield, network operations, and your asset buckets." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const live = useLiveYield();

  return (
    <AppShell wide>
      <p className="text-muted-foreground mt-2 text-xs">Good morning</p>
      <h2 className="font-display text-2xl font-semibold lg:text-3xl">{user.name} 👋</h2>

      <div className="lg:grid lg:grid-cols-3 lg:gap-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-hero shadow-glow relative mt-5 overflow-hidden rounded-3xl border border-white/10 p-5 lg:col-span-2"
        >
          <div className="bg-gradient-brand absolute -top-20 -right-16 h-48 w-48 rounded-full opacity-30 blur-3xl" />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs uppercase tracking-wide">Total Holdings</span>
            <span className="bg-success/20 text-success inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium">
              <span className="bg-success h-1.5 w-1.5 animate-pulse rounded-full" /> Yield Active
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-4xl font-semibold tracking-tight lg:text-5xl">
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
              <p className="text-muted-foreground text-[10px] uppercase tracking-wide">My Yield Today</p>
              <p className="font-display mt-1 text-lg font-semibold tabular-nums">
                <AnimatedNumber value={live.today} decimals={4} prefix="+" />
              </p>
              <p className="text-muted-foreground text-[10px]">MDMT · live</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-muted-foreground text-[10px] uppercase tracking-wide">Lifetime Yield</p>
              <p className="font-display mt-1 text-lg font-semibold tabular-nums">
                <AnimatedNumber value={live.lifetime} decimals={4} locale />
              </p>
              <p className="text-muted-foreground text-[10px]">MDMT</p>
            </div>
          </div>
        </motion.div>

        <LiveNetworkStatus />
      </div>

      {/* Quick portfolio glance */}
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Link to="/assets" className="bg-gradient-card flex items-center gap-3 rounded-2xl border border-white/10 p-3">
          <span className="bg-gradient-brand-soft grid h-10 w-10 place-items-center rounded-xl">
            <Layers size={16} />
          </span>
          <div>
            <p className="text-muted-foreground text-[10px] uppercase">Asset Buckets</p>
            <p className="text-sm font-medium">{assetBuckets.length} buckets</p>
            <p className="text-muted-foreground text-[10px]">
              {assetBuckets.reduce((a, b) => a + b.machineIds.length, 0)} machines
            </p>
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
        <Highlight label="Pending Rewards" value={portfolio.rewardsPending.toFixed(2)} small />
        <Highlight label="Top Machine" value={portfolio.topMachine} small />
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-5">
        <RangeChart initial="tx" title="Network Activity" />
        <RangeChart initial="revenue" bars title="Revenue Generated" />
      </div>

      {/* Asset Buckets preview */}
      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Your Asset Buckets</h3>
          <Link to="/assets" className="text-muted-foreground text-xs">View all →</Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {assetBuckets.map((b) => (
            <Link
              key={b.id}
              to="/assets/buckets/$bucketId"
              params={{ bucketId: b.id }}
              className="bg-gradient-card rounded-2xl border border-white/10 p-4"
            >
              <p className="font-display text-sm font-semibold">{b.name}</p>
              <p className="text-muted-foreground mt-0.5 text-[11px]">{b.region}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Mini label="Machines" value={String(b.machineIds.length)} />
                <Mini label="APY" value={`${b.apyPct}%`} />
              </div>
              <div className="mt-2 text-[11px]">
                <span className="text-muted-foreground">Lifetime: </span>
                <span className="text-success font-semibold">+{b.lifetimeYield.toFixed(1)} MDMT</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <LiveActivityFeed />

      <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <QuickAction to="/staking" icon={<Coins size={18} />} label="Stake MDMT" />
        <QuickAction to="/rewards" icon={<TrendingUp size={18} />} label="Claim Rewards" />
        <QuickAction to="/marketplace" icon={<ShoppingBag size={18} />} label="Marketplace" />
        <QuickAction to="/assets" icon={<Cpu size={18} />} label="View Assets" />
      </section>

      <Link to="/transparency" className="bg-gradient-card mt-4 flex items-center gap-3 rounded-2xl border border-white/10 p-4">
        <span className="bg-gradient-brand-soft grid h-10 w-10 place-items-center rounded-xl">
          <ShieldCheck size={16} />
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium">Transparency Hub</p>
          <p className="text-muted-foreground text-[11px]">Every yield event independently verifiable on-chain</p>
        </div>
        <ArrowUpRight size={14} className="text-muted-foreground" />
      </Link>

      {/* Investor proof strip */}
      <div className="bg-gradient-card mt-4 flex items-center gap-2 overflow-x-auto rounded-2xl border border-white/10 p-3 text-[11px]">
        <span className="text-muted-foreground shrink-0">Latest verified hashes</span>
        {[ "0xA91F...3E2C", "0x77B2...91F4", "0xC3D5...88A1" ].map((h) => (
          <HashChip key={h} hash={h} full={h + "EXAMPLE"} />
        ))}
      </div>
    </AppShell>
  );
}

function Highlight({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="bg-gradient-card rounded-2xl border border-white/10 p-3">
      <p className="text-muted-foreground text-[10px] uppercase tracking-wide">{label}</p>
      <p className={`font-display mt-1 truncate font-semibold ${small ? "text-sm" : "text-lg"}`}>{value}</p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-2">
      <p className="text-muted-foreground text-[9px] uppercase tracking-wide">{label}</p>
      <p className="font-display mt-0.5 text-sm font-semibold tabular-nums">{value}</p>
    </div>
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
