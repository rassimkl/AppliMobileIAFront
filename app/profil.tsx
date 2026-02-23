import { useRouter } from "expo-router";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { profilStyles as styles } from "../styles/profil.styles";

export default function Profil() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  if (!auth || auth.loading) return null;

  if (!auth.isAuthenticated) {
    router.replace("/public/login");
    return null;
  }

  const { user } = auth;

  const initials =
    user?.email?.charAt(0).toUpperCase() ?? "?";

  const handleLogout = async () => {
    await auth.signOut();
    router.replace("/public/login");
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{user?.email}</Text>
        <Text style={styles.role}>{user?.role}</Text>
      </View>

      {/* INFOS */}
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email}</Text>

        <Text style={styles.label}>Rôle</Text>
        <Text style={styles.value}>{user?.role}</Text>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}