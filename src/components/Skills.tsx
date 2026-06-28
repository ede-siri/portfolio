import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section className="overflow-hidden border-y border-outline-variant/20 bg-background py-[120px]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <h2 className="reveal mb-20 font-display text-[40px] font-medium leading-[48px]">
          Stack &amp; Specialization
        </h2>

        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => (
            <div
              key={group.category}
              className="reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h4 className="mb-8 border-b border-outline-variant pb-2 font-label text-xs font-medium uppercase tracking-[0.1em] text-secondary">
                {group.category}
              </h4>
              <ul className="space-y-4 text-base leading-[26px] text-on-surface-variant">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-px w-3 shrink-0 bg-on-surface-variant/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
