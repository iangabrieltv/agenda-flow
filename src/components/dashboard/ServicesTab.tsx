import { useState } from "react";
import { useAppData } from "@/contexts/AppDataContext";
import { Scissors, Plus, Trash2, Link, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const ServicesTab = () => {
  const { services, addService, removeService, bookingSlug } = useAppData();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("30");

  const handleAdd = () => {
    if (!name.trim() || !price) return;
    addService({ name: name.trim(), price: parseFloat(price), duration: parseInt(duration) });
    setName("");
    setPrice("");
    setDuration("30");
    setModalOpen(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${bookingSlug}`);
    toast.success("Link copiado!");
  };

  return (
    <div className="p-4">
      {/* Booking Link */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Link className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Meu Link de Agendamento</span>
        </div>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xs bg-muted px-3 py-2 rounded-lg text-foreground font-mono truncate">
            {bookingSlug}
          </code>
          <button onClick={copyLink} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <a
          href="/booking/seu-nome"
          target="_blank"
          className="text-xs text-primary hover:underline mt-2 inline-block"
        >
          Visualizar página do cliente →
        </a>
      </div>

      {/* Services list */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Scissors className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-display font-bold text-foreground">Serviços</h1>
        </div>
        <Button size="sm" className="rounded-xl gap-1" onClick={() => setModalOpen(true)}>
          <Plus className="h-3.5 w-3.5" /> Novo
        </Button>
      </div>

      <div className="space-y-2">
        {services.map((s) => (
          <div key={s.id} className="flex items-center justify-between bg-card rounded-xl px-4 py-3 shadow-card">
            <div>
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">
                R$ {s.price.toFixed(2)} • {s.duration} min
              </p>
            </div>
            <button onClick={() => removeService(s.id)} className="text-muted-foreground hover:text-destructive transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add service modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Novo Serviço</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Nome</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Corte Degradê" className="rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Preço (R$)</label>
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="35" className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Duração (min)</label>
                <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="30" className="rounded-xl" />
              </div>
            </div>
            <Button onClick={handleAdd} className="w-full rounded-xl bg-gradient-neon text-primary-foreground font-semibold">
              Adicionar Serviço
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesTab;
