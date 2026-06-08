import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AreaChart } from "@/components/AreaChart";
import { BarChart } from "@/components/BarChart";
import { HashChip } from "@/components/HashChip";
import { findMachine, eventsForMachine, assetIds as allAssetIds, fmtMdmt, portfolio } from "@/lib/mockData";
import { useLiveYield } from "@/lib/liveYield";
import { Cpu, MapPin, Activity, Download, ChevronRight, ShieldCheck, Sparkles, CalendarClock, Wrench, Hash, TrendingUp, PieChart, Factory } from "lucide-react";

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

  return (
    <AppShell title={machine.id} subtitle={machine.type} back>
      <div className="bg-gradient-hero shadow-glow mt-4 rounded-3xl border border-white/10 p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-gradient-brand-soft grid h-12 w-12 place-items-center rounded-xl">
              <Cpu size={20} />
            </span>
            <div>
              <p className="font-mono text-base font-semibold">{machine.id}</p>
              <p className="text-muted-foreground flex items-center gap-1 text-[11px]"><MapPin size={11} /> {machine.location}</p>
            </div>
          </div>
          <StatusPill status={machine.status} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Mini label="Tx Today" value={String(machine.txToday)} />
          <Mini label="Tx This Week" value={String(machine.txWeek)} />
          <Mini label="Yield Today" value={`+${machine.yieldToday} MDMT`} accent />
          <Mini label="Yield This Month" value={`+${machine.yieldMonth} MDMT`} accent />
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
          <Mini label="Your Yield Today" value={`+${myYieldToday.toFixed(3)}`} accent />
          <Mini label="Your Yield 30D" value={`+${myYieldMonth.toFixed(2)}`} accent />
          <Mini label="Lifetime Earned" value={`${myYieldLifetime.toFixed(1)}`} accent />
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

      <button className="bg-gradient-brand shadow-glow mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white">
        <Download size={14} /> Export Report
      </button>
      <div className="h-4" />
    </AppShell>
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

function Mini({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-muted-foreground text-[10px] uppercase tracking-wide">{label}</p>
      <p className={`font-display mt-1 text-base font-semibold ${accent ? "text-gradient-brand" : ""}`}>{value}</p>
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
