export const user = {
  name: "Arjun",
  fullName: "Arjun Mehta",
  email: "arjun.mehta@medimint.io",
  wallet: "0x91F23A8B7C4D8E1F9A2C5E7B91FA82D37A4C",
  walletShort: "0x91F2...7A4C",
  kycStatus: "Verified" as const,
  joined: "Aug 2024",
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
  activeAssets: 7,
  txToday: 128,
  yieldEventsToday: 128,
  topMachine: "MRI-DXB-003",
  topAsset: "ASSET-000392",
};

export const linkedAssets = {
  machines: 4,
  assetIds: 7,
};

export type MachineStatus = "Active" | "Maintenance" | "Offline";

export interface Machine {
  id: string;
  type: string;
  location: string;
  status: MachineStatus;
  txToday: number;
  yieldToday: number;
  txWeek: number;
  yieldMonth: number;
  trend: number[];
  dailyTx: number[];
  monthlyYield: number[];
  assetIds: string[];
  totalSupply: number;
  ownedSince: string;
  manufacturer: string;
  serial: string;
  commissioned: string;
  uptimePct: number;
  lifetimeTx: number;
  lifetimeYield: number;
  avgYieldPerTx: number;
}

export const machines: Machine[] = [
  {
    id: "MRI-DXB-003",
    type: "MRI 3T",
    location: "Mediclinic, Dubai",
    status: "Active",
    txToday: 48,
    yieldToday: 7.24,
    txWeek: 312,
    yieldMonth: 196.4,
    trend: [22, 28, 34, 30, 38, 44, 48],
    dailyTx: [38, 44, 36, 48, 52, 41, 48],
    monthlyYield: [142, 156, 168, 174, 182, 196],
    assetIds: ["ASSET-000392", "ASSET-000418"],
    totalSupply: 100000,
    ownedSince: "Aug 14, 2024",
    manufacturer: "Siemens Healthineers",
    serial: "SH-MRI3T-DXB-003",
    commissioned: "Mar 02, 2023",
    uptimePct: 98.4,
    lifetimeTx: 14820,
    lifetimeYield: 2184.6,
    avgYieldPerTx: 0.147,
  },
  {
    id: "CT-MUM-011",
    type: "CT 128-Slice",
    location: "Apollo, Mumbai",
    status: "Active",
    txToday: 36,
    yieldToday: 4.82,
    txWeek: 248,
    yieldMonth: 144.2,
    trend: [18, 22, 26, 24, 30, 32, 36],
    dailyTx: [28, 32, 26, 34, 36, 30, 36],
    monthlyYield: [112, 118, 124, 132, 138, 144],
    assetIds: ["ASSET-000507", "ASSET-000612"],
    totalSupply: 80000,
    ownedSince: "Sep 22, 2024",
    manufacturer: "GE Healthcare",
    serial: "GE-CT128-MUM-011",
    commissioned: "Jun 18, 2022",
    uptimePct: 97.1,
    lifetimeTx: 12440,
    lifetimeYield: 1648.2,
    avgYieldPerTx: 0.132,
  },
  {
    id: "MRI-SGP-007",
    type: "MRI 1.5T",
    location: "Mount Elizabeth, SG",
    status: "Maintenance",
    txToday: 12,
    yieldToday: 1.92,
    txWeek: 184,
    yieldMonth: 118.6,
    trend: [20, 24, 22, 26, 22, 18, 12],
    dailyTx: [24, 22, 26, 22, 18, 16, 12],
    monthlyYield: [98, 104, 112, 118, 122, 118],
    assetIds: ["ASSET-000724"],
  },
  {
    id: "CT-RUH-022",
    type: "CT 256-Slice",
    location: "King Faisal, Riyadh",
    status: "Active",
    txToday: 32,
    yieldToday: 4.44,
    txWeek: 224,
    yieldMonth: 128.9,
    trend: [16, 20, 24, 26, 28, 30, 32],
    dailyTx: [22, 26, 24, 28, 30, 28, 32],
    monthlyYield: [102, 108, 116, 120, 124, 128],
    assetIds: ["ASSET-000819", "ASSET-000901"],
  },
];

export interface AssetId {
  id: string;
  machineId: string;
  tokens: number;
  ratePct: number;
  earned: number;
  yieldHistory: number[];
}

