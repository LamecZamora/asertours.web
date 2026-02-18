import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plane, Calendar, Star, Plus, Trash2, Check, X } from "lucide-react";

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
  is_active: boolean | null;
};

type Appointment = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  destination_interest: string | null;
  appointment_date: string;
  appointment_time: string;
  comments: string | null;
  status: string;
  created_at: string;
};

type Review = {
  id: string;
  name: string;
  destination: string;
  comment: string;
  rating: number;
  is_approved: boolean | null;
  created_at: string;
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"trips" | "appointments" | "reviews">("trips");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showTripForm, setShowTripForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Trip form state
  const [tripForm, setTripForm] = useState({
    destination: "", description: "", departure_date: "", return_date: "",
    price: "", activities: "", max_capacity: "40",
  });

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    if (activeTab === "trips") fetchTrips();
    else if (activeTab === "appointments") fetchAppointments();
    else fetchReviews();
  }, [activeTab]);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin"); return; }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) { navigate("/admin"); return; }
    setLoading(false);
  };

  const fetchTrips = async () => {
    // Admin needs to see all trips including inactive - use the admin policy
    const { data } = await supabase.from("trips").select("*").order("departure_date", { ascending: true });
    if (data) setTrips(data as Trip[]);
  };

  const fetchAppointments = async () => {
    const { data } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
    if (data) setAppointments(data as Appointment[]);
  };

  const fetchReviews = async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (data) setReviews(data as Review[]);
  };

  const handleAddTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("trips").insert({
      destination: tripForm.destination,
      description: tripForm.description || null,
      departure_date: tripForm.departure_date,
      return_date: tripForm.return_date || null,
      price: parseFloat(tripForm.price),
      activities: tripForm.activities || null,
      max_capacity: parseInt(tripForm.max_capacity) || 40,
    });
    if (error) {
      toast({ title: "Error", description: "No se pudo agregar el viaje.", variant: "destructive" });
    } else {
      toast({ title: "¡Listo!", description: "Viaje agregado exitosamente." });
      setShowTripForm(false);
      setTripForm({ destination: "", description: "", departure_date: "", return_date: "", price: "", activities: "", max_capacity: "40" });
      fetchTrips();
    }
  };

  const deleteTrip = async (id: string) => {
    await supabase.from("trips").delete().eq("id", id);
    fetchTrips();
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    await supabase.from("appointments").update({ status }).eq("id", id);
    fetchAppointments();
  };

  const toggleReviewApproval = async (id: string, approved: boolean) => {
    await supabase.from("reviews").update({ is_approved: approved }).eq("id", id);
    fetchReviews();
  };

  const deleteReview = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    fetchReviews();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Cargando...</p></div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="font-heading text-xl sm:text-2xl font-bold">Panel de Administración</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm hover:text-gold transition-colors">
            <LogOut className="h-4 w-4" /> Salir
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: "trips" as const, label: "Viajes", icon: Plane },
            { key: "appointments" as const, label: "Citas", icon: Calendar },
            { key: "reviews" as const, label: "Reseñas", icon: Star },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {/* Trips Tab */}
        {activeTab === "trips" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Viajes</h2>
              <button
                onClick={() => setShowTripForm(!showTripForm)}
                className="flex items-center gap-2 bg-gold text-accent-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gold-light transition-colors"
              >
                <Plus className="h-4 w-4" /> Agregar
              </button>
            </div>

            {showTripForm && (
              <form onSubmit={handleAddTrip} className="bg-card border border-border rounded-xl p-6 mb-6 grid sm:grid-cols-2 gap-4">
                <input placeholder="Destino *" required value={tripForm.destination} onChange={e => setTripForm(f => ({...f, destination: e.target.value}))}
                  className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <input placeholder="Precio (MXN) *" type="number" step="0.01" required value={tripForm.price} onChange={e => setTripForm(f => ({...f, price: e.target.value}))}
                  className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Fecha salida *</label>
                  <input type="date" required value={tripForm.departure_date} onChange={e => setTripForm(f => ({...f, departure_date: e.target.value}))}
                    className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Fecha regreso</label>
                  <input type="date" value={tripForm.return_date} onChange={e => setTripForm(f => ({...f, return_date: e.target.value}))}
                    className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <input placeholder="Actividades" value={tripForm.activities} onChange={e => setTripForm(f => ({...f, activities: e.target.value}))}
                  className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <input placeholder="Capacidad máxima" type="number" value={tripForm.max_capacity} onChange={e => setTripForm(f => ({...f, max_capacity: e.target.value}))}
                  className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <textarea placeholder="Descripción" value={tripForm.description} onChange={e => setTripForm(f => ({...f, description: e.target.value}))}
                  className="sm:col-span-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px]" />
                <div className="sm:col-span-2 flex gap-3">
                  <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold hover:opacity-90">Guardar</button>
                  <button type="button" onClick={() => setShowTripForm(false)} className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg text-sm">Cancelar</button>
                </div>
              </form>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-4 py-3 text-left rounded-tl-lg">Destino</th>
                    <th className="px-4 py-3 text-left hidden sm:table-cell">Fecha</th>
                    <th className="px-4 py-3 text-left">Precio</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Capacidad</th>
                    <th className="px-4 py-3 text-center rounded-tr-lg">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map(trip => (
                    <tr key={trip.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-4 py-3 font-medium text-foreground">{trip.destination}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{new Date(trip.departure_date).toLocaleDateString("es-MX")}</td>
                      <td className="px-4 py-3 text-foreground">${Number(trip.price).toLocaleString()} {trip.currency}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{trip.spots_taken}/{trip.max_capacity}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => deleteTrip(trip.id)} className="text-destructive hover:opacity-70"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                  {trips.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No hay viajes registrados</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Citas</h2>
            <div className="space-y-4">
              {appointments.map(apt => (
                <div key={apt.id} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-foreground">{apt.full_name}</h3>
                      <p className="text-xs text-muted-foreground">{apt.email} · {apt.phone}</p>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      apt.status === "confirmada" ? "bg-green-100 text-green-800" :
                      apt.status === "cancelada" ? "bg-red-100 text-red-800" :
                      "bg-secondary text-secondary-foreground"
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    📅 {new Date(apt.appointment_date).toLocaleDateString("es-MX")} a las {apt.appointment_time}
                  </p>
                  {apt.destination_interest && <p className="text-sm text-muted-foreground mb-1">📍 {apt.destination_interest}</p>}
                  {apt.comments && <p className="text-sm text-muted-foreground italic">💬 {apt.comments}</p>}
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => updateAppointmentStatus(apt.id, "confirmada")}
                      className="flex items-center gap-1 bg-green-600 text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90">
                      <Check className="h-3 w-3" /> Confirmar
                    </button>
                    <button onClick={() => updateAppointmentStatus(apt.id, "cancelada")}
                      className="flex items-center gap-1 bg-destructive text-destructive-foreground px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90">
                      <X className="h-3 w-3" /> Cancelar
                    </button>
                  </div>
                </div>
              ))}
              {appointments.length === 0 && <p className="text-center text-muted-foreground py-8">No hay citas pendientes</p>}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Reseñas</h2>
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-foreground">{review.name}</h3>
                      <p className="text-xs text-gold">{review.destination} · {"⭐".repeat(review.rating)}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${review.is_approved ? "bg-green-100 text-green-800" : "bg-secondary text-secondary-foreground"}`}>
                      {review.is_approved ? "Aprobada" : "Pendiente"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground italic mb-4">"{review.comment}"</p>
                  <div className="flex gap-2">
                    <button onClick={() => toggleReviewApproval(review.id, !review.is_approved)}
                      className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90">
                      {review.is_approved ? <X className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                      {review.is_approved ? "Desaprobar" : "Aprobar"}
                    </button>
                    <button onClick={() => deleteReview(review.id)}
                      className="flex items-center gap-1 bg-destructive text-destructive-foreground px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90">
                      <Trash2 className="h-3 w-3" /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
              {reviews.length === 0 && <p className="text-center text-muted-foreground py-8">No hay reseñas</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
