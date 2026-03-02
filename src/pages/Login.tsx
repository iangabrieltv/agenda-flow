import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarCheck } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Credenciais inválidas. Verifique seu acesso.");
    }
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <CalendarCheck className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-display text-primary-foreground">
              Agend<span className="text-gradient-neon">Ai</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm">Acesse seu painel profissional</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 shadow-card space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Login</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="barber@7dias"
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              className="rounded-xl"
            />
          </div>

          {error && <p className="text-destructive text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full rounded-xl bg-gradient-neon text-primary-foreground font-semibold h-12">
            Entrar
          </Button>

          <div className="text-xs text-muted-foreground text-center space-y-1 pt-2">
            <p><strong>Teste:</strong> barber@7dias / 7dias</p>
            <p><strong>Pro:</strong> barber@29 / 2990</p>
            <p><strong>Premium:</strong> barber@49 / 4990</p>
          </div>
        </form>

        <div className="text-center mt-6">
          <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Voltar para o site
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
