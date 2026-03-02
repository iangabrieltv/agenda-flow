import { motion } from "framer-motion";
import { ArrowRight, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-hero p-12 text-center shadow-neon"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-neon opacity-5" />
          
          <div className="relative z-10">
            <div className="mx-auto mb-6 flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 w-fit">
              <Timer className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Oferta de lançamento por tempo limitado
              </span>
            </div>

            <h2 className="mb-4 font-display text-3xl font-bold text-secondary-foreground sm:text-4xl">
              Garanta o preço de lançamento de{" "}
              <span className="text-gradient-neon">R$ 29,90</span>
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
              Comece a profissionalizar seu negócio agora. Sem cartão de crédito para o
              período de testes.
            </p>

            <Button size="lg" className="gap-2 px-8 text-base shadow-neon glow-pulse">
              Começar meu teste grátis
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
