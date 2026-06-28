"use client";

import { useEffect, useState } from "react";

type TypewriterHeadingProps = {
  text: string;
  className?: string;
};

const TYPING_INTERVAL_MS = 55;

export default function TypewriterHeading({
  text,
  className = "",
}: TypewriterHeadingProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      setShowCursor(false);
      return;
    }

    setDisplayedText("");
    setIsComplete(false);
    setShowCursor(true);

    let index = 0;
    const intervalId = window.setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(intervalId);
        setIsComplete(true);
        window.setTimeout(() => setShowCursor(false), 500);
      }
    }, TYPING_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [text]);

  return (
    <h1
      className={`mb-4 font-display text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-on-surface md:text-[56px] md:leading-[1.08] ${className}`.trim()}
      aria-label={text}
    >
      <span aria-hidden="true">
        {displayedText}
        {showCursor && !isComplete ? (
          <span className="ml-0.5 inline-block h-[0.85em] w-px translate-y-[0.08em] bg-on-surface-muted/70" />
        ) : null}
      </span>
    </h1>
  );
}
