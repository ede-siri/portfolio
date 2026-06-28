import Image from "next/image";
import { projects } from "@/lib/data";

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const isAccent = project.variant === "accent";
  const isMuted = project.variant === "muted";
  const hasImage = project.variant === "image" && "image" in project;

  const bgClass = isAccent
    ? "bg-secondary-container"
    : isMuted
      ? "bg-surface-container"
      : "bg-surface-container";

  const titleClass = isAccent ? "text-on-secondary-fixed" : "";
  const descClass = isAccent
    ? "text-on-secondary-fixed/80"
    : "text-on-surface-variant";
  const linkClass = isAccent ? "text-on-secondary-fixed" : "";
  const tagBg = isAccent
    ? "bg-on-secondary-fixed/10 text-on-secondary-fixed"
    : isMuted
      ? "bg-on-tertiary-fixed-variant/10 text-on-tertiary-fixed-variant"
      : "bg-on-secondary-fixed-variant/10 text-on-secondary-fixed-variant";

  return (
    <div
      className={`reveal group relative flex aspect-[16/10] flex-col justify-end overflow-hidden border border-outline-variant/20 p-10 ${bgClass}`}
    >
      {hasImage && (
        <div className="absolute inset-0 z-0 scale-100 transition-transform duration-700 group-hover:scale-105">
          <Image
            src={project.image}
            alt=""
            fill
            className="object-cover opacity-20 transition-opacity group-hover:opacity-40"
          />
        </div>
      )}

      <div className="relative z-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-3 py-1 font-label text-[10px] font-medium uppercase tracking-[0.1em] ${tagBg}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3
          className={`mb-2 font-display text-[28px] font-medium leading-[34px] ${titleClass}`}
        >
          {project.title}
        </h3>
        <p className={`mb-6 text-base leading-[26px] ${descClass}`}>
          {project.description}
        </p>
        <a
          href={project.href}
          className={`inline-flex items-center gap-2 font-label text-xs font-medium uppercase tracking-[0.1em] transition-transform group-hover:translate-x-2 ${linkClass}`}
        >
          Explore Case Study
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="py-[120px]" id="work">
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <div className="reveal mb-20 text-center">
          <h2 className="mb-4 font-display text-[32px] font-medium leading-[38px] md:text-[40px] md:leading-[48px]">
            Curated Works
          </h2>
          <p className="font-label text-xs font-medium uppercase tracking-[0.1em] text-on-surface-variant">
            Selected Engineering Case Studies
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
