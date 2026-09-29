import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users, ChevronRight, ChevronDown, Copy, Check, Share2, Coins,
  TrendingUp, Layers, Percent, UserPlus, Crown,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { HashChip } from "@/components/HashChip";
import { Button } from "@/components/ui/button";
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

          <section className="bg-card/50 overflow-hidden rounded-3xl border border-white/10 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Referral tree</h2>
                <p className="text-muted-foreground text-xs">
                  {stats.deepestLevel} levels deep · {stats.activeMembers} active
                </p>
              </div>
              <Layers size={16} className="text-muted-foreground" />
            </div>

            <ReferralTree root={affiliateTree} />
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

function ReferralTree({ root }: { root: Referral }) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    setCollapsed((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const [vicky, tony, ramesh] = root.children;
  if (!vicky || !tony || !ramesh) return null;
  const vickyChildren = collapsed.has(vicky.id) ? [] : vicky.children;
  const tonyChildren = collapsed.has(tony.id) ? [] : tony.children;
  const neha = vicky.children[0];
  const levelThree = neha && !collapsed.has(vicky.id) && !collapsed.has(neha.id) ? neha.children : [];

  return (
    <div className="no-scrollbar overflow-x-auto pb-2">
      <div className="mx-auto min-w-[720px]">
        <div className="flex flex-col items-center pt-3">
          <div className="relative">
            <Crown className="text-warning absolute -top-5 left-1/2 -translate-x-1/2" size={20} />
            <div className="bg-gradient-brand grid h-16 w-16 place-items-center rounded-full border-4 border-card text-base font-bold text-primary-foreground shadow-glow">
              {initials(root.name)}
            </div>
          </div>
          <p className="mt-2 text-sm font-semibold">{root.name} · You</p>
          <p className="text-muted-foreground text-[10px]">Level 0 · {root.stakedMdmt.toLocaleString()} MDMT staked</p>
          <div className="bg-success/60 mt-2 h-5 w-px" />
          <div className="bg-success/60 h-px w-[66%]" />
        </div>

        <LevelBand label="Level 1" detail="Direct referrals" tone="success">
          {[vicky, tony, ramesh].map((node) => (
            <div key={node.id} className="relative flex justify-center before:absolute before:-top-4 before:h-4 before:w-px before:bg-success/60">
              <MemberNode node={node} level={1} collapsed={collapsed.has(node.id)} onToggle={() => toggle(node.id)} />
            </div>
          ))}
        </LevelBand>

        <div className="grid grid-cols-3 px-24">
          {[vicky, tony, ramesh].map((node) => (
            <div key={node.id} className={`mx-auto h-5 w-px ${collapsed.has(node.id) || !node.children.length ? "bg-transparent" : "bg-primary/60"}`} />
          ))}
        </div>
        <LevelBand label="Level 2" detail="Extended network" tone="primary">
          <div className="grid grid-cols-2 gap-2">
            {vickyChildren.map((node) => <MemberNode key={node.id} node={node} level={2} collapsed={collapsed.has(node.id)} onToggle={() => toggle(node.id)} compact />)}
            {!vickyChildren.length && <EmptyBranch label={collapsed.has(vicky.id) ? "Branch collapsed" : "No referrals"} />}
          </div>
          <div className="flex justify-center">
            {tonyChildren.map((node) => <MemberNode key={node.id} node={node} level={2} collapsed={collapsed.has(node.id)} onToggle={() => toggle(node.id)} compact />)}
            {!tonyChildren.length && <EmptyBranch label={collapsed.has(tony.id) ? "Branch collapsed" : "No referrals"} />}
          </div>
          <EmptyBranch label="No referrals yet" />
        </LevelBand>

        {levelThree.length > 0 && (
          <>
            <div className="ml-[25%] h-5 w-px bg-accent/60" />
            <LevelBand label="Level 3" detail="Third generation" tone="accent">
              <div className="col-span-3 flex justify-start pl-[12%]">
                {levelThree.map((node) => <MemberNode key={node.id} node={node} level={3} compact />)}
              </div>
            </LevelBand>
          </>
        )}
      </div>
    </div>
  );
}

function LevelBand({ label, detail, tone, children }: { label: string; detail: string; tone: "success" | "primary" | "accent"; children: React.ReactNode }) {
  const toneClass = tone === "success" ? "border-success/20 bg-success/5 text-success" : tone === "primary" ? "border-primary/20 bg-primary/5 text-primary" : "border-accent/20 bg-accent/5 text-accent";
  return (
    <div className={`grid grid-cols-[104px_1fr] items-center rounded-2xl border p-3 ${toneClass}`}>
      <div>
        <p className="text-xs font-bold">{label}</p>
        <p className="text-muted-foreground text-[9px]">{detail}</p>
      </div>
      <div className="grid grid-cols-3 items-start gap-4 text-foreground">{children}</div>
    </div>
  );
}

function MemberNode({ node, level, collapsed = false, onToggle, compact = false }: { node: Referral; level: number; collapsed?: boolean; onToggle?: () => void; compact?: boolean }) {
  const hasChildren = node.children.length > 0;
  return (
    <div className="group min-w-0 text-center">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={!hasChildren}
        onClick={onToggle}
        aria-label={hasChildren ? `${collapsed ? "Expand" : "Collapse"} ${node.name}'s referrals` : `${node.name} has no referrals`}
        className={`${compact ? "h-10 w-10" : "h-12 w-12"} relative mx-auto rounded-full border border-border bg-card p-0 shadow-card hover:border-primary/50 hover:bg-muted disabled:opacity-100`}
      >
        <span className="text-[10px] font-bold">{initials(node.name)}</span>
        {hasChildren && (
          <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full border border-border bg-background text-muted-foreground">
            {collapsed ? <ChevronRight size={9} /> : <ChevronDown size={9} />}
          </span>
        )}
      </Button>
      <p className="mt-1 truncate text-[10px] font-semibold">{node.name}</p>
      <p className="text-muted-foreground text-[9px]">L{level} · {node.stakedMdmt.toLocaleString()} MDMT</p>
      <p className={`text-[9px] ${node.status === "active" ? "text-success" : "text-warning"}`}>
        {node.status === "active" ? `+${node.commissionMdmt.toLocaleString()} earned` : "Pending"}
      </p>
    </div>
  );
}

function EmptyBranch({ label }: { label: string }) {
  return <div className="text-muted-foreground flex min-h-16 items-center justify-center text-[9px]">{label}</div>;
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
