import { Phone, MapPin, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contacto" className="bg-gradient-burgundy text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4">
              Aser<span className="text-gold">Tours</span>
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Tu agencia de confianza en Durango para viajes de placer y compras.
              Más de 10 años creando experiencias inolvidables.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold" />
                <span>+52 618 185 10 50</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold" />
                <span>Blvd. Felipe Pescador, Col. Centro, Durango, México</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-gold mt-0.5" />
                <div>
                  <p>Lun - Vie: 9:30 AM – 2:00 PM / 4:00 – 7:00 PM</p>
                  <p>Sáb - Dom: 10:00 AM – 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: MessageCircle, href: "https://wa.me/526181851050" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/50">
          © 2026 Aser Tours. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
