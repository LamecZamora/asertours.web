import { Phone, MapPin, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";

const Navbar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-3">
          <span className="font-heading text-2xl font-bold text-primary-foreground tracking-wide">
            Aser<span className="text-gold">Tours</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Inicio", id: "hero" },
            { label: "Destinos", id: "destinos" },
            { label: "Servicios", id: "servicios" },
            { label: "Contacto", id: "contacto" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-primary-foreground/80 hover:text-gold transition-colors font-medium text-sm tracking-wide uppercase"
            >
              {item.label}
            </button>
          ))}
        </div>
        <a
          href="https://wa.me/526181851050"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-accent-foreground hover:bg-gold-light transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
