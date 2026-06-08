import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AreaChart } from "@/components/AreaChart";
import { HashChip } from "@/components/HashChip";
import { staking, portfolio } from "@/lib/mockData";
import { Coins, TrendingUp, Calculator } from "lucide-react";

export const Route = createFileRoute("/staking")({
  head: () => ({
    meta: [
      { title: "Staking — Medimint" },
      { name: "description", content: "Stake MDMT, earn yield, and project growth." },
    ],
  }),
  component: StakingPage,
});

function StakingPage() {
  const [auto, setAuto] = useState(staking.autoCompound);
  const [amount, setAmount] = useState(1000);
  const projected = (amount * (staking.apy / 100)) / 12;

  return (
    <AppShell title="Staking" subtitle="Earn yield on MDMT">
      <div className="bg-gradient-hero shadow-glow mt-4 rounded-3xl border border-white/10 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-[10px] uppercase">Total Staked</p>
            <p className="font-display mt-1 text-3xl font-semibold">{staking.totalStaked.toLocaleString()}</p>
            <p className="text-muted-foreground text-[10px]">MDMT</p>
          </div>
          <span className="bg-success/15 text-success rounded-full px-3 py-1.5 text-xs font-semibold">{staking.apy}% APY</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Stat label="Available" value={staking.available.toLocaleString()} />
          <Stat label="Reward Rate" value={staking.rewardRate} />
          <Stat label="Monthly Projection" value={`+${staking.monthlyProjection}`} />
          <Stat label="Lifetime Rewards" value={staking.totalEarned.toLocaleString()} />
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
          <span className="text-xs">Next reward {staking.nextReward}</span>
          <button className="bg-gradient-brand rounded-full px-3 py-1 text-[11px] font-semibold text-white">Claim Rewards</button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="bg-gradient-brand shadow-glow rounded-2xl py-3 text-sm font-semibold text-white">Stake</button>
        <button className="bg-card rounded-2xl border border-white/10 py-3 text-sm font-semibold">Unstake</button>
      </div>

      <div className="bg-gradient-card mt-4 flex items-center justify-between rounded-2xl border border-white/10 p-4">
        <div>
          <p className="text-sm font-medium">Auto-Compound</p>
          <p className="text-muted-foreground text-[11px]">Re-stake rewards automatically</p>
        </div>
        <button
          onClick={() => setAuto(!auto)}
          className={`relative h-6 w-11 rounded-full transition-colors ${auto ? "bg-gradient-brand" : "bg-white/15"}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${auto ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      </div>

      <div className="bg-gradient-card mt-4 rounded-2xl border border-white/10 p-4">
        <div className="flex items-center gap-2">
          <Calculator size={14} className="text-primary" />
          <p className="text-sm font-medium">Reward Calculator</p>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <input
            type="range"
            min={100}
            max={portfolio.available}
            step={100}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="flex-1 accent-pink-500"
          />
          <span className="font-display w-20 text-right text-sm font-semibold">{amount.toLocaleString()}</span>
        </div>
        <div className="text-muted-foreground mt-3 flex items-center justify-between text-xs">
          <span>Est. monthly reward</span>
          <span className="text-success font-semibold">+{projected.toFixed(2)} MDMT</span>
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span>Est. annual reward</span>
          <span className="text-success font-semibold">+{(projected * 12).toFixed(2)} MDMT</span>
        </div>
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Earnings Growth & Projection</p>
      <div className="bg-gradient-card rounded-3xl border border-white/10 p-4">
        <AreaChart data={[...staking.growth.slice(-6), ...staking.projection.slice(0, 6)]} />
        <div className="text-muted-foreground mt-2 flex justify-between text-[10px]">
          <span>Past 6 months</span>
          <span className="text-primary">Projected →</span>
        </div>
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Reward History</p>
      <div className="space-y-2">
        {staking.history.map((h) => (
          <div key={h.ref} className="bg-gradient-card flex items-center gap-3 rounded-2xl border border-white/10 p-3">
            <span className="bg-gradient-brand-soft grid h-9 w-9 place-items-center rounded-xl">
              <TrendingUp size={14} />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{h.date}</p>
                <p className="text-success text-sm font-semibold">+{h.amount.toFixed(2)}</p>
              </div>
              <div className="text-muted-foreground mt-0.5 flex items-center gap-2 text-[10px]">
                <span className="font-mono">{h.ref}</span>
                <HashChip hash={`${h.hash.slice(0, 6)}...${h.hash.slice(-4)}`} full={h.hash} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-muted-foreground text-[10px] uppercase">{label}</p>
      <p className="font-display mt-1 text-base font-semibold">{value}</p>
    </div>
  );
}

void Coins;
