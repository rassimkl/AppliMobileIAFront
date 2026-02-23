import { useRouter } from "expo-router";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { navbarStyles as styles } from "../styles/navbar.styles";

export default function CustomNavBar() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.link}>Accueil</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/profil")}>
        <Text style={styles.link}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
}
