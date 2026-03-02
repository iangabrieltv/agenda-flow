import { motion } from "framer-motion";
import { MessageCircle, CalendarX, UserX } from "lucide-react";

const pains = [
  {
    icon: MessageCircle,
    question: "Você para o que está fazendo para responder cliente?",
  },
  {
    icon: CalendarX,
    question: "Esquece de anotar um horário e acaba dando 'overbooking'?",
  },
  {
    icon: UserX,
    question: "Sofre com clientes que confirmam e simplesmente não aparecem?",
  },
];

const PainSection = () => {
  return (
    <section className="relative bg-background py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Chega de perder tempo com{" "}
            <span className="text-gradient-neon">áudios de 2 minutos</span> no WhatsApp.
          </h2>
          <p className="mb-16 text-lg text-muted-foreground">
            Se identificou com alguma dessas situações?
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl border border-destructive/20 bg-destructive/5 p-8 transition-all hover:border-destructive/40 hover:shadow-card-hover"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                <pain.icon className="h-6 w-6 text-destructive" />
              </div>
              <p className="font-display text-lg font-semibold text-foreground">
                {pain.question}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-xl text-center text-lg font-medium text-foreground"
        >
          Enquanto você corta ou colore,{" "}
          <span className="text-gradient-neon font-bold">
            seu sistema trabalha fechando novos horários sozinho.
          </span>
        </motion.p>
      </div>
    </section>
  );
};

export default PainSection;
