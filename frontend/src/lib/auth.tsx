import {
  createContext,
  useContext,
  useState,
} from "react";

export type Role =
  | "POPULATION"
  | "CHAUFFEUR"
  | "ADMIN_BUS"
  | "ADMIN_TRASH";

interface AuthContextType {
  role: Role | null;

  email: string | null;

  setRole: (
    role: Role,
    email: string
  ) => void;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRoleState] =
    useState<Role | null>(null);

  const [email, setEmail] =
    useState<string | null>(null);

  const setRole = (
    role: Role,
    email: string
  ) => {
    setRoleState(role);
    setEmail(email);
  };

  const logout = () => {
    setRoleState(null);
    setEmail(null);

    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "refresh_token"
    );
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        email,
        setRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}