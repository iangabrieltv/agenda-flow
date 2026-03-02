import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroMockup from "@/assets/hero-mockup.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-hero pt-24">
      {/* Neon glow orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />

      <div className="container mx-auto flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center gap-12 px-4 lg:flex-row lg:gap-16 lg:px-8">
        {/* Text Content */}
        <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
          >
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Já utilizado por +500 profissionais de beleza
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 font-display text-4xl font-bold leading-tight text-secondary-foreground sm:text-5xl lg:text-6xl"
          >
            Sua Agenda Lotada,{" "}
            <span className="text-gradient-neon">Seu WhatsApp em Silêncio.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            O sistema de agendamento online unissex que organiza sua barbearia ou salão,
            reduz faltas em 80% e profissionaliza seu negócio por menos de{" "}
            <span className="font-semibold text-primary">R$ 1,00 por dia</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="gap-2 px-8 text-base shadow-neon glow-pulse">
              Começar meu teste de 7 dias
              <ArrowRight className="h-5 w-5" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Sem cartão de crédito • Cancele quando quiser
            </span>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-xl lg:max-w-2xl float-up"
        >
          <img
            src={heroMockup}
            alt="AgendAi - Sistema de agendamento em smartphone"
            className="w-full rounded-2xl"
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
