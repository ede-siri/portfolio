import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PathLabel from "@/components/PathLabel";
import PostcardCard from "@/components/postcards/PostcardCard";
import { postcards } from "@/lib/data";

export const metadata: Metadata = {
  title: "Postcards | Edesiri Ohwomado",
  description:
    "Postcards from places I've loved — cities, views, and trips that made it out of the camera roll.",
};

export default function PostcardsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 pb-20 md:px-16 md:pb-28">
          <section className="border-b border-outline py-14 md:py-20">
            <PathLabel path="~/edesiri/postcards" className="mb-5" />
            <h1 className="max-w-4xl font-display text-[2.35rem] font-medium leading-[1.08] text-on-surface md:text-[3.25rem]">
              Postcards from places I&apos;ve loved
            </h1>
            <p className="mt-5 max-w-2xl font-mono text-sm leading-7 text-on-surface-muted md:text-[0.9375rem]">
              A growing stack of cities, views, and trips that made it out of
              the camera roll.
            </p>
          </section>

          <section className="py-12 md:py-16">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {postcards.map((postcard) => (
                <PostcardCard key={postcard.slug} postcard={postcard} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
