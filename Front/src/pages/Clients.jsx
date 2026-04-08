import "./Marquee.css";

export default function Clients() {
  const brands = [
    "LUXE STUDIOS",
    "VELVET MEDIA",
    "OBSIDIAN",
    "PRISM CO.",
    "APEX LABS",
    "NOVA GROUP",
  ];

  return (
    <section className="bg-[#0c0c0c] py-24 overflow-hidden">
      
      <div className="text-center mb-16">
        <p className="text-yellow-500 tracking-[0.3em] mb-4 text-sm">TRUSTED BY</p>
        <h2 className="text-4xl font-semibold text-white">
          Our <span className="text-yellow-500">Clients</span>
        </h2>
      </div>

      <div className="overflow-hidden group">
        <div className="flex gap-20 whitespace-nowrap marquee">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="text-yellow-600 opacity-40 text-4xl font-serif tracking-widest"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}