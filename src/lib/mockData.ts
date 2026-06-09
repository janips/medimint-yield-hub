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
  name?: string;
  type: string;
  location: string;
  status: MachineStatus;
  txToday: number;
  yieldToday: number;
  txWeek: number;
  txMonth?: number;
  yieldMonth: number;
  revenueGeneratedAED?: number;
  trend: number[];
  dailyTx: number[];
  dailyYield: number[];
  monthlyYield: number[];
  assetIds: string[];
  totalSupply: number;
  ownedSince: string;
  launchDate?: string;
  manufacturer: string;
  model?: string;
  serial: string;
  commissioned: string;
  uptimePct: number;
  utilizationPct?: number;
  lifetimeTx: number;
  lifetimeYield: number;
  avgYieldPerTx: number;
  currentAPY?: number;
  totalStaked?: number;
  numInvestors?: number;
  badge?: "Top Performing" | "New" | null;
  bucketId?: string;
  // investor-specific
  myStake?: number;
  myStakeDate?: string;
  myPendingRewards?: number;
  myRewardsEarned?: number;
  peakHours?: string;
  avgDailyScans?: number;
  scansToday?: number;
  scansWeek?: number;
  scansMonth?: number;
}

export const machines: Machine[] = [
  {
    id: "MRI-DXB-003",
    name: "Mediclinic MRI Suite 3",
    type: "MRI 3T",
    location: "Mediclinic, Dubai",
    status: "Active",
    txToday: 148, yieldToday: 7.24,
    txWeek: 982, txMonth: 4285, yieldMonth: 196.4,
    revenueGeneratedAED: 642_500,
    trend: [22, 28, 34, 30, 38, 44, 48],
    dailyTx: [38, 44, 36, 48, 52, 41, 48],
    dailyYield: [5.42, 6.18, 5.04, 6.84, 7.42, 5.86, 7.24],
    monthlyYield: [142, 156, 168, 174, 182, 196],
    assetIds: ["ASSET-000392", "ASSET-000418"],
    totalSupply: 100000, ownedSince: "Aug 14, 2024", launchDate: "Jan 2024",
    manufacturer: "Siemens Healthineers", model: "MAGNETOM Vida 3T",
    serial: "SH-MRI3T-DXB-003", commissioned: "Mar 02, 2023",
    uptimePct: 98.4, utilizationPct: 92,
    lifetimeTx: 14820, lifetimeYield: 2184.6, avgYieldPerTx: 0.147,
    currentAPY: 14.2, totalStaked: 78400, numInvestors: 312, badge: "Top Performing",
    bucketId: "dubai",
    myStake: 12500, myStakeDate: "12 Jan 2026",
    myPendingRewards: 23.4, myRewardsEarned: 845.2,
    peakHours: "09:00–13:00", avgDailyScans: 142,
    scansToday: 148, scansWeek: 982, scansMonth: 4285,
  },
  {
    id: "CT-MUM-011",
    name: "Apollo CT Suite 11",
    type: "CT 128-Slice",
    location: "Apollo, Mumbai",
    status: "Active",
    txToday: 112, yieldToday: 4.82,
    txWeek: 712, txMonth: 3120, yieldMonth: 144.2,
    revenueGeneratedAED: 384_200,
    trend: [18, 22, 26, 24, 30, 32, 36],
    dailyTx: [28, 32, 26, 34, 36, 30, 36],
    dailyYield: [3.68, 4.21, 3.42, 4.48, 4.74, 3.94, 4.82],
    monthlyYield: [112, 118, 124, 132, 138, 144],
    assetIds: ["ASSET-000507", "ASSET-000612"],
    totalSupply: 80000, ownedSince: "Sep 22, 2024", launchDate: "Apr 2023",
    manufacturer: "GE Healthcare", model: "Revolution CT 128",
    serial: "GE-CT128-MUM-011", commissioned: "Jun 18, 2022",
    uptimePct: 97.1, utilizationPct: 88,
    lifetimeTx: 12440, lifetimeYield: 1648.2, avgYieldPerTx: 0.132,
    currentAPY: 12.8, totalStaked: 54200, numInvestors: 218, badge: null,
    bucketId: "mumbai",
    myStake: 8300, myStakeDate: "05 Feb 2026",
    myPendingRewards: 14.6, myRewardsEarned: 512.8,
    peakHours: "10:00–14:00", avgDailyScans: 104,
    scansToday: 112, scansWeek: 712, scansMonth: 3120,
  },
  {
    id: "MRI-SGP-007",
    name: "Mount Elizabeth MRI Bay 7",
    type: "MRI 1.5T",
    location: "Mount Elizabeth, Singapore",
    status: "Maintenance",
    txToday: 38, yieldToday: 1.92,
    txWeek: 412, txMonth: 1860, yieldMonth: 118.6,
    revenueGeneratedAED: 248_900,
    trend: [20, 24, 22, 26, 22, 18, 12],
    dailyTx: [24, 22, 26, 22, 18, 16, 12],
    dailyYield: [3.84, 3.52, 4.16, 3.52, 2.88, 2.56, 1.92],
    monthlyYield: [98, 104, 112, 118, 122, 118],
    assetIds: ["ASSET-000724"],
    totalSupply: 60000, ownedSince: "Oct 05, 2024", launchDate: "Dec 2021",
    manufacturer: "Philips Healthcare", model: "Ingenia 1.5T",
    serial: "PH-MRI15T-SGP-007", commissioned: "Nov 11, 2021",
    uptimePct: 92.6, utilizationPct: 71,
    lifetimeTx: 10260, lifetimeYield: 1356.4, avgYieldPerTx: 0.128,
    currentAPY: 11.6, totalStaked: 38600, numInvestors: 154, badge: null,
    bucketId: "london",
    myStake: 4200, myStakeDate: "18 Oct 2025",
    myPendingRewards: 6.8, myRewardsEarned: 248.4,
    peakHours: "11:00–15:00", avgDailyScans: 62,
    scansToday: 38, scansWeek: 412, scansMonth: 1860,
  },
  {
    id: "CT-RUH-022",
    name: "King Faisal CT Suite 22",
    type: "CT 256-Slice",
    location: "King Faisal, Riyadh",
    status: "Active",
    txToday: 124, yieldToday: 4.44,
    txWeek: 768, txMonth: 3340, yieldMonth: 128.9,
    revenueGeneratedAED: 412_400,
    trend: [16, 20, 24, 26, 28, 30, 32],
    dailyTx: [22, 26, 24, 28, 30, 28, 32],
    dailyYield: [3.05, 3.61, 3.33, 3.88, 4.16, 3.88, 4.44],
    monthlyYield: [102, 108, 116, 120, 124, 128],
    assetIds: ["ASSET-000819", "ASSET-000901"],
    totalSupply: 70000, ownedSince: "Nov 19, 2024", launchDate: "Mar 2023",
    manufacturer: "Canon Medical", model: "Aquilion ONE 256",
    serial: "CN-CT256-RUH-022", commissioned: "Feb 28, 2023",
    uptimePct: 99.1, utilizationPct: 94,
    lifetimeTx: 11680, lifetimeYield: 1524.8, avgYieldPerTx: 0.131,
    currentAPY: 13.1, totalStaked: 48900, numInvestors: 186, badge: null,
    bucketId: "abudhabi",
    myStake: 6800, myStakeDate: "22 Nov 2025",
    myPendingRewards: 11.2, myRewardsEarned: 396.8,
    peakHours: "08:00–12:00", avgDailyScans: 118,
    scansToday: 124, scansWeek: 768, scansMonth: 3340,
  },
  {
    id: "ULTRA-AUH-041",
    name: "Cleveland Clinic Ultrasound 4",
    type: "Ultrasound",
    location: "Cleveland Clinic, Abu Dhabi",
    status: "Active",
    txToday: 86, yieldToday: 2.18,
    txWeek: 612, txMonth: 2640, yieldMonth: 84.2,
    revenueGeneratedAED: 198_400,
    trend: [12, 14, 18, 20, 22, 24, 26],
    dailyTx: [62, 68, 74, 70, 78, 82, 86],
    dailyYield: [1.62, 1.78, 1.92, 1.84, 2.04, 2.12, 2.18],
    monthlyYield: [62, 68, 74, 78, 80, 84],
    assetIds: [],
    totalSupply: 50000, ownedSince: "Feb 14, 2025", launchDate: "Sep 2024",
    manufacturer: "GE Healthcare", model: "LOGIQ E10",
    serial: "GE-USE10-AUH-041", commissioned: "Aug 14, 2024",
    uptimePct: 99.4, utilizationPct: 89,
    lifetimeTx: 8420, lifetimeYield: 612.4, avgYieldPerTx: 0.073,
    currentAPY: 11.4, totalStaked: 28400, numInvestors: 96, badge: "New",
    bucketId: "abudhabi",
    peakHours: "09:00–13:00", avgDailyScans: 78,
    scansToday: 86, scansWeek: 612, scansMonth: 2640,
  },
  {
    id: "MAMMO-AMD-018",
    name: "Apollo Mammography Unit 1",
    type: "Mammography",
    location: "Apollo, Ahmedabad",
    status: "Active",
    txToday: 64, yieldToday: 1.84,
    txWeek: 442, txMonth: 1920, yieldMonth: 68.4,
    revenueGeneratedAED: 142_800,
    trend: [10, 12, 14, 16, 18, 20, 22],
    dailyTx: [48, 52, 58, 56, 60, 62, 64],
    dailyYield: [1.32, 1.46, 1.58, 1.52, 1.68, 1.74, 1.84],
    monthlyYield: [48, 54, 58, 62, 66, 68],
    assetIds: [],
    totalSupply: 45000, ownedSince: "Mar 03, 2025", launchDate: "Oct 2024",
    manufacturer: "Hologic", model: "3Dimensions Mammography",
    serial: "HOL-3D-AMD-018", commissioned: "Sep 22, 2024",
    uptimePct: 98.8, utilizationPct: 86,
    lifetimeTx: 6840, lifetimeYield: 488.6, avgYieldPerTx: 0.071,
    currentAPY: 12.2, totalStaked: 22100, numInvestors: 74, badge: "New",
    bucketId: "ahmedabad",
    peakHours: "10:00–14:00", avgDailyScans: 58,
    scansToday: 64, scansWeek: 442, scansMonth: 1920,
  },
  {
    id: "PET-AMD-009",
    name: "Sterling PET Scanner 9",
    type: "PET Scan",
    location: "Sterling Hospital, Ahmedabad",
    status: "Active",
    txToday: 42, yieldToday: 3.12,
    txWeek: 286, txMonth: 1240, yieldMonth: 96.4,
    revenueGeneratedAED: 224_800,
    trend: [8, 10, 12, 14, 14, 16, 18],
    dailyTx: [30, 34, 38, 36, 40, 38, 42],
    dailyYield: [2.18, 2.46, 2.78, 2.62, 2.94, 2.82, 3.12],
    monthlyYield: [68, 74, 82, 86, 92, 96],
    assetIds: [],
    totalSupply: 55000, ownedSince: "Apr 10, 2025", launchDate: "Feb 2024",
    manufacturer: "Siemens Healthineers", model: "Biograph Vision PET/CT",
    serial: "SH-BV-AMD-009", commissioned: "Jan 18, 2024",
    uptimePct: 97.6, utilizationPct: 82,
    lifetimeTx: 4820, lifetimeYield: 412.8, avgYieldPerTx: 0.086,
    currentAPY: 13.6, totalStaked: 31200, numInvestors: 108, badge: null,
    bucketId: "ahmedabad",
    peakHours: "08:00–11:00", avgDailyScans: 38,
    scansToday: 42, scansWeek: 286, scansMonth: 1240,
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
  // Consultations
  { id: "m1", title: "Doctor Video Consultation", category: "Doctor Consultation", price: 35, blurb: "30-min board-certified specialist session.", emoji: "🩺",
    description: "Same-day video consultation with a board-certified specialist from Medimint's network of 600+ doctors across 24 specialties. Includes e-prescription and follow-up notes.",
    benefits: ["30-min video session", "E-prescription included", "Follow-up notes in app", "18 languages supported"],
    delivery: "Instant booking · Same day", provider: "Medimint Care Network", rating: 4.9, reviewCount: 8420 },
  { id: "m2", title: "AI Doctor Subscription", category: "AI Doctor", price: 19, blurb: "Always-on AI triage and symptom analysis.", emoji: "🤖",
    description: "24/7 access to Medimint AI Doctor — symptom triage, medication checks, and personalised follow-up reminders trained on peer-reviewed clinical data.",
    benefits: ["24/7 AI triage", "Drug interaction checks", "Daily wellness nudges", "Doctor escalation pathway"],
    delivery: "Monthly subscription", provider: "Medimint AI Health", rating: 4.7, reviewCount: 3120 },

  // Supplements
  { id: "m3", title: "Mitochondrial Boost Stack", category: "Supplements", price: 64, blurb: "30-day NAD+ & CoQ10 longevity stack.", emoji: "⚡",
    description: "Clinical-grade supplement stack including NMN precursors, ubiquinol CoQ10, PQQ, and magnesium glycinate. Third-party lab tested.",
    benefits: ["NMN 500mg daily", "Ubiquinol CoQ10", "Third-party tested", "Free reorder reminder"],
    delivery: "Worldwide shipping · 3–5 days", provider: "Apex Longevity", rating: 4.6, reviewCount: 944 },
  { id: "m4", title: "Daily Essentials Bundle", category: "Supplements", price: 42, blurb: "Multivitamin + Omega-3 + D3 monthly pack.", emoji: "💊",
    description: "Medically formulated daily essentials — multivitamin, ultra-pure fish oil, and vitamin D3/K2. Auto-renew with free reformulation as your labs change.",
    benefits: ["Pharmacist formulated", "Personalised dosing", "Free shipping", "Adapts to your bloodwork"],
    delivery: "Monthly auto-ship", provider: "Medimint Pharmacy", rating: 4.7, reviewCount: 2204 },

  // Subscriptions
  { id: "m5", title: "MDMT Platform Subscription", category: "Subscriptions", price: 12, blurb: "Pro investor analytics + priority claims.", emoji: "💎",
    description: "Unlock Pro investor analytics, priority yield claims, advanced exports, and white-glove portfolio support.",
    benefits: ["Pro analytics dashboard", "Priority claim queue", "Custom CSV/PDF reports", "Dedicated investor success"],
    delivery: "Monthly subscription", provider: "Medimint Platform", rating: 4.8, reviewCount: 612 },
  { id: "m6", title: "Health Reward Subscription", category: "Subscriptions", price: 9, blurb: "Earn MDMT for daily wellness goals.", emoji: "🎁",
    description: "Boost your daily Health Rewards earning rate by 2.5× and unlock weekly bonus challenges paid in MDMT.",
    benefits: ["2.5× reward multiplier", "Weekly bonus challenges", "Family plan: 4 members", "Streak insurance"],
    delivery: "Monthly subscription", provider: "Medimint Rewards", rating: 4.8, reviewCount: 1488 },
  { id: "m7", title: "Digital Diagnostic Subscription", category: "Subscriptions", price: 29, blurb: "Quarterly at-home diagnostics + reports.", emoji: "🧪",
    description: "Quarterly at-home phlebotomy kits, full panel processing in partner labs, and AI-narrated reports delivered to your wallet.",
    benefits: ["At-home blood draw", "4 panels / year", "AI-narrated reports", "Trend dashboard"],
    delivery: "Quarterly · Auto-scheduled", provider: "Quantum Diagnostics", rating: 4.7, reviewCount: 542 },
  { id: "m8", title: "Digital Medical Records", category: "Subscriptions", price: 5, blurb: "Encrypted lifetime health vault.", emoji: "🗂️",
    description: "Securely store all your medical records, prescriptions, and imaging in one encrypted vault. Selective sharing with verified providers via QR.",
    benefits: ["Lifetime encrypted storage", "QR share with clinicians", "FHIR interoperability", "Family vault add-on"],
    delivery: "Monthly subscription", provider: "Medimint Vault", rating: 4.9, reviewCount: 884 },
  { id: "m9", title: "Medicine Reminder Pro", category: "Subscriptions", price: 4, blurb: "Smart adherence + family alerts.", emoji: "⏰",
    description: "Intelligent medication reminders with adherence tracking, refill predictions, and family caregiver alerts.",
    benefits: ["Smart dose reminders", "Refill prediction", "Family caregiver alerts", "Pharmacy auto-refill link"],
    delivery: "Monthly subscription", provider: "Medimint Care", rating: 4.6, reviewCount: 1206 },

  // Programs
  { id: "m10", title: "Longevity Plan Premium", category: "Longevity Programs", price: 720, blurb: "12-month longevity protocol.", emoji: "🧘",
    description: "12-month longevity protocol combining quarterly diagnostics, personalised supplementation, and bi-weekly coaching with longevity-trained physicians.",
    benefits: ["Quarterly biomarkers", "Personalised supplement plan", "Bi-weekly coaching", "Member-only longevity events"],
    delivery: "Full year access · Onboard in 7d", provider: "Apex Longevity", rating: 4.9, reviewCount: 198 },
  { id: "m11", title: "Sleep & Recovery Program", category: "Wellness Programs", price: 88, blurb: "12-week guided recovery plan.", emoji: "🌙",
    description: "12-week wearable-guided sleep coaching using CBT-I protocols and recovery science. Weekly 1:1 calls with certified sleep coaches.",
    benefits: ["Weekly 1:1 coaching", "Wearable sync & insights", "CBT-I evidence-based", "Lifetime program access"],
    delivery: "Digital · Starts within 48h", provider: "Restful Labs", rating: 4.7, reviewCount: 612 },
  { id: "m12", title: "Cardio Vitality Program", category: "Wellness Programs", price: 120, blurb: "HRV-guided 8-week cardio plan.", emoji: "❤️",
    description: "Heart-rate variability guided 8-week cardiovascular conditioning program with weekly coach calls and adaptive plans.",
    benefits: ["HRV-guided training", "Weekly coach call", "Custom workout plan", "Progress dashboard"],
    delivery: "Digital · Starts within 24h", provider: "PulseFit Coaching", rating: 4.8, reviewCount: 521 },

  // Diagnostics
  { id: "m13", title: "Longevity Diagnostic Panel", category: "Diagnostics Packages", price: 240, blurb: "180-biomarker full-body panel.", emoji: "🧬",
    description: "Comprehensive 180-biomarker panel mapping hormonal, metabolic, cardiovascular, and inflammatory markers. Delivered with a personalised clinician report.",
    benefits: ["180+ biomarker analysis", "Clinician-reviewed report", "Personalised action plan", "Annual follow-up"],
    delivery: "At-home phlebotomy · 5 business days", provider: "Quantum Diagnostics", rating: 4.8, reviewCount: 1284 },
  { id: "m14", title: "Executive MRI Screening", category: "Diagnostics Packages", price: 480, blurb: "Whole-body 3T MRI at partner clinics.", emoji: "🧠",
    description: "Whole-body MRI screening at top-tier diagnostic centres. Radiologist double-read review and concierge scheduling.",
    benefits: ["Whole-body 3T MRI", "Radiologist double-read", "Concierge scheduling", "Secure digital report"],
    delivery: "Partner clinic · By appointment", provider: "Medimint Partner Network", rating: 4.9, reviewCount: 287 },
  { id: "m15", title: "Annual Health Package", category: "Diagnostics Packages", price: 380, blurb: "Full annual checkup bundle.", emoji: "🩹",
    description: "All-in-one annual health package: diagnostics, four doctor consults, dental and vision check, and wellness coaching.",
    benefits: ["Annual full checkup", "4 doctor consultations", "Dental & vision", "Wellness coaching"],
    delivery: "Multi-clinic · 30-day window", provider: "Medimint Care Network", rating: 4.9, reviewCount: 1480 },
];

export const marketCategories = [
  "All",
  "Doctor Consultation",
  "AI Doctor",
  "Supplements",
  "Subscriptions",
  "Longevity Programs",
  "Wellness Programs",
  "Diagnostics Packages",
];

export type PaymentMethodId = "mdmt" | "card" | "applepay" | "googlepay" | "upi";
export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  blurb: string;
  emoji: string;
  /** AED-equivalent fee multiplier, applied on top of MDMT→AED conversion. */
  feePct: number;
}
export const paymentMethods: PaymentMethod[] = [
  { id: "mdmt", label: "Pay with MDMT", blurb: "Use your wallet balance — no FX, no card fees", emoji: "💎", feePct: 0 },
  { id: "card", label: "Credit / Debit Card", blurb: "Visa, Mastercard, Amex", emoji: "💳", feePct: 0.029 },
  { id: "applepay", label: "Apple Pay", blurb: "Face ID / Touch ID checkout", emoji: "", feePct: 0.025 },
  { id: "googlepay", label: "Google Pay", blurb: "One-tap on supported devices", emoji: "🅖", feePct: 0.025 },
  { id: "upi", label: "UPI", blurb: "GPay, PhonePe, Paytm, BHIM", emoji: "🇮🇳", feePct: 0.005 },
];
/** Mock MDMT → AED conversion for fiat checkout. */
export const MDMT_TO_AED = 18.4;
/** Mock MDMT → USD conversion (AED → USD ≈ 0.272). */
export const MDMT_TO_USD = +(MDMT_TO_AED * 0.272).toFixed(2);

