// Frontend-only mock affiliate / referral network for Medimint.

export interface Referral {
  id: string;
  name: string;
  joined: string;
  status: "active" | "pending";
  stakedMdmt: number;
  /** Commission this member has generated for the root user, in MDMT. */
  commissionMdmt: number;
  children: Referral[];
}

export const commissionTiers: { level: string; label: string; rate: number }[] = [
  { level: "Level 1", label: "Direct referral", rate: 2 },
  { level: "Level 2", label: "2nd level", rate: 1 },
  { level: "Level 3", label: "3rd level", rate: 0.75 },
  { level: "Level 4", label: "4th level", rate: 0.5 },
  { level: "Level 5", label: "5th level", rate: 0.25 },
];

export const referralSteps: { title: string; detail: string }[] = [
  { title: "Share your link", detail: "Invite investors with your unique Medimint referral code." },
  { title: "They join", detail: "Your referee signs up and completes investor verification." },
  { title: "They stake MDMT", detail: "Their stake is allocated to a machine inside an asset bucket." },
  { title: "Machines generate yield", detail: "Patient scans create revenue and distribute MDMT yield." },
  { title: "You earn commission", detail: "A share of their yield is paid to you across every level." },
];

export const affiliateTree: Referral = {
  id: "MDMT-ARJ-001",
  name: "Arjun Mehta",
  joined: "2024-11-02",
  status: "active",
  stakedMdmt: 48200,
  commissionMdmt: 0,
  children: [
    {
      id: "MDMT-VKY-114",
      name: "Vicky Sharma",
      joined: "2025-01-18",
      status: "active",
      stakedMdmt: 21500,
      commissionMdmt: 1720,
      children: [
        {
          id: "MDMT-NEH-233",
          name: "Neha Kapoor",
          joined: "2025-03-04",
          status: "active",
          stakedMdmt: 9800,
          commissionMdmt: 294,
          children: [
            {
              id: "MDMT-SAM-410",
              name: "Sameer Rao",
              joined: "2025-06-21",
              status: "active",
              stakedMdmt: 4200,
              commissionMdmt: 84,
              children: [],
            },
          ],
        },
        {
          id: "MDMT-FAI-247",
          name: "Faisal Ahmed",
          joined: "2025-04-11",
          status: "active",
          stakedMdmt: 6400,
          commissionMdmt: 192,
          children: [],
        },
      ],
    },
    {
      id: "MDMT-TNY-158",
      name: "Tony Fernandes",
      joined: "2025-02-09",
      status: "active",
      stakedMdmt: 15200,
      commissionMdmt: 1216,
      children: [
        {
          id: "MDMT-PRI-301",
          name: "Priya Nair",
          joined: "2025-05-27",
          status: "active",
          stakedMdmt: 7300,
          commissionMdmt: 219,
          children: [],
        },
      ],
    },
    {
      id: "MDMT-RAM-176",
      name: "Ramesh Iyer",
      joined: "2025-03-22",
      status: "pending",
      stakedMdmt: 0,
      commissionMdmt: 0,
      children: [],
    },
  ],
};

export function flatten(node: Referral, depth = 0): { node: Referral; depth: number }[] {
  return node.children.flatMap((c) => [{ node: c, depth }, ...flatten(c, depth + 1)]);
}

export function networkStats(root: Referral) {
  const all = flatten(root);
  const byLevel = new Map<number, number>();
  all.forEach(({ depth }) => byLevel.set(depth, (byLevel.get(depth) ?? 0) + 1));
  return {
    totalMembers: all.length,
    directReferrals: root.children.length,
    activeMembers: all.filter(({ node }) => node.status === "active").length,
    networkStaked: all.reduce((s, { node }) => s + node.stakedMdmt, 0),
    lifetimeCommission: all.reduce((s, { node }) => s + node.commissionMdmt, 0),
    deepestLevel: all.length ? Math.max(...all.map(({ depth }) => depth)) + 1 : 0,
    byLevel,
  };
}

export const referralCode = "ARJUN-MDMT-8F2C";
export const referralLink = "https://medimint.app/join/ARJUN-MDMT-8F2C";

export const commissionLedger: {
  id: string;
  from: string;
  level: number;
  amount: number;
  date: string;
  hash: string;
}[] = [
  { id: "CMS-9812", from: "Vicky Sharma", level: 1, amount: 42.8, date: "2026-09-27", hash: "0x91FA82D3E8B1A72C" },
  { id: "CMS-9807", from: "Tony Fernandes", level: 1, amount: 31.4, date: "2026-09-27", hash: "0xA8F12B9C41DD07E5" },
  { id: "CMS-9793", from: "Neha Kapoor", level: 2, amount: 8.6, date: "2026-09-26", hash: "0x4C72B1EE90AA3F18" },
  { id: "CMS-9781", from: "Priya Nair", level: 2, amount: 6.2, date: "2026-09-26", hash: "0x7D30C5A2FB6419BE" },
  { id: "CMS-9770", from: "Faisal Ahmed", level: 2, amount: 5.1, date: "2026-09-25", hash: "0xE1B94F07C2A85D63" },
  { id: "CMS-9764", from: "Sameer Rao", level: 3, amount: 1.9, date: "2026-09-25", hash: "0x2F86AD13B70CE94A" },
];
