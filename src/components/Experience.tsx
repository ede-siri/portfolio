import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section className="bg-surface-container-lowest py-[120px]" id="experience">
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <div className="reveal mb-20 flex flex-col items-baseline justify-between gap-6 md:flex-row">
          <h2 className="font-display text-[40px] font-medium leading-[48px]">
            Career Path
          </h2>
          <span className="font-label text-xs font-medium uppercase tracking-[0.1em] text-on-surface-variant/60">
            Professional Milestones
          </span>
        </div>

        <div className="reveal divide-y divide-outline-variant/30 border-y border-outline-variant/30">
          {experience.map((item) => (
            <div
              key={`${item.period}-${item.company}`}
              className="group flex flex-col items-start justify-between gap-8 py-10 transition-colors duration-500 hover:bg-background md:flex-row"
            >
              <div>
                <span className="mb-2 block font-mono text-sm text-on-secondary-fixed-variant">
                  {item.period}
                </span>
                <h3 className="font-display text-[28px] font-medium leading-[34px] transition-all group-hover:italic">
                  {item.company}
                </h3>
                <p className="mt-2 font-label text-xs font-medium uppercase tracking-[0.1em] text-on-surface-variant">
                  {item.role}
                  {item.location ? ` • ${item.location}` : ""}
                </p>
              </div>
              <div className="max-w-md">
                <p className="text-base leading-[26px] text-on-surface-variant">
                  {item.description}
                </p>
                {item.skills && item.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-surface-container px-3 py-1 font-label text-[10px] font-medium uppercase tracking-[0.1em] text-on-surface-variant"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
