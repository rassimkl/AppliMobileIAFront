import { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { createLangue } from "../../services/langue.service";
import { addLangueFormStyles as styles } from "../../styles/addLangueForm.styles";

export default function AddLangueForm() {

  const [name, setName] = useState("");

  const handleSubmit = async () => {

    if (!name) {
      Alert.alert("Erreur", "Le nom est obligatoire");
      return;
    }

    try {
      await createLangue(name.trim());

      Alert.alert("Succès", "Langue ajoutée !");
      setName("");

    } catch (error) {
      Alert.alert("Erreur", "Impossible d'ajouter la langue");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Ajouter une langue
      </Text>

      <TextInput
        placeholder="Code langue (ex: Français)"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Ajouter
        </Text>
      </TouchableOpacity>

    </View>
  );
}