export const user = {
  name: "Arjun",
  wallet: "0x91F2...7A4C",
};

export const portfolio = {
  totalTokens: 28450,
  totalValueUsd: 142250,
  yieldToday: 18.42,
  yieldLifetime: 4218.77,
  appreciationMonth: 6.4,
  staked: 12800,
  available: 15650,
  rewardsPending: 42.16,
};

export const linkedAssets = {
  machines: 4,
  assetIds: 7,
};

export const machines = [
  {
    id: "MRI-DXB-003",
    type: "MRI 3T",
    location: "Mediclinic, Dubai",
    status: "Active" as const,
    txToday: 48,
    yieldToday: 7.24,
    txWeek: 312,
    yieldMonth: 196.4,
    trend: [22, 28, 34, 30, 38, 44, 48],
  },
  {
    id: "CT-MUM-011",
    type: "CT 128-Slice",
    location: "Apollo, Mumbai",
    status: "Active" as const,
    txToday: 36,
    yieldToday: 4.82,
    txWeek: 248,
    yieldMonth: 144.2,
    trend: [18, 22, 26, 24, 30, 32, 36],
  },
  {
    id: "MRI-SGP-007",
    type: "MRI 1.5T",
    location: "Mount Elizabeth, SG",
    status: "Maintenance" as const,
    txToday: 12,
    yieldToday: 1.92,
    txWeek: 184,
    yieldMonth: 118.6,
    trend: [20, 24, 22, 26, 22, 18, 12],
  },
  {
    id: "CT-RUH-022",
    type: "CT 256-Slice",
    location: "King Faisal, Riyadh",
    status: "Active" as const,
    txToday: 32,
    yieldToday: 4.44,
    txWeek: 224,
    yieldMonth: 128.9,
    trend: [16, 20, 24, 26, 28, 30, 32],
  },
];

export const assetIds = [
  { id: "ASSET-000392", machineId: "MRI-DXB-003", tokens: 8200, ratePct: 14.2, earned: 1248.4 },
  { id: "ASSET-000418", machineId: "MRI-DXB-003", tokens: 4400, ratePct: 13.8, earned: 642.1 },
  { id: "ASSET-000507", machineId: "CT-MUM-011", tokens: 6100, ratePct: 12.9, earned: 884.6 },
  { id: "ASSET-000612", machineId: "CT-MUM-011", tokens: 2200, ratePct: 12.4, earned: 312.2 },
  { id: "ASSET-000724", machineId: "MRI-SGP-007", tokens: 3300, ratePct: 11.6, earned: 418.7 },
  { id: "ASSET-000819", machineId: "CT-RUH-022", tokens: 2750, ratePct: 13.1, earned: 396.5 },
  { id: "ASSET-000901", machineId: "CT-RUH-022", tokens: 1500, ratePct: 12.7, earned: 216.3 },
];

export const yieldEvents = [
  { time: "10:21", machine: "MRI-DXB-003", amount: 0.142, hash: "0xA91F...3E2C" },
  { time: "10:08", machine: "CT-MUM-011", amount: 0.118, hash: "0x77B2...91F4" },
  { time: "09:54", machine: "CT-RUH-022", amount: 0.124, hash: "0xC3D5...88A1" },
  { time: "09:41", machine: "MRI-DXB-003", amount: 0.139, hash: "0x4E1A...02B7" },
  { time: "09:22", machine: "CT-MUM-011", amount: 0.121, hash: "0x6F09...AD33" },
  { time: "08:58", machine: "CT-RUH-022", amount: 0.128, hash: "0x8B12...77E0" },
  { time: "08:33", machine: "MRI-DXB-003", amount: 0.144, hash: "0x21C0...9D44" },
  { time: "08:11", machine: "MRI-SGP-007", amount: 0.096, hash: "0xE509...AA10" },
];

