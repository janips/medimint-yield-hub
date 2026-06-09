import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useSim, relTime } from "@/lib/simEngine";
import { HashChip } from "@/components/HashChip";

interface Props {
  /** Max items to show. */
  limit?: number;
  /** Hide the header (used for embedded contexts). */
  bare?: boolean;
}

/**
 * Real-time activity feed driven by the simulation engine. Each new
 * transaction animates in from the top. Mirrors the CEO-spec
 * format: machine · revenue → yield · hash · "x ago".
 */
export function LiveActivityFeed({ limit = 8, bare }: Props) {
  const s = useSim();
  const items = s.feed.slice(0, limit);

  return (
    <section className="mt-5">
      {!bare && (
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Live Activity Feed</h3>
          <span className="text-success inline-flex items-center gap-1 text-[10px] uppercase tracking-wider">
            <span className="bg-success h-1.5 w-1.5 animate-pulse rounded-full" /> Streaming
          </span>
        </div>
      )}
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {items.map((e) => (
            <motion.div
              key={e.id}
              layout
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-gradient-card flex items-center gap-3 rounded-2xl border border-white/10 p-3"
            >
              <span className="bg-gradient-brand grid h-9 w-9 shrink-0 place-items-center rounded-xl">
                <Sparkles size={14} className="text-white" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-mono text-sm font-medium">{e.machineId}</p>
                  <p className="text-success text-sm font-semibold tabular-nums">
                    +{e.yieldMDMT.toFixed(3)}
                  </p>
                </div>
                <div className="text-muted-foreground mt-0.5 flex items-center justify-between gap-2 text-[11px]">
                  <span className="truncate">
                    {e.type} · AED {e.revenueAED.toFixed(0)}
                  </span>
                  <span className="shrink-0 tabular-nums">{relTime(e.ts, s.now)}</span>
                </div>
                <div className="mt-1.5">
                  <HashChip hash={e.hash} full={e.fullHash} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
