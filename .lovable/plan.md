
# Medimint Super App — Full Build Plan

This is a substantial expansion (~20 new routes/screens + data model + components). I'll preserve the current premium dark/gradient look and keep the mobile-first 480px shell.

## Scope (in order)

### 1. Foundation
- **Expand `mockData.ts`**: add richer machine detail (weekly tx, monthly yield series, daily tx breakdown), asset detail (event log w/ settlement status), per-event metadata (eventId, assetId, settlementStatus, txAmount), staking history with hashes, marketplace categories (Health Packages, Doctor Consult, Supplements, Wellness, Diagnostics, Longevity), product detail data, profile/KYC, notification preferences.
- **Shared components**: `HashChip` (copy-to-clipboard hash w/ explorer link), `EmptyState`, `BottomSheet` (modal), `StatTile`, `MiniBarChart` (daily transactions), `LineChart` reuse, `ProgressRing` reuse.
- **Bottom nav**: add **Staking** as 5th tab; move Rewards into a 6-tab layout (Home / Assets / Activity / Staking / Market / Rewards). Compact icons + labels to fit 6.

### 2. Home enhancements
Keep current layout, add: Monthly Appreciation %, Active Assets count, Top Yield Asset row, expanded Quick Actions (Stake, Claim, Marketplace, Assets), each yield feed item gets "View Details" → opens event bottom sheet with full metadata + hash.

### 3. Assets module
- Sub-tabs preserved (Tokens / Machines / Asset IDs) — enrich with Pending Rewards, Next Reward Date, Estimated Appreciation, Token Perf Indicator.
- **New route** `/assets/machines/$machineId` — overview, status, tx today/week, yield today/month, daily tx bar chart, monthly yield line chart, yield events timeline w/ hashes, blockchain verification panel, Export Report + View Linked Asset.
- **New route** `/assets/ids/$assetId` — overview, machine mapping, token allocation, yield history line, event timeline, hash log.

### 4. Activity module
3 tabs: Yield Events (filters: date/machine/highest yield), Daily Transactions (expandable day cards with machine breakdown), Notifications (search + mark-all-read + category filters). Event tap → `/activity/event/$eventId` detail (or bottom sheet) with full metadata.

### 5. Staking (new tab/route `/staking`)
Dashboard (Total Staked, Available, APY, Reward Rate, Monthly Projection, Lifetime Rewards, Next Reward), actions (Stake/Unstake/Claim — bottom-sheet forms), Auto-Compound toggle, Reward Calculator (slider), history table w/ hashes, earnings + projection chart.

### 6. Notifications (`/notifications`)
Full center: search, category filters, read/unread, mark all, preferences subpage. Header bell links here (currently links to /activity).

### 7. Marketplace
Reorder/add categories (Health Packages, Doctor Consultation, Supplements, Wellness Programs, Diagnostics, Longevity Plans). **New route** `/marketplace/$productId` — images, description, benefits, delivery, provider, reviews, price. CTA Pay with MDMT → 3-step checkout flow (`/marketplace/checkout/$productId`): summary → confirm → success with order #, ref ID, tx hash, download receipt.

### 8. Rewards
Keep current ring; add Monthly Rewards stat, Claim Rewards workflow (bottom sheet), explicit Status states (Pending/Credited/Claimed), Reward Conversion Formula card already exists — enrich.

### 9. Onboarding (`/onboarding`)
6 swipeable screens: Welcome → Connect Wallet → Link Assets → How Yield Works → Marketplace Benefits → Rewards. "Skip" + final "Go to Dashboard". Show once via localStorage flag (intercept on first visit to `/`).

### 10. Profile & Settings (`/profile`, `/settings`)
Profile: Personal Info, Wallet Info, Linked Assets summary, KYC Status badge. Settings sub-sections: Notifications, Security (Biometrics/Passcode/2FA toggles), Rewards Preferences. Header avatar opens Profile.

### 11. Transparency Hub (`/transparency`)
Linked from Home + Profile + footer. Sections: Blockchain Verification, Yield Audit Trail (recent events), Asset Ownership Records, Machine Performance Verification, Hash Explorer (search by hash), Download/Export Report buttons (mock CSV).

### 12. Empty states + micro-interactions
EmptyState component used across all lists. Add subtle animation: live counter ticking on Home (yield today increments every few seconds), notification badge count, framer-motion fade-in on new feed items.

## Technical Details

- All data stays in `mockData.ts` (no backend) — no Cloud activation needed.
- Routing: TanStack file routes with `$param` for detail pages, dot-separated filenames (e.g. `assets.machines.$machineId.tsx`).
- Each route gets `head()` meta + `errorComponent` + `notFoundComponent`.
- Bottom sheets via shadcn `Drawer`.
- Charts: reuse `AreaChart` + new lightweight `BarChart` SVG.
- Hash chip: `navigator.clipboard.writeText` + toast.
- Live counter: `useEffect` interval + framer-motion `animate`.
- 6-tab nav: tighten padding, 10px labels, allow horizontal scroll fallback.

## What I'm NOT doing (unless you say so)
- Real wallet connect / real blockchain — all simulated.
- Backend, auth, DB (no Lovable Cloud).
- Light mode polish — keeping dark theme as primary (tokens already support both).
- Real push notifications.

## Approx output
~20 new route files, 6–8 new components, expanded mockData, updated AppShell + BottomNav. Should keep visual language identical (gradient cards, brand palette, framer-motion).

Ready to build — confirm and I'll ship it in one pass.
