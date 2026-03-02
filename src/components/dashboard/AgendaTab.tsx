import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";
import { Plus, X, Users as UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SLOTS: string[] = [];
for (let h = 8; h <= 19; h++) {
  SLOTS.push(`${String(h).padStart(2, "0")}:00`);
  SLOTS.push(`${String(h).padStart(2, "0")}:30`);
}

const AgendaTab = () => {
  const { user } = useAuth();
  const { appointments, addAppointment, removeAppointment, services, professionals, addProfessional } = useAppData();
  const [selectedProf, setSelectedProf] = useState(professionals[0]?.id ?? "p1");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTime, setModalTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [newProfName, setNewProfName] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const todayLabel = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

  const todayAppts = appointments.filter((a) => a.date === today && a.professionalId === selectedProf);

  const getApptForSlot = (time: string) => todayAppts.find((a) => a.time === time);

  const openBooking = (time: string) => {
    setModalTime(time);
    setClientName("");
    setSelectedService(services[0]?.id ?? "");
    setModalOpen(true);
  };

  const confirmBooking = () => {
    if (!clientName.trim() || !selectedService) return;
    addAppointment({ clientName, serviceId: selectedService, date: today, time: modalTime, professionalId: selectedProf });
    setModalOpen(false);
  };

  const isPremium = user?.plan === "premium";

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-display font-bold text-foreground capitalize">{todayLabel}</h1>
          <p className="text-xs text-muted-foreground">{todayAppts.length} agendamento(s) hoje</p>
        </div>
        {isPremium && (
          <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1" onClick={() => setTeamModalOpen(true)}>
            <UsersIcon className="h-3.5 w-3.5" /> Gerenciar Equipe
          </Button>
        )}
      </div>

      {/* Professional filter (Premium) */}
      {isPremium && professionals.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {professionals.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProf(p.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedProf === p.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}

      {/* Slots */}
      <div className="space-y-1">
        {SLOTS.map((time) => {
          const appt = getApptForSlot(time);
          const service = appt ? services.find((s) => s.id === appt.serviceId) : null;
          return (
            <div
              key={time}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors cursor-pointer ${
                appt
                  ? "bg-primary/10 border border-primary/30"
                  : "hover:bg-muted/50"
              }`}
              onClick={() => !appt && openBooking(time)}
            >
              <span className="text-xs font-mono text-muted-foreground w-12 shrink-0">{time}</span>
              {appt ? (
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{appt.clientName}</p>
                    <p className="text-xs text-primary">{service?.name ?? "Serviço"} • {service?.duration ?? 30}min</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeAppointment(appt.id); }}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Disponível</span>
                  <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Booking modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Agendamento às {modalTime}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Nome do Cliente</label>
              <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="João Silva" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Serviço</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} - R$ {s.price.toFixed(2)} ({s.duration}min)
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={confirmBooking} className="w-full rounded-xl bg-gradient-neon text-primary-foreground font-semibold">
              Confirmar Agendamento
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Team modal (Premium) */}
      <Dialog open={teamModalOpen} onOpenChange={setTeamModalOpen}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Equipe</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {professionals.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-muted rounded-xl px-3 py-2">
                <span className="text-sm font-medium">{p.name}</span>
              </div>
            ))}
            <div className="flex gap-2">
              <Input
                value={newProfName}
                onChange={(e) => setNewProfName(e.target.value)}
                placeholder="Nome do profissional"
                className="rounded-xl"
              />
              <Button
                size="sm"
                className="rounded-xl"
                onClick={() => {
                  if (newProfName.trim()) {
                    addProfessional(newProfName.trim());
                    setNewProfName("");
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgendaTab;
