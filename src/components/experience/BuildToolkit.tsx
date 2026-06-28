import PathLabel from "@/components/PathLabel";
import {
  InventoryCardAccent,
  inventoryCardClass,
} from "@/components/experience/inventoryCardStyles";
import { toolkitInventory } from "@/lib/data";

function ToolkitCard({ path, items }: { path: string; items: string[] }) {
  return (
    <article className={inventoryCardClass}>
      <InventoryCardAccent />
      <p className="font-mono text-sm text-on-surface transition-colors duration-300 group-hover:text-on-surface">
        {path}
      </p>
      <p className="mt-3 font-mono text-sm leading-7 text-on-surface-muted transition-colors duration-300 group-hover:text-on-surface">
        {items.join(" · ")}
      </p>
    </article>
  );
}

export default function BuildToolkit() {
  return (
    <section aria-labelledby="working-toolkit-heading">
      <PathLabel path="~/edesiri/toolkit" className="mb-5" />
      <h2
        id="working-toolkit-heading"
        className="font-display text-[2rem] font-medium leading-tight text-on-surface md:text-[2.25rem]"
      >
        My working toolkit
      </h2>
      <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-on-surface-muted md:text-[0.9375rem]">
        The languages, tools, and systems I&apos;ve used to build, debug, ship,
        and learn.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {toolkitInventory.map((card) => (
          <ToolkitCard key={card.path} path={card.path} items={card.items} />
        ))}
      </div>
    </section>
  );
}