export const assetIds: AssetId[] = [
  { id: "ASSET-000392", machineId: "MRI-DXB-003", tokens: 8200, ratePct: 14.2, earned: 1248.4, yieldHistory: [180, 198, 212, 226, 238, 248] },
  { id: "ASSET-000418", machineId: "MRI-DXB-003", tokens: 4400, ratePct: 13.8, earned: 642.1, yieldHistory: [92, 98, 104, 112, 118, 124] },
  { id: "ASSET-000507", machineId: "CT-MUM-011", tokens: 6100, ratePct: 12.9, earned: 884.6, yieldHistory: [126, 134, 142, 150, 158, 168] },
  { id: "ASSET-000612", machineId: "CT-MUM-011", tokens: 2200, ratePct: 12.4, earned: 312.2, yieldHistory: [48, 50, 54, 58, 60, 62] },
  { id: "ASSET-000724", machineId: "MRI-SGP-007", tokens: 3300, ratePct: 11.6, earned: 418.7, yieldHistory: [68, 72, 76, 80, 82, 78] },
  { id: "ASSET-000819", machineId: "CT-RUH-022", tokens: 2750, ratePct: 13.1, earned: 396.5, yieldHistory: [58, 62, 66, 70, 74, 78] },
  { id: "ASSET-000901", machineId: "CT-RUH-022", tokens: 1500, ratePct: 12.7, earned: 216.3, yieldHistory: [32, 34, 36, 40, 42, 44] },
];

export type SettlementStatus = "Settled" | "Pending" | "Confirming";

export interface YieldEvent {
  eventId: string;
  time: string;
  timestamp: string;
  machine: string;
  assetId: string;
  amount: number;
  txAmount: number;
  hash: string;
  fullHash: string;
  settlement: SettlementStatus;
}

export const yieldEvents: YieldEvent[] = [
  { eventId: "EVT-99421", time: "10:21", timestamp: "Today · 10:21:04", machine: "MRI-DXB-003", assetId: "ASSET-000392", amount: 0.142, txAmount: 1, hash: "0xA91F...3E2C", fullHash: "0xA91F8C3D2B7E4F0A8C1D6E5B2F9A4C7D3E2C", settlement: "Settled" },
  { eventId: "EVT-99420", time: "10:08", timestamp: "Today · 10:08:42", machine: "CT-MUM-011", assetId: "ASSET-000507", amount: 0.118, txAmount: 1, hash: "0x77B2...91F4", fullHash: "0x77B2E4C8A1D5F0B3E6C9A2D7F4B1E8C591F4", settlement: "Settled" },
  { eventId: "EVT-99419", time: "09:54", timestamp: "Today · 09:54:11", machine: "CT-RUH-022", assetId: "ASSET-000819", amount: 0.124, txAmount: 1, hash: "0xC3D5...88A1", fullHash: "0xC3D5A7E2F8B1C4D9E0A3B6F2C5D8E1A488A1", settlement: "Settled" },
  { eventId: "EVT-99418", time: "09:41", timestamp: "Today · 09:41:28", machine: "MRI-DXB-003", assetId: "ASSET-000418", amount: 0.139, txAmount: 1, hash: "0x4E1A...02B7", fullHash: "0x4E1A6F3C8D2B5E0A7C4F1B8D2E5A6C9F02B7", settlement: "Settled" },
  { eventId: "EVT-99417", time: "09:22", timestamp: "Today · 09:22:05", machine: "CT-MUM-011", assetId: "ASSET-000507", amount: 0.121, txAmount: 1, hash: "0x6F09...AD33", fullHash: "0x6F09B4D2A8C1E5F0B3D6A2C9E4F1B8D5AD33", settlement: "Settled" },
  { eventId: "EVT-99416", time: "08:58", timestamp: "Today · 08:58:47", machine: "CT-RUH-022", assetId: "ASSET-000901", amount: 0.128, txAmount: 1, hash: "0x8B12...77E0", fullHash: "0x8B12A5D8C2E4F0B7D1A6C9E2F5B8D4A177E0", settlement: "Confirming" },
  { eventId: "EVT-99415", time: "08:33", timestamp: "Today · 08:33:19", machine: "MRI-DXB-003", assetId: "ASSET-000392", amount: 0.144, txAmount: 1, hash: "0x21C0...9D44", fullHash: "0x21C0E6F4B8D2A5C1E7F0B3D6A2C9E4F19D44", settlement: "Settled" },
  { eventId: "EVT-99414", time: "08:11", timestamp: "Today · 08:11:02", machine: "MRI-SGP-007", assetId: "ASSET-000724", amount: 0.096, txAmount: 1, hash: "0xE509...AA10", fullHash: "0xE509A2C8D1F4B7E0A3C6D9F2B5E8A4C1AA10", settlement: "Pending" },
];

