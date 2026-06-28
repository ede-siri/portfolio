import type { WorkProject } from "@/lib/data";

import WorkProjectMeta from "@/components/work/WorkProjectMeta";
import WorkProjectVisual from "@/components/work/WorkProjectVisual";

type WorkFeaturedProjectProps = {
  project: WorkProject;
};

export default function WorkFeaturedProject({
  project,
}: WorkFeaturedProjectProps) {
  return (
    <article className="border border-outline">
      <div className="grid lg:grid-cols-2">
        <WorkProjectVisual
          image={project.image}
          alt={project.title}
          featured
        />

        <div className="flex flex-col border-t border-outline p-6 md:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <span className="mb-8 ml-auto font-mono text-sm text-on-surface-subtle">
            {project.index}
          </span>

          <h2 className="font-display text-[2rem] font-medium leading-tight text-on-surface md:text-[2.5rem]">
            {project.title}
          </h2>

          <p className="mt-6 font-mono text-sm leading-7 text-on-surface-muted">
            {project.description}
          </p>

          <p className="mt-6 font-label text-[10px] font-medium uppercase tracking-[0.12em] text-on-surface-subtle">
            {project.tags.join(" · ")}
          </p>

          <div className="mt-auto pt-8">
            <WorkProjectMeta role={project.role} year={project.year} />
          </div>

          <a
            href={project.href}
            className="mt-6 inline-flex self-end text-on-surface transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5"
            aria-label={`View ${project.title}`}
          >
            <span aria-hidden="true" className="text-lg">
              ↗
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
