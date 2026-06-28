"use client";

import { useEffect, useRef } from "react";

export default function CursorIllumination() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReduced || !hasFinePointer) {
      return;
    }

    const glow = glowRef.current;
    if (!glow) {
      return;
    }

    let frame = 0;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;
    let isVisible = false;

    const render = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      glow.style.setProperty("--cursor-x", `${currentX}px`);
      glow.style.setProperty("--cursor-y", `${currentY}px`);
      glow.style.opacity = isVisible ? "1" : "0";

      frame = window.requestAnimationFrame(render);
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      isVisible = true;
    };

    const onLeave = () => {
      isVisible = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-500 [@media(pointer:coarse)]:hidden"
      style={{
        background:
          "radial-gradient(ellipse 46rem 36rem at var(--cursor-x, 50%) var(--cursor-y, 40%), rgba(155, 124, 255, 0.26), rgba(155, 124, 255, 0.09) 40%, transparent 74%)",
      }}
    />
  );
}
