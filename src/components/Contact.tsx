import { siteConfig } from "@/lib/data";

export default function Contact() {
  return (
    <section className="bg-surface pt-[120px]" id="contact">
      <div className="reveal mx-auto max-w-[1280px] px-5 text-center md:px-16">
        <h2 className="mb-8 font-display text-[48px] font-semibold leading-[52px] tracking-[-0.01em] md:text-[72px] md:leading-[80px] md:tracking-[-0.02em]">
          Let&apos;s build something remarkable.
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-base leading-[26px] text-on-surface-variant">
          I&apos;m open to connecting about software engineering, cloud systems,
          backend infrastructure, AI-focused products, and early-career
          technology opportunities.
        </p>

        <div className="mb-20 flex flex-wrap items-center justify-center gap-10">
          <a
            href={siteConfig.social.linkedin}
            className="font-label text-xs font-medium uppercase tracking-[0.1em] transition-colors hover:text-secondary"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.social.github}
            className="font-label text-xs font-medium uppercase tracking-[0.1em] transition-colors hover:text-secondary"
          >
            GitHub
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-label text-xs font-medium uppercase tracking-[0.1em] transition-colors hover:text-secondary"
          >
            Email
          </a>
          <a
            href="/cv.pdf"
            className="font-label text-xs font-medium uppercase tracking-[0.1em] transition-colors hover:text-secondary"
          >
            CV
          </a>
        </div>
      </div>
    </section>
  );
}
