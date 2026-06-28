import { recognition } from "@/lib/data";

export default function Recognition() {
  return (
    <section className="bg-surface-container-low py-[80px]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <div className="reveal mb-12">
          <h2 className="font-display text-[28px] font-medium leading-[34px]">
            Recognition
          </h2>
        </div>

        <div className="reveal divide-y divide-outline-variant/30 border-y border-outline-variant/30">
          {recognition.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-1 py-6 md:flex-row md:items-baseline md:justify-between"
            >
              <h3 className="font-body text-base font-medium text-on-background">
                {item.title}
              </h3>
              <p className="font-mono text-sm text-on-surface-variant">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
