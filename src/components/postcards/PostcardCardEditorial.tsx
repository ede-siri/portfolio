import Image from "next/image";
import { useId } from "react";

import type { Postcard } from "@/lib/data";

const showPolaroid = false;

function parseVisitDate(date: string) {
  const parts = date.trim().split(/\s+/);
  const month = (parts[0] ?? date).replace(/\./g, "").toUpperCase();
  const year = parts[1] ?? "";

  return { month, year };
}

function PostageStamp({ airport }: { airport: string }) {
  return (
    <div className="relative h-[2.35rem] w-[1.75rem] shrink-0" aria-hidden="true">
      <svg
        viewBox="0 0 58 76"
        className="absolute inset-0 h-full w-full drop-shadow-sm"
        fill="none"
      >
        <path
          d="M4 8c0-2.2 1.8-4 4-4h42c2.2 0 4 1.8 4 4v60c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V8z"
          fill="white"
          stroke="#d8d8d8"
          strokeWidth="0.5"
        />
        <circle cx="4" cy="10" r="2.2" fill="#0a0a0a" />
        <circle cx="54" cy="10" r="2.2" fill="#0a0a0a" />
        <circle cx="4" cy="38" r="2.2" fill="#0a0a0a" />
        <circle cx="54" cy="38" r="2.2" fill="#0a0a0a" />
        <circle cx="4" cy="66" r="2.2" fill="#0a0a0a" />
        <circle cx="54" cy="66" r="2.2" fill="#0a0a0a" />
        <circle cx="18" cy="4" r="2.2" fill="#0a0a0a" />
        <circle cx="40" cy="4" r="2.2" fill="#0a0a0a" />
        <circle cx="18" cy="72" r="2.2" fill="#0a0a0a" />
        <circle cx="40" cy="72" r="2.2" fill="#0a0a0a" />
      </svg>

      <div className="relative flex h-full flex-col items-center justify-center gap-1 px-0.5 py-1 text-black">
        <p className="font-mono text-[0.58rem] font-semibold leading-none tracking-tight">
          {airport}
        </p>
        <svg
          viewBox="0 0 24 24"
          className="h-1.5 w-1.5 fill-black"
          aria-hidden="true"
        >
          <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>
      </div>
    </div>
  );
}

function VisitStamp({ date, location }: { date: string; location: string }) {
  const stampId = useId().replace(/:/g, "");
  const { month, year } = parseVisitDate(date);
  const ink = "rgba(232, 224, 255, 0.92)";
  const ring = "rgba(196, 181, 253, 0.72)";
  const ringInner = "rgba(196, 181, 253, 0.42)";

  return (
    <div
      className="pointer-events-none absolute bottom-0 right-0 z-20 h-[4.35rem] w-[4.35rem] translate-x-1 translate-y-1 -rotate-[11deg] md:h-[4.85rem] md:w-[4.85rem] md:translate-x-1.5 md:translate-y-1.5"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <path
            id={`top-${stampId}`}
            d="M 18 60 A 42 42 0 0 1 102 60"
            fill="none"
          />
          <path
            id={`bottom-${stampId}`}
            d="M 24 78 A 36 36 0 0 0 96 78"
            fill="none"
          />
        </defs>

        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={ring}
          strokeWidth="0.85"
        />
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke={ringInner}
          strokeWidth="0.6"
        />

        <text
          fill={ink}
          fontFamily="ui-monospace, monospace"
          fontSize="7"
          fontWeight="500"
          letterSpacing="1.5"
        >
          <textPath
            href={`#top-${stampId}`}
            startOffset="50%"
            textAnchor="middle"
          >
            {`VISITED · ${month}`}
          </textPath>
        </text>

        <line
          x1="38"
          y1="59.5"
          x2="82"
          y2="59.5"
          stroke={ringInner}
          strokeWidth="0.65"
        />
        <text
          x="60"
          y="67"
          textAnchor="middle"
          fill={ink}
          fontFamily="ui-monospace, monospace"
          fontSize="13"
          fontWeight="600"
          letterSpacing="0.4"
        >
          {year}
        </text>
        <line
          x1="38"
          y1="71.5"
          x2="82"
          y2="71.5"
          stroke={ringInner}
          strokeWidth="0.65"
        />

        <text
          fill={ink}
          fontFamily="ui-monospace, monospace"
          fontSize="6.5"
          fontWeight="500"
          letterSpacing="1.2"
        >
          <textPath
            href={`#bottom-${stampId}`}
            startOffset="50%"
            textAnchor="middle"
          >
            {location}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default function PostcardCardEditorial({ postcard }: { postcard: Postcard }) {
  const description = postcard.description ?? postcard.note;

  return (
    <article
      className={`group border border-outline bg-[#0a0a0a] p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-outline-strong hover:bg-[#0d0d0d] motion-reduce:transform-none md:p-5 ${postcard.rotation}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <p className="font-label pt-1 text-[10px] font-medium tracking-[0.14em] text-on-surface-muted">
          Sent from {postcard.slug}
        </p>
        <PostageStamp airport={postcard.airport} />
      </div>

      <div className="relative mb-4 aspect-[4/3.75]">
        <div className="absolute inset-0 overflow-hidden bg-[#111]">
          {postcard.image ? (
            <Image
              src={postcard.image}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 33vw"
              className="scale-[1.02] object-cover"
            />
          ) : (
            <div
              className={`h-full w-full bg-gradient-to-br ${postcard.imageTone}`}
            />
          )}
        </div>

        {showPolaroid && postcard.image ? (
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-[36%] min-w-[6.25rem] max-w-[8.25rem] -translate-x-1 translate-y-2 -rotate-6 border-[3px] border-white bg-white p-1.5 pb-4 shadow-lg">
            <div className="relative aspect-square overflow-hidden bg-[#111]">
              <Image
                src={postcard.polaroidImage ?? postcard.image}
                alt=""
                fill
                unoptimized
                sizes="160px"
                className={
                  postcard.polaroidImage
                    ? "object-cover object-center"
                    : "object-cover object-[center_20%] scale-125"
                }
              />
            </div>
          </div>
        ) : null}

        <VisitStamp date={postcard.date} location={postcard.location.toUpperCase()} />
      </div>

      <h3 className="font-display text-[1.65rem] font-medium leading-tight text-on-surface md:text-[1.85rem]">
        {postcard.location}
      </h3>

      <p className="mt-3 font-mono text-xs leading-[1.7] text-on-surface-muted md:text-[0.8125rem]">
        {description}
      </p>

      <div className="my-4 border-b border-dotted border-outline" />

      {postcard.vibe ? (
        <p className="font-label text-[10px] font-medium uppercase tracking-[0.18em] text-on-surface-subtle">
          Vibe: {postcard.vibe}
        </p>
      ) : null}
    </article>
  );
}