export const dailyTotals = [
  { date: "Jan 28", tx: 164, yield: 18.42, breakdown: [{ m: "MRI-DXB-003", tx: 52, y: 7.4 }, { m: "CT-MUM-011", tx: 44, y: 5.2 }, { m: "CT-RUH-022", tx: 40, y: 4.6 }, { m: "MRI-SGP-007", tx: 28, y: 1.2 }] },
  { date: "Jan 27", tx: 139, yield: 15.78, breakdown: [{ m: "MRI-DXB-003", tx: 44, y: 6.2 }, { m: "CT-MUM-011", tx: 38, y: 4.6 }, { m: "CT-RUH-022", tx: 34, y: 3.8 }, { m: "MRI-SGP-007", tx: 23, y: 1.18 }] },
  { date: "Jan 26", tx: 152, yield: 17.04, breakdown: [{ m: "MRI-DXB-003", tx: 48, y: 6.8 }, { m: "CT-MUM-011", tx: 42, y: 5.0 }, { m: "CT-RUH-022", tx: 36, y: 4.0 }, { m: "MRI-SGP-007", tx: 26, y: 1.24 }] },
  { date: "Jan 25", tx: 128, yield: 14.31, breakdown: [{ m: "MRI-DXB-003", tx: 38, y: 5.4 }, { m: "CT-MUM-011", tx: 34, y: 4.2 }, { m: "CT-RUH-022", tx: 32, y: 3.6 }, { m: "MRI-SGP-007", tx: 24, y: 1.11 }] },
  { date: "Jan 24", tx: 144, yield: 16.22, breakdown: [{ m: "MRI-DXB-003", tx: 46, y: 6.4 }, { m: "CT-MUM-011", tx: 38, y: 4.6 }, { m: "CT-RUH-022", tx: 34, y: 3.8 }, { m: "MRI-SGP-007", tx: 26, y: 1.42 }] },
  { date: "Jan 23", tx: 117, yield: 13.06, breakdown: [{ m: "MRI-DXB-003", tx: 36, y: 5.0 }, { m: "CT-MUM-011", tx: 30, y: 3.6 }, { m: "CT-RUH-022", tx: 30, y: 3.4 }, { m: "MRI-SGP-007", tx: 21, y: 1.06 }] },
  { date: "Jan 22", tx: 158, yield: 17.88, breakdown: [{ m: "MRI-DXB-003", tx: 50, y: 7.0 }, { m: "CT-MUM-011", tx: 42, y: 5.0 }, { m: "CT-RUH-022", tx: 38, y: 4.2 }, { m: "MRI-SGP-007", tx: 28, y: 1.68 }] },
];

export const txSeries = [98, 112, 124, 117, 139, 152, 164];
export const yieldSeries = [10.2, 12.4, 13.8, 13.1, 15.8, 17.0, 18.4];
export const txSeries30 = [98, 102, 110, 108, 118, 124, 117, 122, 130, 128, 135, 142, 138, 145, 152, 148, 156, 160, 158, 164, 168, 172, 166, 174, 178, 182, 178, 185, 190, 196];
export const yieldSeries30 = [10.2, 10.8, 11.4, 11.0, 12.4, 13.8, 13.1, 13.6, 14.2, 14.0, 14.8, 15.4, 15.0, 15.8, 17.0, 16.4, 17.2, 18.0, 17.4, 18.4, 18.8, 19.2, 18.6, 19.4, 19.8, 20.2, 19.8, 20.6, 21.0, 21.4];

export type NotifType = "yield" | "stake" | "market" | "appr" | "reward";

export interface Notification {
  id: number;
  type: NotifType;
  title: string;
  desc: string;
  time: string;
  hash?: string;
  read: boolean;
  link?: string;
}

