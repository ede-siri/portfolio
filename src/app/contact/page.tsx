import type { Metadata } from "next";

import ContactPortalCard from "@/components/contact/ContactPortalCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PathLabel from "@/components/PathLabel";
import { contactPortals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact | Edesiri Ohwomado",
  description:
    "Different corners of the internet, depending on what version of Siri you're looking for.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="relative pt-20">
        <div className="relative mx-auto max-w-[1280px] px-5 pb-20 md:px-16 md:pb-28">
          <section className="border-b border-outline py-14 md:py-20">
            <div className="max-w-4xl">
              <PathLabel path="~/edesiri/contact" className="mb-5" />
              <h1 className="font-display text-[2.35rem] font-medium leading-[1.08] text-on-surface md:text-[3.25rem]">
                Pick your portal.
              </h1>
              <p className="mt-5 max-w-2xl font-mono text-sm leading-7 text-on-surface-muted md:text-[0.9375rem]">
                Different corners of the internet, depending on what version of
                Siri you&apos;re looking for.
              </p>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {contactPortals.map((portal) => (
                <ContactPortalCard key={portal.path} portal={portal} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
