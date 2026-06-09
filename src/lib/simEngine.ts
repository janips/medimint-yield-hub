import { useSyncExternalStore } from "react";
import {
  portfolio,
  machines as seedMachines,
  type Notification,
} from "@/lib/mockData";

/* ============================================================
   Medimint Live Simulation Engine
   ------------------------------------------------------------
   Drives the entire "platform feels alive" experience without a
   backend. A single ticker emits realistic healthcare
   transactions every 8–18s; counters, charts, feeds and
   notifications are all derived from this stream so every number
   on screen traces back to a real-looking event.
   ============================================================ */

/* ---------- types ---------- */

export type TxType =
  | "Patient Scan"
  | "Completed Scan"
  | "Diagnostic Report"
  | "Lab Result"
  | "Consultation";

export interface SimMachine {
  id: string;
  type: string;
  status: "Active" | "Maintenance" | "Offline";
  /** revenue band per transaction, in AED */
  revenueBand: [number, number];
  /** MDMT yield per 1 AED of revenue (typically ~0.012–0.022) */
  yieldRate: number;
  /** average transactions / hour at full utilisation */
  hourly: number;
  bucketId: string;
}

export interface SimTransaction {
  id: string;
  ts: number; // ms epoch
  machineId: string;
  machineType: string;
  bucketId: string;
  assetId: string;
  type: TxType;
  revenueAED: number;
  yieldMDMT: number;
  hash: string; // short
  fullHash: string; // long
  settlement: "Settled" | "Confirming" | "Pending";
}

export interface SimState {
  /** monotonically increasing — useful as a React animation key */
  tick: number;
  /** today's running counters (resets at local midnight) */
  todayTx: number;
  todayRevenueAED: number;
  todayYieldMDMT: number;
  /** lifetime totals across the platform */
  lifetimeTx: number;
  lifetimeRevenueAED: number;
  lifetimeYieldMDMT: number;
  /** investor-share live counters (what the current user sees as personal yield) */
  myYieldToday: number;
  myYieldLifetime: number;
  /** machine status counts */
  activeMachines: number;
  maintenanceMachines: number;
  /** activity feed — newest first, capped at 30 */
  feed: SimTransaction[];
  /** in-session notifications — newest first, capped at 20 */
  liveNotifications: Notification[];
  /** last transaction summary for the LIVE pill */
  lastTx?: SimTransaction;
  /** generation timestamp for "x seconds ago" displays */
  now: number;
}

/* ---------- machine catalog (extended; bucketized) ---------- */

const BUCKET_FOR: Record<string, string> = {
  "MRI-DXB-003": "alpha",
  "MRI-DXB-014": "alpha",
  "CT-DXB-002": "alpha",
  "CT-MUM-011": "beta",
  "LAB-MUM-021": "beta",
  "MRI-SGP-007": "gamma",
  "CT-RUH-022": "gamma",
  "LAB-RUH-031": "gamma",
  "CT-LON-009": "gamma",
};

const SIM_MACHINES: SimMachine[] = [
  // ALPHA — Dubai cluster
  { id: "MRI-DXB-003", type: "MRI 3T", status: "Active", revenueBand: [220, 360], yieldRate: 0.020, hourly: 5.0, bucketId: "alpha" },
  { id: "MRI-DXB-014", type: "MRI 1.5T", status: "Active", revenueBand: [180, 280], yieldRate: 0.019, hourly: 4.4, bucketId: "alpha" },
  { id: "CT-DXB-002", type: "CT 128", status: "Active", revenueBand: [150, 260], yieldRate: 0.020, hourly: 5.6, bucketId: "alpha" },
  // BETA — Mumbai cluster
  { id: "CT-MUM-011", type: "CT 128", status: "Active", revenueBand: [120, 220], yieldRate: 0.022, hourly: 5.2, bucketId: "beta" },
  { id: "LAB-MUM-021", type: "Pathology Lab", status: "Active", revenueBand: [30, 90], yieldRate: 0.024, hourly: 12, bucketId: "beta" },
  // GAMMA — Riyadh / Singapore / London
  { id: "MRI-SGP-007", type: "MRI 1.5T", status: "Maintenance", revenueBand: [200, 320], yieldRate: 0.018, hourly: 3.8, bucketId: "gamma" },
  { id: "CT-RUH-022", type: "CT 256", status: "Active", revenueBand: [160, 280], yieldRate: 0.020, hourly: 5.4, bucketId: "gamma" },
  { id: "LAB-RUH-031", type: "Pathology Lab", status: "Active", revenueBand: [25, 80], yieldRate: 0.024, hourly: 11, bucketId: "gamma" },
  { id: "CT-LON-009", type: "CT 256", status: "Active", revenueBand: [180, 300], yieldRate: 0.020, hourly: 5.0, bucketId: "gamma" },
];

