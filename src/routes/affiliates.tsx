import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users, ChevronRight, ChevronDown, Copy, Check, Share2, Coins,
  TrendingUp, Layers, Percent, UserPlus,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { HashChip } from "@/components/HashChip";
import {
  affiliateTree, commissionTiers, commissionLedger, networkStats,
  referralCode, referralLink, referralSteps, type Referral,
} from "@/lib/affiliate";

export const Route = createFileRoute("/affiliates")({
  head: () => ({
    meta: [
      { title: "Affiliate Network — Medimint" },
      {
        name: "description",
        content:
          "Track your Medimint referral tree, multi-level commission rates and affiliate earnings across every level of your network.",
      },
      { property: "og:title", content: "Affiliate Network — Medimint" },
      {
        property: "og:description",
        content: "Multi-level referral tree, commission structure and payout history for Medimint investors.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AffiliatesPage,
});

function AffiliatesPage() {
  const stats = networkStats(affiliateTree);

  return (
    <AppShell title="Affiliate Network" subtitle="Grow the network · Earn on every level" wide>
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Stat icon={<UserPlus size={14} />} label="Direct referrals" value={String(stats.directReferrals)} />
            <Stat icon={<Users size={14} />} label="Network members" value={String(stats.totalMembers)} />
            <Stat
              icon={<Coins size={14} />}
              label="Network staked"
              value={`${stats.networkStaked.toLocaleString()} MDMT`}
            />
            <Stat
              icon={<TrendingUp size={14} />}
              label="Lifetime commission"
              value={`${stats.lifetimeCommission.toLocaleString()} MDMT`}
              accent
            />
          </div>

          <section className="bg-card/50 rounded-3xl border border-white/10 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Referral tree</h2>
                <p className="text-muted-foreground text-xs">
                  {stats.deepestLevel} levels deep · {stats.activeMembers} active
                </p>
              </div>
              <Layers size={16} className="text-muted-foreground" />
            </div>

            <div className="mb-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="bg-gradient-brand grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white">
                {initials(affiliateTree.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{affiliateTree.name} · You</p>
                <p className="text-muted-foreground text-[11px]">
                  {affiliateTree.id} · {affiliateTree.stakedMdmt.toLocaleString()} MDMT staked
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              {affiliateTree.children.map((child) => (
                <TreeNode key={child.id} node={child} level={1} />
              ))}
            </div>
          </section>

          <section className="bg-card/50 rounded-3xl border border-white/10 p-5">
            <h2 className="mb-1 text-sm font-semibold">Commission payouts</h2>
            <p className="text-muted-foreground mb-4 text-xs">Every payout is anchored to a verifiable hash.</p>
            <div className="space-y-2">
              {commissionLedger.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">{row.from}</p>
                    <p className="text-muted-foreground text-[10px]">
                      Level {row.level} · {row.date} · {row.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <HashChip hash={`${row.hash.slice(0, 10)}…`} full={row.hash} />
                    <span className="text-success text-xs font-semibold">+{row.amount.toFixed(2)} MDMT</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <CommissionPanel />
          <SharePanel />
          <section className="bg-card/50 rounded-3xl border border-white/10 p-5">
            <h2 className="mb-3 text-sm font-semibold">How referral rewards work</h2>
            <ol className="space-y-3">
              {referralSteps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="bg-gradient-brand grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-medium">{s.title}</p>
                    <p className="text-muted-foreground text-[11px]">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}

function TreeNode({ node, level }: { node: Referral; level: number }) {
  const [open, setOpen] = useState(level < 2);
  const hasChildren = node.children.length > 0;

  return (
    <div>
      <div
        className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5"
        style={{ marginLeft: `${(level - 1) * 16}px` }}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          disabled={!hasChildren}
          aria-label={hasChildren ? (open ? "Collapse" : "Expand") : "No referrals"}
          className="text-muted-foreground hover:text-foreground grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-white/10 disabled:opacity-25"
        >
          {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>
        <div className="bg-card grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-[10px] font-semibold">
          {initials(node.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium">{node.name}</p>
          <p className="text-muted-foreground truncate text-[10px]">
            L{level} · {node.id} · joined {node.joined}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-semibold">{node.stakedMdmt.toLocaleString()} MDMT</p>
          <p className={`text-[10px] ${node.status === "active" ? "text-success" : "text-warning"}`}>
            {node.status === "active" ? `+${node.commissionMdmt.toLocaleString()} earned` : "Pending"}
          </p>
        </div>
        <span className="text-muted-foreground hidden shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] sm:inline">
          {node.children.length} ref
        </span>
      </div>
      {hasChildren && open && (
        <div className="mt-1.5 space-y-1.5">
          {node.children.map((c) => (
            <TreeNode key={c.id} node={c} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function CommissionPanel() {
  const [open, setOpen] = useState(true);
  return (
    <section className="bg-gradient-hero overflow-hidden rounded-3xl border border-white/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="flex items-center gap-2">
          <Percent size={14} />
          <span className="text-sm font-semibold">Commission structure</span>
        </span>
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-white/5">
                <tr className="text-muted-foreground text-[10px] uppercase">
                  <th className="px-3 py-2 font-medium">Level</th>
                  <th className="px-3 py-2 font-medium">Type</th>
                  <th className="px-3 py-2 text-right font-medium">Rate</th>
                </tr>
              </thead>
              <tbody>
                {commissionTiers.map((t) => (
                  <tr key={t.level} className="border-t border-white/5">
                    <td className="px-3 py-2.5 text-xs font-medium">{t.level}</td>
                    <td className="text-muted-foreground px-3 py-2.5 text-[11px]">{t.label}</td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="bg-gradient-brand rounded-full px-2 py-0.5 text-[11px] font-bold text-white">
                        {t.rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-3 text-[11px]">
            Commission is paid in MDMT from the yield your network generates, credited at every distribution.
          </p>
        </div>
      )}
    </section>
  );
}

function SharePanel() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section className="bg-card/50 rounded-3xl border border-white/10 p-5">
      <h2 className="mb-1 text-sm font-semibold">Invite investors</h2>
      <p className="text-muted-foreground mb-3 text-xs">Share your code and earn from every level below you.</p>
      <div className="mb-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
        <p className="text-muted-foreground text-[10px] uppercase">Your code</p>
        <p className="font-mono text-sm font-semibold">{referralCode}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={copy}
          className="bg-gradient-brand flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-white"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Link copied" : "Copy invite link"}
        </button>
        <button
          onClick={copy}
          aria-label="Share referral link"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5"
        >
          <Share2 size={14} />
        </button>
      </div>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl border border-white/10 p-3.5 ${accent ? "bg-gradient-brand-soft" : "bg-card/50"}`}>
      <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] uppercase">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <p className="font-display mt-1.5 truncate text-lg font-semibold">{value}</p>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}
