import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Bell, Fingerprint, KeyRound, ShieldCheck, Gift, Globe } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Medimint" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [biometrics, setBiometrics] = useState(true);
  const [twoFa, setTwoFa] = useState(true);
  const [pushYield, setPushYield] = useState(true);
  const [pushStake, setPushStake] = useState(true);
  const [pushMarket, setPushMarket] = useState(false);
  const [pushReward, setPushReward] = useState(true);
  const [autoClaim, setAutoClaim] = useState(false);

  return (
    <AppShell title="Settings" back>
      <Section title="Notifications" icon={<Bell size={14} />}>
        <Toggle label="Yield events" desc="Notify on every yield event" on={pushYield} onChange={setPushYield} />
        <Toggle label="Staking rewards" desc="Notify when staking rewards are credited" on={pushStake} onChange={setPushStake} />
        <Toggle label="Marketplace updates" desc="Order updates and offers" on={pushMarket} onChange={setPushMarket} />
        <Toggle label="Wellness rewards" desc="Daily steps/calories reward updates" on={pushReward} onChange={setPushReward} />
      </Section>

      <Section title="Security" icon={<ShieldCheck size={14} />}>
        <Toggle icon={<Fingerprint size={14} />} label="Biometrics" desc="Unlock with Face ID / fingerprint" on={biometrics} onChange={setBiometrics} />
        <Toggle icon={<KeyRound size={14} />} label="Two-Factor Auth" desc="Authenticator app for high-value actions" on={twoFa} onChange={setTwoFa} />
        <button className="text-primary mt-1 w-full rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-medium">
          Change passcode
        </button>
      </Section>

      <Section title="Rewards Preferences" icon={<Gift size={14} />}>
        <Toggle label="Auto-claim daily rewards" desc="Credit MDMT to wallet automatically" on={autoClaim} onChange={setAutoClaim} />
      </Section>

      <Section title="Locale" icon={<Globe size={14} />}>
        <Row label="Language" value="English" />
        <Row label="Currency" value="USD" />
      </Section>
    </AppShell>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="text-muted-foreground mb-2 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
        {icon} {title}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Toggle({ icon, label, desc, on, onChange }: { icon?: React.ReactNode; label: string; desc: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="bg-gradient-card flex items-center justify-between rounded-2xl border border-white/10 p-4">
      <div className="flex items-center gap-3">
        {icon && <span className="bg-gradient-brand-soft grid h-9 w-9 place-items-center rounded-xl">{icon}</span>}
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-muted-foreground text-[11px]">{desc}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!on)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-gradient-brand" : "bg-white/15"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gradient-card flex items-center justify-between rounded-2xl border border-white/10 p-4">
      <p className="text-sm">{label}</p>
      <p className="text-muted-foreground text-sm">{value}</p>
    </div>
  );
}