// Seed: ensure mock data machines are tagged
seedMachines.forEach((m) => {
  if (!BUCKET_FOR[m.id]) BUCKET_FOR[m.id] = "alpha";
});

const TX_TYPES_BY_KIND: Record<string, TxType[]> = {
  MRI: ["Patient Scan", "Completed Scan", "Diagnostic Report"],
  CT: ["Patient Scan", "Completed Scan", "Diagnostic Report"],
  LAB: ["Lab Result", "Diagnostic Report"],
};

const ASSETS_FOR_BUCKET: Record<string, string[]> = {
  alpha: ["ASSET-000392", "ASSET-000418", "ASSET-000507"],
  beta: ["ASSET-000612", "ASSET-000724"],
  gamma: ["ASSET-000819", "ASSET-000901", "ASSET-001044"],
};

/** What fraction of platform yield accrues to the current user (mock investor). */
const USER_SHARE = 0.082; // ~8.2% of platform

/* ---------- helpers ---------- */

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function hex(n: number) {
  const H = "0123456789ABCDEF";
  let s = "";
  for (let i = 0; i < n; i++) s += H[Math.floor(Math.random() * 16)];
  return s;
}
function newHash() {
  const full = "0x" + hex(40);
  return { short: `${full.slice(0, 6)}...${full.slice(-4)}`, full };
}
function kindOf(id: string) {
  if (id.startsWith("MRI")) return "MRI";
  if (id.startsWith("CT")) return "CT";
  return "LAB";
}

/* ---------- seeded baseline (so the app doesn't start at zero) ---------- */

function seedTransaction(offsetMs: number): SimTransaction {
  const m = pick(SIM_MACHINES.filter((x) => x.status === "Active"));
  const revenue = +rand(m.revenueBand[0], m.revenueBand[1]).toFixed(2);
  const yieldM = +(revenue * m.yieldRate).toFixed(4);
  const { short, full } = newHash();
  return {
    id: "TX-" + hex(8),
    ts: Date.now() - offsetMs,
    machineId: m.id,
    machineType: m.type,
    bucketId: m.bucketId,
    assetId: pick(ASSETS_FOR_BUCKET[m.bucketId] ?? ["ASSET-000392"]),
    type: pick(TX_TYPES_BY_KIND[kindOf(m.id)]),
    revenueAED: revenue,
    yieldMDMT: yieldM,
    hash: short,
    fullHash: full,
    settlement: Math.random() < 0.85 ? "Settled" : Math.random() < 0.5 ? "Confirming" : "Pending",
  };
}

/** Build today/lifetime starting baseline from realistic ratios. */
function buildInitial(): SimState {
  // Seed with ~906 tx, ~136k AED, ~2,720 MDMT today (CEO example numbers).
  const todayTx = 906;
  const todayRevenue = 136_000;
  const todayYield = +(todayRevenue * 0.020).toFixed(2); // ≈ 2720

  // Pre-fill feed with a handful of recent-looking transactions
  const feed: SimTransaction[] = [];
  for (let i = 0; i < 12; i++) feed.push(seedTransaction(2000 + i * 9000));

  return {
    tick: 0,
    todayTx,
    todayRevenueAED: todayRevenue,
    todayYieldMDMT: todayYield,
    lifetimeTx: 1_482_400,
    lifetimeRevenueAED: 222_360_000,
    lifetimeYieldMDMT: 4_447_200,
    myYieldToday: portfolio.yieldToday,
    myYieldLifetime: portfolio.yieldLifetime,
    activeMachines: SIM_MACHINES.filter((m) => m.status === "Active").length,
    maintenanceMachines: SIM_MACHINES.filter((m) => m.status === "Maintenance").length,
    feed,
    liveNotifications: [],
    lastTx: feed[0],
    now: Date.now(),
  };
}

let state: SimState = buildInitial();
const listeners = new Set<() => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;
let nowId: ReturnType<typeof setInterval> | null = null;
let nextNotifId = 100_000;

