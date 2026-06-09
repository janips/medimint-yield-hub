
# Medimint — "Live Platform" Upgrade Plan

A large, multi-area change. I will preserve the current visual identity, navigation, route structure, and dark gradient design language. No backend — everything simulated in the frontend.

I'll ship this in phased commits inside one build pass so the app stays runnable between phases.

---

## Phase 1 — Branding

- Add official Medimint logo assets (light + dark) and replace `BrandLogo` usage across AppShell, BottomNav header, login/onboarding, splash, and desktop nav.
- Generate: light logo, dark logo, app icon, favicon, splash screen (premium imagegen).
- Replace `public/icons/*` and `public/manifest.webmanifest` icon refs.
- Update `__root.tsx` head: favicon, theme-color, apple-touch-icon, splash.

> Question: I don't have the real Medimint logo file. I'll generate a clean wordmark+symbol in the existing brand palette (cyan/teal→violet gradient already used as `bg-gradient-brand`). If you have an official SVG/PNG, drop it in and I'll swap.

---

## Phase 2 — Simulation Engine (the heart)

Extend `src/lib/liveYield.ts` → rename concept to **`simEngine`** (keep old hook as a thin re-export so existing screens keep working). Single source of truth for:

- Machines (Active / Maintenance counts, last-seen timestamp)
- Live transaction stream (every 10–20s, jittered)
- Today's counters: transactions, revenue (AED), yield (MDMT)
- Lifetime counters
- Rolling 7D / 30D / 90D series for transactions, revenue, yield
- Activity feed (last ~50 events)
- Notification stream

Each tick:
1. Pick a random Active machine, generate a transaction:
   - `type` (Patient Scan, Completed Scan, Diagnostic Report, Lab Result, Consultation)
   - `revenueAED` (machine-type-aware band, e.g. MRI 200–350, CT 150–280, Lab 30–80)
   - `yieldMDMT = revenueAED * machine.yieldRate` (keeps yield ↔ revenue logical)
   - `hash` (12-hex), `fullHash` (40-hex), `assetId`, `bucketId`, timestamp
2. Push into activity feed, increment today counters, append to series tail.
3. Occasionally (1 in 4) emit a notification of the appropriate type.
4. Rare events: machine flips Active↔Maintenance (~1% per tick) so "Machines Under Maintenance" actually moves.

Exposed via `useSimEngine()` with `useSyncExternalStore`. All existing screens continue using `useLiveYield()` which now reads from the engine.

---

## Phase 3 — Asset Buckets (data model redesign)

In `mockData.ts`:

- Introduce `assetBuckets: [{ id: 'alpha', name: 'Asset Bucket Alpha', machineIds: [...], tokens, ... }]` — Alpha / Beta / Gamma.
- Each machine carries `bucketId` and `yieldRate` (MDMT per AED).
- Replace "4 Machines · 7 Assets · 7 Active" tiles on Assets screen with a Bucket list:
  - Card per bucket: machine count, Yield Today (live), Lifetime Yield (live), mini sparkline, drill-in.
- New route `assets.buckets.$bucketId.tsx`: bucket overview → machine list (reuses existing machine detail page).
- Keep existing Tokens / Machines / Asset IDs sub-tabs but reframe headline metrics as bucket-first.

---

## Phase 4 — Live Operations Center (Home)

New section above existing Home content:

- **LIVE NETWORK STATUS** card with pulsing green dot + "LIVE" pill.
  - Machines Active / Under Maintenance
  - Transactions Today / Revenue Today (AED) / Yield Distributed Today (MDMT)
  - "Last transaction received: MRI-DXB-003 · 3s ago" (auto-ticks)
- Existing Yield Today / Lifetime tiles stay (already animated).
- Real-time activity feed component (`<LiveActivityFeed/>`) — animated insert at top, capped list, hash chip + settlement pill.

---

## Phase 5 — Dynamic Charts (7D / 30D / 90D)