export const dailyTotals = [
  { date: "Jan 28", tx: 164, yield: 18.42 },
  { date: "Jan 27", tx: 139, yield: 15.78 },
  { date: "Jan 26", tx: 152, yield: 17.04 },
  { date: "Jan 25", tx: 128, yield: 14.31 },
  { date: "Jan 24", tx: 144, yield: 16.22 },
  { date: "Jan 23", tx: 117, yield: 13.06 },
  { date: "Jan 22", tx: 158, yield: 17.88 },
];

export const txSeries = [98, 112, 124, 117, 139, 152, 164];
export const yieldSeries = [10.2, 12.4, 13.8, 13.1, 15.8, 17.0, 18.4];

export const notifications = [
  { id: 1, type: "yield", title: "Yield Generated", desc: "MRI-DXB-003 · 0.142 MDMT", time: "2m ago", hash: "0xA91F...3E2C" },
  { id: 2, type: "stake", title: "Staking Reward Credited", desc: "+12.40 MDMT to wallet", time: "1h ago" },
  { id: 3, type: "yield", title: "Yield Generated", desc: "CT-MUM-011 · 0.118 MDMT", time: "1h ago", hash: "0x77B2...91F4" },
  { id: 4, type: "market", title: "Order Confirmed", desc: "Longevity Panel · 240 MDMT", time: "5h ago" },
  { id: 5, type: "appr", title: "Asset Appreciation", desc: "Portfolio +1.2% today", time: "8h ago" },
];

export const marketplace = [
  { id: "m1", title: "Longevity Diagnostic Panel", category: "Diagnostics", price: 240, blurb: "Full-body biomarker mapping & report.", emoji: "🧬" },
  { id: "m2", title: "Online Doctor Consult", category: "Consultation", price: 35, blurb: "30-min specialist video session.", emoji: "🩺" },
  { id: "m3", title: "Sleep & Recovery Pack", category: "Wellness", price: 88, blurb: "12-week guided recovery plan.", emoji: "🌙" },
  { id: "m4", title: "Mitochondrial Boost Stack", category: "Supplements", price: 64, blurb: "30-day NAD+ & CoQ10 stack.", emoji: "⚡" },
  { id: "m5", title: "Executive MRI Screening", category: "Diagnostics", price: 480, blurb: "Premium MRI at partner clinics.", emoji: "🧠" },
  { id: "m6", title: "Cardio Vitality Program", category: "Wellness", price: 120, blurb: "Heart-rate guided 8-week plan.", emoji: "❤️" },
];

export const rewards = {
  steps: 7820,
  stepsGoal: 10000,
  calories: 412,
  earnedToday: 2.14,
  streak: 12,
  ledger: [
    { date: "Jan 28", steps: 7820, calories: 412, mdmt: 2.14, status: "Pending" },
    { date: "Jan 27", steps: 10240, calories: 540, mdmt: 3.06, status: "Credited" },
    { date: "Jan 26", steps: 8890, calories: 478, mdmt: 2.62, status: "Credited" },
    { date: "Jan 25", steps: 11380, calories: 612, mdmt: 3.42, status: "Credited" },
    { date: "Jan 24", steps: 9120, calories: 488, mdmt: 2.74, status: "Credited" },
  ],
};

export const staking = {
  totalStaked: 12800,
  apy: 11.4,
  nextReward: "in 2d 14h",
  totalEarned: 1842.6,
  history: [
    { date: "Jan 26", amount: 12.40, ref: "0x3A1E...77BB" },
    { date: "Jan 19", amount: 11.96, ref: "0x91C2...44A0" },
    { date: "Jan 12", amount: 12.18, ref: "0x5F08...91D3" },
    { date: "Jan 05", amount: 11.74, ref: "0xC2A1...0E4F" },
  ],
};

export function fmtMdmt(n: number, digits = 2) {
  return `${n.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits })} MDMT`;
}
export function fmtUsd(n: number) {
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}
