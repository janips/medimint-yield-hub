import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AreaChart } from "@/components/AreaChart";
import { BarChart } from "@/components/BarChart";
import { HashChip } from "@/components/HashChip";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { findMachine, eventsForMachine, assetIds as allAssetIds, fmtMdmt, portfolio, findBucket } from "@/lib/mockData";
import { useLiveYield } from "@/lib/liveYield";
import { useSim } from "@/lib/simEngine";
import { Cpu, MapPin, Activity, Download, ChevronRight, ShieldCheck, Sparkles, CalendarClock, Hash, TrendingUp, PieChart, Factory, Users, Coins, Gift, Clock, Plus, History, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/assets/machines/$machineId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.machineId} — Medimint` },
      { name: "description", content: `Live performance, yield events, and blockchain audit for ${params.machineId}.` },
    ],
  }),
  loader: ({ params }) => {
    const machine = findMachine(params.machineId);
    if (!machine) throw notFound();
    return { machine };
  },
  component: MachineDetailPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="p-8 text-center">
        <p className="text-sm">Failed to load: {error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="text-primary mt-3 text-xs">Retry</button>
      </div>
    );
  },
  notFoundComponent: () => (
    <AppShell title="Machine not found" back>
      <p className="text-muted-foreground mt-6 text-sm">This machine isn't in your linked assets.</p>
      <Link to="/assets" className="text-primary mt-3 inline-block text-xs">← Back to assets</Link>
    </AppShell>
  ),
});

function MachineDetailPage() {
  const { machine } = Route.useLoaderData();
  const events = eventsForMachine(machine.id);
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthLabels = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];

  const myAssets = allAssetIds.filter((a) => a.machineId === machine.id);
  const myTokens = myAssets.reduce((sum, a) => sum + a.tokens, 0);
  const baseLifetime = myAssets.reduce((sum, a) => sum + a.earned, 0);
  const ownershipPct = (myTokens / machine.totalSupply) * 100;
  const live = useLiveYield();
  // share of total portfolio yield that belongs to this machine — based on ownership weight
  const machineShare = portfolio.yieldToday > 0
    ? (machine.yieldToday * (myTokens / machine.totalSupply)) / portfolio.yieldToday
    : 0;
  const liveDeltaToday = (live.today - portfolio.yieldToday) * machineShare;
  const liveDeltaLifetime = (live.lifetime - portfolio.yieldLifetime) * machineShare;
  const myYieldToday = machine.yieldToday * (myTokens / machine.totalSupply) + Math.max(liveDeltaToday, 0);
  const myYieldMonth = machine.yieldMonth * (myTokens / machine.totalSupply);
  const myYieldLifetime = baseLifetime + Math.max(liveDeltaLifetime, 0);

  const bucket = machine.bucketId ? findBucket(machine.bucketId) : undefined;
  const sim = useSim();
  const liveMachineFeed = sim.feed.filter((t) => t.machineId === machine.id);
  const liveYieldDelta = liveMachineFeed.reduce((a, t) => a + t.yieldMDMT, 0);
  const liveRevenueToday = (machine.revenueGeneratedAED ?? machine.txToday * 150) + liveMachineFeed.reduce((a, t) => a + t.revenueAED, 0);

  // Investor share data — falls back to allAssetIds-based ownership for older machines
  const myStake = machine.myStake ?? myTokens;
  const myPendingRewards = machine.myPendingRewards ?? +(myYieldToday * 0.6).toFixed(2);
  const myRewardsEarned = machine.myRewardsEarned ?? myYieldLifetime;
  const myStakeDate = machine.myStakeDate ?? machine.ownedSince;
  const myOwnership = machine.totalStaked && machine.totalStaked > 0
    ? (myStake / machine.totalStaked) * 100
    : ownershipPct;

  return (
    <AppShell title={machine.id} subtitle={machine.name ?? machine.type} back>
      <div className="bg-gradient-hero shadow-glow mt-4 rounded-3xl border border-white/10 p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
            <span className="bg-gradient-brand-soft grid h-12 w-12 place-items-center rounded-xl">
              <Cpu size={20} />
            </span>
            <div className="min-w-0">
              <p className="truncate font-mono text-base font-semibold">{machine.id}</p>
              <p className="text-muted-foreground flex items-center gap-1 text-[11px]"><MapPin size={11} /> {machine.location}</p>
              {bucket && (
                <Link to="/assets/buckets/$bucketId" params={{ bucketId: bucket.id }} className="text-primary mt-0.5 inline-flex items-center gap-1 text-[10px]">
                  {bucket.name} <ChevronRight size={9} />
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <StatusPill status={machine.status} />
            {machine.badge && (
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                machine.badge === "Top Performing" ? "bg-gradient-brand text-white" : "bg-primary/20 text-primary"
              }`}>{machine.badge}</span>
            )}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Mini label="Tx Today" value={String(machine.txToday)} />
          <Mini label="Tx Week" value={String(machine.txWeek)} />
          <Mini label="Tx Month" value={machine.txMonth?.toLocaleString() ?? "—"} />
          <Mini label="Utilization" value={`${machine.utilizationPct ?? machine.uptimePct}%`} />
          <Mini label="Current APY" value={`${machine.currentAPY ?? "—"}%`} accent />
          <Mini label="Total Staked" value={machine.totalStaked ? `${machine.totalStaked.toLocaleString()} MDMT` : "—"} />
          <Mini label="Investors" value={machine.numInvestors ? String(machine.numInvestors) : "—"} />
          <Mini label="Launched" value={machine.launchDate ?? machine.commissioned} />
        </div>
      </div>

      {/* My Investment — prominent */}
      <p className="text-muted-foreground mt-5 mb-2 flex items-center gap-1 text-[11px] uppercase tracking-wide">
        <PieChart size={11} /> My Investment
      </p>
      <div className="bg-gradient-hero rounded-3xl border border-primary/20 p-5 shadow-glow">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Mini label="My Stake" value={`${myStake.toLocaleString()} MDMT`} accent />
          <Mini label="Stake Date" value={myStakeDate} />
          <Mini label="My Ownership" value={`${myOwnership.toFixed(2)}%`} accent />
          <Mini label="Rewards Earned" value={`+${myRewardsEarned.toFixed(2)} MDMT`} accent />
          <Mini label="Pending Rewards" value={`+${myPendingRewards.toFixed(2)} MDMT`} />
          <Mini label="Current Yield" accent liveValue={myYieldToday + liveYieldDelta * (myStake / (machine.totalStaked || 100000))} decimals={4} prefix="+" />
        </div>
      </div>

      {/* Machine investor metrics */}
      <p className="text-muted-foreground mt-5 mb-2 flex items-center gap-1 text-[11px] uppercase tracking-wide">
        <Users size={11} /> Machine Investor Metrics
      </p>
      <div className="bg-gradient-card rounded-3xl border border-white/10 p-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Mini label="Total Investors" value={machine.numInvestors ? String(machine.numInvestors) : "—"} />
          <Mini label="Total Staked" value={machine.totalStaked ? `${machine.totalStaked.toLocaleString()}` : "—"} />
          <Mini label="Revenue Generated" value={`AED ${Math.round(liveRevenueToday).toLocaleString()}`} />
          <Mini label="Rewards Distributed" value={fmtMdmt(machine.lifetimeYield * 0.7, 1)} />
          <Mini label="Lifetime Yield" value={fmtMdmt(machine.lifetimeYield, 1)} accent />
          <Mini label="Avg Investor Yield" value={machine.numInvestors ? `${(machine.lifetimeYield / machine.numInvestors).toFixed(2)} MDMT` : "—"} />
        </div>
      </div>

      {/* Scan Activity */}
      <p className="text-muted-foreground mt-5 mb-2 flex items-center gap-1 text-[11px] uppercase tracking-wide">
        <BarChart3 size={11} /> Scan Activity
      </p>
      <div className="bg-gradient-card rounded-3xl border border-white/10 p-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Mini label="Scans Today" value={String(machine.scansToday ?? machine.txToday)} accent />
          <Mini label="Scans Week" value={String(machine.scansWeek ?? machine.txWeek)} />
          <Mini label="Scans Month" value={(machine.scansMonth ?? machine.txMonth ?? 0).toLocaleString()} />
          <Mini label="Avg Daily" value={String(machine.avgDailyScans ?? Math.round(machine.txWeek / 7))} />
        </div>
        <div className="text-muted-foreground mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px]">
          <Clock size={12} className="text-primary" />
          <span>Peak hours</span>
          <span className="ml-auto font-medium text-foreground">{machine.peakHours ?? "10:00–14:00"}</span>
        </div>
      </div>

      {/* Rewards */}
      <p className="text-muted-foreground mt-5 mb-2 flex items-center gap-1 text-[11px] uppercase tracking-wide">
        <Gift size={11} /> Rewards
      </p>
      <div className="bg-gradient-card rounded-3xl border border-white/10 p-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Mini label="Rewards Today" value={`+${(myYieldToday).toFixed(3)}`} accent />
          <Mini label="This Week" value={`+${(myYieldToday * 6.2).toFixed(2)}`} />
          <Mini label="This Month" value={`+${(myYieldMonth).toFixed(2)}`} />
          <Mini label="Lifetime" value={`+${myRewardsEarned.toFixed(1)}`} accent />
        </div>
        <div className="mt-3">
          <AreaChart data={machine.monthlyYield} labels={monthLabels} />
        </div>
      </div>


      {/* Your Investment */}
      <p className="text-muted-foreground mt-5 mb-2 flex items-center gap-1 text-[11px] uppercase tracking-wide">
        <PieChart size={11} /> Your Investment
      </p>
      <div className="bg-gradient-card rounded-3xl border border-white/10 p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-muted-foreground text-[11px]">Ownership Share</p>
            <p className="font-display text-gradient-brand mt-1 text-4xl font-semibold">
              {ownershipPct.toFixed(2)}%
            </p>
            <p className="text-muted-foreground mt-1 text-[11px]">
              {myTokens.toLocaleString()} / {machine.totalSupply.toLocaleString()} MDMT
            </p>
          </div>
          <div className="relative h-20 w-20">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" opacity="0.2" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={`${Math.min(ownershipPct, 100)}, 100`}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-[10px] font-semibold">
              {ownershipPct.toFixed(1)}%
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Mini label="Your Yield Today" accent liveValue={myYieldToday} decimals={4} prefix="+" />
          <Mini label="Your Yield 30D" value={`+${myYieldMonth.toFixed(2)}`} accent />
          <Mini label="Lifetime Earned" accent liveValue={myYieldLifetime} decimals={3} />
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px]">
          <CalendarClock size={12} className="text-primary" />
          <span className="text-muted-foreground">Owned since</span>
          <span className="ml-auto font-medium">{machine.ownedSince}</span>
        </div>
      </div>

      {/* Machine Specs */}
      <p className="text-muted-foreground mt-5 mb-2 flex items-center gap-1 text-[11px] uppercase tracking-wide">
        <Factory size={11} /> Machine Details
      </p>
      <div className="bg-gradient-card divide-y divide-white/5 rounded-2xl border border-white/10">
        <Row label="Manufacturer" value={machine.manufacturer} />
        <Row label="Serial Number" value={machine.serial} mono />
        <Row label="Commissioned" value={machine.commissioned} />
        <Row label="Uptime (30d)" value={`${machine.uptimePct}%`} />
        <Row label="Lifetime Transactions" value={machine.lifetimeTx.toLocaleString()} />
        <Row label="Lifetime Yield" value={fmtMdmt(machine.lifetimeYield)} />
        <Row label="Avg Yield / Tx" value={`${machine.avgYieldPerTx} MDMT`} />
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Daily Transactions · Last 7 days</p>
      <div className="bg-gradient-card rounded-3xl border border-white/10 p-4">
        <BarChart data={machine.dailyTx} labels={dayLabels} />
      </div>

      <div className="mt-5 mb-2 flex items-center justify-between">
        <p className="text-muted-foreground text-[11px] uppercase tracking-wide">Daily Yield · Last 7 days</p>
        <span className="text-success text-[10px]">Total +{machine.dailyYield.reduce((a: number, b: number) => a + b, 0).toFixed(2)} MDMT</span>
      </div>
      <div className="bg-gradient-card rounded-3xl border border-white/10 p-4">
        <AreaChart data={machine.dailyYield} labels={dayLabels} />
        <p className="text-muted-foreground mt-2 text-center text-[10px]">
          Your share (~{ownershipPct.toFixed(2)}%): +{(machine.dailyYield.reduce((a: number, b: number) => a + b, 0) * (myTokens / machine.totalSupply)).toFixed(3)} MDMT this week
        </p>
      </div>

      <div className="mt-5 mb-2 flex items-center justify-between">
        <p className="text-muted-foreground text-[11px] uppercase tracking-wide">Monthly Yield · Last 6 months</p>
        <span className="text-success text-[10px]">+{((machine.monthlyYield[5] - machine.monthlyYield[0]) / machine.monthlyYield[0] * 100).toFixed(1)}% growth</span>
      </div>
      <div className="bg-gradient-card rounded-3xl border border-white/10 p-4">
        <AreaChart data={machine.monthlyYield} labels={monthLabels} />
      </div>

      {/* Yield Event Ledger */}
      <div className="mt-5 mb-2 flex items-center justify-between">
        <p className="text-muted-foreground flex items-center gap-1 text-[11px] uppercase tracking-wide">
          <Hash size={11} /> Yield Transactions
        </p>
        <span className="text-muted-foreground text-[10px]">{events.length} on-chain events</span>
      </div>
      <div className="space-y-2">
        {events.length === 0 && <p className="text-muted-foreground text-xs">No events recorded.</p>}
        {events.map((e) => {
          const yourShare = e.amount * (myTokens / machine.totalSupply);
          return (
            <Link
              key={e.eventId}
              to="/activity/event/$eventId"
              params={{ eventId: e.eventId }}
              className="bg-gradient-card block rounded-2xl border border-white/10 p-3"
            >
              <div className="flex items-center gap-3">
                <span className="bg-gradient-brand grid h-9 w-9 shrink-0 place-items-center rounded-xl">
                  <Sparkles size={14} className="text-white" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{e.timestamp}</p>
                    <p className="text-success text-sm font-semibold">+{e.amount.toFixed(3)}</p>
                  </div>
                  <div className="text-muted-foreground mt-0.5 flex items-center justify-between text-[10px]">
                    <span className="font-mono">{e.eventId} · {e.assetId}</span>
                    <span>Your share: <span className="text-foreground">+{yourShare.toFixed(4)}</span></span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between pl-12">
                <HashChip hash={e.hash} full={e.fullHash} />
                <SettlementPill status={e.settlement} />
              </div>
            </Link>
          );
        })}
      </div>

      <Link to="/transparency" className="bg-gradient-card mt-5 flex items-center gap-3 rounded-2xl border border-white/10 p-4">
        <span className="bg-gradient-brand-soft grid h-10 w-10 place-items-center rounded-xl">
          <ShieldCheck size={16} />
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium">Blockchain Verification</p>
          <p className="text-muted-foreground text-[11px]">All {events.length} events hash-anchored</p>
        </div>
        <ChevronRight size={14} className="text-muted-foreground" />
      </Link>

      <p className="text-muted-foreground mt-5 mb-2 flex items-center gap-1 text-[11px] uppercase tracking-wide">
        <TrendingUp size={11} /> Your Linked Asset IDs
      </p>
      <div className="space-y-2">
        {myAssets.map((a) => (
          <Link key={a.id} to="/assets/ids/$assetId" params={{ assetId: a.id }} className="bg-gradient-card flex items-center justify-between rounded-2xl border border-white/10 p-3">
            <div>
              <p className="font-mono text-sm">{a.id}</p>
              <p className="text-muted-foreground text-[10px]">{a.tokens.toLocaleString()} MDMT · {a.ratePct}% APY</p>
            </div>
            <div className="text-right">
              <p className="text-success text-xs font-semibold">+{a.earned.toFixed(1)}</p>
              <p className="text-muted-foreground text-[10px]">earned</p>
            </div>
          </Link>
        ))}
      </div>

      <button className="bg-gradient-card hover:bg-gradient-brand-soft mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-sm font-semibold transition-all">
        <Download size={14} /> Export Report
      </button>

      {/* Sticky staking action panel */}
      <div className="h-28" />
      <div className="fixed inset-x-0 bottom-16 z-30 px-4 lg:bottom-4">
        <div className="mx-auto max-w-3xl">
          <div className="bg-gradient-hero shadow-glow rounded-2xl border border-primary/30 p-3 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-2">
              <div className="hidden min-w-0 sm:block">
                <p className="text-muted-foreground text-[10px] uppercase tracking-wide">My stake</p>
                <p className="font-display text-sm font-semibold tabular-nums">{myStake.toLocaleString()} MDMT · +{myPendingRewards.toFixed(2)} pending</p>
              </div>
              <div className="flex flex-1 items-center gap-2 sm:flex-initial">
                <Link to="/staking" className="bg-gradient-brand shadow-glow inline-flex flex-1 items-center justify-center gap-1 rounded-full px-3 py-2 text-xs font-semibold text-white sm:flex-initial">
                  <Coins size={13} /> {myStake > 0 ? "Increase Stake" : "Stake MDMT"}
                </Link>
                <Link to="/rewards" className="bg-secondary/80 inline-flex flex-1 items-center justify-center gap-1 rounded-full px-3 py-2 text-xs font-semibold sm:flex-initial">
                  <Gift size={13} /> Claim
                </Link>
                <Link to="/activity" className="border-white/10 inline-flex items-center justify-center gap-1 rounded-full border px-3 py-2 text-xs font-medium">
                  <History size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <p className="text-muted-foreground text-[11px]">{label}</p>
      <p className={`text-xs ${mono ? "font-mono" : "font-medium"}`}>{value}</p>
    </div>
  );
}

function Mini({ label, value, accent, flashKey, liveValue, decimals = 2, prefix = "" }: { label: string; value?: string; accent?: boolean; flashKey?: number; liveValue?: number; decimals?: number; prefix?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-muted-foreground text-[10px] uppercase tracking-wide">{label}</p>
      <p className={`font-display mt-1 text-base font-semibold tabular-nums ${accent ? "text-gradient-brand" : ""}`}>
        {liveValue !== undefined ? (
          <AnimatedNumber value={liveValue} decimals={decimals} prefix={prefix} />
        ) : flashKey !== undefined ? (
          <span key={flashKey} className="animate-yield-flash inline-block">{value}</span>
        ) : (
          value
        )}
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

function SettlementPill({ status }: { status: "Settled" | "Pending" | "Confirming" }) {
  const map = {
    Settled: "bg-success/15 text-success",
    Pending: "bg-warning/15 text-warning",
    Confirming: "bg-primary/15 text-primary",
  } as const;
  return <span className={`rounded-full px-2 py-0.5 text-[9px] ${map[status]}`}>{status}</span>;
}
