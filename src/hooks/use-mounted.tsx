import { useEffect, useState } from "react";

/** Returns true only after first client mount — use to gate non-deterministic UI. */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
