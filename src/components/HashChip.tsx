import { Hash, Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

interface Props {
  hash: string;
  full?: string;
  className?: string;
  /** When true, renders an explorer link beside the chip that opens the Transparency Hub prefilled with this hash. */
  explorer?: boolean;
}

export function HashChip({ hash, full, className = "", explorer = true }: Props) {
  const [copied, setCopied] = useState(false);
  const copy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard?.writeText(full ?? hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <button
        onClick={copy}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] transition-colors"
        title={`Copy ${full ?? hash}`}
      >
        <Hash size={9} />
        <span>{hash}</span>
        {copied ? <Check size={9} className="text-success" /> : <Copy size={9} />}
      </button>
      {explorer && (
        <Link
          to="/transparency"
          search={{ q: full ?? hash }}
          onClick={(e) => e.stopPropagation()}
          className="text-muted-foreground hover:text-primary inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] transition-colors"
          title="Verify on Hash Explorer"
        >
          <ExternalLink size={9} />
        </Link>
      )}
    </span>
  );
}
