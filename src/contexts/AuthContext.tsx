import React, { createContext, useContext, useState, ReactNode } from "react";

export type PlanType = "trial" | "pro" | "premium";

interface AuthUser {
  email: string;
  plan: PlanType;
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const CREDENTIALS: Record<string, { password: string; plan: PlanType; name: string }> = {
  "barber@7dias": { password: "7dias", plan: "trial", name: "Teste 7 Dias" },
  "barber@29": { password: "2990", plan: "pro", name: "Plano Pro" },
  "barber@49": { password: "4990", plan: "premium", name: "Plano Premium" },
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("agendai_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string): boolean => {
    const cred = CREDENTIALS[email];
    if (cred && cred.password === password) {
      const u = { email, plan: cred.plan, name: cred.name };
      setUser(u);
      localStorage.setItem("agendai_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("agendai_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
