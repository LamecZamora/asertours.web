import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Star, User, MapPin, MessageSquare } from "lucide-react";

const ReviewsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [form, setForm] = useState({ name: "", destination: "", comment: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("reviews").insert({
      name: form.name.trim(),
      destination: form.destination.trim(),
      comment: form.comment.trim(),
      rating,
    });

    if (error) {
      toast({ title: "Error", description: "No se pudo enviar la reseña.", variant: "destructive" });
    } else {
      toast({ title: "¡Gracias!", description: "Tu reseña será publicada después de ser revisada." });
      setForm({ name: "", destination: "", comment: "" });
      setRating(5);
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">Comparte tu Experiencia</h1>
          <p className="text-primary-foreground/70">Tu opinión nos ayuda a mejorar ⭐</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 max-w-lg">
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-elegant space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
              <User className="h-4 w-4 text-gold" /> Tu nombre *
            </label>
            <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
              placeholder="Ej: Juan Pérez" maxLength={100} className={inputClass} />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
              <MapPin className="h-4 w-4 text-gold" /> ¿A dónde viajaste? *
            </label>
            <input required value={form.destination} onChange={e => setForm(f => ({...f, destination: e.target.value}))}
              placeholder="Ej: Cuba o Mazatlán" maxLength={200} className={inputClass} />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
              <Star className="h-4 w-4 text-gold" /> Calificación
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} type="button" onClick={() => setRating(n)}
                  className="transition-transform hover:scale-110">
                  <Star className={`h-7 w-7 ${n <= rating ? "fill-gold text-gold" : "text-border"}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
              <MessageSquare className="h-4 w-4 text-gold" /> Tu comentario *
            </label>
            <textarea required value={form.comment} onChange={e => setForm(f => ({...f, comment: e.target.value}))}
              placeholder="Cuéntanos lo mejor de tu viaje..." maxLength={1000} rows={4} className={inputClass} />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Enviando..." : "Enviar Reseña"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsPage;
