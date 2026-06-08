import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Sparkline } from "@/components/Sparkline";
import { machines, assetIds, portfolio, fmtMdmt } from "@/lib/mockData";
import { Cpu, Activity, MapPin, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/assets")({
  head: () => ({
    meta: [
      { title: "My Assets — Medimint" },
      { name: "description", content: "Your MDMT tokens, linked machines, and asset IDs at a glance." },
    ],
  }),
  component: AssetsPage,
});

type Tab = "tokens" | "machines" | "ids";

function AssetsPage() {
  const [tab, setTab] = useState<Tab>("tokens");
  return (
    <AppShell title="My Assets" subtitle="Tokens · Machines · Asset IDs">
      <div className="bg-secondary/60 mt-4 inline-flex w-full rounded-full p-1 text-xs">
        {(["tokens", "machines", "ids"] as Tab[]).map((t) => (
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

      {tab === "tokens" && <TokensTab />}
      {tab === "machines" && <MachinesTab />}
      {tab === "ids" && <AssetIdsTab />}
    </AppShell>
  );
}

function TokensTab() {
  return (
    <div className="mt-5 space-y-4">
      <div className="bg-gradient-hero shadow-glow rounded-3xl border border-white/10 p-5">
        <p className="text-muted-foreground text-xs uppercase tracking-wide">Total MDMT</p>
        <p className="font-display mt-1 text-4xl font-semibold">{portfolio.totalTokens.toLocaleString()}</p>
        <p className="text-success mt-1 text-xs">↗ +{portfolio.appreciationMonth}% this month</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Stat label="Available" value={portfolio.available.toLocaleString()} />
          <Stat label="Staked" value={portfolio.staked.toLocaleString()} />
          <Stat label="Rewards Pending" value={portfolio.rewardsPending.toFixed(2)} />
          <Stat label="Next Cycle" value="2d 14h" />
        </div>
      </div>

      <div className="bg-gradient-card rounded-2xl border border-white/10 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Token Performance</p>
          <span className="text-success text-xs">+6.4%</span>
        </div>
        <p className="text-muted-foreground mt-1 text-xs">30-day trend</p>
        <div className="mt-2">
          <Sparkline data={[4.2, 4.4, 4.3, 4.6, 4.9, 5.1, 5.3, 5.6]} width={300} height={60} />
        </div>
      </div>
    </div>
  );
}

function MachinesTab() {
  return (
    <div className="mt-5 space-y-3">
      {machines.map((m) => (
        <div key={m.id} className="bg-gradient-card rounded-2xl border border-white/10 p-4">
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
          <button className="border-primary/30 text-primary mt-3 flex w-full items-center justify-center gap-1 rounded-xl border py-2 text-xs font-medium">
            View Details <ChevronRight size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}

function AssetIdsTab() {
  return (
    <div className="mt-5 space-y-3">
      {assetIds.map((a) => (
        <div key={a.id} className="bg-gradient-card rounded-2xl border border-white/10 p-4">
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
              <p className="text-muted-foreground text-[10px] uppercase">Tokens</p>
              <p className="font-display text-base font-semibold">{a.tokens.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-[10px] uppercase">Yield Earned</p>
              <p className="font-display text-base font-semibold">{a.earned.toFixed(1)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-muted-foreground text-[10px] uppercase tracking-wide">{label}</p>
      <p className="font-display mt-1 text-base font-semibold">{value}</p>
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
void fmtMdmt;
