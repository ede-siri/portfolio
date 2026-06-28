import type { WorkProject } from "@/lib/data";

import WorkProjectMeta from "@/components/work/WorkProjectMeta";
import WorkProjectVisual from "@/components/work/WorkProjectVisual";

type WorkProjectCardProps = {
  project: WorkProject;
};

export default function WorkProjectCard({ project }: WorkProjectCardProps) {
  return (
    <article className="flex h-full flex-col border border-outline">
      <WorkProjectVisual image={project.image} alt={project.title} />

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <span className="mb-6 ml-auto font-mono text-sm text-on-surface-subtle">
          {project.index}
        </span>

        <h2 className="font-display text-[1.75rem] font-medium leading-tight text-on-surface">
          {project.title}
        </h2>

        <p className="mt-4 font-mono text-sm leading-7 text-on-surface-muted">
          {project.description}
        </p>

        <p className="mt-5 font-label text-[10px] font-medium uppercase tracking-[0.12em] text-on-surface-subtle">
          {project.tags.join(" · ")}
        </p>

        <div className="mt-auto pt-6">
          <WorkProjectMeta role={project.role} year={project.year} />
        </div>

        <a
          href={project.href}
          className="mt-5 inline-flex self-end text-on-surface transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5"
          aria-label={`View ${project.title}`}
        >
          <span aria-hidden="true" className="text-lg">
            ↗
          </span>
        </a>
      </div>
    </article>
  );
}
