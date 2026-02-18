import { Star } from "lucide-react";

const reviews = [
  {
    name: "María García",
    destination: "Cancún",
    comment: "Excelente servicio, todo muy bien organizado. ¡Volvería a viajar con Aser Tours sin pensarlo!",
    rating: 5,
  },
  {
    name: "Carlos López",
    destination: "McAllen",
    comment: "El viaje de compras fue increíble. Muy buen precio y el transporte super cómodo.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    destination: "Europa",
    comment: "Un viaje soñado. La atención personalizada hizo toda la diferencia. Muy recomendados.",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section id="resenas" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">
            Testimonios
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Lo que dicen nuestros viajeros
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl bg-card p-8 shadow-elegant"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                "{review.comment}"
              </p>
              <div>
                <p className="font-heading font-bold text-foreground">{review.name}</p>
                <p className="text-xs text-gold font-medium">{review.destination}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