function emit() {
  for (const l of listeners) l();
}

function generateTick() {
  const machine = pick(SIM_MACHINES.filter((m) => m.status === "Active"));
  const revenue = +rand(machine.revenueBand[0], machine.revenueBand[1]).toFixed(2);
  const yieldM = +(revenue * machine.yieldRate).toFixed(4);
  const { short, full } = newHash();

  const tx: SimTransaction = {
    id: "TX-" + hex(8),
    ts: Date.now(),
    machineId: machine.id,
    machineType: machine.type,
    bucketId: machine.bucketId,
    assetId: pick(ASSETS_FOR_BUCKET[machine.bucketId] ?? ["ASSET-000392"]),
    type: pick(TX_TYPES_BY_KIND[kindOf(machine.id)]),
    revenueAED: revenue,
    yieldMDMT: yieldM,
    hash: short,
    fullHash: full,
    settlement: Math.random() < 0.82 ? "Settled" : Math.random() < 0.6 ? "Confirming" : "Pending",
  };

  // Investor share of this yield
  const userDelta = +(yieldM * USER_SHARE).toFixed(4);

  // Occasionally flip a machine into / out of maintenance (≈ every 60 ticks)
  if (Math.random() < 0.012) {
    const candidates = SIM_MACHINES;
    const flip = pick(candidates);
    if (flip.status === "Active") flip.status = "Maintenance";
    else if (flip.status === "Maintenance") flip.status = "Active";
  }

  let liveNotifications = state.liveNotifications;
  if (Math.random() < 0.45) {
    const n: Notification & { fullHash?: string } = {
      id: nextNotifId++,
      type: "yield",
      title: "Your asset generated yield",
      desc: `${machine.id} · +${userDelta.toFixed(4)} MDMT`,
      time: "just now",
      hash: short,
      read: false,
      link: "/activity",
    };
    n.fullHash = full;
    liveNotifications = [n, ...state.liveNotifications].slice(0, 20);
  }

  const feed = [tx, ...state.feed].slice(0, 30);

  state = {
    ...state,
    tick: state.tick + 1,
    todayTx: state.todayTx + 1,
    todayRevenueAED: +(state.todayRevenueAED + revenue).toFixed(2),
    todayYieldMDMT: +(state.todayYieldMDMT + yieldM).toFixed(4),
    lifetimeTx: state.lifetimeTx + 1,
    lifetimeRevenueAED: +(state.lifetimeRevenueAED + revenue).toFixed(2),
    lifetimeYieldMDMT: +(state.lifetimeYieldMDMT + yieldM).toFixed(4),
    myYieldToday: +(state.myYieldToday + userDelta).toFixed(4),
    myYieldLifetime: +(state.myYieldLifetime + userDelta).toFixed(4),
    activeMachines: SIM_MACHINES.filter((m) => m.status === "Active").length,
    maintenanceMachines: SIM_MACHINES.filter((m) => m.status === "Maintenance").length,
    feed,
    liveNotifications,
    lastTx: tx,
    now: Date.now(),
  };
  emit();
  scheduleNext();
}

function scheduleNext() {
  if (typeof window === "undefined") return;
  // jitter between 8s and 18s for a believable cadence
  const delay = 8000 + Math.random() * 10_000;
  if (intervalId) clearTimeout(intervalId);
  intervalId = setTimeout(generateTick, delay);
}

function ensureRunning() {
  if (typeof window === "undefined") return;
  if (!intervalId) scheduleNext();
  if (!nowId) {
    nowId = setInterval(() => {
      state = { ...state, now: Date.now() };
      emit();
    }, 1000);
  }
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  ensureRunning();
  return () => {
    listeners.delete(l);
  };
};
const getSnapshot = () => state;
const getServerSnapshot = () => state;

export function useSim(): SimState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ---------- chart datasets (7D / 30D / 90D) ---------- */

/** Stable per-day seed so charts don't reshuffle on every render. */
function seeded(n: number) {
  // xorshift32
  let x = n | 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return (Math.abs(x) % 1000) / 1000;
}

export type Range = "1D" | "7D" | "30D" | "90D" | "ALL";

export interface RangeSeries {
  labels: string[];
  tx: number[];
  revenueAED: number[];
  yieldMDMT: number[];
}

function dayLabel(d: Date) {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
function dowLabel(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: "short" });
}
function monthLabel(d: Date) {
  return d.toLocaleDateString(undefined, { month: "short", year: "2-digit" });
}

