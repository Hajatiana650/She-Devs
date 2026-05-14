import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Role = "POPULATION" | "CHAUFFEUR" | "ADMIN_BUS" | "ADMIN_TRASH";

interface AuthState {
  role: Role | null;
  email: string | null;
  setRole: (r: Role, email: string) => void;
  logout: () => void;
}

const AuthCtx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("fianacity_auth") : null;
    if (saved) {
      try {
        const p = JSON.parse(saved);
        setRoleState(p.role);
        setEmail(p.email);
      } catch {}
    }
  }, []);

  const setRole = (r: Role, e: string) => {
    setRoleState(r);
    setEmail(e);
    localStorage.setItem("fianacity_auth", JSON.stringify({ role: r, email: e }));
  };

  const logout = () => {
    setRoleState(null);
    setEmail(null);
    localStorage.removeItem("fianacity_auth");
  };

  return <AuthCtx.Provider value={{ role, email, setRole, logout }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
