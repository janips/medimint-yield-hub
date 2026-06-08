import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Layers, Activity, ShoppingBag, Gift } from "lucide-react";

const tabs: { to: string; label: string; icon: typeof Home; exact?: boolean }[] = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/assets", label: "Assets", icon: Layers },
  { to: "/activity", label: "Activity", icon: Activity },
  { to: "/marketplace", label: "Market", icon: ShoppingBag },
  { to: "/rewards", label: "Rewards", icon: Gift },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 px-3 pb-3">
      <div className="bg-gradient-card shadow-card flex items-center justify-between rounded-2xl border border-white/10 px-2 py-2 backdrop-blur-xl">
        {tabs.map((t) => {
          const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-colors"
            >
              {active && (
                <span className="bg-gradient-brand absolute inset-x-3 -top-[10px] h-[3px] rounded-full" />
              )}
              <Icon
                size={20}
                className={active ? "text-foreground" : "text-muted-foreground"}
                strokeWidth={active ? 2.4 : 1.8}
              />
              <span
                className={`text-[10px] tracking-wide ${
                  active ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
