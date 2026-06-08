interface Props {
  data: number[];
  labels?: string[];
  height?: number;
}

export function AreaChart({ data, labels, height = 160 }: Props) {
  const width = 320;
  const pad = 8;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = (width - pad * 2) / (data.length - 1 || 1);
  const pts = data.map((v, i) => [pad + i * step, height - ((v - min) / range) * (height - 24) - 16] as const);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const area = `${d} L${width - pad},${height} L${pad},${height} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height + 18}`} className="w-full">
      <defs>
        <linearGradient id="ac-line" x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFB347" />
          <stop offset="0.5" stopColor="#FF3D7F" />
          <stop offset="1" stopColor="#B14BFF" />
        </linearGradient>
        <linearGradient id="ac-fill" x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF3D7F" stopOpacity="0.45" />
          <stop offset="1" stopColor="#FF3D7F" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((y) => (
        <line key={y} x1={pad} x2={width - pad} y1={height * y} y2={height * y} stroke="white" strokeOpacity="0.05" />
      ))}
      <path d={area} fill="url(#ac-fill)" />
      <path d={d} fill="none" stroke="url(#ac-line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 0} fill="#FF3D7F" stroke="white" strokeWidth="1.5" />
      ))}
      {labels && pts.map((p, i) => (
        <text key={i} x={p[0]} y={height + 14} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.45)">
          {labels[i]}
        </text>
      ))}
    </svg>
  );
}