export const notifications: Notification[] = [
  { id: 1, type: "yield", title: "Yield Generated", desc: "MRI-DXB-003 · 0.142 MDMT", time: "2m ago", hash: "0xA91F...3E2C", read: false, link: "/activity" },
  { id: 2, type: "stake", title: "Staking Reward Credited", desc: "+12.40 MDMT to wallet", time: "1h ago", read: false, link: "/staking" },
  { id: 3, type: "yield", title: "Yield Generated", desc: "CT-MUM-011 · 0.118 MDMT", time: "1h ago", hash: "0x77B2...91F4", read: false, link: "/activity" },
  { id: 4, type: "market", title: "Order Confirmed", desc: "Longevity Panel · 240 MDMT", time: "5h ago", read: true, link: "/marketplace" },
  { id: 5, type: "appr", title: "Asset Appreciation", desc: "Portfolio +1.2% today", time: "8h ago", read: true, link: "/assets" },
  { id: 6, type: "reward", title: "Reward Claimed", desc: "+3.06 MDMT wellness reward", time: "Yesterday", read: true, link: "/rewards" },
  { id: 7, type: "yield", title: "Yield Generated", desc: "CT-RUH-022 · 0.128 MDMT", time: "Yesterday", hash: "0x8B12...77E0", read: true, link: "/activity" },
];

export interface MarketItem {
  id: string;
  title: string;
  category: string;
  price: number;
  blurb: string;
  emoji: string;
  description: string;
  benefits: string[];
  delivery: string;
  provider: string;
  rating: number;
  reviewCount: number;
}

export const marketplace: MarketItem[] = [
  {
    id: "m1", title: "Longevity Diagnostic Panel", category: "Diagnostics", price: 240, blurb: "Full-body biomarker mapping & report.", emoji: "🧬",
    description: "A comprehensive 180-biomarker panel mapping hormonal, metabolic, cardiovascular, and inflammatory markers. Delivered with a personalized clinician report.",
    benefits: ["180+ biomarker analysis", "Clinician-reviewed report", "Personalised action plan", "Annual follow-up included"],
    delivery: "At-home phlebotomy · 5 business days", provider: "Quantum Diagnostics", rating: 4.8, reviewCount: 1284,
  },
  {
    id: "m2", title: "Online Doctor Consult", category: "Doctor Consultation", price: 35, blurb: "30-min specialist video session.", emoji: "🩺",
    description: "Connect with a board-certified specialist from a curated network of 600+ doctors across 24 specialties. Includes prescription and follow-up notes.",
    benefits: ["30-min video session", "E-prescription included", "Follow-up notes via app", "Available in 18 languages"],
    delivery: "Instant booking · Same day", provider: "Medimint Care Network", rating: 4.9, reviewCount: 8420,
  },
  {
    id: "m3", title: "Sleep & Recovery Pack", category: "Wellness Programs", price: 88, blurb: "12-week guided recovery plan.", emoji: "🌙",
    description: "A 12-week sleep coaching program built around wearable data, CBT-I protocols, and personalized recovery routines.",
    benefits: ["Weekly 1:1 coaching", "Wearable sync & insights", "CBT-I evidence-based", "Lifetime program access"],
    delivery: "Digital · Starts within 48h", provider: "Restful Labs", rating: 4.7, reviewCount: 612,
  },
  {
    id: "m4", title: "Mitochondrial Boost Stack", category: "Supplements", price: 64, blurb: "30-day NAD+ & CoQ10 stack.", emoji: "⚡",
    description: "Clinical-grade supplement stack including NAD+ precursors, CoQ10, PQQ, and magnesium glycinate. Third-party lab tested.",
    benefits: ["NMN 500mg daily", "Ubiquinol CoQ10", "Third-party tested", "Free reorder reminder"],
    delivery: "Worldwide shipping · 3-5 days", provider: "Apex Longevity", rating: 4.6, reviewCount: 944,
  },
  {
    id: "m5", title: "Executive MRI Screening", category: "Diagnostics", price: 480, blurb: "Premium MRI at partner clinics.", emoji: "🧠",
    description: "Whole-body MRI screening at top-tier diagnostic centers. Includes radiologist review and concierge scheduling.",
    benefits: ["Whole-body 3T MRI", "Radiologist double-read", "Concierge scheduling", "Secure digital report"],
    delivery: "Partner clinic visit · By appointment", provider: "Medimint Partner Network", rating: 4.9, reviewCount: 287,
  },
  {
    id: "m6", title: "Cardio Vitality Program", category: "Wellness Programs", price: 120, blurb: "Heart-rate guided 8-week plan.", emoji: "❤️",
    description: "Heart-rate variability guided 8-week cardiovascular conditioning program with weekly coach calls.",
    benefits: ["HRV-guided training", "Weekly coach call", "Custom workout plan", "Progress dashboard"],
    delivery: "Digital · Starts within 24h", provider: "PulseFit Coaching", rating: 4.8, reviewCount: 521,
  },
  {
    id: "m7", title: "Annual Health Package", category: "Health Packages", price: 380, blurb: "Full annual checkup bundle.", emoji: "🩹",
    description: "All-in-one annual health package including diagnostics, doctor consults, dental check, and wellness coaching.",
    benefits: ["Annual full checkup", "4 doctor consultations", "Dental & vision", "Wellness coaching"],
    delivery: "Multi-clinic · 30-day window", provider: "Medimint Care Network", rating: 4.9, reviewCount: 1480,
  },
  {
    id: "m8", title: "Longevity Plan Premium", category: "Longevity Plans", price: 720, blurb: "12-month longevity protocol.", emoji: "🧘",
    description: "12-month longevity protocol combining diagnostics, supplementation, and lifestyle coaching.",
    benefits: ["Quarterly biomarkers", "Personalised supplement plan", "Bi-weekly coaching", "Member-only events"],
    delivery: "Full year access · Onboarding within 7d", provider: "Apex Longevity", rating: 4.9, reviewCount: 198,
  },
];

