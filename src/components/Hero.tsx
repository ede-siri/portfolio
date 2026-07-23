import PathLabel from "@/components/PathLabel";
import PathLink from "@/components/PathLink";
import HeroSpotifyPreview from "@/components/spotify/HeroSpotifyPreview";
import TypewriterHeading from "@/components/TypewriterHeading";

const heroLinks = [
  { href: "/experience", path: "/experience" },
  { href: "/work", path: "/work" },
  { href: "/writing", path: "/writing" },
] as const;

export default function Hero() {
  return (
    <section className="border-b border-outline pt-20">
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1280px] items-center px-5 py-12 md:px-16 md:py-16">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-7">
            <PathLabel path="~/edesiri/home" className="mb-6" />

            <TypewriterHeading text="hi, i'm edesiri — aka siri" />

            <p className="mb-8 max-w-xl text-base leading-7 text-on-surface-muted md:text-lg">
              Software engineer, builder, music lover, and chess enthusiast.
            </p>

            <p className="mb-10 max-w-xl text-lg leading-8 text-on-surface-muted md:text-xl">
            I studied Computer Science and now work as a Software Engineer at Amazon. I build products, document what I&apos;m learning, and
              spend a lot of time between playlists, the stock market, flight
              searches, and new ideas.
            </p>

            <nav
              className="flex flex-wrap items-center gap-3"
              aria-label="Primary links"
            >
              {heroLinks.map((link) => (
                <PathLink
                  key={link.href}
                  href={link.href}
                  path={link.path}
                  variant="bracket"
                />
              ))}
            </nav>
          </div>

          <div className="lg:col-span-5 lg:pt-6">
            <HeroSpotifyPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