- New `<RangeChart>` wrapper around existing `AreaChart` / `BarChart` with tab pill (7D / 30D / 90D).
- Datasets generated per range from `simEngine` history + seeded back-fill (different shapes per range — weekly cycles for 7D, weekday utilization curves for 30D, seasonal drift for 90D).
- Animate transition between ranges (framer-motion).
- Used on Home (Yield + Transactions) and Bucket / Machine detail.

---

## Phase 6 — Yield Logic Correction

Centralize formula: every displayed (Transactions, Revenue, Yield) triplet derives from the same tick stream.

- Home Today tile: shows all three with logical ratio (e.g. avg ~AED 150/tx, ~2% MDMT yield rate → 906 tx · AED 136,000 · 2,720 MDMT).
- Machine detail: derived from machine-specific rate.
- Bucket detail: sum of contained machines.
- Remove any hard-coded yield values that don't trace back to revenue.

---

## Phase 7 — Notifications

- Engine already pushes "Your asset generated yield" entries.
- Add categories: yield, transaction, maintenance, payout, marketplace.
- Notification center: keep existing filters; add toast for newly arriving notifications when app is foregrounded (uses existing `sonner`).

---

## Phase 8 — Desktop / Responsive Layout

- `AppShell` currently 480px mobile shell. Add `lg:` breakpoint:
  - `lg`: switch to two-pane: left sidebar nav (Dashboard / Assets / Activity / Marketplace / Rewards / Reports / Transparency Hub / Settings), main content max-w-7xl, multi-column grids for stats.
  - Bottom nav hidden on `lg`.
- Tablet (`md`): widen shell to 768, two-col grids.
- Home/Assets/Marketplace get desktop grid variants (CSS only — same components).
- Add `/reports` route (was missing) that surfaces investor statements / CSV exports.

---

## Phase 9 — Marketplace Expansion

Replace placeholder products in `mockData.ts` with full catalog:

- Doctor Consultation, Supplements, MDMT Platform Subscription, Health Reward Subscription, Digital Diagnostic Subscription, AI Doctor Subscription, Digital Medical Records, Medicine Reminder, Longevity Programs, Diagnostics Packages, Wellness Programs.
- Each item: image (gradient + icon, generated), description, benefits[], provider, price (MDMT + AED), reviews[].
- Product detail page already exists — enrich.

### Checkout
Extend `marketplace.checkout.$productId.tsx`:
- Step 1: Payment method picker (Pay with MDMT | Credit Card | Debit Card | Apple Pay | Google Pay | UPI).
- Step 2: Method-specific form (mock fields).
- Step 3: Success with order #, ref ID, tx hash.

---

## Phase 10 — Transparency Hub

Expand `/transparency` into a full hub with sections:

- Asset Ownership Records (per bucket → per asset id)
- Machine Registry (all machines + status, manufacturer, serial, commissioned)
- Yield Distribution History (live feed snapshot, paginated)
- Blockchain Hash Explorer (search box prefilled via `?q=` — already partly supported)
- Yield Audit Trail (event → asset → bucket → owner chain)
- Revenue Distribution History
- Investor Statements (downloadable mock PDF/CSV)
- Export Transaction History (CSV download generated client-side from sim engine)

---

## Technical Details

- All sim state in `src/lib/simEngine.ts`, single tick loop, `useSyncExternalStore`.
- Charts: reuse existing `AreaChart`/`BarChart`, add `RangeChart` shell.
- New components: `LiveStatusCard`, `LiveActivityFeed`, `BucketCard`, `RangeChart`, `MetricTriplet`, `DesktopSidebar`, `PaymentMethodPicker`, `CsvDownloadButton`.
- New routes: `assets.buckets.$bucketId.tsx`, `reports.tsx`.
- No new dependencies needed.
- No backend / Cloud activation.
- Mock data only; logos generated via `imagegen` (premium for text-bearing logo).

---

## Out of Scope (call out if you want them)
- Real auth / real wallet connect.
- Real payments (Stripe/Paddle) — checkout stays simulated.
- Real PDF generation for statements — CSV + printable HTML view instead.
- Capacitor / native Android wrap (separate path, already discussed).

---

This is a big pass — ~10–14 new/edited files plus assets. Confirm and I'll execute end-to-end.
