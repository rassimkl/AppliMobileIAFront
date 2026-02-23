// context/AuthContext.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

/**
 * Type du contexte d'authentification
 */
interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

/**
 * Création du contexte
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/**
 * Props du provider
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider d'authentification
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Chargement du token au démarrage de l'app
   */
useEffect(() => {
  const loadAuthData = async () => {
    const storedToken = await AsyncStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      try {
        const response = await api.get<User>("/users/me");
        setUser(response.data);
      } catch (error) {
        await AsyncStorage.removeItem("token");
        setToken(null);
      }
    }

    setLoading(false);
  };

  loadAuthData();
}, []);

  /**
   * Connexion
   */
  const signIn = async (newToken: string) => {
    await AsyncStorage.setItem("token", newToken);
    setToken(newToken);

  // Charger le user après login
  const response = await api.get<User>("/users/me");
  setUser(response.data);
  };

  /**
   * Déconnexion
   */
  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
