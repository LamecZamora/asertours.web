import destBeach from "@/assets/dest-beach.jpg";
import destEurope from "@/assets/dest-europe.jpg";
import destShopping from "@/assets/dest-shopping.jpg";

const destinations = [
  {
    title: "Playas del Caribe",
    description: "Cancún, Los Cabos, Mazatlán y más destinos paradisíacos.",
    image: destBeach,
    tag: "Placer",
  },
  {
    title: "Europa Clásica",
    description: "París, Roma, Madrid — recorre las ciudades más emblemáticas.",
    image: destEurope,
    tag: "Cultura",
  },
  {
    title: "McAllen Express",
    description: "Viajes de compras a McAllen, Texas con todo incluido.",
    image: destShopping,
    tag: "Compras",
  },
];

const Destinations = () => {
  return (
    <section id="destinos" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">
            Explora el mundo
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Nuestros Destinos
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {destinations.map((dest) => (
            <div
              key={dest.title}
              className="group rounded-2xl overflow-hidden bg-card shadow-elegant hover:shadow-gold transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-gold px-4 py-1 text-xs font-bold text-accent-foreground uppercase tracking-wider">
                    {dest.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {dest.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {dest.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
