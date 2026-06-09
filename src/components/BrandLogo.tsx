import logoUrl from "@/assets/medimint-logo.png";
import iconUrl from "@/assets/medimint-icon.png";

interface Props {
  size?: number;
  /** Show only the icon mark (square), no wordmark. */
  iconOnly?: boolean;
  /** Restrict the wordmark height while preserving aspect ratio. */
  height?: number;
  className?: string;
}

export function BrandLogo({ size = 32, iconOnly = false, height, className = "" }: Props) {
  if (iconOnly) {
    return (
      <img
        src={iconUrl}
        alt="Medimint"
        width={size}
        height={size}
        className={`shrink-0 rounded-[24%] ${className}`}
        loading="eager"
      />
    );
  }
  const h = height ?? Math.round(size * 0.9);
  return (
    <img
      src={logoUrl}
      alt="Medimint"
      style={{ height: h, width: "auto" }}
      className={`block max-w-full object-contain ${className}`}
      loading="eager"
    />
  );
}
