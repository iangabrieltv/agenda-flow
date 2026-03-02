import { useState } from "react";
import { useAppData } from "@/contexts/AppDataContext";
import { useAuth } from "@/contexts/AuthContext";
import { CalendarCheck, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Step = "service" | "professional" | "datetime" | "confirm" | "success";

const SLOTS: string[] = [];
for (let h = 8; h <= 19; h++) {
  SLOTS.push(`${String(h).padStart(2, "0")}:00`);
  SLOTS.push(`${String(h).padStart(2, "0")}:30`);
}

const Booking = () => {
  const { services, professionals, appointments, addAppointment, addClient } = useAppData();
  const { user } = useAuth();
  const isPremium = user?.plan === "premium";

  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState("");
  const [selectedProf, setSelectedProf] = useState(professionals[0]?.id ?? "p1");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientWhatsApp, setClientWhatsApp] = useState("");

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const occupiedSlots = appointments
    .filter((a) => a.date === selectedDate && a.professionalId === selectedProf)
    .map((a) => a.time);

  const freeSlots = SLOTS.filter((s) => !occupiedSlots.includes(s));

  const handleConfirm = () => {
    if (!clientName.trim() || !clientWhatsApp.trim()) return;
    addAppointment({
      clientName: clientName.trim(),
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
      professionalId: selectedProf,
    });
    addClient({ name: clientName.trim(), whatsapp: clientWhatsApp.replace(/\D/g, "") });
    setStep("success");
  };

  const service = services.find((s) => s.id === selectedService);
  const prof = professionals.find((p) => p.id === selectedProf);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-hero py-6 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <CalendarCheck className="h-5 w-5 text-primary" />
          <span className="font-display font-bold text-primary-foreground">
            Agend<span className="text-gradient-neon">Ai</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Agende seu horário em segundos</p>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* Steps indicator */}
        {step !== "success" && (
          <div className="flex items-center gap-1 mb-6">
            {["service", ...(isPremium && professionals.length > 1 ? ["professional"] : []), "datetime", "confirm"].map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  ["service", ...(isPremium && professionals.length > 1 ? ["professional"] : []), "datetime", "confirm"].indexOf(step) >= i
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        )}

        {/* Step: Service */}
        {step === "service" && (
          <div>
            <h2 className="text-lg font-display font-bold text-foreground mb-4">Escolha o serviço</h2>
            <div className="space-y-2">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedService(s.id); setStep(isPremium && professionals.length > 1 ? "professional" : "datetime"); }}
                  className="w-full flex items-center justify-between bg-card rounded-xl px-4 py-3 shadow-card hover:border-primary border border-transparent transition-colors"
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.duration} min</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">R$ {s.price.toFixed(2)}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Professional */}
        {step === "professional" && (
          <div>
            <h2 className="text-lg font-display font-bold text-foreground mb-4">Escolha o profissional</h2>
            <div className="space-y-2">
              {professionals.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedProf(p.id); setStep("datetime"); }}
                  className="w-full flex items-center justify-between bg-card rounded-xl px-4 py-3 shadow-card hover:border-primary border border-transparent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {p.name[0]}
                    </div>
                    <span className="text-sm font-medium text-foreground">{p.name}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Date & Time */}
        {step === "datetime" && (
          <div>
            <h2 className="text-lg font-display font-bold text-foreground mb-4">Data e horário</h2>

            {/* Date picker */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
              {dates.map((d) => {
                const dateObj = new Date(d + "T12:00:00");
                const weekday = dateObj.toLocaleDateString("pt-BR", { weekday: "short" });
                const day = dateObj.getDate();
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`flex flex-col items-center px-3 py-2 rounded-xl min-w-[56px] transition-colors ${
                      selectedDate === d
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground border border-border"
                    }`}
                  >
                    <span className="text-[10px] uppercase">{weekday}</span>
                    <span className="text-lg font-bold">{day}</span>
                  </button>
                );
              })}
            </div>

            {/* Time slots */}
            <div className="grid grid-cols-4 gap-2">
              {freeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => { setSelectedTime(time); setStep("confirm"); }}
                  className={`py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedTime === time
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            {freeSlots.length === 0 && (
              <p className="text-center text-sm text-muted-foreground mt-4">Sem horários disponíveis nesta data.</p>
            )}
          </div>
        )}

        {/* Step: Confirm */}
        {step === "confirm" && (
          <div>
            <h2 className="text-lg font-display font-bold text-foreground mb-4">Confirme seus dados</h2>

            <div className="bg-card rounded-2xl p-4 shadow-card mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Serviço</span>
                <span className="font-medium text-foreground">{service?.name}</span>
              </div>
              {isPremium && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Profissional</span>
                  <span className="font-medium text-foreground">{prof?.name}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Data</span>
                <span className="font-medium text-foreground">
                  {new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Horário</span>
                <span className="font-medium text-foreground">{selectedTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valor</span>
                <span className="font-bold text-primary">R$ {service?.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Seu nome</label>
                <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="João Silva" className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">WhatsApp</label>
                <Input value={clientWhatsApp} onChange={(e) => setClientWhatsApp(e.target.value)} placeholder="(11) 99999-0001" className="rounded-xl" />
              </div>
            </div>

            <Button onClick={handleConfirm} className="w-full rounded-xl bg-gradient-neon text-primary-foreground font-semibold h-12">
              Confirmar Agendamento
            </Button>
          </div>
        )}

        {/* Success */}
        {step === "success" && (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground mb-2">Agendado com sucesso!</h2>
            <p className="text-sm text-muted-foreground">O salão foi notificado. Você receberá uma confirmação no seu WhatsApp.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
