import { motion } from "framer-motion";
import { MousePointerClick, BellRing, BarChart3 } from "lucide-react";

const benefits = [
  {
    icon: MousePointerClick,
    title: "Agendamento em 3 Cliques",
    description:
      "O cliente clica no seu link, escolhe o serviço e a hora. Sem senhas, sem baixar apps.",
  },
  {
    icon: BellRing,
    title: "Adeus ao 'No-Show'",
    description:
      "Lembretes automáticos via WhatsApp que pedem confirmação. O cliente esqueceu? O sistema avisa você.",
  },
  {
    icon: BarChart3,
    title: "Gestão Financeira Sem Planilhas",
    description:
      "Saiba exatamente quanto faturou no dia, na semana e no mês. Tudo mastigado no seu painel.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="relative overflow-hidden bg-hero py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-primary/8 blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold text-secondary-foreground sm:text-4xl">
            3 Pilares que transformam seu negócio
          </h2>
          <p className="text-lg text-muted-foreground">
            Tudo que você precisa para profissionalizar seu atendimento em um único lugar.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group rounded-2xl border border-border/10 bg-secondary/30 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-card-hover"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-neon">
                <benefit.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-secondary-foreground">
                {benefit.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
