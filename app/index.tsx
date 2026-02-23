import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RootRedirect() {
  const auth = useContext(AuthContext);

  if (!auth || auth.loading) return null;

  if (!auth.isAuthenticated) {
    return <Redirect href="/public/login" />;
  }

  if (auth.user?.role === "ADMIN") {
    return <Redirect href="/admin" />;
  }

  if (auth.user?.role === "ETUDIANT") {
    return <Redirect href="/etudiant" />;
  }

  if (auth.user?.role === "ENSEIGNANT") {
    return <Redirect href="/enseignant" />;
  }

  return null;
}