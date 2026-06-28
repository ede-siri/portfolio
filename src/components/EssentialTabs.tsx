import EssentialTabCard from "@/components/EssentialTabCard";
import PathLabel from "@/components/PathLabel";
import { essentialTabs } from "@/lib/essential-tabs";

export default function EssentialTabs() {
  return (
    <section className="border-b border-outline py-20 md:py-28" aria-labelledby="essential-tabs-heading">
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <PathLabel path="~/edesiri/offline" className="mb-4" />
          <h2
            id="essential-tabs-heading"
            className="mb-4 font-display text-[40px] font-medium leading-tight text-on-surface md:text-[48px]"
          >
            Essential tabs keeping me running
          </h2>
          <p className="font-mono text-sm leading-relaxed text-on-surface-muted md:text-base">
            The hobbies, habits, and tiny obsessions that keep life interesting.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {essentialTabs.map((tab) => (
            <EssentialTabCard key={tab.id} tab={tab} />
          ))}
        </div>
      </div>
    </section>
  );
}
