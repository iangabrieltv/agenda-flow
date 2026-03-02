import { motion } from "framer-motion";
import { Palette, Camera } from "lucide-react";

const UnisexSection = () => {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Um sistema que combina com{" "}
              <span className="text-gradient-neon">o seu estilo.</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Seja uma barbearia old school ou um salão de estética minimalista, nossa
              interface neutra eleva o nível do seu atendimento.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground">
                    Personalização de cores
                  </h4>
                  <p className="text-muted-foreground">
                    Adapte as cores do link do cliente para combinar com sua marca.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                  <Camera className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground">
                    Galeria de serviços
                  </h4>
                  <p className="text-muted-foreground">
                    Fotos dos seus trabalhos para atrair visualmente o cliente final.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-1 items-center justify-center"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Style preview cards */}
              <div className="aspect-square w-40 rounded-2xl border border-border bg-secondary p-4 shadow-card">
                <div className="mb-2 h-3 w-16 rounded bg-graphite" />
                <div className="mb-4 h-2 w-24 rounded bg-muted-foreground/20" />
                <div className="flex flex-col gap-2">
                  <div className="h-8 rounded-lg bg-foreground/10" />
                  <div className="h-8 rounded-lg bg-foreground/10" />
                </div>
              </div>
              <div className="aspect-square w-40 translate-y-8 rounded-2xl border border-primary/20 bg-surface-dark p-4 shadow-neon">
                <div className="mb-2 h-3 w-16 rounded bg-gradient-neon" />
                <div className="mb-4 h-2 w-24 rounded bg-muted-foreground/30" />
                <div className="flex flex-col gap-2">
                  <div className="h-8 rounded-lg bg-primary/20" />
                  <div className="h-8 rounded-lg bg-primary/20" />
                </div>
              </div>
              <div className="aspect-square w-40 -translate-y-4 rounded-2xl border border-accent/20 bg-card p-4 shadow-card">
                <div className="mb-2 h-3 w-16 rounded bg-accent" />
                <div className="mb-4 h-2 w-24 rounded bg-muted-foreground/20" />
                <div className="flex flex-col gap-2">
                  <div className="h-8 rounded-lg bg-accent/10" />
                  <div className="h-8 rounded-lg bg-accent/10" />
                </div>
              </div>
              <div className="aspect-square w-40 translate-y-4 rounded-2xl border border-border bg-muted p-4 shadow-card">
                <div className="mb-2 h-3 w-16 rounded bg-foreground" />
                <div className="mb-4 h-2 w-24 rounded bg-muted-foreground/20" />
                <div className="flex flex-col gap-2">
                  <div className="h-8 rounded-lg bg-foreground/5" />
                  <div className="h-8 rounded-lg bg-foreground/5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UnisexSection;
