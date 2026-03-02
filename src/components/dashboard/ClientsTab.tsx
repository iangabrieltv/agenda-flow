import { useAppData } from "@/contexts/AppDataContext";
import { MessageCircle, Users } from "lucide-react";

const ClientsTab = () => {
  const { clients } = useAppData();

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-display font-bold text-foreground">Clientes</h1>
        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full ml-auto">{clients.length}</span>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Nenhum cliente cadastrado ainda.
        </div>
      ) : (
        <div className="space-y-2">
          {clients.map((c) => (
            <div key={c.id} className="flex items-center justify-between bg-card rounded-xl px-4 py-3 shadow-card">
              <div>
                <p className="text-sm font-medium text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.whatsapp.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4")}</p>
              </div>
              <button
                onClick={() => openWhatsApp(c.whatsapp)}
                className="p-2 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientsTab;
