import "./Marquee.css";

export default function Clients() {
  const brands = [
    "LUXE STUDIOS",
    "VELVET MEDIA",
    "OBSIDIAN",
    "PRISM CO",
    "APEX LABS",
    "NOVA GROUP",
  ];

  return (
    <section className="bg-[#0c0c0c] py-16 md:py-24 overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-12 md:mb-16 px-4">
        <p className="text-yellow-500 tracking-[0.3em] mb-2 md:mb-4 text-xs md:text-sm">
          TRUSTED BY
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
          Our <span className="text-yellow-500">Clients</span>
        </h2>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden relative group">
        <div className="marquee flex gap-10 sm:gap-16 md:gap-20 whitespace-nowrap">
          {/* Duplicate brands to ensure continuous scroll */}
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="text-yellow-600 opacity-70 text-2xl sm:text-3xl md:text-4xl font-serif tracking-widest px-4 sm:px-6"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Animation */}
      <style jsx>{`
  .marquee {
    display: inline-flex;
    animation: scroll 40s linear infinite; /* slower than before */
  }

  .group:hover .marquee {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-33%);
    }
  }

  @media (max-width: 768px) {
    .marquee {
      animation: scroll 24s linear infinite; /* slower on mobile */
    }
  }
`}</style>
    </section>
  );
}