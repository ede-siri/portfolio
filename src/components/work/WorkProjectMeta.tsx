type WorkProjectMetaProps = {
  role: string;
  year: string;
};

export default function WorkProjectMeta({ role, year }: WorkProjectMetaProps) {
  return (
    <div className="grid grid-cols-2 gap-8 border-t border-outline pt-6">
      <div>
        <p className="font-label text-[10px] font-medium uppercase tracking-[0.14em] text-on-surface-subtle">
          Role
        </p>
        <p className="mt-2 font-mono text-sm text-on-surface">{role}</p>
      </div>
      <div>
        <p className="font-label text-[10px] font-medium uppercase tracking-[0.14em] text-on-surface-subtle">
          Year
        </p>
        <p className="mt-2 font-mono text-sm text-on-surface">{year}</p>
      </div>
    </div>
  );
}
