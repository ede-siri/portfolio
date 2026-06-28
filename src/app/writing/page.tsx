import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PathLabel from "@/components/PathLabel";
import WritingArticleRow from "@/components/writing/WritingArticleRow";
import { writingArticles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Writing | Edesiri Ohwomado",
  description:
    "Technical notes, career reflections, and published writing on software engineering.",
};

export default function WritingPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="mx-auto max-w-[1280px] px-5 pb-20 md:px-16 md:pb-28">
          <section className="border-b border-outline py-14 md:py-20">
            <div className="max-w-4xl">
              <PathLabel path="~/edesiri/writing" className="mb-5" />
              <h1 className="font-display text-[2.35rem] font-medium leading-[1.08] text-on-surface md:text-[3.25rem]">
                Writing, features, and notes.
              </h1>
              <p className="mt-5 max-w-2xl font-mono text-sm leading-7 text-on-surface-muted md:text-[0.9375rem]">
                A mix of technical notes, career reflections, and things I
                wanted to write down before I forgot them.
              </p>
            </div>
          </section>

          <section className="py-10 md:py-14">
            <div className="divide-y divide-outline border border-outline">
              {writingArticles.map((article) => (
                <WritingArticleRow key={article.href} article={article} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
