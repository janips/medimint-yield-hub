import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HashChip } from "@/components/HashChip";
import { user, linkedAssets, portfolio } from "@/lib/mockData";
import { useLiveYield } from "@/lib/liveYield";
import { Mail, Wallet, Cpu, ShieldCheck, Settings as SettingsIcon, ChevronRight, LogOut } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Medimint" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const live = useLiveYield();
  return (
    <AppShell title="Profile" back>
      <div className="bg-gradient-hero shadow-glow mt-4 rounded-3xl border border-white/10 p-5 text-center">
        <div className="bg-gradient-brand mx-auto grid h-20 w-20 place-items-center rounded-full text-2xl font-bold text-white">
          {user.name[0]}
        </div>
        <p className="font-display mt-3 text-xl font-semibold">{user.fullName}</p>
        <p className="text-muted-foreground text-xs">{user.email}</p>
        <span className="bg-success/15 text-success mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium">
          <ShieldCheck size={10} /> KYC {user.kycStatus}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Stat label="Tokens" value={portfolio.totalTokens.toLocaleString()} />
        <Stat label="Staked" value={portfolio.staked.toLocaleString()} />
        <Stat label="Yield" value={portfolio.yieldLifetime.toFixed(0)} />
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Personal</p>
      <div className="space-y-2">
        <Row icon={<Mail size={14} />} label="Email" value={user.email} />
        <Row icon={<Wallet size={14} />} label="Wallet" value={user.walletShort} extra={<HashChip hash={user.walletShort} full={user.wallet} />} />
      </div>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Linked Assets</p>
      <Link to="/assets" className="bg-gradient-card flex items-center justify-between rounded-2xl border border-white/10 p-4">
        <div className="flex items-center gap-3">
          <span className="bg-gradient-brand-soft grid h-10 w-10 place-items-center rounded-xl"><Cpu size={16} /></span>
          <div>
            <p className="text-sm font-medium">{linkedAssets.machines} machines · {linkedAssets.assetIds} asset IDs</p>
            <p className="text-muted-foreground text-[11px]">Member since {user.joined}</p>
          </div>
        </div>
        <ChevronRight size={14} className="text-muted-foreground" />
      </Link>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Quick Links</p>
      <div className="space-y-2">
        <LinkRow to="/settings" icon={<SettingsIcon size={14} />} label="Settings" />
        <LinkRow to="/transparency" icon={<ShieldCheck size={14} />} label="Transparency Hub" />
      </div>

      <button className="text-destructive mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 text-sm">
        <LogOut size={14} /> Sign Out
      </button>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gradient-card rounded-xl border border-white/10 p-3 text-center">
      <p className="text-muted-foreground text-[10px] uppercase">{label}</p>
      <p className="font-display mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function Row({ icon, label, value, extra }: { icon: React.ReactNode; label: string; value: string; extra?: React.ReactNode }) {
  return (
    <div className="bg-gradient-card flex items-center justify-between rounded-2xl border border-white/10 p-4">
      <div className="flex items-center gap-3">
        <span className="bg-gradient-brand-soft grid h-9 w-9 place-items-center rounded-xl">{icon}</span>
        <div>
          <p className="text-muted-foreground text-[10px] uppercase">{label}</p>
          <p className="text-sm">{value}</p>
        </div>
      </div>
      {extra}
    </div>
  );
}

function LinkRow({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link to={to} className="bg-gradient-card flex items-center justify-between rounded-2xl border border-white/10 p-4">
      <div className="flex items-center gap-3">
        <span className="bg-gradient-brand-soft grid h-9 w-9 place-items-center rounded-xl">{icon}</span>
        <p className="text-sm font-medium">{label}</p>
      </div>
      <ChevronRight size={14} className="text-muted-foreground" />
    </Link>
  );
}
