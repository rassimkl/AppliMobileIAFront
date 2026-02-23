// app/register.tsx

import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";

import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { register } from "../../services/auth.service";
import { registerStyles as styles } from "../../styles/register.styles";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      setError(null);

      const response = await register({
        email,
        password,
        firstName,
        lastName,
      });

      // Enregistrer le token + connecter l'utilisateur
      await auth?.signIn(response.token);

      // Aller vers l'app principale
      router.replace("/");

    } catch (e: any) {
      setError("Erreur lors de l'inscription");
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

    <View style={styles.formWrapper}>
    <View style={styles.card}>
      <Text style={styles.title}>Inscription</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <Text style={styles.label}>Prénom</Text>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />

      <Text style={styles.label}>Nom</Text>
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>

      </View>

      <Link href="./login">
        <Text style={styles.link}>
          Déjà un compte ? Se connecter
        </Text>
      </Link>
    </View>
  </View>
);

}