export const marketCategories = [
  "All", "Health Packages", "Doctor Consultation", "Supplements", "Wellness Programs", "Diagnostics", "Longevity Plans",
];

export type RewardStatus = "Pending" | "Credited" | "Claimed";

export const rewards = {
  steps: 7820,
  stepsGoal: 10000,
  calories: 412,
  earnedToday: 2.14,
  streak: 12,
  monthlyMdmt: 68.42,
  ledger: [
    { date: "Jan 28", steps: 7820, calories: 412, mdmt: 2.14, status: "Pending" as RewardStatus },
    { date: "Jan 27", steps: 10240, calories: 540, mdmt: 3.06, status: "Credited" as RewardStatus },
    { date: "Jan 26", steps: 8890, calories: 478, mdmt: 2.62, status: "Credited" as RewardStatus },
    { date: "Jan 25", steps: 11380, calories: 612, mdmt: 3.42, status: "Claimed" as RewardStatus },
    { date: "Jan 24", steps: 9120, calories: 488, mdmt: 2.74, status: "Claimed" as RewardStatus },
    { date: "Jan 23", steps: 8410, calories: 446, mdmt: 2.46, status: "Claimed" as RewardStatus },
    { date: "Jan 22", steps: 12200, calories: 658, mdmt: 3.66, status: "Claimed" as RewardStatus },
  ],
};

export const staking = {
  totalStaked: 12800,
  available: 15650,
  apy: 11.4,
  rewardRate: "0.031% / day",
  monthlyProjection: 121.6,
  totalEarned: 1842.6,
  nextReward: "in 2d 14h",
  autoCompound: true,
  history: [
    { date: "Jan 26", amount: 12.40, ref: "STK-44218", hash: "0x3A1E5C8D7B92F0A4C1E6B3D8F2A5C77BB", status: "Credited" as const },
    { date: "Jan 19", amount: 11.96, ref: "STK-44102", hash: "0x91C2A8E4F0B7D3C5A1E8F2B6D9C44A0", status: "Credited" as const },
    { date: "Jan 12", amount: 12.18, ref: "STK-43984", hash: "0x5F0827B4D1A8C6E3F0B5D2A7C91D3", status: "Credited" as const },
    { date: "Jan 05", amount: 11.74, ref: "STK-43872", hash: "0xC2A14F8B7D0E5C3A9F2B6D8C0E4F", status: "Credited" as const },
    { date: "Dec 29", amount: 11.42, ref: "STK-43760", hash: "0x88B1D5E4F0A7C3B2D6E9F1A4C5E2", status: "Credited" as const },
  ],
  growth: [1620, 1685, 1742, 1798, 1820, 1842, 1898, 1942, 1986, 2024, 2068, 2120],
  projection: [1842, 1898, 1956, 2014, 2074, 2136, 2200, 2266, 2334, 2404, 2476, 2550],
};

export function fmtMdmt(n: number, digits = 2) {
  return `${n.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits })} MDMT`;
}
export function fmtUsd(n: number) {
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export function findMachine(id: string) {
  return machines.find((m) => m.id === id);
}
export function findAsset(id: string) {
  return assetIds.find((a) => a.id === id);
}
export function findProduct(id: string) {
  return marketplace.find((m) => m.id === id);
}
export function findEvent(id: string) {
  return yieldEvents.find((e) => e.eventId === id);
}
export function eventsForMachine(machineId: string) {
  return yieldEvents.filter((e) => e.machine === machineId);
}
export function eventsForAsset(assetId: string) {
  return yieldEvents.filter((e) => e.assetId === assetId);
}
