import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getItem } from "../localStorage";

interface AuthContextType {
  user: string;
  login: (username: string) => void;
}

type AuthContextProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    setUser(getItem("username"));
  }, []);

  const login = (username: string) => {
    setUser(username);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
