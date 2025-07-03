// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: number;
  token: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (u: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  // On mount, read from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      try {
        setUserState(JSON.parse(stored));
      } catch {
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  const setUser = (u: User) => {
    setUserState(u);
    localStorage.setItem("authUser", JSON.stringify(u));
  };

  const signOut = () => {
    setUserState(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};
