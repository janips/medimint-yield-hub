import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AreaChart } from "@/components/AreaChart";
import { HashChip } from "@/components/HashChip";
import { findAsset, eventsForAsset, findMachine } from "@/lib/mockData";
import { Layers, ChevronRight, Sparkles, ShieldCheck } from "lucide-react";

function loadAsset({ params }: { params: { assetId: string } }) {
  const asset = findAsset(params.assetId);
  if (!asset) throw notFound();
  return { asset };
}

export const Route = createFileRoute("/assets/ids/$assetId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.assetId} — Medimint` },
      { name: "description", content: `Token allocation, yield history, and blockchain log for ${params.assetId}.` },
    ],
  }),
  loader: loadAsset,
  component: AssetDetailPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return <div className="p-8 text-center"><p className="text-sm">Failed: {error.message}</p><button onClick={() => { router.invalidate(); reset(); }} className="text-primary text-xs">Retry</button></div>;
  },
  notFoundComponent: () => (
    <AppShell title="Asset not found" back>
      <p className="text-muted-foreground mt-6 text-sm">This asset isn't in your portfolio.</p>
      <Link to="/assets" className="text-primary mt-3 inline-block text-xs">← Back to assets</Link>
    </AppShell>
  ),
});

function AssetDetailPage() {
  const { asset } = Route.useLoaderData();
  const events = eventsForAsset(asset.id);
  const machine = findMachine(asset.machineId);
  const monthLabels = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];

  return (
    <AppShell title={asset.id} subtitle="Asset ID" back>
      <div className="bg-gradient-hero shadow-glow mt-4 rounded-3xl border border-white/10 p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-gradient-brand-soft grid h-12 w-12 place-items-center rounded-xl">
              <Layers size={20} />
            </span>
            <div>
              <p className="font-mono text-base font-semibold">{asset.id}</p>
              <p className="text-muted-foreground text-[11px]">Fractional ownership</p>
            </div>
          </div>
          <span className="text-success bg-success/15 rounded-full px-2 py-0.5 text-[10px]">{asset.ratePct}% APY</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Mini label="Allocated Tokens" value={asset.tokens.toLocaleString()} />
          <Mini label="Lifetime Yield" value={`${asset.earned.toFixed(1)} MDMT`} accent />
        </div>
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Machine Mapping</p>
      {machine && (
        <Link to="/assets/machines/$machineId" params={{ machineId: machine.id }} className="bg-gradient-card flex items-center justify-between rounded-2xl border border-white/10 p-4">
          <div>
            <p className="font-mono text-sm font-semibold">{machine.id}</p>
            <p className="text-muted-foreground text-[11px]">{machine.type} · {machine.location}</p>
          </div>
          <ChevronRight size={14} className="text-muted-foreground" />
        </Link>
      )}

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Yield History</p>
      <div className="bg-gradient-card rounded-3xl border border-white/10 p-4">
        <AreaChart data={asset.yieldHistory} labels={monthLabels} />
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Event Timeline · Hash Log</p>
      <div className="space-y-2">
        {events.length === 0 && <p className="text-muted-foreground text-xs">No events yet.</p>}
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
          <p className="text-sm font-medium">Verify Ownership On-Chain</p>
          <p className="text-muted-foreground text-[11px]">Open transparency hub</p>
        </div>
        <ChevronRight size={14} className="text-muted-foreground" />
      </Link>
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
