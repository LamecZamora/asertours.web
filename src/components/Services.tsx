import { Plane, CalendarCheck, Star, MapPin } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Viajes de Placer",
    description: "Destinos nacionales e internacionales con los mejores precios y paquetes todo incluido.",
  },
  {
    icon: CalendarCheck,
    title: "Agenda tu Cita",
    description: "Visítanos en nuestra oficina. Agenda una cita presencial con nuestros asesores de viaje.",
  },
  {
    icon: Star,
    title: "Reseñas de Viajeros",
    description: "Lee las experiencias de nuestros clientes y comparte la tuya después de tu viaje.",
  },
  {
    icon: MapPin,
    title: "Viajes de Compras",
    description: "Viajes express a McAllen y otras ciudades fronterizas para tus compras favoritas.",
  },
];

const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">
            ¿Qué ofrecemos?
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Nuestros Servicios
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="group text-center p-8 rounded-2xl bg-card border border-border hover:border-gold/30 shadow-elegant hover:shadow-gold transition-all duration-500"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <service.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
