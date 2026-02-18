import { Plane, Calendar, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-travel.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <p className="text-gold font-medium tracking-[0.3em] uppercase text-sm mb-6 animate-fade-in">
          Agencia de Viajes en Durango
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 animate-fade-up">
          Viaja con{" "}
          <span className="text-gradient-gold">Aser Tours</span>
        </h1>
        <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Tu agencia de confianza para viajes de placer y compras.
          Descubre destinos increíbles con los mejores precios.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={() => navigate("/viajes")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-accent-foreground hover:bg-gold-light transition-all shadow-gold"
          >
            <Plane className="h-5 w-5" />
            Viajes Disponibles
          </button>
          <button
            onClick={() => navigate("/cita")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-base font-semibold text-primary-foreground hover:border-gold hover:text-gold transition-all"
          >
            <Calendar className="h-5 w-5" />
            Apartar Cita
          </button>
          <button
            onClick={() => navigate("/resenas")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-base font-semibold text-primary-foreground hover:border-gold hover:text-gold transition-all"
          >
            <Star className="h-5 w-5" />
            Reseñas
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-gold" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
