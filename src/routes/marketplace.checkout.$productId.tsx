import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { HashChip } from "@/components/HashChip";
import { findProduct, portfolio } from "@/lib/mockData";
import { Check, Download, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/marketplace/checkout/$productId")({
  head: () => ({ meta: [{ title: "Checkout — Medimint" }] }),
  loader: ({ params }) => {
    const product = findProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  component: CheckoutPage,
  errorComponent: ({ error }) => <div className="p-8 text-sm">{error.message}</div>,
  notFoundComponent: () => <AppShell title="Not found" back><p className="mt-6 text-sm">Unavailable.</p></AppShell>,
});

function CheckoutPage() {
  const { product } = Route.useLoaderData();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const orderNum = "ORD-" + Math.floor(Math.random() * 900000 + 100000);
  const refId = "REF-" + Math.floor(Math.random() * 9000 + 1000);
  const txHash = "0x" + Math.random().toString(16).slice(2, 10).toUpperCase() + "...A9F2";

  return (
    <AppShell title="Checkout" subtitle={`Step ${step} of 3`} back hideNav>
      <div className="mt-4 flex gap-1.5">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? "bg-gradient-brand" : "bg-white/10"}`} />
        ))}
      </div>

      {step === 1 && (
        <>
          <p className="text-muted-foreground mt-5 text-[11px] uppercase tracking-wide">Order Summary</p>
          <div className="bg-gradient-card mt-2 rounded-2xl border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-brand-soft grid h-14 w-14 place-items-center rounded-xl text-2xl">{product.emoji}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{product.title}</p>
                <p className="text-muted-foreground text-[11px]">{product.provider}</p>
              </div>
              <p className="font-display text-sm font-semibold">{product.price} MDMT</p>
            </div>
            <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3 text-xs">
              <Row k="Subtotal" v={`${product.price} MDMT`} />
              <Row k="Network fee" v="0.02 MDMT" />
              <Row k="Total" v={`${(product.price + 0.02).toFixed(2)} MDMT`} bold />
            </div>
          </div>
          <p className="text-muted-foreground mt-3 text-[11px]">Wallet balance: {portfolio.available.toLocaleString()} MDMT</p>
          <button onClick={() => setStep(2)} className="bg-gradient-brand shadow-glow mt-6 w-full rounded-full py-3 text-sm font-semibold text-white">
            Continue
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-muted-foreground mt-5 text-[11px] uppercase tracking-wide">Confirm Payment</p>
          <div className="bg-gradient-hero shadow-glow mt-2 rounded-3xl border border-white/10 p-5 text-center">
            <p className="text-muted-foreground text-xs">You're paying</p>
            <p className="font-display mt-2 text-4xl font-semibold">{product.price}</p>
            <p className="text-muted-foreground text-xs">MDMT to {product.provider}</p>
          </div>
          <p className="text-muted-foreground mt-4 text-center text-xs">Transaction will be signed and broadcast.</p>
          <button onClick={() => setStep(3)} className="bg-gradient-brand shadow-glow mt-6 w-full rounded-full py-3 text-sm font-semibold text-white">
            Sign & Pay
          </button>
          <button onClick={() => setStep(1)} className="text-muted-foreground mt-2 w-full py-2 text-xs">Back</button>
        </>
      )}

      {step === 3 && (
        <>
          <div className="bg-gradient-hero shadow-glow mt-6 rounded-3xl border border-white/10 p-6 text-center">
            <span className="bg-success/20 text-success mx-auto grid h-14 w-14 place-items-center rounded-2xl">
              <Check size={26} />
            </span>
            <p className="font-display mt-3 text-xl font-semibold">Payment Successful</p>
            <p className="text-muted-foreground mt-1 text-xs">{product.title} · {product.price} MDMT</p>
          </div>

          <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Receipt</p>
          <div className="bg-gradient-card space-y-2 rounded-2xl border border-white/10 p-4 text-xs">
            <Row k="Order number" v={orderNum} mono />
            <Row k="Reference ID" v={refId} mono />
            <Row k="Transaction" v={<HashChip hash={txHash} full={txHash + "FULLHASH"} />} />
            <Row k="Status" v={<span className="text-success">Confirmed</span>} />
          </div>

          <button className="bg-gradient-card mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 text-sm">
            <Download size={14} /> Download Receipt
          </button>

          <Link to="/marketplace" className="bg-gradient-brand shadow-glow mt-3 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white">
            <ShoppingBag size={14} /> Back to Marketplace
          </Link>
        </>
      )}
    </AppShell>
  );
}

function Row({ k, v, bold, mono }: { k: string; v: React.ReactNode; bold?: boolean; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className={`${bold ? "font-semibold" : ""} ${mono ? "font-mono" : ""}`}>{v}</span>
    </div>
  );
}
