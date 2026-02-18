import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MapPin, Calendar as CalendarIcon, DollarSign } from "lucide-react";

type Trip = {
  id: string;
  destination: string;
  description: string | null;
  departure_date: string;
  return_date: string | null;
  price: number;
  currency: string;
  activities: string | null;
  max_capacity: number | null;
  spots_taken: number | null;
};

const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const { data } = await supabase
      .from("trips")
      .select("*")
      .eq("is_active", true)
      .order("departure_date", { ascending: true });
    if (data) setTrips(data as Trip[]);
    setLoading(false);
  };

  const filteredTrips = trips.filter(trip => {
    if (!filterMonth) return true;
    return trip.departure_date.startsWith(filterMonth);
  });

  const months = [...new Set(trips.map(t => t.departure_date.slice(0, 7)))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-burgundy text-primary-foreground py-16 px-6">
        <div className="container mx-auto">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-primary-foreground/70 hover:text-gold transition-colors text-sm mb-6">
            <ArrowLeft className="h-4 w-4" /> Volver al Inicio
          </button>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">Viajes Disponibles</h1>
          <p className="text-primary-foreground/70">Consulta fechas, destinos y precios ✈️ 🌍</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8 bg-card rounded-xl p-4 border border-border">
          <label className="text-sm font-medium text-foreground">Filtrar por mes:</label>
          <select
            value={filterMonth}
            onChange={e => setFilterMonth(e.target.value)}
            className="rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Todos</option>
            {months.map(m => (
              <option key={m} value={m}>
                {new Date(m + "-01").toLocaleDateString("es-MX", { month: "long", year: "numeric" })}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground py-12">Cargando viajes...</p>
        ) : filteredTrips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No hay viajes disponibles por el momento.</p>
            <p className="text-sm text-muted-foreground mt-2">Contáctanos por WhatsApp para más información.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map(trip => (
              <div key={trip.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-elegant hover:shadow-gold transition-all hover:-translate-y-1">
                <div className="bg-primary p-4">
                  <h3 className="font-heading text-lg font-bold text-primary-foreground">{trip.destination}</h3>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4 text-gold" />
                    <span>
                      {new Date(trip.departure_date).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
                      {trip.return_date && ` — ${new Date(trip.return_date).toLocaleDateString("es-MX", { day: "numeric", month: "long" })}`}
                    </span>
                  </div>
                  {trip.activities && (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-gold mt-0.5" />
                      <span>{trip.activities}</span>
                    </div>
                  )}
                  {trip.description && <p className="text-sm text-muted-foreground">{trip.description}</p>}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-gold" />
                      <span className="text-xl font-bold text-foreground">{Number(trip.price).toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">{trip.currency}</span>
                    </div>
                    {trip.max_capacity && (
                      <span className="text-xs text-muted-foreground">
                        {(trip.max_capacity - (trip.spots_taken || 0))} lugares
                      </span>
                    )}
                  </div>
                  <a
                    href={`https://wa.me/526181851050?text=${encodeURIComponent(`Hola, me interesa el viaje a ${trip.destination} del ${new Date(trip.departure_date).toLocaleDateString("es-MX")}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-gold text-accent-foreground py-2.5 rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors"
                  >
                    Reservar por WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;
