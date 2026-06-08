import { useSyncExternalStore } from "react";
import { portfolio, machines, type Notification } from "@/lib/mockData";

const MACHINES = machines.map((m) => m.id);

function randomHash() {
  const hex = "0123456789ABCDEF";
  const rand = (n: number) => Array.from({ length: n }, () => hex[Math.floor(Math.random() * 16)]).join("");
  const full = `0x${rand(36)}`;
  return { short: `${full.slice(0, 6)}...${full.slice(-4)}`, full };
}

export interface LiveYieldState {
  today: number;
  lifetime: number;
  /** monotonically increasing tick — useful as a React key for pulse animations */
  tick: number;
  /** ephemeral live notifications generated since session start, newest first */
  liveNotifications: Notification[];
}

let state: LiveYieldState = {
  today: portfolio.yieldToday,
  lifetime: portfolio.yieldLifetime,
  tick: 0,
  liveNotifications: [],
};

const listeners = new Set<() => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;
let nextNotifId = 100000;

function emit() {
  for (const l of listeners) l();
}

function tick() {
  // tiny fractional yield, 0.002 — 0.028 MDMT
  const delta = +(Math.random() * 0.026 + 0.002).toFixed(4);
  const newToday = +(state.today + delta).toFixed(4);
  const newLifetime = +(state.lifetime + delta).toFixed(4);

  let liveNotifications = state.liveNotifications;
  // occasionally publish a notification (~1 in 4 ticks)
  if (Math.random() < 0.28) {
    const machine = MACHINES[Math.floor(Math.random() * MACHINES.length)];
    const { short, full } = randomHash();
    const n: Notification = {
      id: nextNotifId++,
      type: "yield",
      title: "Yield Generated",
      desc: `${machine} · ${delta.toFixed(3)} MDMT`,
      time: "just now",
      hash: short,
      read: false,
      link: "/activity",
    };
    // Keep last 12 live notifications
    liveNotifications = [n, ...state.liveNotifications].slice(0, 12);
    // stash full hash for explorer (HashChip falls back to short if not provided)
    (n as Notification & { fullHash?: string }).fullHash = full;
  }

  state = {
    today: newToday,
    lifetime: newLifetime,
    tick: state.tick + 1,
    liveNotifications,
  };
  emit();
}

function ensureRunning() {
  if (intervalId == null && typeof window !== "undefined") {
    intervalId = setInterval(tick, 2200);
  }
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  ensureRunning();
  return () => {
    listeners.delete(l);
    // keep ticking even if no listeners — yield should accrue continuously while app is open
  };
};

const getSnapshot = () => state;
const getServerSnapshot = () => state;

export function useLiveYield(): LiveYieldState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
