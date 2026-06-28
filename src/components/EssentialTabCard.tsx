"use client";

import { useEffect, useRef, useState } from "react";

import type { EssentialTab } from "@/lib/essential-tabs";

type EssentialTabCardProps = {
  tab: EssentialTab;
};

function useInViewOnce() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView]);

  return { ref, inView };
}

function WindowControls() {
  const dotClass =
    "grid h-3 w-3 shrink-0 place-items-center rounded-full transition-shadow duration-300";

  const iconClass =
    "opacity-0 transition-opacity duration-300 group-hover:opacity-80";

  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span
        className={`${dotClass} bg-[#ff5f57] group-hover:shadow-[0_0_10px_rgba(255,95,87,0.55)]`}
      >
        <svg
          className={iconClass}
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 2L6 6M6 2L2 6"
            stroke="#4a0000"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span
        className={`${dotClass} bg-[#febc2e] group-hover:shadow-[0_0_10px_rgba(254,188,46,0.55)]`}
      >
        <svg
          className={iconClass}
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 4H6"
            stroke="#5a4200"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span
        className={`${dotClass} bg-[#28c840] group-hover:shadow-[0_0_10px_rgba(40,200,64,0.55)]`}
      >
        <svg
          className={iconClass}
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 4H6M4 2V6"
            stroke="#0f4a1c"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>
  );
}

function StatusTypewriter({
  status,
  active,
  reducedMotion,
}: {
  status: string;
  active: boolean;
  reducedMotion: boolean;
}) {
  const fullText = `STATUS: ${status}`;
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    if (reducedMotion) {
      setDisplayedText(fullText);
      return;
    }

    setDisplayedText("");
    setShowCursor(true);

    let index = 0;
    const intervalId = window.setInterval(() => {
      index += 1;
      setDisplayedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        window.clearInterval(intervalId);
        window.setTimeout(() => setShowCursor(false), 400);
      }
    }, 38);

    return () => window.clearInterval(intervalId);
  }, [active, fullText, reducedMotion]);

  return (
    <p
      className="mt-auto min-h-[1rem] pt-10 font-label text-[10px] font-medium uppercase tracking-[0.12em] text-on-surface-subtle"
      aria-label={fullText}
    >
      <span aria-hidden="true">
        {displayedText}
        {showCursor ? (
          <span className="ml-0.5 inline-block h-[0.85em] w-px translate-y-[0.06em] bg-on-surface-subtle/80" />
        ) : null}
      </span>
    </p>
  );
}

export default function EssentialTabCard({ tab }: EssentialTabCardProps) {
  const { ref, inView } = useInViewOnce();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  return (
    <article
      ref={ref}
      className={`group flex min-h-[17.5rem] flex-col overflow-hidden rounded-xl border border-outline bg-[#121212] hover:border-white/20 hover:bg-[#151515] md:min-h-[19rem] ${
        reducedMotion
          ? ""
          : "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:-rotate-[0.5deg]"
      }`}
    >
      <div className="flex items-center justify-between border-b border-outline/80 bg-[#0a0a0a] px-5 py-3.5 transition-colors duration-300 group-hover:border-outline-strong">
        <div className="flex items-center gap-3">
          <WindowControls />
          <span className="font-label text-[10px] font-medium uppercase tracking-[0.14em] text-on-surface-muted transition-colors duration-300 group-hover:text-on-surface">
            {tab.mode}
          </span>
        </div>
        <span className="font-mono text-xs text-on-surface-subtle transition-colors duration-300 group-hover:text-on-surface-muted">
          {tab.path}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 py-8 md:px-7 md:py-9">
        <div className="flex items-start gap-3.5">
          <span
            className={`mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-accent transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(155,124,255,0.75)] ${
              inView && !reducedMotion ? "animate-accent-pulse-once" : ""
            }`}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <h3 className="font-display text-[2rem] font-medium leading-tight text-on-surface md:text-[2.125rem]">
              {tab.title}
            </h3>
            <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-on-surface-muted md:text-[0.9375rem]">
              {tab.description}
            </p>
          </div>
        </div>

        <StatusTypewriter
          status={tab.status}
          active={inView}
          reducedMotion={reducedMotion}
        />
      </div>
    </article>
  );
}
