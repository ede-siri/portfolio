export default function About() {
  return (
    <section className="bg-surface pb-[120px] pt-16 md:pt-20" id="about">
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="reveal md:col-span-4 md:col-start-2">
            <h2 className="font-display text-[40px] font-medium italic leading-[48px]">
              The Narrative
            </h2>
          </div>
          <div className="reveal space-y-8 md:col-span-6">
            <p className="text-xl leading-8 text-on-background">
              I&apos;m a software engineer shaped by two worlds: large-scale
              cloud systems and early-stage product building.
            </p>
            <p className="text-base leading-[26px] text-on-surface-variant">
              At AWS, I gained experience working around distributed systems,
              serverless infrastructure, and software design in a high-scale
              engineering environment. As co-founder and CTO of Rime, I
              helped build and shape a product from the ground up, turning
              ideas into technical decisions, product direction, and working
              software.
            </p>
            <p className="text-base leading-[26px] text-on-surface-variant">
              My focus is on building systems that are clear, scalable, and
              useful. I&apos;m especially interested in backend engineering,
              cloud infrastructure, AI-focused products, and the kind of
              software that quietly powers meaningful user experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
