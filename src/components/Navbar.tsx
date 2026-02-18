import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Inicio", action: () => { navigate("/"); scrollToTop(); } },
    { label: "Viajes", action: () => navigate("/viajes") },
    { label: "Calendario", action: () => navigate("/calendario") },
    { label: "Cita", action: () => navigate("/cita") },
    { label: "Reseñas", action: () => navigate("/resenas") },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <button onClick={() => { navigate("/"); scrollToTop(); }} className="flex items-center gap-3">
          <span className="font-heading text-2xl font-bold text-primary-foreground tracking-wide">
            Aser<span className="text-gold">Tours</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { item.action(); setMobileOpen(false); }}
              className="text-primary-foreground/80 hover:text-gold transition-colors font-medium text-sm tracking-wide uppercase"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/526181851050"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-accent-foreground hover:bg-gold-light transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-primary-foreground">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { item.action(); setMobileOpen(false); }}
              className="block w-full text-left text-primary-foreground/80 hover:text-gold transition-colors font-medium text-sm tracking-wide uppercase py-2"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { navigate("/admin"); setMobileOpen(false); }}
            className="block w-full text-left text-primary-foreground/50 hover:text-gold transition-colors text-xs tracking-wide uppercase py-2 border-t border-primary-foreground/10 mt-2 pt-4"
          >
            Administrador
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
