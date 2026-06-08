import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  /** number of decimal places to display */
  decimals?: number;
  /** transition duration in ms */
  duration?: number;
  /** use locale formatting (thousands separators) */
  locale?: boolean;
  /** flash green on change */
  flash?: boolean;
  className?: string;
  prefix?: string;
  suffix?: string;
}

/**
 * Odometer-style number that smoothly tweens between values using rAF.
 * Re-targets mid-flight if `value` changes again before the previous tween ends.
 */
export function AnimatedNumber({
  value,
  decimals = 4,
  duration = 900,
  locale = false,
  flash = true,
  className = "",
  prefix = "",
  suffix = "",
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const toRef = useRef(value);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    if (value === toRef.current) return;
    fromRef.current = display;
    toRef.current = value;
    startRef.current = performance.now();
    if (flash) setFlashKey((k) => k + 1);

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const t = Math.min(1, elapsed / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = fromRef.current + (toRef.current - fromRef.current) * eased;
      setDisplay(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, flash]);

  const formatted = locale
    ? display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : display.toFixed(decimals);

  return (
    <span className={`tabular-nums ${className}`}>
      <span key={flashKey} className={flash ? "animate-yield-flash inline-block" : "inline-block"}>
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
