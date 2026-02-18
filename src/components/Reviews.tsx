import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";

type Review = {
  id: string;
  name: string;
  destination: string;
  comment: string;
  rating: number;
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (data) setReviews(data as Review[]);
    };
    fetchReviews();
  }, []);

  // Fallback reviews if none approved yet
  const displayReviews = reviews.length > 0 ? reviews : [
    { id: "1", name: "María García", destination: "Cancún", comment: "Excelente servicio, todo muy bien organizado. ¡Volvería a viajar con Aser Tours sin pensarlo!", rating: 5 },
    { id: "2", name: "Carlos López", destination: "McAllen", comment: "El viaje de compras fue increíble. Muy buen precio y el transporte super cómodo.", rating: 5 },
    { id: "3", name: "Ana Martínez", destination: "Europa", comment: "Un viaje soñado. La atención personalizada hizo toda la diferencia. Muy recomendados.", rating: 5 },
  ];

  return (
    <section id="resenas" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">
            Testimonios
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Lo que dicen nuestros viajeros
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {displayReviews.map((review) => (
            <div key={review.id} className="rounded-2xl bg-card p-6 sm:p-8 shadow-elegant">
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
