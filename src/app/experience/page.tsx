import type { Metadata } from "next";

import BuildToolkit from "@/components/experience/BuildToolkit";
import ExperienceCredentials from "@/components/experience/ExperienceCredentials";
import ExperienceRoleCard from "@/components/experience/ExperienceRoleCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PathLabel from "@/components/PathLabel";
import { experienceEntries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experience | Edesiri Ohwomado",
  description:
    "A timeline of roles, internships, and early-stage projects across cloud systems, product building, and applied AI.",
};

export default function ExperiencePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="mx-auto max-w-[1280px] px-5 pb-20 md:px-16 md:pb-28">
          <section className="border-b border-outline py-14 md:py-20">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="max-w-4xl">
                <PathLabel path="~/edesiri/experience" className="mb-5" />
                <h1 className="font-display text-[2.35rem] font-medium leading-[1.08] text-on-surface md:text-[3.25rem]">
                  Where I&apos;ve worked, built, and learned.
                </h1>
                <p className="mt-5 max-w-2xl font-mono text-sm leading-7 text-on-surface-muted md:text-[0.9375rem]">
                  A timeline of the roles, internships, and early-stage projects
                  that shaped how I think about software.
                </p>
              </div>

              <p className="font-mono text-sm text-on-surface-muted md:pt-10 md:text-right">
                Currently: London, UK
              </p>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="space-y-5 md:space-y-6">
              {experienceEntries.map((entry) => (
                <ExperienceRoleCard
                  key={`${entry.period}-${entry.company}`}
                  entry={entry}
                />
              ))}
            </div>
          </section>

          <section className="border-t border-outline py-12 md:py-16">
            <BuildToolkit />
          </section>

          <ExperienceCredentials />
        </div>
      </main>
      <Footer />
    </>
  );
}
