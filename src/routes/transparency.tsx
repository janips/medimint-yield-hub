import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { HashChip } from "@/components/HashChip";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import {
  yieldEvents, machines, assetIds, portfolio, user, assetBuckets,
} from "@/lib/mockData";
import { useSim } from "@/lib/simEngine";
import {
  ShieldCheck, Search, Cpu, Layers, Download, Sparkles, BadgeCheck,
  Receipt, FileText, Wallet, Building2,
} from "lucide-react";

export const Route = createFileRoute("/transparency")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Transparency Hub — Medimint" },
      { name: "description", content: "On-chain proof of every yield event, machine activity and investor ownership record." },
    ],
  }),
  component: TransparencyPage,
});

function TransparencyPage() {
  const { q: initialQ } = Route.useSearch();
  const [q, setQ] = useState(initialQ ?? "");
  const sim = useSim();

  // Live + seeded events
  const combined = useMemo(() => {
    const live = sim.feed.map((t) => ({
      eventId: t.id, time: "", timestamp: new Date(t.ts).toLocaleString(),
      machine: t.machineId, assetId: t.assetId, amount: t.yieldMDMT, txAmount: t.revenueAED,
      hash: t.hash, fullHash: t.fullHash, settlement: t.settlement,
    }));
    return [...live, ...yieldEvents];
  }, [sim.feed]);

  const results = useMemo(() => {
    if (!q) return [];
    const lower = q.toLowerCase();
    return combined.filter((e) =>
      e.hash.toLowerCase().includes(lower) ||
      e.fullHash.toLowerCase().includes(lower) ||
      e.eventId.toLowerCase().includes(lower) ||
      e.machine.toLowerCase().includes(lower) ||
      e.assetId.toLowerCase().includes(lower),
    ).slice(0, 12);
  }, [q, combined]);

  const downloadCsv = () => {
    const csv = ["eventId,machine,assetId,revenue_AED,yield_MDMT,hash,settlement,timestamp"]
      .concat(combined.map((e) =>
        `${e.eventId},${e.machine},${e.assetId},${e.txAmount},${e.amount},${e.fullHash},${e.settlement},${e.timestamp}`
      ))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "medimint-yield-history.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const downloadStatement = () => {
    const lines = [
      "MEDIMINT INVESTOR STATEMENT",
      "============================",
      `Investor: ${user.fullName}`,
      `Wallet:   ${user.wallet}`,
      `Date:     ${new Date().toLocaleDateString()}`,
      "",
      "PORTFOLIO",
      `  Total MDMT:        ${portfolio.totalTokens.toLocaleString()}`,
      `  Lifetime Yield:    ${portfolio.yieldLifetime.toLocaleString()} MDMT`,
      `  Active Assets:     ${portfolio.activeAssets}`,
      "",
      "ASSET BUCKETS",
      ...assetBuckets.map((b) =>
        `  ${b.name} · ${b.machineIds.length} machines · ${b.myTokens.toLocaleString()} MDMT · lifetime ${b.lifetimeYield.toFixed(2)} MDMT`
      ),
      "",
      "NETWORK SNAPSHOT (today)",
      `  Transactions:      ${sim.todayTx.toLocaleString()}`,
      `  Revenue (AED):     ${sim.todayRevenueAED.toLocaleString()}`,
      `  Yield Distributed: ${sim.todayYieldMDMT.toFixed(2)} MDMT`,
      "",
      "All yield events are anchored on-chain and independently verifiable.",
    ].join("\n");
    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "medimint-investor-statement.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell title="Transparency Hub" subtitle="Verify everything on-chain" back wide>
      <div className="bg-gradient-hero shadow-glow mt-4 rounded-3xl border border-white/10 p-5">
        <span className="bg-success/20 text-success inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium">
          <BadgeCheck size={11} /> Blockchain Verified
        </span>
        <p className="font-display mt-3 text-xl font-semibold">Live audit trail</p>
        <p className="text-muted-foreground mt-1 text-xs">
          Every yield event, ownership record and machine metric is anchored on-chain and independently verifiable.
        </p>
        <div className="mt-4 grid grid-cols-4 gap-2">
          <Stat label="Events" live={<AnimatedNumber value={combined.length} decimals={0} locale />} />
          <Stat label="Machines" value={String(machines.length)} />
          <Stat label="Assets" value={String(assetIds.length)} />
          <Stat label="Buckets" value={String(assetBuckets.length)} />
        </div>
      </div>

      {/* HASH EXPLORER */}
      <SectionTitle icon={<Search size={11} />}>Blockchain Hash Explorer</SectionTitle>
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
            <div key={e.eventId} className="bg-gradient-card flex items-center gap-3 rounded-2xl border border-white/10 p-3">
              <span className="bg-gradient-brand grid h-9 w-9 place-items-center rounded-xl">
                <Sparkles size={14} className="text-white" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs">{e.machine}</p>
                  <p className="text-success text-xs font-semibold">+{e.amount.toFixed(3)}</p>
                </div>
                <p className="text-muted-foreground text-[10px]">{e.assetId} · AED {e.txAmount.toFixed(0)}</p>
                <div className="mt-1"><HashChip hash={e.hash} full={e.fullHash} /></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* OWNERSHIP RECORDS */}
      <SectionTitle icon={<Wallet size={11} />}>Asset Ownership Records</SectionTitle>
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
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {assetBuckets.map((b) => (
            <Link key={b.id} to="/assets/buckets/$bucketId" params={{ bucketId: b.id }} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] font-medium">{b.name}</p>
              <p className="text-muted-foreground text-[10px]">{b.myTokens.toLocaleString()} MDMT</p>
              <p className="text-success mt-1 text-[10px]">+{b.lifetimeYield.toFixed(1)} lifetime</p>
            </Link>
          ))}
        </div>
      </div>

      {/* MACHINE REGISTRY */}
      <SectionTitle icon={<Building2 size={11} />}>Machine Registry</SectionTitle>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {machines.map((m) => (
          <Link key={m.id} to="/assets/machines/$machineId" params={{ machineId: m.id }} className="bg-gradient-card flex items-center gap-3 rounded-2xl border border-white/10 p-3">
            <span className="bg-gradient-brand-soft grid h-9 w-9 place-items-center rounded-xl"><Cpu size={14} /></span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-sm">{m.id}</p>
                <span className="text-success text-[10px]">{m.status}</span>
              </div>
              <p className="text-muted-foreground truncate text-[11px]">
                {m.manufacturer} · {m.serial} · since {m.commissioned}
              </p>
            </div>
            <ShieldCheck size={14} className="text-success shrink-0" />
          </Link>
        ))}
      </div>

      {/* YIELD AUDIT TRAIL */}
      <SectionTitle icon={<Receipt size={11} />}>Yield Distribution History</SectionTitle>
      <div className="space-y-2">
        {sim.feed.slice(0, 6).map((e) => (
          <div key={e.id} className="bg-gradient-card rounded-2xl border border-white/10 p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">{new Date(e.ts).toLocaleString()}</p>
              <p className="text-success text-xs font-semibold">+{e.yieldMDMT.toFixed(3)}</p>
            </div>
            <p className="text-muted-foreground mt-0.5 text-[11px]">
              {e.machineId} · {e.assetId} · AED {e.revenueAED.toFixed(0)}
            </p>
            <p className="text-muted-foreground mt-0.5 break-all font-mono text-[10px]">{e.fullHash}</p>
          </div>
        ))}
      </div>

      {/* REVENUE DISTRIBUTION */}
      <SectionTitle icon={<FileText size={11} />}>Revenue Distribution (today)</SectionTitle>
      <div className="bg-gradient-card grid grid-cols-3 gap-2 rounded-2xl border border-white/10 p-4">
        <Stat label="Transactions" live={<AnimatedNumber value={sim.todayTx} decimals={0} locale />} />
        <Stat label="Revenue (AED)" live={<AnimatedNumber value={sim.todayRevenueAED} decimals={0} locale />} />
        <Stat label="Yield (MDMT)" live={<AnimatedNumber value={sim.todayYieldMDMT} decimals={1} locale />} accent />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button onClick={downloadStatement} className="bg-gradient-card flex items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-sm font-semibold">
          <Download size={14} /> Investor Statement
        </button>
        <button onClick={downloadCsv} className="bg-gradient-brand shadow-glow flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white">
          <Download size={14} /> Export Transactions (CSV)
        </button>
      </div>
    </AppShell>
  );
}

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground mt-5 mb-2 flex items-center gap-1 text-[11px] uppercase tracking-wide">
      {icon} {children}
    </p>
  );
}

function Stat({
  label, value, live, accent,
}: { label: string; value?: string; live?: React.ReactNode; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
      <p className="text-muted-foreground text-[10px] uppercase">{label}</p>
      <p className={`font-display mt-1 text-base font-semibold tabular-nums ${accent ? "text-gradient-brand" : ""}`}>
        {live ?? value}
      </p>
    </div>
  );
}
