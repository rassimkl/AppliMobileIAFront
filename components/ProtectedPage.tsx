import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface Props {
  allowedRoles?: string[];
  children: React.ReactNode;
}

export default function ProtectedPage({
  allowedRoles,
  children,
}: Props) {
  const auth = useContext(AuthContext);

  if (!auth || auth.loading) return null;

  if (!auth.isAuthenticated) {
    return <Redirect href="/public/login" />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(auth.user?.role || "")
  ) {
    return <Redirect href="/" />;
  }

  return <>{children}</>;
}
