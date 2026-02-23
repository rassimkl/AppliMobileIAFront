// services/api.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

/**
 * Client Axios centralisé pour parler avec le backend Spring Boot
 */
const api = axios.create({
  baseURL: "http://192.168.1.93:9090/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Intercepteur : s'exécute AVANT chaque requête HTTP
 * → ajoute automatiquement le JWT dans le header Authorization
 */
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Supprimer le token
      await AsyncStorage.removeItem("token");

      // Redirection vers login
      router.replace("./login");
    }

    return Promise.reject(error);
  }
);

export default api;
