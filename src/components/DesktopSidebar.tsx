import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home, Layers, Activity, ShoppingBag, Gift, Coins,
  ShieldCheck, FileText, Settings as SettingsIcon, User,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";

const items: { to: string; label: string; icon: typeof Home; exact?: boolean }[] = [
  { to: "/", label: "Dashboard", icon: Home, exact: true },
  { to: "/assets", label: "Assets", icon: Layers },
  { to: "/activity", label: "Activity", icon: Activity },
  { to: "/staking", label: "Staking", icon: Coins },
  { to: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/transparency", label: "Transparency Hub", icon: ShieldCheck },
  { to: "/notifications", label: "Reports", icon: FileText },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export function DesktopSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex sticky top-0 h-screen w-[248px] shrink-0 flex-col border-r border-white/10 bg-black/30 px-4 py-5 backdrop-blur-xl">
      <div className="px-2 pb-4">
        <div className="inline-flex items-center rounded-xl bg-white px-3 py-1.5 shadow-sm">
          <BrandLogo height={24} variant="light" />
        </div>
      </div>
      <nav className="mt-2 flex-1 space-y-0.5 overflow-y-auto pr-1">
        {items.map((t) => {
          const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-gradient-brand-soft text-foreground border border-white/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <Icon size={16} strokeWidth={active ? 2.4 : 1.8} />
              <span className={active ? "font-medium" : ""}>{t.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 pt-3 text-[10px] text-muted-foreground">
        <p>© Medimint · Investor Platform</p>
        <p className="mt-0.5">All yield is blockchain-anchored</p>
      </div>
    </aside>
  );
}
