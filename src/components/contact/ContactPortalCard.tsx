import type { ContactPortal } from "@/lib/data";

function PortalCorner({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-2 w-2 border-white/25 transition-colors duration-300 group-hover:border-accent/60 ${className}`}
    />
  );
}

function ExternalIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M17 7H9M17 7V15" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ContactPortalCard({ portal }: { portal: ContactPortal }) {
  const isMail = portal.href.startsWith("mailto:");

  return (
    <a
      href={portal.href}
      className="group relative block min-h-[18.5rem] overflow-hidden border border-outline bg-[#080808] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/45 hover:bg-[#090909] motion-reduce:transform-none md:min-h-[20rem]"
      {...(portal.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      aria-label={`${portal.path.replace("/", "")}: ${portal.handle}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(155, 124, 255, 0.16), transparent 64%)",
        }}
      />

      <p className="pointer-events-none absolute right-4 top-4 z-20 font-mono text-[9px] uppercase tracking-[0.14em] text-on-surface-subtle opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:right-5 md:top-5">
        access: public
      </p>

      <div className="relative m-5 flex min-h-[14.5rem] flex-col border border-white/[0.07] px-5 py-9 transition-all duration-300 group-hover:border-accent/25 group-hover:shadow-[inset_0_0_32px_rgba(155,124,255,0.04)] md:m-6 md:min-h-[15.5rem] md:px-6 md:py-10">
          <PortalCorner className="left-3 top-3 border-l border-t" />
          <PortalCorner className="right-3 top-3 border-r border-t" />
          <PortalCorner className="bottom-3 left-3 border-b border-l" />
          <PortalCorner className="right-3 bottom-3 border-b border-r" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <p className="font-mono text-sm text-accent">{portal.path}</p>
            <span className="text-on-surface/55 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent/90">
              {isMail ? <MailIcon /> : <ExternalIcon />}
            </span>
          </div>

          <div className="relative z-10 flex flex-1 flex-col justify-center py-7 md:py-8">
            <p className="relative z-10 font-label text-[9px] font-medium uppercase tracking-[0.22em] text-on-surface-subtle transition-colors duration-300 group-hover:text-on-surface-muted">
              {portal.vibe}
            </p>
            <p className="mt-2.5 font-display text-[1.6rem] font-medium leading-[1.1] text-on-surface md:text-[1.8rem]">
              {portal.handle}
            </p>
          </div>

          <p className="relative z-10 font-mono text-xs tracking-[0.03em] text-accent/80 transition-colors duration-300 group-hover:text-accent">
            {portal.action}
          </p>
      </div>
    </a>
  );
}
