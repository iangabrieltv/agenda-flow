import { Calendar, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/10 bg-surface-dark py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-neon">
              <Calendar className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-secondary-foreground">
              Agend<span className="text-gradient-neon">Ai</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Termos de Uso
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Política de Privacidade
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Suporte
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/10 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 AgendAi — Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
              LGPD
            </span>
            <span className="text-xs text-muted-foreground">Dados protegidos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
