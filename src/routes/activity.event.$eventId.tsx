import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HashChip } from "@/components/HashChip";
import { findEvent } from "@/lib/mockData";
import { Sparkles, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/activity/event/$eventId")({
  head: ({ params }) => ({
    meta: [{ title: `Event ${params.eventId} — Medimint` }],
  }),
  loader: ({ params }) => {
    const event = findEvent(params.eventId);
    if (!event) throw notFound();
    return { event };
  },
  component: EventDetail,
  errorComponent: ({ error }) => <div className="p-8 text-sm">{error.message}</div>,
  notFoundComponent: () => (
    <AppShell title="Event not found" back>
      <p className="text-muted-foreground mt-6 text-sm">Event isn't available.</p>
    </AppShell>
  ),
});

function EventDetail() {
  const { event } = Route.useLoaderData();
  const settleClass =
    event.settlement === "Settled" ? "bg-success/15 text-success" :
    event.settlement === "Pending" ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary";

  return (
    <AppShell title="Yield Event" subtitle={event.eventId} back>
      <div className="bg-gradient-hero shadow-glow mt-4 rounded-3xl border border-white/10 p-5 text-center">
        <span className="bg-gradient-brand mx-auto grid h-14 w-14 place-items-center rounded-2xl">
          <Sparkles size={22} className="text-white" />
        </span>
        <p className="font-display mt-3 text-3xl font-semibold">+{event.amount.toFixed(3)} MDMT</p>
        <p className="text-muted-foreground mt-1 text-xs">{event.timestamp}</p>
        <span className={`mt-3 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium ${settleClass}`}>
          {event.settlement}
        </span>
      </div>

      <div className="mt-5 space-y-2">
        <Row label="Event ID" value={event.eventId} mono />
        <Row label="Machine" value={event.machine} mono link={`/assets/machines/${event.machine}`} />
        <Row label="Asset ID" value={event.assetId} mono link={`/assets/ids/${event.assetId}`} />
        <Row label="Settlement Status" value={event.settlement} />
        <Row label="Patient Tx Amount" value={`${event.txAmount} tx`} />
        <div className="bg-gradient-card rounded-2xl border border-white/10 p-4">
          <p className="text-muted-foreground text-[10px] uppercase tracking-wide">Blockchain Hash</p>
          <p className="mt-1.5 break-all font-mono text-xs">{event.fullHash}</p>
          <div className="mt-3"><HashChip hash={event.hash} full={event.fullHash} /></div>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value, mono, link }: { label: string; value: string; mono?: boolean; link?: string }) {
  const inner = (
    <div className="bg-gradient-card flex items-center justify-between rounded-2xl border border-white/10 p-4">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className={`text-sm font-medium ${mono ? "font-mono" : ""}`}>{value}</span>
      {link && <ChevronRight size={14} className="text-muted-foreground ml-2" />}
    </div>
  );
  return link ? <a href={link}>{inner}</a> : inner;
}
