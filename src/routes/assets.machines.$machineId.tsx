import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AreaChart } from "@/components/AreaChart";
import { BarChart } from "@/components/BarChart";
import { HashChip } from "@/components/HashChip";
import { findMachine, eventsForMachine } from "@/lib/mockData";
import { Cpu, MapPin, Activity, Download, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";

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

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Daily Transactions</p>
      <div className="bg-gradient-card rounded-3xl border border-white/10 p-4">
        <BarChart data={machine.dailyTx} labels={dayLabels} />
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Monthly Yield</p>
      <div className="bg-gradient-card rounded-3xl border border-white/10 p-4">
        <AreaChart data={machine.monthlyYield} labels={monthLabels} />
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Yield Events Timeline</p>
      <div className="space-y-2">
        {events.length === 0 && <p className="text-muted-foreground text-xs">No events recorded.</p>}
        {events.map((e) => (
          <div key={e.eventId} className="bg-gradient-card flex items-center gap-3 rounded-2xl border border-white/10 p-3">
            <span className="bg-gradient-brand grid h-9 w-9 place-items-center rounded-xl">
              <Sparkles size={14} className="text-white" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{e.timestamp}</p>
                <p className="text-success text-sm font-semibold">+{e.amount.toFixed(3)}</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <HashChip hash={e.hash} full={e.fullHash} />
                <span className="text-muted-foreground text-[10px]">{e.settlement}</span>
              </div>
            </div>
          </div>
        ))}
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

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Linked Asset IDs</p>
      <div className="space-y-2">
        {machine.assetIds.map((aid: string) => (
          <Link key={aid} to="/assets/ids/$assetId" params={{ assetId: aid }} className="bg-gradient-card flex items-center justify-between rounded-2xl border border-white/10 p-3">
            <p className="font-mono text-sm">{aid}</p>
            <ChevronRight size={14} className="text-muted-foreground" />
          </Link>
        ))}
      </div>

      <button className="bg-gradient-brand shadow-glow mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white">
        <Download size={14} /> Export Report
      </button>
    </AppShell>
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
