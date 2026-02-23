// app/login.tsx

import { Link, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../services/auth.service";
import { loginStyles as styles } from "../../styles/login.styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError(null);

      const response = await login({
        email,
        password,
      });

      // Sauvegarde du token dans le contexte
      await auth?.signIn(response.token);
      
      router.replace("/");

    } catch (e: any) {
      console.log("Erreur complète :", e);
      console.log("Erreur response :", e?.response);
      console.log("Erreur message :", e?.message);

      setError("Erreur technique - voir console");
    }
  };

  return (
  <View style={styles.container}>

    {/* IMAGE EN HAUT */}
    <Image
      source={require("../../assets/images/vb1.jpg")}
      style={styles.image}
      resizeMode="cover"
    />

    {/* FORMULAIRE */}
    <View style={styles.formWrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>Connexion</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inscription}>
      <Link href="./register">
        <Text style={styles.link}>
          Pas encore de compte ? S'inscrire
        </Text>
      </Link>
      </View>

    </View>

  </View>
);



}
