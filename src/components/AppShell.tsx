import type { ReactNode } from "react";
import { Bell, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BrandLogo } from "./BrandLogo";
import { BottomNav } from "./BottomNav";

interface Props {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function AppShell({ children, title, subtitle }: Props) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[480px] pb-28">
      <header className="sticky top-0 z-40 flex items-center justify-between px-5 pt-5 pb-3 backdrop-blur-xl">
        <div>
          {title ? (
            <>
              <h1 className="text-2xl font-semibold">{title}</h1>
              {subtitle && <p className="text-muted-foreground text-xs">{subtitle}</p>}
            </>
          ) : (
            <BrandLogo />
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/activity"
            className="bg-card/60 relative grid h-10 w-10 place-items-center rounded-full border border-white/10"
            aria-label="Notifications"
          >
            <Bell size={17} />
            <span className="bg-gradient-brand absolute top-2 right-2 h-2 w-2 rounded-full" />
          </Link>
          <button
            className="bg-card/60 grid h-10 w-10 place-items-center rounded-full border border-white/10"
            aria-label="Profile"
          >
            <User size={17} />
          </button>
        </div>
      </header>
      <main className="px-5">{children}</main>
      <BottomNav />
    </div>
  );
}
