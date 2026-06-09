/**
 * Backwards-compat shim. The live yield store has been folded into the
 * full simulation engine in `simEngine.ts`. Existing screens import
 * `useLiveYield` — keep that surface stable while new screens use
 * `useSim` for the richer state (network status, activity feed, etc).
 */
import { useSim } from "@/lib/simEngine";
import type { Notification } from "@/lib/mockData";

export interface LiveYieldState {
  today: number;
  lifetime: number;
  tick: number;
  liveNotifications: Notification[];
}

export function useLiveYield(): LiveYieldState {
  const s = useSim();
  return {
    today: s.myYieldToday,
    lifetime: s.myYieldLifetime,
    tick: s.tick,
    liveNotifications: s.liveNotifications,
  };
}
