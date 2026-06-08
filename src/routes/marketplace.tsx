import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { marketplace } from "@/lib/mockData";
import { Search } from "lucide-react";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Medimint" },
      { name: "description", content: "Spend MDMT on diagnostics, consultations, supplements, and wellness." },
    ],
  }),
  component: MarketPage,
});

const categories = ["All", "Diagnostics", "Consultation", "Wellness", "Supplements"];

function MarketPage() {
  const [cat, setCat] = useState("All");
  const items = cat === "All" ? marketplace : marketplace.filter((m) => m.category === cat);
  return (
    <AppShell title="Marketplace" subtitle="Pay with MDMT">
      <div className="bg-card/60 mt-4 flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2.5">
        <Search size={14} className="text-muted-foreground" />
        <input
          placeholder="Search services, packages…"
          className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors ${
              cat === c
                ? "bg-gradient-brand border-transparent text-white"
                : "border-white/10 text-muted-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="bg-gradient-hero mt-4 overflow-hidden rounded-3xl border border-white/10 p-5">
        <p className="text-muted-foreground text-[10px] uppercase tracking-wide">Featured</p>
        <h3 className="font-display mt-1 text-xl font-semibold">Longevity Diagnostic Panel</h3>
        <p className="text-muted-foreground mt-1 text-xs">Full-body biomarker map · partner clinics in 12 cities.</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-2xl font-semibold">240 MDMT</span>
          <button className="bg-gradient-brand shadow-glow rounded-full px-4 py-2 text-xs font-semibold text-white">
            Pay with MDMT
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {items.map((m) => (
          <div key={m.id} className="bg-gradient-card flex flex-col rounded-2xl border border-white/10 p-3">
            <div className="bg-gradient-brand-soft grid h-20 place-items-center rounded-xl text-3xl">
              {m.emoji}
            </div>
            <p className="text-muted-foreground mt-2 text-[10px] uppercase">{m.category}</p>
            <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-tight">{m.title}</p>
            <p className="text-muted-foreground mt-1 line-clamp-2 text-[11px]">{m.blurb}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-display text-sm font-semibold">{m.price} MDMT</span>
              <button className="border-primary/40 text-primary rounded-full border px-3 py-1 text-[11px] font-medium">
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
