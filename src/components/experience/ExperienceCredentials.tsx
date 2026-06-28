import PathLabel from "@/components/PathLabel";
import {
  InventoryCardAccent,
  inventoryCardClass,
} from "@/components/experience/inventoryCardStyles";
import { educationNotes, recognitionNotes } from "@/lib/data";

function EducationCard() {
  return (
    <article className={inventoryCardClass}>
      <InventoryCardAccent />
      <p className="font-mono text-sm text-on-surface">/education</p>
      <div className="mt-4 space-y-2">
        {educationNotes.map((line) => (
          <p
            key={line}
            className="font-mono text-sm leading-7 text-on-surface-muted transition-colors duration-300 group-hover:text-on-surface"
          >
            {line}
          </p>
        ))}
      </div>
    </article>
  );
}

function RecognitionCard() {
  return (
    <article className={inventoryCardClass}>
      <InventoryCardAccent />
      <p className="font-mono text-sm text-on-surface">/recognition</p>
      <div className="mt-5 space-y-6">
        {recognitionNotes.map((item) => (
          <div key={item.title}>
            <p className="font-mono text-sm text-on-surface">{item.title}</p>
            <p className="mt-1.5 font-mono text-sm leading-6 text-on-surface-muted transition-colors duration-300 group-hover:text-on-surface">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function ExperienceCredentials() {
  return (
    <section
      className="border-t border-outline pt-12 md:pt-16"
      aria-labelledby="notes-heading"
    >
      <PathLabel path="~/edesiri/notes" className="mb-5" />
      <h2
        id="notes-heading"
        className="mb-8 font-display text-[2rem] font-medium leading-tight text-on-surface md:text-[2.25rem]"
      >
        Recognition &amp; education
      </h2>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <RecognitionCard />
        <EducationCard />
      </div>
    </section>
  );
}
