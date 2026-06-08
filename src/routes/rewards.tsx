import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { rewards, staking } from "@/lib/mockData";
import { Footprints, Flame, Coins, Flame as Streak, Check } from "lucide-react";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Rewards — Medimint" },
      { name: "description", content: "Earn MDMT from steps and calories. Track staking rewards and claim history." },
    ],
  }),
  component: RewardsPage,
});

function RewardsPage() {
  const [claimed, setClaimed] = useState(false);
  const pct = Math.min(100, (rewards.steps / rewards.stepsGoal) * 100);
  const C = 2 * Math.PI * 70;
  return (
    <AppShell title="Rewards" subtitle="Move · Earn · Stake">
      <div className="bg-gradient-hero shadow-glow relative mt-4 overflow-hidden rounded-3xl border border-white/10 p-5">
        <div className="flex items-center gap-5">
          <div className="relative">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="ring-g" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#FFB347" />
                  <stop offset="0.5" stopColor="#FF3D7F" />
                  <stop offset="1" stopColor="#B14BFF" />
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="70" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="10" />
              <circle
                cx="80" cy="80" r="70" fill="none" stroke="url(#ring-g)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={C - (C * pct) / 100}
                transform="rotate(-90 80 80)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-display text-2xl font-semibold">{rewards.steps.toLocaleString()}</p>
              <p className="text-muted-foreground text-[10px] uppercase">of {rewards.stepsGoal.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <Mini icon={<Footprints size={14} />} label="Steps" value={rewards.steps.toLocaleString()} />
            <Mini icon={<Flame size={14} />} label="Calories" value={`${rewards.calories} kcal`} />
            <Mini icon={<Coins size={14} />} label="Earned" value={`+${rewards.earnedToday} MDMT`} accent />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <Streak size={14} className="text-warning" />
            <span className="text-xs">{rewards.streak}-day streak</span>
          </div>
          <button
            onClick={() => setClaimed(true)}
            disabled={claimed}
            className="bg-gradient-brand rounded-full px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
          >
            {claimed ? <span className="inline-flex items-center gap-1"><Check size={11}/> Claimed</span> : `Claim ${rewards.earnedToday} MDMT`}
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Card title="Monthly Earned" value={`${rewards.monthlyMdmt} MDMT`} />
        <Card title="Weekly Streak" value={`${rewards.streak} days`} />
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Earning Rate</p>
      <div className="grid grid-cols-2 gap-3">
        <Card title="1,000 steps" value="0.25 MDMT" />
        <Card title="100 calories" value="0.18 MDMT" />
      </div>

      <p className="text-muted-foreground mt-6 mb-2 text-[11px] uppercase tracking-wide">Wellness Ledger</p>
      <div className="space-y-2">
        {rewards.ledger.map((r) => (
          <div key={r.date} className="bg-gradient-card flex items-center justify-between rounded-2xl border border-white/10 p-3">
            <div>
              <p className="text-sm font-medium">{r.date}</p>
              <p className="text-muted-foreground text-[11px]">{r.steps.toLocaleString()} steps · {r.calories} kcal</p>
            </div>
            <div className="text-right">
              <p className="font-display text-sm font-semibold">+{r.mdmt}</p>
              <StatusPill status={r.status} />
            </div>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground mt-6 mb-2 text-[11px] uppercase tracking-wide">Staking</p>
      <div className="bg-gradient-card rounded-3xl border border-white/10 p-5">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-muted-foreground text-[10px] uppercase">Total Staked</p>
            <p className="font-display text-2xl font-semibold">{staking.totalStaked.toLocaleString()}</p>
          </div>
          <span className="bg-success/15 text-success rounded-full px-2.5 py-1 text-[10px] font-medium">
            {staking.apy}% APY
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Card title="Next Reward" value={staking.nextReward} />
          <Card title="Total Earned" value={`${staking.totalEarned}`} />
        </div>
        <button className="bg-gradient-brand shadow-glow mt-4 w-full rounded-full py-2.5 text-sm font-semibold text-white">
          Claim Staking Rewards
        </button>
      </div>
    </AppShell>
  );
}

function Mini({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-muted-foreground inline-flex items-center gap-1.5 text-[11px]">{icon} {label}</span>
      <span className={`text-sm font-semibold ${accent ? "text-gradient-brand" : ""}`}>{value}</span>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-muted-foreground text-[10px] uppercase">{title}</p>
      <p className="font-display mt-1 text-base font-semibold">{value}</p>
    </div>
  );
}

function StatusPill({ status }: { status: "Pending" | "Credited" | "Claimed" }) {
  const map = {
    Pending: "text-warning",
    Credited: "text-success",
    Claimed: "text-muted-foreground",
  } as const;
  return <p className={`text-[10px] ${map[status]}`}>{status}</p>;
}
