import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CalendarCheck, Users, Scissors, CreditCard, LogOut, Crown } from "lucide-react";
import AgendaTab from "@/components/dashboard/AgendaTab";
import ClientsTab from "@/components/dashboard/ClientsTab";
import ServicesTab from "@/components/dashboard/ServicesTab";
import SubscriptionTab from "@/components/dashboard/SubscriptionTab";

const tabs = [
  { id: "agenda", label: "Agenda", icon: CalendarCheck },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "servicos", label: "Serviços", icon: Scissors },
  { id: "assinatura", label: "Assinatura", icon: CreditCard },
] as const;

type TabId = (typeof tabs)[number]["id"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabId>("agenda");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  const planLabel = user.plan === "trial" ? "Trial 7 dias" : user.plan === "pro" ? "Pro" : "Premium";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Trial banner */}
      {user.plan === "trial" && (
        <div
          className="bg-gradient-neon text-primary-foreground text-center py-2 px-4 text-sm font-medium cursor-pointer"
          onClick={() => setActiveTab("assinatura")}
        >
          ⏳ Seu período de teste expira em breve. <span className="underline">Clique aqui para assinar</span>
        </div>
      )}

      {/* Top header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-primary" />
          <span className="font-display font-bold text-foreground">
            Agend<span className="text-gradient-neon">Ai</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium flex items-center gap-1">
            {user.plan === "premium" && <Crown className="h-3 w-3" />}
            {planLabel}
          </span>
          <button onClick={() => { logout(); navigate("/login"); }} className="text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === "agenda" && <AgendaTab />}
        {activeTab === "clientes" && <ClientsTab />}
        {activeTab === "servicos" && <ServicesTab />}
        {activeTab === "assinatura" && <SubscriptionTab />}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex items-center justify-around py-2 px-2 z-50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-primary" : ""}`} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Dashboard;
