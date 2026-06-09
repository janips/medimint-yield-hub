import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Sparkline } from "@/components/Sparkline";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { machines, assetIds, portfolio, assetBuckets } from "@/lib/mockData";
import { useSim } from "@/lib/simEngine";
import { Cpu, Activity, MapPin, ChevronRight, Layers } from "lucide-react";

export const Route = createFileRoute("/assets/")({
  head: () => ({
    meta: [
      { title: "My Assets — Medimint" },
      { name: "description", content: "Asset Buckets, machines and tokens — your healthcare infrastructure portfolio." },
    ],
  }),
  component: AssetsPage,
});

type Tab = "buckets" | "machines" | "tokens" | "ids";

function AssetsPage() {
  const [tab, setTab] = useState<Tab>("buckets");
  return (
    <AppShell title="My Assets" subtitle="Buckets · Machines · Tokens" wide>
      <div className="bg-secondary/60 mt-4 inline-flex w-full rounded-full p-1 text-xs">
        {(["buckets", "machines", "tokens", "ids"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-full px-3 py-2 capitalize transition-all ${
              tab === t ? "bg-gradient-brand text-white" : "text-muted-foreground"
            }`}
          >
            {t === "ids" ? "Asset IDs" : t}
          </button>
        ))}
      </div>

      {tab === "buckets" && <BucketsTab />}
      {tab === "machines" && <MachinesTab />}
      {tab === "tokens" && <TokensTab />}
      {tab === "ids" && <AssetIdsTab />}
    </AppShell>
  );
}

function BucketsTab() {
  const s = useSim();
  // Share live engine yield across buckets weighted by myTokens (deterministic split)
  const totalTokens = assetBuckets.reduce((a, b) => a + b.myTokens, 0);
  const sessionDelta = s.myYieldToday - (assetBuckets[0]?.lifetimeYield !== undefined ? 18.42 : 18.42);

  return (
    <div className="mt-5 space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
      <div className="bg-gradient-hero shadow-glow rounded-3xl border border-white/10 p-5 lg:col-span-2">
        <p className="text-muted-foreground text-[10px] uppercase tracking-wide">You own</p>
        <p className="font-display mt-1 text-3xl font-semibold lg:text-4xl">{assetBuckets.length} Asset Buckets</p>
        <p className="text-muted-foreground mt-1 text-xs">
          {assetBuckets.reduce((a, b) => a + b.machineIds.length, 0)} machines · {totalTokens.toLocaleString()} MDMT allocated
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat label="Active Machines" value={String(s.activeMachines)} />
          <Stat label="Maintenance" value={String(s.maintenanceMachines)} />
          <Stat label="Tx Today (network)" value={s.todayTx.toLocaleString()} />
        </div>
      </div>

      {assetBuckets.map((b) => {
        const weight = b.myTokens / totalTokens;
        const liveYieldToday = +(s.myYieldToday * weight).toFixed(3);
        const liveLifetime = b.lifetimeYield + Math.max(sessionDelta * weight, 0);
        return (
          <Link
            key={b.id}
            to="/assets/buckets/$bucketId"
            params={{ bucketId: b.id }}
            className="bg-gradient-card block rounded-3xl border border-white/10 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="bg-gradient-brand-soft grid h-12 w-12 place-items-center rounded-xl">
                  <Layers size={18} />
                </span>
                <div>
                  <p className="font-display text-base font-semibold">{b.name}</p>
                  <p className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <MapPin size={10} /> {b.region}
                  </p>
                </div>
              </div>
              <span className="bg-success/15 text-success rounded-full px-2 py-0.5 text-[10px] font-medium">
                {b.apyPct}% APY
              </span>
            </div>
            <p className="text-muted-foreground mt-3 text-[11px] leading-relaxed">{b.thesis}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Stat label="Machines" value={String(b.machineIds.length)} />
              <Stat
                label="Yield Today"
                live={<AnimatedNumber value={liveYieldToday} decimals={4} prefix="+" />}
                accent
              />
              <Stat
                label="Lifetime Yield"
                live={<AnimatedNumber value={liveLifetime} decimals={2} locale />}
                accent
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Sparkline data={b.trend} width={120} height={32} />
              <span className="text-primary inline-flex items-center gap-1 text-xs font-medium">
                View bucket <ChevronRight size={12} />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function TokensTab() {
  return (
    <div className="mt-5 space-y-4">
      <div className="bg-gradient-hero shadow-glow rounded-3xl border border-white/10 p-5">
        <p className="text-muted-foreground text-xs uppercase tracking-wide">Total MDMT</p>
        <p className="font-display mt-1 text-4xl font-semibold">{portfolio.totalTokens.toLocaleString()}</p>
        <p className="text-success mt-1 text-xs">↗ +{portfolio.appreciationMonth}% est. this month</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Stat label="Available" value={portfolio.available.toLocaleString()} />
          <Stat label="Staked" value={portfolio.staked.toLocaleString()} />
          <Stat label="Pending Rewards" value={portfolio.rewardsPending.toFixed(2)} />
          <Stat label="Next Reward" value="2d 14h" />
        </div>
      </div>

      <div className="bg-gradient-card rounded-2xl border border-white/10 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Token Performance</p>
          <span className="text-success text-xs">+6.4% / 30D</span>
        </div>
        <p className="text-muted-foreground mt-1 text-xs">Estimated appreciation trend</p>
        <div className="mt-2">
          <Sparkline data={[4.2, 4.4, 4.3, 4.6, 4.9, 5.1, 5.3, 5.6]} width={300} height={60} />
        </div>
      </div>
    </div>
  );
}

function MachinesTab() {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
      {machines.map((m) => (
        <Link
          key={m.id}
          to="/assets/machines/$machineId"
          params={{ machineId: m.id }}
          className="bg-gradient-card block rounded-2xl border border-white/10 p-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-gradient-brand-soft grid h-11 w-11 place-items-center rounded-xl">
                <Cpu size={18} />
              </span>
              <div>
                <p className="font-mono text-sm font-semibold">{m.id}</p>
                <p className="text-muted-foreground text-[11px]">{m.type}</p>
              </div>
            </div>
            <StatusPill status={m.status} />
          </div>
          <div className="text-muted-foreground mt-3 flex items-center gap-1 text-[11px]">
            <MapPin size={11} /> {m.location}
          </div>
          <div className="mt-3 grid grid-cols-3 items-end gap-2">
            <div>
              <p className="text-muted-foreground text-[10px] uppercase">Tx Today</p>
              <p className="font-display text-lg font-semibold">{m.txToday}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-[10px] uppercase">Yield</p>
              <p className="font-display text-lg font-semibold">+{m.yieldToday}</p>
            </div>
            <div className="flex justify-end">
              <Sparkline data={m.trend} width={80} height={36} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function AssetIdsTab() {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
      {assetIds.map((a) => (
        <Link
          key={a.id}
          to="/assets/ids/$assetId"
          params={{ assetId: a.id }}
          className="bg-gradient-card block rounded-2xl border border-white/10 p-4"
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm font-semibold">{a.id}</p>
            <span className="text-success bg-success/10 rounded-full px-2 py-0.5 text-[10px]">
              {a.ratePct}% APY
            </span>
          </div>
          <p className="text-muted-foreground mt-1 text-[11px]">
            Linked to <span className="text-foreground font-mono">{a.machineId}</span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <p className="text-muted-foreground text-[10px] uppercase">Allocated</p>
              <p className="font-display text-base font-semibold">{a.tokens.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-[10px] uppercase">Lifetime Yield</p>
              <p className="font-display text-base font-semibold">{a.earned.toFixed(1)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function Stat({
  label, value, live, accent,
}: { label: string; value?: string; live?: React.ReactNode; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-muted-foreground text-[10px] uppercase tracking-wide">{label}</p>
      <p className={`font-display mt-1 text-base font-semibold tabular-nums ${accent ? "text-gradient-brand" : ""}`}>
        {live ?? value}
      </p>
    </div>
  );
}

function StatusPill({ status }: { status: "Active" | "Maintenance" | "Offline" }) {
  const map = {
    Active: "bg-success/15 text-success",
    Maintenance: "bg-warning/15 text-warning",
    Offline: "bg-destructive/15 text-destructive",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] ${map[status]}`}>
      <Activity size={9} /> {status}
    </span>
  );
}
