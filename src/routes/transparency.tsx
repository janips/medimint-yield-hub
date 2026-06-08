import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { HashChip } from "@/components/HashChip";
import { yieldEvents, machines, assetIds, portfolio, user } from "@/lib/mockData";
import { ShieldCheck, Search, Cpu, Layers, Download, Sparkles, BadgeCheck } from "lucide-react";

export const Route = createFileRoute("/transparency")({
  head: () => ({
    meta: [
      { title: "Transparency Hub — Medimint" },
      { name: "description", content: "On-chain proof of yield, ownership, and machine performance." },
    ],
  }),
  component: TransparencyPage,
});

function TransparencyPage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q) return [];
    const lower = q.toLowerCase();
    return yieldEvents.filter((e) =>
      e.hash.toLowerCase().includes(lower) ||
      e.fullHash.toLowerCase().includes(lower) ||
      e.eventId.toLowerCase().includes(lower) ||
      e.machine.toLowerCase().includes(lower) ||
      e.assetId.toLowerCase().includes(lower),
    );
  }, [q]);

  const download = () => {
    const csv = ["eventId,machine,assetId,amount,hash,settlement,timestamp"]
      .concat(yieldEvents.map((e) => `${e.eventId},${e.machine},${e.assetId},${e.amount},${e.fullHash},${e.settlement},${e.timestamp}`))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "medimint-yield-history.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell title="Transparency Hub" subtitle="Verify everything on-chain" back>
      <div className="bg-gradient-hero shadow-glow mt-4 rounded-3xl border border-white/10 p-5">
        <span className="bg-success/20 text-success inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium">
          <BadgeCheck size={11} /> Blockchain Verified
        </span>
        <p className="font-display mt-3 text-xl font-semibold">Your audit trail</p>
        <p className="text-muted-foreground mt-1 text-xs">
          Every yield event, ownership record, and machine metric is anchored on-chain. Independently verifiable.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat label="Events" value={String(yieldEvents.length)} />
          <Stat label="Machines" value={String(machines.length)} />
          <Stat label="Assets" value={String(assetIds.length)} />
        </div>
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Hash Explorer</p>
      <div className="bg-card/60 flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2.5">
        <Search size={14} className="text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search hash, event, machine, or asset…"
          className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
        />
      </div>
      {q && (
        <div className="mt-3 space-y-2">
          {results.length === 0 && <p className="text-muted-foreground text-xs">No matches.</p>}
          {results.map((e) => (
            <Link key={e.eventId} to="/activity/event/$eventId" params={{ eventId: e.eventId }} className="bg-gradient-card flex items-center gap-3 rounded-2xl border border-white/10 p-3">
              <span className="bg-gradient-brand grid h-9 w-9 place-items-center rounded-xl">
                <Sparkles size={14} className="text-white" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs">{e.machine}</p>
                  <p className="text-success text-xs font-semibold">+{e.amount.toFixed(3)}</p>
                </div>
                <div className="mt-1"><HashChip hash={e.hash} full={e.fullHash} /></div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Asset Ownership Records</p>
      <div className="bg-gradient-card rounded-2xl border border-white/10 p-4">
        <div className="flex items-center gap-3">
          <span className="bg-gradient-brand-soft grid h-10 w-10 place-items-center rounded-xl"><Layers size={16} /></span>
          <div>
            <p className="text-sm font-medium">{user.fullName}</p>
            <p className="text-muted-foreground text-[11px]">{assetIds.length} asset IDs · {portfolio.totalTokens.toLocaleString()} MDMT</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <HashChip hash="0x91F2...7A4C" full={user.wallet} />
          <span className="text-muted-foreground text-[10px]">Wallet</span>
        </div>
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Machine Performance Verification</p>
      <div className="space-y-2">
        {machines.map((m) => (
          <Link key={m.id} to="/assets/machines/$machineId" params={{ machineId: m.id }} className="bg-gradient-card flex items-center gap-3 rounded-2xl border border-white/10 p-3">
            <span className="bg-gradient-brand-soft grid h-9 w-9 place-items-center rounded-xl"><Cpu size={14} /></span>
            <div className="flex-1">
              <p className="font-mono text-sm">{m.id}</p>
              <p className="text-muted-foreground text-[11px]">{m.txWeek} tx / week · +{m.yieldMonth} MDMT this month</p>
            </div>
            <ShieldCheck size={14} className="text-success" />
          </Link>
        ))}
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Yield Audit Trail</p>
      <div className="space-y-2">
        {yieldEvents.slice(0, 4).map((e) => (
          <div key={e.eventId} className="bg-gradient-card rounded-2xl border border-white/10 p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">{e.timestamp}</p>
              <p className="text-success text-xs font-semibold">+{e.amount.toFixed(3)}</p>
            </div>
            <p className="text-muted-foreground mt-0.5 break-all font-mono text-[10px]">{e.fullHash}</p>
          </div>
        ))}
      </div>

      <button onClick={download} className="bg-gradient-brand shadow-glow mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white">
        <Download size={14} /> Export Transaction History
      </button>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
      <p className="text-muted-foreground text-[10px] uppercase">{label}</p>
      <p className="font-display mt-1 text-base font-semibold">{value}</p>
    </div>
  );
}
