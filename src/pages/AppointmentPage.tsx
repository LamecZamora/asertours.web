import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CalendarCheck, User, Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";

const AppointmentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", destination_interest: "",
    appointment_date: "", appointment_time: "", comments: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("appointments").insert({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      destination_interest: form.destination_interest.trim() || null,
      appointment_date: form.appointment_date,
      appointment_time: form.appointment_time,
      comments: form.comments.trim() || null,
    });

    if (error) {
      toast({ title: "Error", description: "No se pudo registrar la cita. Intenta de nuevo.", variant: "destructive" });
    } else {
      toast({ title: "¡Cita registrada!", description: "Nos pondremos en contacto contigo para confirmar." });
      setForm({ full_name: "", email: "", phone: "", destination_interest: "", appointment_date: "", appointment_time: "", comments: "" });
    }
    setLoading(false);
  };

  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-burgundy text-primary-foreground py-16 px-6">
        <div className="container mx-auto">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-primary-foreground/70 hover:text-gold transition-colors text-sm mb-6">
            <ArrowLeft className="h-4 w-4" /> Volver al Inicio
          </button>
          <div className="flex items-center gap-3 mb-2">
            <CalendarCheck className="h-8 w-8 text-gold" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold">Apartar Cita</h1>
          </div>
          <p className="text-primary-foreground/70">Agenda tu cita presencial y con gusto te atenderemos 📋 ✈️</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-elegant space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
              <User className="h-4 w-4 text-gold" /> Nombre completo *
            </label>
            <input required value={form.full_name} onChange={e => setForm(f => ({...f, full_name: e.target.value}))}
              placeholder="Ej: Juan Pérez" maxLength={100} className={inputClass} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                <Mail className="h-4 w-4 text-gold" /> Email *
              </label>
              <input type="email" required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                placeholder="tu@email.com" maxLength={255} className={inputClass} />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                <Phone className="h-4 w-4 text-gold" /> Teléfono *
              </label>
              <input type="tel" required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                placeholder="618 123 4567" maxLength={20} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
              <MapPin className="h-4 w-4 text-gold" /> Lugar de interés
            </label>
            <input value={form.destination_interest} onChange={e => setForm(f => ({...f, destination_interest: e.target.value}))}
              placeholder="Ej: Cancún, McAllen, Europa..." maxLength={200} className={inputClass} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                <CalendarCheck className="h-4 w-4 text-gold" /> Fecha *
              </label>
              <input type="date" required value={form.appointment_date} onChange={e => setForm(f => ({...f, appointment_date: e.target.value}))}
                className={inputClass} />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                <Clock className="h-4 w-4 text-gold" /> Hora *
              </label>
              <input type="time" required value={form.appointment_time} onChange={e => setForm(f => ({...f, appointment_time: e.target.value}))}
                className={inputClass} />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
              <MessageSquare className="h-4 w-4 text-gold" /> Comentarios
            </label>
            <textarea value={form.comments} onChange={e => setForm(f => ({...f, comments: e.target.value}))}
              placeholder="¿Algún comentario adicional?" maxLength={1000} rows={4} className={inputClass} />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Registrando..." : "Registrar Cita"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentPage;
