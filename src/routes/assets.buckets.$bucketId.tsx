import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { RangeChart } from "@/components/RangeChart";
import { LiveActivityFeed } from "@/components/LiveActivityFeed";
import { findBucket, machines, fmtMdmt } from "@/lib/mockData";
import { useSim, machinesInBucket, type BucketKey } from "@/lib/simEngine";
import { Cpu, Activity, ChevronRight, Layers, TrendingUp } from "lucide-react";
function loadBucket({ params }: { params: { bucketId: string } }) {
  const bucket = findBucket(params.bucketId);
  if (!bucket) throw notFound();
  return { bucket };
}

export const Route = createFileRoute("/assets/buckets/$bucketId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.bucketId.toUpperCase()} — Asset Bucket — Medimint` },
      { name: "description", content: "Drill into the machines, transactions and yield inside this Asset Bucket." },
    ],
  }),
  loader: loadBucket,
  component: BucketPage,
  notFoundComponent: () => (
    <AppShell title="Bucket not found" back>
      <p className="text-muted-foreground mt-6 text-sm">This bucket doesn't exist.</p>
      <Link to="/assets" className="text-primary mt-3 inline-block text-xs">← Back to assets</Link>
    </AppShell>
  ),
});

function BucketPage() {
  const { bucket } = Route.useLoaderData();
  const s = useSim();

  // What share of the platform engine yield belongs to this bucket?
  const simMachines = machinesInBucket(bucket.id as BucketKey);
  const txInBucket = s.feed.filter((t) => t.bucketId === bucket.id);
  const sessionTxRevenue = txInBucket.reduce((a, t) => a + t.revenueAED, 0);
  const sessionYield = txInBucket.reduce((a, t) => a + t.yieldMDMT, 0);

  // Live totals add session deltas on top of seed snapshot
  const liveTxToday = bucket.txTodaySeed + txInBucket.length;
  const liveRevenueToday = bucket.revenueGeneratedAED + sessionTxRevenue;
  const liveYieldToday = bucket.yieldGeneratedMDMT + sessionYield;

  // Linked physical machine records (for richer detail)
  const machineRecords = machines.filter((m) => bucket.machineIds.includes(m.id));
  const topMachine = machines.find((m) => m.id === bucket.topMachineId);

  return (
    <AppShell title={bucket.name} subtitle={`${bucket.region} · ${bucket.country}`} back wide>
      <div className="bg-gradient-hero shadow-glow mt-4 rounded-3xl border border-white/10 p-5">
        <div className="flex items-center justify-between">
          <span className="bg-gradient-brand-soft inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium">
            <Layers size={11} /> {bucket.country} · Launched {bucket.launchDate}
          </span>
          <span className="bg-success/15 text-success rounded-full px-2 py-0.5 text-[10px] font-medium">
            ● {bucket.status} · {bucket.apyPct}% APY
          </span>
        </div>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{bucket.thesis}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Tile label="Total Machines" value={String(bucket.machineIds.length)} />
          <Tile label="Active Staking" value={String(bucket.activeStaking)} />
          <Tile label="Tx Today" live={<AnimatedNumber value={liveTxToday} decimals={0} locale />} />
          <Tile label="Tx This Month" value={bucket.txMonthSeed.toLocaleString()} />
          <Tile label="Revenue (AED)" live={<AnimatedNumber value={liveRevenueToday} decimals={0} locale />} />
          <Tile label="Yield (MDMT)" live={<AnimatedNumber value={liveYieldToday} decimals={1} locale />} accent />
          <Tile label="Utilization" value={`${bucket.utilizationPct}%`} />
          <Tile label="Top Machine" value={topMachine?.id ?? bucket.topMachineId} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Tile label="My MDMT" value={bucket.myTokens.toLocaleString()} />
          <Tile label="Lifetime Yield" value={fmtMdmt(bucket.lifetimeYield, 1)} accent />
          <Tile label="Region" value={bucket.region} />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-5">
        <div className="bg-gradient-card mt-4 rounded-3xl border border-white/10 p-5">
          <p className="text-muted-foreground text-[11px] uppercase tracking-wide">Live performance · today</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <Tile label="Tx (session)" value={String(txInBucket.length)} />
            <Tile
              label="Revenue (AED)"
              live={<AnimatedNumber value={txInBucket.reduce((a, t) => a + t.revenueAED, 0)} decimals={0} locale />}
            />
            <Tile
              label="Yield (MDMT)"
              live={<AnimatedNumber value={sessionYield} decimals={3} />}
              accent
            />
          </div>
        </div>
        <RangeChart initial="tx" />
      </div>

      <p className="text-muted-foreground mt-5 mb-2 flex items-center gap-1 text-[11px] uppercase tracking-wide">
        <Cpu size={11} /> Machines in this bucket
      </p>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {simMachines.map((sm) => {
          const rec = machineRecords.find((r) => r.id === sm.id);
          const machineTx = txInBucket.filter((t) => t.machineId === sm.id);
          const machineYield = machineTx.reduce((a, t) => a + t.yieldMDMT, 0);
          const inner = (
            <>
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="bg-gradient-brand-soft grid h-10 w-10 place-items-center rounded-xl">
                    <Cpu size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm font-semibold">{sm.id}</p>
                    <p className="text-muted-foreground truncate text-[11px]">
                      {sm.type}{rec?.launchDate ? ` · since ${rec.launchDate}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <Status status={sm.status} />
                  {rec?.badge && (
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                      rec.badge === "Top Performing" ? "bg-gradient-brand text-white" :
                      rec.badge === "New" ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                    }`}>{rec.badge}</span>
                  )}
                  {rec?.myStake && rec.myStake > 0 && (
                    <span className="bg-success/15 text-success rounded-full px-2 py-0.5 text-[9px] font-medium">Invested</span>
                  )}
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <Tile label="Tx Today" value={rec ? String(rec.txToday) : String(machineTx.length)} />
                <Tile label="Tx This Month" value={rec?.txMonth?.toLocaleString() ?? "—"} />
                <Tile label="APY" value={rec?.currentAPY ? `${rec.currentAPY}%` : "—"} accent />
                <Tile label="Total Staked" value={rec?.totalStaked ? `${(rec.totalStaked / 1000).toFixed(1)}k` : "—"} />
                <Tile label="Investors" value={rec?.numInvestors ? String(rec.numInvestors) : "—"} />
                <Tile label="Live Yield" value={`+${machineYield.toFixed(3)}`} accent />
              </div>
              <div className="text-primary mt-3 flex items-center justify-center gap-1 rounded-xl border border-primary/30 py-2 text-xs font-medium">
                {rec ? (rec.myStake && rec.myStake > 0 ? "Manage stake" : "Stake now") : "Coming soon"} <ChevronRight size={12} />
              </div>
            </>
          );
          return rec ? (
            <Link
              key={sm.id}
              to="/assets/machines/$machineId"
              params={{ machineId: sm.id }}
              className="bg-gradient-card block rounded-2xl border border-white/10 p-4"
            >
              {inner}
            </Link>
          ) : (
            <div
              key={sm.id}
              className="bg-gradient-card block rounded-2xl border border-white/10 p-4 opacity-90"
            >
              {inner}
            </div>
          );
        })}
      </div>


      <p className="text-muted-foreground mt-5 mb-2 flex items-center gap-1 text-[11px] uppercase tracking-wide">
        <TrendingUp size={11} /> Bucket activity
      </p>
      <LiveActivityFeed bare limit={6} />
    </AppShell>
  );
}

function Tile({
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

function Status({ status }: { status: "Active" | "Maintenance" | "Offline" }) {
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

