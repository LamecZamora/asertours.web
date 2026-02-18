import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

type Trip = {
  id: string;
  destination: string;
  departure_date: string;
  return_date: string | null;
  price: number;
  currency: string;
};

const CalendarPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      const { data } = await supabase.from("trips").select("*").eq("is_active", true);
      if (data) setTrips(data as Trip[]);
    };
    fetchTrips();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = (firstDay.getDay() + 6) % 7; // Monday start
  const daysInMonth = lastDay.getDate();
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const getTripsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return trips.filter(t => t.departure_date === dateStr);
  };

  const monthName = currentDate.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-burgundy text-primary-foreground py-16 px-6">
        <div className="container mx-auto">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-primary-foreground/70 hover:text-gold transition-colors text-sm mb-6">
            <ArrowLeft className="h-4 w-4" /> Volver al Inicio
          </button>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">Calendario de Viajes ✈️</h1>
          <p className="text-primary-foreground/70">Explora nuestras próximas salidas</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-4xl">
        <div className="bg-card border border-border rounded-2xl shadow-elegant overflow-hidden">
          {/* Calendar header */}
          <div className="flex items-center justify-between p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-80"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={nextMonth} className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-80"><ChevronRight className="h-4 w-4" /></button>
              <button onClick={goToday} className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-80">Hoy</button>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground capitalize">{monthName}</h2>
          </div>

          {/* Week days header */}
          <div className="grid grid-cols-7 border-t border-border">
            {weekDays.map(d => (
              <div key={d} className="py-2 text-center text-xs font-bold text-primary uppercase bg-muted">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 border-t border-border">
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[60px] sm:min-h-[80px] border-b border-r border-border bg-muted/30" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayTrips = getTripsForDay(day);
              const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
              const isWeekend = ((startDay + i) % 7) >= 5;

              return (
                <div key={day} className={`min-h-[60px] sm:min-h-[80px] border-b border-r border-border p-1 sm:p-2 ${isToday ? "bg-cream" : ""}`}>
                  <span className={`text-xs sm:text-sm ${isWeekend ? "text-gold font-bold" : "text-muted-foreground"} ${isToday ? "font-bold text-foreground" : ""}`}>
                    {day}
                  </span>
                  {dayTrips.map(trip => (
                    <div key={trip.id} className="mt-1 bg-primary text-primary-foreground rounded px-1 py-0.5 text-[10px] sm:text-xs truncate cursor-pointer hover:opacity-80"
                      title={`${trip.destination} - $${Number(trip.price).toLocaleString()} ${trip.currency}`}>
                      ✈ {trip.destination}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
