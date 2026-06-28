import type { ExperienceEntry } from "@/lib/data";

import ExperienceCompanyLogo from "@/components/experience/ExperienceCompanyLogo";

type ExperienceRoleCardProps = {
  entry: ExperienceEntry;
};

export default function ExperienceRoleCard({ entry }: ExperienceRoleCardProps) {
  const metaLine = [entry.period.toUpperCase(), entry.location.toUpperCase()]
    .filter(Boolean)
    .join(" | ");

  return (
    <article className="border border-outline p-6 md:p-8">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[1.5rem] font-medium leading-tight text-on-surface md:text-[1.75rem]">
            {entry.company} — {entry.role}
          </h3>

          <p className="mt-3 font-label text-[10px] font-medium uppercase tracking-[0.14em] text-accent">
            {metaLine}
          </p>

          <p className="mt-5 max-w-3xl font-mono text-sm leading-7 text-on-surface-muted">
            {entry.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="font-label text-[10px] font-medium uppercase tracking-[0.12em] text-on-surface-subtle"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <ExperienceCompanyLogo company={entry.company} logo={entry.logo} />
      </div>
    </article>
  );
}
