import Image from "next/image";

type ExperienceCompanyLogoProps = {
  company: string;
  logo?: string;
};

export default function ExperienceCompanyLogo({
  company,
  logo,
}: ExperienceCompanyLogoProps) {
  if (logo) {
    const isCircular = /amazon|aws|bluechip|rime/.test(logo);
    const isBluechip = logo.includes("bluechip");

    return (
      <div className="flex shrink-0 items-center justify-end">
        <Image
          src={logo}
          alt={`${company} logo`}
          width={isCircular ? 80 : 140}
          height={isCircular ? 80 : 48}
          unoptimized
          className={
            isCircular
              ? `h-10 w-10 rounded-full object-cover md:h-11 md:w-11${
                  isBluechip ? " object-top" : ""
                }`
              : "h-10 w-auto max-w-[9rem] object-contain object-right md:h-11"
          }
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-outline bg-surface-elevated font-display text-sm text-accent"
      aria-hidden="true"
    >
      {company.charAt(0)}
    </div>
  );
}
