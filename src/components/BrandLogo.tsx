import logoLight from "@/assets/medimint-logo.png";
import logoDark from "@/assets/medimint-logo-dark.png";
import iconUrl from "@/assets/medimint-icon.png";

interface Props {
  size?: number;
  /** Show only the icon mark (square), no wordmark. */
  iconOnly?: boolean;
  /** Restrict the wordmark height while preserving aspect ratio. */
  height?: number;
  /** Which wordmark variant to render. Defaults to "dark" (white text) for the app's dark theme. */
  variant?: "light" | "dark";
  className?: string;
}

export function BrandLogo({
  size = 32,
  iconOnly = false,
  height,
  variant = "dark",
  className = "",
}: Props) {
  if (iconOnly) {
    return (
      <img
        src={iconUrl}
        alt="Medimint"
        width={size}
        height={size}
        className={`shrink-0 ${className}`}
        loading="eager"
      />
    );
  }
  const h = height ?? Math.round(size * 0.9);
  const src = variant === "light" ? logoLight : logoDark;
  return (
    <img
      src={src}
      alt="Medimint"
      style={{ height: h, width: "auto" }}
      className={`block max-w-full object-contain ${className}`}
      loading="eager"
    />
  );
}
