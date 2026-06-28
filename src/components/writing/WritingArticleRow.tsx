import type { WritingArticle } from "@/lib/data";

export default function WritingArticleRow({
  article,
}: {
  article: WritingArticle;
}) {
  return (
    <a
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid bg-transparent transition-colors duration-300 hover:bg-[#111111] md:grid-cols-[6.5rem_minmax(0,1fr)_9.5rem]"
      aria-label={`Open ${article.title}`}
    >
      <div className="border-b border-outline px-5 py-6 transition-colors duration-300 group-hover:border-outline-strong md:border-r md:border-b-0 md:py-8">
        <p className="font-label text-[10px] font-medium uppercase tracking-[0.14em] text-on-surface-subtle transition-colors duration-300 group-hover:text-on-surface-muted">
          {article.source}
        </p>
      </div>

      <div className="px-5 py-6 md:px-8 md:py-8">
        <h2 className="max-w-3xl font-display text-[1.65rem] font-medium leading-tight text-on-surface transition-transform duration-300 group-hover:translate-x-1 md:text-[2rem]">
          {article.title}
        </h2>

        <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-on-surface-muted">
          {article.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="border border-outline bg-surface-elevated px-2.5 py-1 font-label text-[10px] font-medium uppercase tracking-[0.12em] text-on-surface-subtle transition-colors duration-300 group-hover:border-outline-strong group-hover:text-on-surface-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 border-t border-outline px-5 py-6 transition-colors duration-300 group-hover:border-outline-strong md:flex-col md:items-end md:justify-between md:border-t-0 md:border-l md:px-5 md:py-8">
        <p className="font-mono text-sm text-on-surface-muted">{article.meta}</p>
        <span
          aria-hidden="true"
          className="inline-flex h-9 w-9 items-center justify-center border border-outline text-on-surface transition-colors duration-300 group-hover:border-white/35 group-hover:bg-[#151515]"
        >
          <span className="text-sm">↗</span>
        </span>
      </div>
    </a>
  );
}