const baselineDailyTx = 880;
const baselineYieldRate = 0.020;
const baselineRevenuePerTx = 150;

export function seriesFor(range: Range, todayTx: number, todayRevenue: number, todayYield: number): RangeSeries {
  // 1D — intraday hourly breakdown of TODAY
  if (range === "1D") {
    const labels: string[] = [];
    const tx: number[] = [];
    const revenueAED: number[] = [];
    const yieldMDMT: number[] = [];
    const currentHour = new Date().getHours();
    const curve: number[] = [];
    let curveSum = 0;
    for (let h = 0; h <= currentHour; h++) {
      const v = Math.max(0.05, 1 - Math.abs((h - 12) / 9));
      curve.push(v);
      curveSum += v;
    }
    for (let h = 0; h < 24; h++) {
      labels.push(`${String(h).padStart(2, "0")}h`);
      if (h <= currentHour && curveSum > 0) {
        const w = curve[h] / curveSum;
        tx.push(Math.round(todayTx * w));
        revenueAED.push(Math.round(todayRevenue * w));
        yieldMDMT.push(+(todayYield * w).toFixed(1));
      } else {
        tx.push(0); revenueAED.push(0); yieldMDMT.push(0);
      }
    }
    return { labels: labels.map((l, i) => (i % 3 === 0 ? l : "")), tx, revenueAED, yieldMDMT };
  }

  // ALL — 12 months
  if (range === "ALL") {
    const labels: string[] = [];
    const tx: number[] = [];
    const revenueAED: number[] = [];
    const yieldMDMT: number[] = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      labels.push(monthLabel(d));
      const growth = Math.pow(1.03, 11 - i);
      const noise = 0.92 + seeded(d.getFullYear() * 100 + d.getMonth()) * 0.18;
      const monthTx = Math.round(baselineDailyTx * 30 * growth * noise * 0.85);
      const monthRev = Math.round(monthTx * baselineRevenuePerTx);
      tx.push(monthTx);
      revenueAED.push(monthRev);
      yieldMDMT.push(+(monthRev * baselineYieldRate).toFixed(1));
    }
    return { labels, tx, revenueAED, yieldMDMT };
  }

  const days = range === "7D" ? 7 : range === "30D" ? 30 : 90;
  const labels: string[] = [];
  const tx: number[] = [];
  const revenueAED: number[] = [];
  const yieldMDMT: number[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(days <= 7 ? dowLabel(d) : dayLabel(d));
    const dow = d.getDay();
    const weekdayBoost = dow === 0 || dow === 6 ? 0.78 : 1.0;
    const seasonal = 0.92 + 0.12 * Math.cos(((days - i) / 90) * Math.PI * 2);
    const noise = 0.88 + seeded(d.getFullYear() * 1000 + d.getMonth() * 40 + d.getDate()) * 0.24;
    if (i === 0) {
      tx.push(Math.round(todayTx));
      revenueAED.push(Math.round(todayRevenue));
      yieldMDMT.push(+todayYield.toFixed(1));
    } else {
      const dayTx = Math.round(baselineDailyTx * weekdayBoost * seasonal * noise);
      const dayRev = Math.round(dayTx * (baselineRevenuePerTx * (0.92 + seeded(d.getDate() + dow) * 0.18)));
      tx.push(dayTx);
      revenueAED.push(dayRev);
      yieldMDMT.push(+(dayRev * baselineYieldRate).toFixed(1));
    }
  }

  if (range === "90D") return { labels: labels.map((l, i) => (i % 10 === 0 ? l : "")), tx, revenueAED, yieldMDMT };
  if (range === "30D") return { labels: labels.map((l, i) => (i % 5 === 0 ? l : "")), tx, revenueAED, yieldMDMT };
  return { labels, tx, revenueAED, yieldMDMT };
}

/* ---------- exposed metadata ---------- */

export const SIM_BUCKETS = ["alpha", "beta", "gamma"] as const;
export type BucketKey = (typeof SIM_BUCKETS)[number];

export function machinesInBucket(bucket: BucketKey): SimMachine[] {
  return SIM_MACHINES.filter((m) => m.bucketId === bucket);
}
export function allSimMachines(): SimMachine[] {
  return SIM_MACHINES.slice();
}

export function relTime(then: number, now: number) {
  const s = Math.max(1, Math.floor((now - then) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
