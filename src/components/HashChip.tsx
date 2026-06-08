import { Hash, Copy, Check } from "lucide-react";
import { useState } from "react";

interface Props {
  hash: string;
  full?: string;
  className?: string;
}

export function HashChip({ hash, full, className = "" }: Props) {
  const [copied, setCopied] = useState(false);
  const copy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard?.writeText(full ?? hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground ${className}`}
      title={full ?? hash}
    >
      <Hash size={9} />
      <span>{hash}</span>
      {copied ? <Check size={9} className="text-success" /> : <Copy size={9} />}
    </button>
  );
}
