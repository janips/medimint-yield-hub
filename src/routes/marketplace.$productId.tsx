import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { findProduct } from "@/lib/mockData";
import { Star, Check, Truck, Building2 } from "lucide-react";

function loadProduct({ params }: { params: { productId: string } }) {
  const product = findProduct(params.productId);
  if (!product) throw notFound();
  return { product };
}

export const Route = createFileRoute("/marketplace/$productId")({
  head: ({ params }) => ({
    meta: [{ title: `Product — Medimint` }, { name: "description", content: `Buy ${params.productId} with MDMT.` }],
  }),
  loader: loadProduct,
  component: ProductDetail,
  errorComponent: ({ error }) => <div className="p-8 text-sm">{error.message}</div>,
  notFoundComponent: () => <AppShell title="Not found" back><p className="text-muted-foreground mt-6 text-sm">Product unavailable.</p></AppShell>,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  return (
    <AppShell title={product.title} subtitle={product.category} back>
      <div className="bg-gradient-hero shadow-glow mt-4 grid h-44 place-items-center overflow-hidden rounded-3xl border border-white/10 text-6xl">
        {product.emoji}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">{product.title}</h2>
          <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
            <Star size={11} className="fill-warning text-warning" /> {product.rating}
            <span>·</span>
            <span>{product.reviewCount} reviews</span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-semibold">{product.price}</p>
          <p className="text-muted-foreground text-[10px]">MDMT</p>
        </div>
      </div>

      <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{product.description}</p>

      <p className="text-muted-foreground mt-5 mb-2 text-[11px] uppercase tracking-wide">Benefits</p>
      <div className="bg-gradient-card space-y-2 rounded-2xl border border-white/10 p-4">
        {product.benefits.map((b: string) => (
          <div key={b} className="flex items-center gap-2 text-sm">
            <Check size={14} className="text-success shrink-0" />
            <span>{b}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Info icon={<Truck size={14} />} label="Delivery" value={product.delivery} />
        <Info icon={<Building2 size={14} />} label="Provider" value={product.provider} />
      </div>

      <Link
        to="/marketplace/checkout/$productId"
        params={{ productId: product.id }}
        className="bg-gradient-brand shadow-glow mt-6 block w-full rounded-full py-3 text-center text-sm font-semibold text-white"
      >
        Pay with MDMT · {product.price} MDMT
      </Link>
    </AppShell>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-gradient-card rounded-2xl border border-white/10 p-3">
      <div className="text-muted-foreground inline-flex items-center gap-1.5 text-[10px] uppercase">
        {icon} {label}
      </div>
      <p className="mt-1 text-xs">{value}</p>
    </div>
  );
}