/* ---------------- ASSET BUCKETS ---------------- */

export interface AssetBucket {
  id: string;
  name: string;
  thesis: string;
  region: string;
  country: string;
  status: "Live" | "Onboarding" | "Paused";
  launchDate: string;
  machineIds: string[];
  /** machines with at least one investor staking */
  activeStaking: number;
  /** seed totals — sim engine adds today's live deltas on top */
  txTodaySeed: number;
  txMonthSeed: number;
  revenueGeneratedAED: number;
  yieldGeneratedMDMT: number;
  utilizationPct: number;
  topMachineId: string;
  /** investor's MDMT tokens held in this bucket */
  myTokens: number;
  /** lifetime MDMT yield earned from this bucket by the investor (seed baseline) */
  lifetimeYield: number;
  apyPct: number;
  /** 14-day per-bucket performance for sparkline */
  trend: number[];
}

export const assetBuckets: AssetBucket[] = [
  {
    id: "dubai",
    name: "Dubai Asset Bucket",
    thesis: "Premium MRI + CT throughput in Dubai's highest-demand diagnostic corridors.",
    region: "Dubai", country: "UAE", status: "Live", launchDate: "Jan 2024",
    machineIds: ["MRI-DXB-003"],
    activeStaking: 3, txTodaySeed: 1245, txMonthSeed: 38420,
    revenueGeneratedAED: 215_000, yieldGeneratedMDMT: 4125, utilizationPct: 91,
    topMachineId: "MRI-DXB-003",
    myTokens: 12_640, lifetimeYield: 1_988.4, apyPct: 14.2,
    trend: [4.2, 4.4, 4.6, 4.5, 4.8, 5.1, 5.3, 5.2, 5.6, 5.8, 6.0, 6.3, 6.5, 6.8],
  },
  {
    id: "mumbai",
    name: "Mumbai Asset Bucket",
    thesis: "High-volume imaging + pathology across India's largest diagnostic market.",
    region: "Mumbai", country: "India", status: "Live", launchDate: "Apr 2023",
    machineIds: ["CT-MUM-011"],
    activeStaking: 2, txTodaySeed: 982, txMonthSeed: 28640,
    revenueGeneratedAED: 168_400, yieldGeneratedMDMT: 3284, utilizationPct: 88,
    topMachineId: "CT-MUM-011",
    myTokens: 7_310, lifetimeYield: 1_146.8, apyPct: 12.8,
    trend: [3.1, 3.3, 3.2, 3.5, 3.6, 3.8, 3.7, 4.0, 4.1, 4.3, 4.4, 4.6, 4.7, 4.9],
  },
  {
    id: "abudhabi",
    name: "Abu Dhabi Asset Bucket",
    thesis: "Sheikh-Zayed corridor diagnostics — CT, ultrasound and women's health imaging.",
    region: "Abu Dhabi", country: "UAE", status: "Live", launchDate: "Aug 2024",
    machineIds: ["CT-RUH-022", "ULTRA-AUH-041"],
    activeStaking: 2, txTodaySeed: 810, txMonthSeed: 22480,
    revenueGeneratedAED: 138_600, yieldGeneratedMDMT: 2724, utilizationPct: 92,
    topMachineId: "CT-RUH-022",
    myTokens: 6_800, lifetimeYield: 988.2, apyPct: 13.1,
    trend: [3.0, 3.2, 3.4, 3.3, 3.6, 3.8, 4.0, 3.9, 4.2, 4.4, 4.5, 4.7, 4.8, 5.0],
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad Asset Bucket",
    thesis: "Gujarat diagnostic expansion — mammography, PET-CT and women's preventive care.",
    region: "Ahmedabad", country: "India", status: "Live", launchDate: "Oct 2024",
    machineIds: ["MAMMO-AMD-018", "PET-AMD-009"],
    activeStaking: 2, txTodaySeed: 642, txMonthSeed: 18920,
    revenueGeneratedAED: 112_800, yieldGeneratedMDMT: 2148, utilizationPct: 84,
    topMachineId: "PET-AMD-009",
    myTokens: 4_200, lifetimeYield: 612.4, apyPct: 12.6,
    trend: [2.4, 2.6, 2.7, 2.8, 3.0, 3.1, 3.2, 3.4, 3.5, 3.6, 3.8, 3.9, 4.0, 4.2],
  },
  {
    id: "london",
    name: "London Asset Bucket",
    thesis: "Harley-Street premium diagnostics — high-ticket imaging and specialist scans.",
    region: "London", country: "United Kingdom", status: "Live", launchDate: "Mar 2024",
    machineIds: ["MRI-SGP-007"],
    activeStaking: 1, txTodaySeed: 384, txMonthSeed: 11240,
    revenueGeneratedAED: 96_400, yieldGeneratedMDMT: 1842, utilizationPct: 78,
    topMachineId: "MRI-SGP-007",
    myTokens: 4_200, lifetimeYield: 642.8, apyPct: 12.4,
    trend: [2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6],
  },
];


export function findBucket(id: string) {
  return assetBuckets.find((b) => b.id === id);
}

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
