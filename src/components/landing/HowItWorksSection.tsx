import { motion } from "framer-motion";
import { UserPlus, ListChecks, Link2, Bell } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Crie sua conta em 30 segundos",
    description: "Escolha seu plano e comece a configurar.",
  },
  {
    icon: ListChecks,
    step: "02",
    title: "Cadastre serviços e horários",
    description: "Nós te ajudamos com sugestões prontas para seu tipo de negócio.",
  },
  {
    icon: Link2,
    step: "03",
    title: "Cole o link na sua bio",
    description: "Instagram, WhatsApp, onde quiser. Seu link personalizado está pronto.",
  },
  {
    icon: Bell,
    step: "04",
    title: "Receba agendamentos",
    description: "Notificações em tempo real enquanto foca no seu trabalho.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="bg-background py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Como funciona?
          </h2>
          <p className="text-lg text-muted-foreground">
            4 passos simples para revolucionar seu atendimento.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="mb-2 block font-display text-sm font-bold text-primary">
                Passo {step.step}
              </span>
              <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
