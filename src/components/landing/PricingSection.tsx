import { motion } from "framer-motion";
import { Check, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    subtitle: "Degustação",
    price: "R$ 0",
    period: "por 7 dias",
    description: "Quem quer testar a potência da ferramenta.",
    icon: null,
    featured: false,
    cta: "Quero testar grátis",
    planId: "trial",
    features: [
      "Todas as funções liberadas",
      "1 agenda profissional",
      "Agendamento online ilimitado",
      "Lembretes por e-mail",
      "Suporte via ticket",
    ],
  },
  {
    name: "PRO",
    subtitle: "O Favorito dos Autônomos",
    price: "R$ 29,90",
    period: "/mês",
    description: "Barbeiros, Manicures e Cabeleireiros individuais.",
    icon: Sparkles,
    featured: true,
    cta: "Assinar Plano PRO",
    planId: "pro",
    features: [
      "1 Agenda Profissional",
      "Link Personalizado para Bio",
      "Lembretes por E-mail ilimitados",
      "Relatório de Faturamento Básico",
      "Suporte prioritário via ticket",
    ],
  },
  {
    name: "PREMIUM",
    subtitle: "Para Donos de Equipe",
    price: "R$ 49,90",
    period: "/mês",
    description: "Salões com mais de 2 profissionais e Barbearias com equipe.",
    icon: Crown,
    featured: false,
    cta: "Assinar Plano PREMIUM",
    planId: "premium",
    features: [
      "Agendas ilimitadas para colaboradores",
      "Cálculo Automático de Comissões",
      "Gestão de Estoque de produtos",
      "Lembretes via WhatsApp (API)",
      "Dashboards Avançados de Performance",
    ],
  },
];

const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section id="precos" className="relative overflow-hidden bg-hero py-24">
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-96 w-96 rounded-full bg-primary/5 blur-[140px]" />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold text-secondary-foreground sm:text-4xl">
            Escolha o plano ideal para{" "}
            <span className="text-gradient-neon">seu negócio</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comece grátis e escale quando precisar. Sem surpresas.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
                plan.featured
                  ? "border-primary/50 bg-primary/5 shadow-neon"
                  : "border-border/10 bg-secondary/30 hover:border-primary/20"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-neon px-4 py-1 text-xs font-bold text-primary-foreground">
                    MAIS POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="mb-1 flex items-center gap-2">
                  {plan.icon && <plan.icon className="h-5 w-5 text-primary" />}
                  <h3 className="font-display text-xl font-bold text-secondary-foreground">
                    {plan.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
              </div>

              <div className="mb-6">
                <span className="font-display text-4xl font-bold text-secondary-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <p className="mb-6 text-sm text-muted-foreground">{plan.description}</p>

              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm text-secondary-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => navigate(`/login?plan=${plan.planId}`)}
                className={
                  plan.featured
                    ? "w-full shadow-neon"
                    : "w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }
                variant={plan.featured ? "default" : "secondary"}
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
