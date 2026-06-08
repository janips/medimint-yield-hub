export function BrandLogo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <defs>
          <linearGradient id="mdmt-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFB347" />
            <stop offset="0.5" stopColor="#FF3D7F" />
            <stop offset="1" stopColor="#B14BFF" />
          </linearGradient>
        </defs>
        <path
          d="M4 22V10c0-1.1.9-2 2-2h2l4 8 4-8h2c1.1 0 2 .9 2 2v12h-3v-8l-3 6h-4l-3-6v8H4z"
          fill="url(#mdmt-g)"
        />
        <path d="M24 12h4M26 10v4" stroke="url(#mdmt-g)" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight">
        medimint<span className="text-gradient-brand">+</span>
      </span>
    </div>
  );
}
