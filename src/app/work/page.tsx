import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PathLabel from "@/components/PathLabel";
import WorkFeaturedProject from "@/components/work/WorkFeaturedProject";
import WorkProjectCard from "@/components/work/WorkProjectCard";
import { workProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work | Edesiri Ohwomado",
  description:
    "Selected work across applied AI, cloud systems, observability, and product engineering.",
};

export default function WorkPage() {
  const featuredProject = workProjects.find((project) => project.featured);
  const gridProjects = workProjects.filter((project) => !project.featured);

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="mx-auto max-w-[1280px] px-5 pb-20 md:px-16 md:pb-28">
          <section className="border-b border-outline py-14 md:py-20">
            <PathLabel path="~/edesiri/work" className="mb-5" />
            <h1 className="max-w-4xl font-display text-[2.5rem] font-medium leading-[1.08] text-on-surface md:text-[3.5rem]">
              Work I&apos;m proud of.
            </h1>
            <p className="mt-5 max-w-2xl font-mono text-sm leading-7 text-on-surface-muted md:text-[0.9375rem]">
              A few projects that shaped how I build, think, and solve
              problems.
            </p>
          </section>

          <section className="py-10 md:py-14">
            {featuredProject ? (
              <WorkFeaturedProject project={featuredProject} />
            ) : null}
          </section>

          <section className="grid gap-6 md:grid-cols-2 md:gap-8">
            {gridProjects.map((project) => (
              <WorkProjectCard key={project.index} project={project} />
            ))}
          </section>

          <section className="mt-10 border border-outline md:mt-14">
            <div className="grid gap-6 p-6 md:grid-cols-2 md:items-center md:gap-12 md:p-8">
              <h2 className="font-display text-[1.75rem] font-medium leading-tight text-on-surface md:text-[2rem]">
                More experiments soon
              </h2>
              <p className="font-mono text-sm leading-7 text-on-surface-muted">
                Side projects, prototypes, and ideas I&apos;m still shaping will
                live here as they become real.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
