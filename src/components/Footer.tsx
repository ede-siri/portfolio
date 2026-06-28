import { siteConfig } from "@/lib/data";

const footerLinks = [
  { href: siteConfig.social.x, path: "/x" },
  { href: siteConfig.social.linkedin, path: "/linkedin" },
  { href: siteConfig.social.github, path: "/github" },
  { href: siteConfig.social.instagram, path: "/instagram" },
  { href: `mailto:${siteConfig.email}`, path: "/mail" },
] as const;

function FooterRail({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`hidden min-h-full w-14 shrink-0 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:10px_10px] sm:block md:w-20 ${
        side === "left" ? "border-r border-accent" : "border-l border-accent"
      }`}
    />
  );
}

function FooterSocialLink({
  href,
  path,
}: {
  href: string;
  path: string;
}) {
  const isMail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      className="font-mono text-sm text-on-surface-muted transition-colors duration-300 hover:text-on-surface"
      {...(isMail
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" })}
    >
      [ {path} ]
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-outline bg-background">
      <div className="grid min-h-[22rem] grid-cols-1 sm:grid-cols-[auto_1fr_auto] md:min-h-[26rem]">
        <FooterRail side="left" />

        <div className="flex flex-col items-center justify-center px-6 py-16 text-center md:py-20">
          <a
            href="/"
            className="font-display text-[3.5rem] font-medium leading-none text-on-surface transition-opacity hover:opacity-80 md:text-[4.5rem]"
            aria-label="Home"
          >
            {siteConfig.logo}
          </a>

          <nav
            className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 md:mt-12 md:gap-x-9"
            aria-label="Social links"
          >
            {footerLinks.map((link) => (
              <FooterSocialLink key={link.path} {...link} />
            ))}
          </nav>

          <p className="mt-14 max-w-xl font-label text-[10px] font-medium uppercase leading-relaxed tracking-[0.14em] text-on-surface-subtle md:mt-16">
            © 2026 {siteConfig.name.toUpperCase()}.{" "}
            {siteConfig.tagline.toUpperCase()}
          </p>
        </div>

        <FooterRail side="right" />
      </div>
    </footer>
  );
}
