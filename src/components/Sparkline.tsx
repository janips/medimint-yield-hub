interface Props {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: boolean;
}

export function Sparkline({ data, width = 120, height = 36, stroke = "url(#spark-g)", fill = true }: Props) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1 || 1);
  const points = data.map((v, i) => [i * step, height - ((v - min) / range) * (height - 4) - 2] as const);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${d} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id="spark-g" x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFB347" />
          <stop offset="0.6" stopColor="#FF3D7F" />
          <stop offset="1" stopColor="#B14BFF" />
        </linearGradient>
        <linearGradient id="spark-f" x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF3D7F" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FF3D7F" stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill="url(#spark-f)" />}
      <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
