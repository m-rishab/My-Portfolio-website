export default function NameMarquee({ id }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-paper py-8 sm:py-10 lg:py-12 select-none border-y border-hairline"
      aria-hidden="true"
    >
      <div className="marquee-skew">
        <div className="flex whitespace-nowrap w-max marquee-scroll marquee-motion">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center font-display font-extrabold uppercase text-6xl sm:text-7xl md:text-8xl tracking-[-0.03em]">
                  <span className="px-6 text-transparent" style={{ WebkitTextStroke: '1.5px rgba(25,24,32,0.12)' }}>
                    Rishabh Mishra
                  </span>
                  <span className="text-2xl sm:text-4xl iris-gradient-text">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}