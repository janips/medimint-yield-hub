interface Props {
  data: number[];
  labels?: string[];
  height?: number;
}

export function BarChart({ data, labels, height = 140 }: Props) {
  const width = 320;
  const pad = 8;
  const max = Math.max(...data) || 1;
  const barW = (width - pad * 2) / data.length - 6;
  return (
    <svg viewBox={`0 0 ${width} ${height + 18}`} className="w-full">
      <defs>
        <linearGradient id="bar-g" x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFB347" />
          <stop offset="0.5" stopColor="#FF3D7F" />
          <stop offset="1" stopColor="#B14BFF" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((y) => (
        <line key={y} x1={pad} x2={width - pad} y1={height * y} y2={height * y} stroke="white" strokeOpacity="0.05" />
      ))}
      {data.map((v, i) => {
        const h = (v / max) * (height - 20);
        const x = pad + i * ((width - pad * 2) / data.length) + 3;
        const y = height - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} rx={3} fill="url(#bar-g)" />
            {labels && (
              <text x={x + barW / 2} y={height + 14} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.45)">
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
