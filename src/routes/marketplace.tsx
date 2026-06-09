import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { marketplace, marketCategories, paymentMethods, MDMT_TO_USD } from "@/lib/mockData";
import { Search, Star, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Medimint" },
      { name: "description", content: "Spend MDMT, USD, card, Apple Pay, Google Pay or UPI on diagnostics, consultations, supplements, and wellness." },
    ],
  }),
  component: MarketPage,
});

function MarketPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const items = marketplace
    .filter((m) => cat === "All" || m.category === cat)
    .filter((m) => !q || (m.title + m.blurb).toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell title="Marketplace" subtitle="Pay with MDMT, card, Apple/Google Pay or UPI">
      <div className="bg-card/60 mt-4 flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2.5">
        <Search size={14} className="text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search services, packages…"
          className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* Accepted payment methods strip */}
      <div className="bg-gradient-card mt-3 flex items-center gap-2 overflow-x-auto rounded-2xl border border-white/10 px-3 py-2 text-[11px]">
        <span className="text-muted-foreground shrink-0">We accept</span>
        {paymentMethods.map((p) => (
          <span
            key={p.id}
            className="shrink-0 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1"
            title={p.label}
          >
            <span className="text-sm">{p.emoji || "💳"}</span>
            <span className="text-muted-foreground">{p.label.replace("Pay with ", "")}</span>
          </span>
        ))}
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {marketCategories.map((c) => (
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

      <Link to="/marketplace/$productId" params={{ productId: "m13" }} className="bg-gradient-hero mt-4 block overflow-hidden rounded-3xl border border-white/10 p-5">
        <p className="text-muted-foreground text-[10px] uppercase tracking-wide">Featured</p>
        <h3 className="font-display mt-1 text-xl font-semibold">Longevity Diagnostic Panel</h3>
        <p className="text-muted-foreground mt-1 text-xs">180-biomarker full-body panel · partner clinics in 12 cities.</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="font-display text-2xl font-semibold">240 MDMT</span>
            <span className="text-muted-foreground ml-2 text-xs">≈ ${(240 * MDMT_TO_USD).toFixed(0)} USD</span>
          </div>
          <span className="bg-gradient-brand shadow-glow rounded-full px-4 py-2 text-xs font-semibold text-white">Explore</span>
        </div>
      </Link>

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={20} />}
          title="No products match"
          description={q ? `No results for "${q}". Try a different keyword or category.` : "No products in this category yet."}
          action={
            <button
              onClick={() => { setQ(""); setCat("All"); }}
              className="bg-gradient-brand rounded-full px-4 py-2 text-xs font-semibold text-white"
            >Clear filters</button>
          }
        />
      ) : (
      <div className="mt-5 grid grid-cols-2 gap-3">
        {items.map((m) => (
          <Link
            key={m.id}
            to="/marketplace/$productId"
            params={{ productId: m.id }}
            className="bg-gradient-card flex flex-col rounded-2xl border border-white/10 p-3"
          >
            <div className="bg-gradient-brand-soft grid h-20 place-items-center rounded-xl text-3xl">
              {m.emoji}
            </div>
            <p className="text-muted-foreground mt-2 text-[10px] uppercase">{m.category}</p>
            <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-tight">{m.title}</p>
            <div className="text-muted-foreground mt-1 flex items-center gap-1 text-[10px]">
              <Star size={9} className="fill-warning text-warning" /> {m.rating} · {m.reviewCount}
            </div>
            <div className="mt-2 flex items-end justify-between">
              <div>
                <p className="font-display text-sm font-semibold leading-tight">{m.price} MDMT</p>
                <p className="text-muted-foreground text-[10px] leading-tight">≈ ${(m.price * MDMT_TO_USD).toFixed(0)} USD</p>
              </div>
              <span className="border-primary/40 text-primary rounded-full border px-3 py-1 text-[11px] font-medium">Buy</span>
            </div>
            <div className="text-muted-foreground mt-2 flex items-center gap-1 border-t border-white/5 pt-2 text-[11px]">
              <span>💎</span><span>💳</span><span></span><span>🅖</span><span>🇮🇳</span>
            </div>
          </Link>
        ))}
      </div>
      )}
    </AppShell>
  );
}
