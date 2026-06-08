import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { yieldEvents, dailyTotals, notifications } from "@/lib/mockData";
import { Sparkles, Hash, Coins, ShoppingBag, TrendingUp, Bell } from "lucide-react";

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

function ActivityPage() {
  const [tab, setTab] = useState<Tab>("yield");
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
        <div className="mt-5 space-y-2">
          {yieldEvents.map((e, i) => (
            <div key={i} className="bg-gradient-card rounded-2xl border border-white/10 p-3">
              <div className="flex items-center gap-3">
                <span className="bg-gradient-brand grid h-9 w-9 place-items-center rounded-xl">
                  <Sparkles size={15} className="text-white" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm font-semibold">{e.machine}</p>
                    <p className="text-success text-sm font-semibold">+{e.amount.toFixed(3)} MDMT</p>
                  </div>
                  <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-[11px]">
                    <span>Today · {e.time}</span>
                    <span>·</span>
                    <Hash size={10} />
                    <span className="font-mono">{e.hash}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "daily" && (
        <div className="mt-5 space-y-2">
          {dailyTotals.map((d) => (
            <div key={d.date} className="bg-gradient-card flex items-center justify-between rounded-2xl border border-white/10 p-4">
              <div>
                <p className="text-sm font-medium">{d.date}</p>
                <p className="text-muted-foreground text-[11px]">{d.tx} transactions</p>
              </div>
              <div className="text-right">
                <p className="font-display text-base font-semibold">+{d.yield}</p>
                <p className="text-muted-foreground text-[10px]">MDMT</p>
              </div>
            </div>
          ))}
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
            return (
              <div key={n.id} className="bg-gradient-card flex gap-3 rounded-2xl border border-white/10 p-3">
                <span className="bg-gradient-brand-soft grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                  <Icon size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{n.title}</p>
                    <span className="text-muted-foreground text-[10px]">{n.time}</span>
                  </div>
                  <p className="text-muted-foreground truncate text-xs">{n.desc}</p>
                  {n.hash && (
                    <p className="text-muted-foreground mt-1 flex items-center gap-1 font-mono text-[10px]">
                      <Hash size={9} /> {n.hash}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
