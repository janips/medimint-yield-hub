import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { HashChip } from "@/components/HashChip";
import { yieldEvents, dailyTotals, notifications, machines } from "@/lib/mockData";
import { Sparkles, Coins, ShoppingBag, TrendingUp, Bell, ChevronDown, ChevronRight, Filter } from "lucide-react";

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "Activity — Medimint" },
      { name: "description", content: "Yield events, daily transactions and notifications with full hash traceability." },
    ],
  }),
  component: ActivityPage,
});

type Tab = "yield" | "daily" | "notif";
type SortKey = "recent" | "highest";

function ActivityPage() {
  const [tab, setTab] = useState<Tab>("yield");
  const [machineFilter, setMachineFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("recent");
  const [openDay, setOpenDay] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...yieldEvents];
    if (machineFilter !== "all") list = list.filter((e) => e.machine === machineFilter);
    if (sort === "highest") list.sort((a, b) => b.amount - a.amount);
    return list;
  }, [machineFilter, sort]);

  return (
    <AppShell title="Activity" subtitle="Transparent yield · hash-verified">
      <div className="bg-secondary/60 mt-4 inline-flex w-full rounded-full p-1 text-xs">
        {([
          ["yield", "Yield Events"],
          ["daily", "Daily"],
          ["notif", "Inbox"],
        ] as [Tab, string][]).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-full px-3 py-2 transition-all ${
              tab === t ? "bg-gradient-brand text-white" : "text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "yield" && (
        <>
          <div className="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto pb-1">
            <Filter size={12} className="text-muted-foreground shrink-0" />
            <Chip active={machineFilter === "all"} onClick={() => setMachineFilter("all")}>All machines</Chip>
            {machines.map((m) => (
              <Chip key={m.id} active={machineFilter === m.id} onClick={() => setMachineFilter(m.id)}>{m.id}</Chip>
            ))}
            <Chip active={sort === "highest"} onClick={() => setSort(sort === "highest" ? "recent" : "highest")}>Highest yield</Chip>
          </div>

          <div className="mt-3 space-y-2">
            {filtered.map((e) => (
              <Link
                key={e.eventId}
                to="/activity/event/$eventId"
                params={{ eventId: e.eventId }}
                className="bg-gradient-card block rounded-2xl border border-white/10 p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-gradient-brand grid h-9 w-9 place-items-center rounded-xl">
                    <Sparkles size={15} className="text-white" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm font-semibold">{e.machine}</p>
                      <p className="text-success text-sm font-semibold">+{e.amount.toFixed(3)} MDMT</p>
                    </div>
                    <div className="text-muted-foreground mt-0.5 flex items-center gap-2 text-[11px]">
                      <span>{e.timestamp}</span>
                      <HashChip hash={e.hash} full={e.fullHash} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {tab === "daily" && (
        <div className="mt-5 space-y-2">
          {dailyTotals.map((d) => {
            const open = openDay === d.date;
            return (
              <div key={d.date} className="bg-gradient-card rounded-2xl border border-white/10">
                <button onClick={() => setOpenDay(open ? null : d.date)} className="flex w-full items-center justify-between p-4">
                  <div className="text-left">
                    <p className="text-sm font-medium">{d.date}</p>
                    <p className="text-muted-foreground text-[11px]">{d.tx} transactions</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-display text-base font-semibold">+{d.yield}</p>
                      <p className="text-muted-foreground text-[10px]">MDMT</p>
                    </div>
                    <ChevronDown size={14} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                  </div>
                </button>
                {open && (
                  <div className="border-t border-white/10 p-4 pt-3 space-y-2">
                    {d.breakdown.map((b) => (
                      <div key={b.m} className="flex items-center justify-between text-xs">
                        <span className="font-mono">{b.m}</span>
                        <span className="text-muted-foreground">{b.tx} tx</span>
                        <span className="text-success font-semibold">+{b.y.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === "notif" && (
        <div className="mt-5 space-y-2">
          {notifications.map((n) => {
            const Icon =
              n.type === "yield" ? Sparkles :
              n.type === "stake" ? Coins :
              n.type === "market" ? ShoppingBag :
              n.type === "appr" ? TrendingUp : Bell;
            const content = (
              <div className="bg-gradient-card flex gap-3 rounded-2xl border border-white/10 p-3">
                <span className="bg-gradient-brand-soft grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                  <Icon size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{n.title}</p>
                    <span className="text-muted-foreground text-[10px]">{n.time}</span>
                  </div>
                  <p className="text-muted-foreground truncate text-xs">{n.desc}</p>
                  {n.hash && <div className="mt-1"><HashChip hash={n.hash} /></div>}
                </div>
                <ChevronRight size={14} className="text-muted-foreground self-center" />
              </div>
            );
            return n.link ? <Link key={n.id} to={n.link}>{content}</Link> : <div key={n.id}>{content}</div>;
          })}
        </div>
      )}
    </AppShell>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3 py-1 text-[11px] transition-colors ${
        active ? "bg-gradient-brand border-transparent text-white" : "border-white/10 text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}
