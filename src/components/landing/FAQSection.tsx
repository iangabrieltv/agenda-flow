import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Preciso instalar algum programa?",
    a: "Não, o sistema é 100% online e funciona direto no navegador do seu celular ou PC.",
  },
  {
    q: "Meus clientes precisam criar conta para marcar?",
    a: "Jamais! Eles só colocam Nome e WhatsApp. O foco é rapidez.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim, não temos contrato de fidelidade. Você usa enquanto fizer sentido para seu negócio.",
  },
  {
    q: "O plano de R$ 29,90 tem taxas escondidas?",
    a: "Não. O valor é fixo mensal. Sem surpresas na sua fatura.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative overflow-hidden bg-hero py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold text-secondary-foreground sm:text-4xl">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border/10 bg-secondary/20 px-6 backdrop-blur-sm"
              >
                <AccordionTrigger className="py-5 font-display text-base font-semibold text-secondary-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
