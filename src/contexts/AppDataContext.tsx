import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // minutes
}

export interface Client {
  id: string;
  name: string;
  whatsapp: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  professionalId: string;
}

export interface Professional {
  id: string;
  name: string;
}

interface AppDataContextType {
  services: Service[];
  addService: (s: Omit<Service, "id">) => void;
  removeService: (id: string) => void;
  clients: Client[];
  addClient: (c: Omit<Client, "id">) => void;
  appointments: Appointment[];
  addAppointment: (a: Omit<Appointment, "id">) => void;
  removeAppointment: (id: string) => void;
  professionals: Professional[];
  addProfessional: (name: string) => void;
  removeProfessional: (id: string) => void;
  bookingSlug: string;
}

const AppDataContext = createContext<AppDataContextType>({} as AppDataContextType);
export const useAppData = () => useContext(AppDataContext);

const uid = () => Math.random().toString(36).slice(2, 9);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([
    { id: "s1", name: "Corte Degradê", price: 35, duration: 30 },
    { id: "s2", name: "Barba Completa", price: 25, duration: 30 },
    { id: "s3", name: "Corte + Barba", price: 55, duration: 60 },
  ]);

  const [clients, setClients] = useState<Client[]>([
    { id: "c1", name: "João Silva", whatsapp: "5511999990001" },
    { id: "c2", name: "Maria Santos", whatsapp: "5511999990002" },
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: "a1", clientName: "João Silva", serviceId: "s1", date: new Date().toISOString().split("T")[0], time: "09:00", professionalId: "p1" },
    { id: "a2", clientName: "Maria Santos", serviceId: "s3", date: new Date().toISOString().split("T")[0], time: "14:00", professionalId: "p1" },
  ]);

  const [professionals, setProfessionals] = useState<Professional[]>([
    { id: "p1", name: "Você" },
  ]);

  const bookingSlug = "app.meusalao.com/seu-nome";

  return (
    <AppDataContext.Provider
      value={{
        services,
        addService: (s) => setServices((prev) => [...prev, { ...s, id: uid() }]),
        removeService: (id) => setServices((prev) => prev.filter((s) => s.id !== id)),
        clients,
        addClient: (c) => {
          setClients((prev) => {
            if (prev.find((x) => x.whatsapp === c.whatsapp)) return prev;
            return [...prev, { ...c, id: uid() }];
          });
        },
        appointments,
        addAppointment: (a) => setAppointments((prev) => [...prev, { ...a, id: uid() }]),
        removeAppointment: (id) => setAppointments((prev) => prev.filter((a) => a.id !== id)),
        professionals,
        addProfessional: (name) => setProfessionals((prev) => [...prev, { id: uid(), name }]),
        removeProfessional: (id) => setProfessionals((prev) => prev.filter((p) => p.id !== id)),
        bookingSlug,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
