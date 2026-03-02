import { useAuth } from "@/contexts/AuthContext";
import { CreditCard, Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const plans = [
  {
    id: "pro",
    name: "Plano Pro",
    price: "R$ 29,90",
    period: "/mês",
    features: ["1 Agenda Profissional", "Link Personalizado para Bio", "Lembretes por E-mail", "Relatório de Faturamento"],
    highlight: false,
  },
  {
    id: "premium",
    name: "Plano Premium",
    price: "R$ 49,90",
    period: "/mês",
    features: [
      "Agendas Ilimitadas",
      "Gerenciamento de Equipe",
      "Cálculo de Comissões",
      "Gestão de Estoque",
      "Lembretes via WhatsApp",
      "Dashboards Avançados",
    ],
    highlight: true,
  },
];

const SubscriptionTab = () => {
  const { user } = useAuth();

  const handleSubscribe = (planId: string) => {
    toast.success(`Redirecionando para checkout do plano ${planId === "pro" ? "Pro" : "Premium"}...`);
  };

  const isCurrentPlan = (planId: string) => user?.plan === planId;

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-display font-bold text-foreground">Assinatura</h1>
      </div>

      {user?.plan === "trial" && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-6 text-center">
          <p className="text-sm font-medium text-foreground mb-1">Período de teste ativo</p>
          <p className="text-xs text-muted-foreground">Escolha um plano abaixo para manter sua agenda funcionando.</p>
        </div>
      )}

      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl p-5 border transition-all ${
              plan.highlight
                ? "border-primary shadow-neon bg-primary/5"
                : "border-border bg-card shadow-card"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {plan.highlight && <Crown className="h-4 w-4 text-primary" />}
                <h3 className="font-display font-bold text-foreground">{plan.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-foreground">{plan.price}</span>
                <span className="text-xs text-muted-foreground">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {isCurrentPlan(plan.id) ? (
              <div className="text-center text-sm font-medium text-primary py-2">Plano Atual ✓</div>
            ) : (
              <Button
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full rounded-xl font-semibold ${
                  plan.highlight
                    ? "bg-gradient-neon text-primary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                Assinar {plan.name}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionTab;
