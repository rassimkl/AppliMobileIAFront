// services/auth.service.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

/**
 * Données attendues pour le login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Données attendues pour l'inscription
 */
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Réponse d'authentification du backend
 * (token + infos utilisateur)
 */
export interface AuthResponse {
  token: string;
}

/**
 * LOGIN
 * Appelle POST /api/auth/login
 */
export const login = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);

  // Sauvegarde du JWT dans le téléphone
  await AsyncStorage.setItem("token", response.data.token);

  return response.data;
};

/**
 * REGISTER
 * Appelle POST /api/auth/register
 */
export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", data);

  // Sauvegarde du JWT dans le téléphone
  await AsyncStorage.setItem("token", response.data.token);

  return response.data;
};

/**
 * LOGOUT
 * Supprime le JWT du téléphone
 */
export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem("token");
};
