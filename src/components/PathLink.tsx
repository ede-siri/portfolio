import Link from "next/link";

type PathLinkProps = {
  href: string;
  path: string;
  variant?: "plain" | "bracket";
  className?: string;
  onClick?: () => void;
};

export default function PathLink({
  href,
  path,
  variant = "plain",
  className = "",
  onClick,
}: PathLinkProps) {
  const baseClass =
    "font-mono text-sm text-on-surface-muted transition-colors duration-300 hover:text-on-surface";

  if (variant === "bracket") {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`${baseClass} border border-outline px-3 py-1.5 hover:border-outline-strong hover:bg-surface-elevated ${className}`.trim()}
      >
        [ {path} ]
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClass} border-b border-transparent hover:border-outline-strong ${className}`.trim()}
    >
      {path}
    </Link>
  );
}
