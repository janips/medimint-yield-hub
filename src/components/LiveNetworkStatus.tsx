import { motion } from "framer-motion";
import { Activity, Cpu, Wrench, Radio } from "lucide-react";
import { useSim, relTime } from "@/lib/simEngine";
import { AnimatedNumber } from "@/components/AnimatedNumber";

/**
 * Live operations card — pulses LIVE, ticks transaction / revenue /
 * yield counters from the global simulation engine.
 */
export function LiveNetworkStatus() {
  const s = useSim();
  const last = s.lastTx;

  return (
    <section className="bg-gradient-card relative mt-5 overflow-hidden rounded-3xl border border-white/10 p-5">
      <div className="bg-success/15 absolute -top-12 -right-10 h-40 w-40 rounded-full blur-3xl" />
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
          Live Network Status
        </p>
        <span className="bg-success/15 text-success inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase">
          <span className="relative grid h-1.5 w-1.5">
            <span className="bg-success absolute inset-0 animate-ping rounded-full opacity-75" />
            <span className="bg-success h-1.5 w-1.5 rounded-full" />
          </span>
          <Radio size={10} /> Live
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Tile
          icon={<Cpu size={12} />}
          label="Machines Active"
          value={String(s.activeMachines)}
        />
        <Tile
          icon={<Wrench size={12} />}
          label="Under Maintenance"
          value={String(s.maintenanceMachines)}
          accent="warning"
        />
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        <Live label="Tx Today" value={<AnimatedNumber value={s.todayTx} decimals={0} locale />} />
        <Live
          label="Revenue (AED)"
          value={<AnimatedNumber value={s.todayRevenueAED} decimals={0} locale />}
        />
        <Live
          label="Yield (MDMT)"
          value={<AnimatedNumber value={s.todayYieldMDMT} decimals={1} locale />}
          gradient
        />
      </div>

      {last && (
        <motion.div
          key={last.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
        >
          <Activity size={12} className="text-success shrink-0" />
          <p className="min-w-0 flex-1 truncate text-[11px]">
            <span className="text-muted-foreground">Last tx · </span>
            <span className="font-mono">{last.machineId}</span>
            <span className="text-muted-foreground"> · </span>
            <span className="text-success">+{last.yieldMDMT.toFixed(3)} MDMT</span>
          </p>
          <span className="text-muted-foreground shrink-0 text-[10px] tabular-nums">
            {relTime(last.ts, s.now)}
          </span>
        </motion.div>
      )}
    </section>
  );
}

function Tile({
  icon, label, value, accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: "warning";
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="text-muted-foreground flex items-center gap-1 text-[10px] uppercase tracking-wide">
        {icon} {label}
      </p>
      <p className={`font-display mt-1 text-xl font-semibold tabular-nums ${accent === "warning" ? "text-warning" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function Live({
  label, value, gradient,
}: {
  label: string;
  value: React.ReactNode;
  gradient?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
      <p className="text-muted-foreground text-[9px] uppercase tracking-wide">{label}</p>
      <p
        className={`font-display mt-0.5 text-sm font-semibold tabular-nums ${
          gradient ? "text-gradient-brand" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
