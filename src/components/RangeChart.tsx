import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart } from "@/components/AreaChart";
import { BarChart } from "@/components/BarChart";
import { useSim, seriesFor, type Range } from "@/lib/simEngine";

type Metric = "tx" | "revenue" | "yield";

interface Props {
  /** Which series to default to. */
  initial?: Metric;
  /** Which metrics are toggleable. */
  metrics?: Metric[];
  /** Use a bar chart instead of an area chart. */
  bars?: boolean;
  /** Optional title shown above the chart. */
  title?: string;
}

const METRIC_LABEL: Record<Metric, string> = {
  tx: "Scans (count)",
  revenue: "Revenue (AED)",
  yield: "Yield (MDMT)",
};

const METRIC_HINT: Record<Metric, string> = {
  tx: "Number of diagnostic scans performed across machines.",
  revenue: "Operator revenue in AED billed to clinics & insurance.",
  yield: "MDMT tokens distributed to investors (~3 MDMT per scan).",
};

export function RangeChart({
  initial = "tx",
  metrics = ["tx", "revenue", "yield"],
  bars = false,
  title,
}: Props) {
  const s = useSim();
  const [range, setRange] = useState<Range>("7D");
  const [metric, setMetric] = useState<Metric>(initial);
  const series = seriesFor(range, s.todayTx, s.todayRevenueAED, s.todayYieldMDMT);
  const data =
    metric === "tx" ? series.tx : metric === "revenue" ? series.revenueAED : series.yieldMDMT;
  const total = data.reduce((a, b) => a + b, 0);

  const formatTotal = () => {
    if (metric === "tx") return total.toLocaleString();
    if (metric === "revenue") return "AED " + total.toLocaleString();
    return total.toFixed(0) + " MDMT";
  };

  // Estimate "vs prior period" — compare first half avg to second half avg
  const half = Math.floor(data.length / 2);
  const prior = data.slice(0, half).reduce((a, b) => a + b, 0) / Math.max(1, half);
  const recent = data.slice(half).reduce((a, b) => a + b, 0) / Math.max(1, data.length - half);
  // Transactions & revenue are cumulative volume metrics — they never go negative
  // period-over-period in a live, growing healthcare network.
  const rawDelta = prior > 0 ? ((recent - prior) / prior) * 100 : 0;
  const deltaPct = metric === "yield" ? rawDelta : Math.max(0, rawDelta);

  return (
    <section className="bg-gradient-card mt-5 rounded-3xl border border-white/10 p-4">
      {title && <p className="text-muted-foreground mb-2 text-[11px] uppercase tracking-wide">{title}</p>}
      <div className="flex items-center justify-between gap-2">
        <div className="bg-secondary/60 inline-flex rounded-full p-1 text-[11px]">
          {metrics.map((m) => (
            <Btn key={m} active={metric === m} onClick={() => setMetric(m)}>
              {METRIC_LABEL[m]}
            </Btn>
          ))}
        </div>
        <div className="bg-secondary/60 inline-flex rounded-full p-1 text-[10px]">
          {(["1D", "7D", "30D", "ALL"] as const).map((r) => (
            <Btn key={r} active={range === r} onClick={() => setRange(r)}>
              {r === "ALL" ? "All" : r}
            </Btn>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-2xl font-semibold tabular-nums">{formatTotal()}</span>
        <span className="text-muted-foreground text-xs">total · {range === "ALL" ? "all time" : range === "1D" ? "today" : range}</span>
        <span className={`ml-auto text-xs ${deltaPct >= 0 ? "text-success" : "text-destructive"}`}>
          {deltaPct >= 0 ? "+" : ""}
          {deltaPct.toFixed(1)}%
        </span>
      </div>
      <p className="text-muted-foreground mt-1 text-[10px] leading-snug">{METRIC_HINT[metric]}</p>
      <div className="mt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${metric}-${range}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {bars ? <BarChart data={data} labels={series.labels} /> : <AreaChart data={data} labels={series.labels} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 transition-all ${
        active ? "bg-gradient-brand text-white shadow-glow" : "text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}
