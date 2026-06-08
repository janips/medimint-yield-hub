import type { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="bg-gradient-card mt-6 flex flex-col items-center rounded-3xl border border-white/10 p-8 text-center">
      {icon && (
        <span className="bg-gradient-brand-soft mb-4 grid h-14 w-14 place-items-center rounded-2xl">
          {icon}
        </span>
      )}
      <h3 className="font-display text-base font-semibold">{title}</h3>
      {description && <p className="text-muted-foreground mt-1.5 max-w-xs text-xs">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
