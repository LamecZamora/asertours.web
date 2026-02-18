import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({
        title: "Error",
        description: "Credenciales incorrectas. Verifica tu email y contraseña.",
        variant: "destructive",
      });
    } else {
      // Check if user has admin role
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin");

        if (roles && roles.length > 0) {
          toast({ title: "¡Bienvenido!", description: "Acceso concedido al panel de administración." });
          navigate("/admin/dashboard");
        } else {
          await supabase.auth.signOut();
          toast({
            title: "Acceso denegado",
            description: "No tienes permisos de administrador.",
            variant: "destructive",
          });
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-burgundy flex items-center justify-center p-6">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-colors text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al Inicio
      </button>

      <div className="w-full max-w-md bg-card rounded-2xl shadow-elegant p-8">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Aser<span className="text-gold">Tours</span>
          </h1>
          <h2 className="font-heading text-xl font-bold text-foreground mt-2">Administrador</h2>
          <p className="text-muted-foreground text-sm mt-1">ACCESO RESTRINGIDO</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@asertours.com"
                required
                className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
