import type { ReactNode } from "react";
import { Bell, User, ArrowLeft } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import { BrandLogo } from "./BrandLogo";
import { BottomNav } from "./BottomNav";
import { notifications } from "@/lib/mockData";

interface Props {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  back?: boolean;
  hideNav?: boolean;
  right?: ReactNode;
}

export function AppShell({ children, title, subtitle, back, hideNav, right }: Props) {
  const router = useRouter();
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <div className={`mx-auto min-h-screen w-full max-w-[480px] ${hideNav ? "pb-6" : "pb-24"}`}>
      <header className="sticky top-0 z-40 flex items-center justify-between px-5 pt-5 pb-3 backdrop-blur-xl">
        <div className="flex items-center gap-2 min-w-0">
          {back && (
            <button
              onClick={() => router.history.back()}
              className="bg-card/60 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10"
              aria-label="Back"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div className="min-w-0">
            {title ? (
              <>
                <h1 className="truncate text-xl font-semibold">{title}</h1>
                {subtitle && <p className="text-muted-foreground truncate text-xs">{subtitle}</p>}
              </>
            ) : (
              <BrandLogo />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {right}
          <Link
            to="/notifications"
            className="bg-card/60 relative grid h-10 w-10 place-items-center rounded-full border border-white/10"
            aria-label="Notifications"
          >
            <Bell size={16} />
            {unread > 0 && (
              <span className="bg-gradient-brand absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold text-white">
                {unread}
              </span>
            )}
          </Link>
          <Link
            to="/profile"
            className="bg-card/60 grid h-10 w-10 place-items-center rounded-full border border-white/10"
            aria-label="Profile"
          >
            <User size={16} />
          </Link>
        </div>
      </header>
      <main className="px-5">{children}</main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
