import type { ReactNode } from "react";

type RotationCardLinkProps = {
  href?: string;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
};

const hoverClass =
  "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:-rotate-[0.5deg] hover:border-white/20 hover:bg-surface-elevated motion-reduce:transform-none motion-reduce:hover:transform-none";

export default function RotationCardLink({
  href,
  ariaLabel,
  className = "",
  children,
}: RotationCardLinkProps) {
  const baseClass = `group block overflow-hidden rounded-xl border border-outline bg-surface-card ${hoverClass} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <div className={baseClass} aria-label={ariaLabel}>
      {children}
    </div>
  );
}
