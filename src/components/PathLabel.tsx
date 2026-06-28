type PathLabelProps = {
  path: string;
  className?: string;
};

export default function PathLabel({ path, className = "" }: PathLabelProps) {
  return (
    <p
      className={`font-mono text-sm text-on-surface-muted ${className}`.trim()}
    >
      {path}
    </p>
  );
}
