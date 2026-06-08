import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { HashChip } from "@/components/HashChip";
import { notifications as seed, type Notification, type NotifType } from "@/lib/mockData";
import { useLiveYield } from "@/lib/liveYield";
import { Sparkles, Coins, ShoppingBag, TrendingUp, Bell, Search, CheckCheck, Settings as SettingsIcon, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [{ title: "Notifications — Medimint" }],
  }),
  component: NotificationsPage,
});

const CATS: { key: NotifType | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "yield", label: "Yield" },
  { key: "stake", label: "Staking" },
  { key: "reward", label: "Rewards" },
  { key: "market", label: "Market" },
  { key: "appr", label: "Assets" },
];

function NotificationsPage() {
  const [list, setList] = useState<Notification[]>(seed);
  const [readIds, setReadIds] = useState<Set<number>>(new Set());
  const [cat, setCat] = useState<NotifType | "all">("all");
  const [q, setQ] = useState("");
  const live = useLiveYield();

  const combined = useMemo(() => {
    const liveItems = live.liveNotifications.map((n) => ({ ...n, read: readIds.has(n.id) }));
    return [...liveItems, ...list];
  }, [live.liveNotifications, list, readIds]);

  const filtered = useMemo(() => {
    return combined
      .filter((n) => cat === "all" || n.type === cat)
      .filter((n) => !q || (n.title + n.desc).toLowerCase().includes(q.toLowerCase()));
  }, [combined, cat, q]);

  const markAll = () => {
    setList(list.map((n) => ({ ...n, read: true })));
    setReadIds(new Set(live.liveNotifications.map((n) => n.id)));
  };
  const markOne = (id: number) => {
    setList(list.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setReadIds((prev) => new Set(prev).add(id));
  };

  return (
    <AppShell
      title="Notifications"
      subtitle={`${combined.filter((n) => !n.read).length} unread`}
      back
      right={
        <Link to="/settings" className="bg-card/60 grid h-10 w-10 place-items-center rounded-full border border-white/10">
          <SettingsIcon size={16} />
        </Link>
      }
    >
      <div className="bg-card/60 mt-4 flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2.5">
        <Search size={14} className="text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search notifications…"
          className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        {CATS.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`shrink-0 rounded-full border px-3 py-1 text-[11px] transition-colors ${
              cat === c.key ? "bg-gradient-brand border-transparent text-white" : "border-white/10 text-muted-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-muted-foreground text-[11px]">{filtered.length} items</p>
        <button onClick={markAll} className="text-primary inline-flex items-center gap-1 text-[11px]">
          <CheckCheck size={12} /> Mark all read
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {filtered.length === 0 && <p className="text-muted-foreground mt-6 text-center text-xs">Nothing here yet.</p>}
        {filtered.map((n) => {
          const Icon =
            n.type === "yield" ? Sparkles :
            n.type === "stake" ? Coins :
            n.type === "market" ? ShoppingBag :
            n.type === "appr" ? TrendingUp : Bell;
          const body = (
            <div className={`bg-gradient-card flex gap-3 rounded-2xl border p-3 ${n.read ? "border-white/10 opacity-80" : "border-primary/30"}`}>
              <span className="bg-gradient-brand-soft relative grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                <Icon size={16} />
                {!n.read && <span className="bg-primary absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full" />}
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
          return (
            <div key={n.id} onClick={() => markOne(n.id)}>
              {n.link ? <Link to={n.link}>{body}</Link> : body}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
