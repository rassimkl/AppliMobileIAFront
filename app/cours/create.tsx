import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { createCourse } from "../../services/course.service";
import { createCourseStyles as styles } from "../../styles/createCourse.styles";

export default function CreateCourse() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("EN");
  const [level, setLevel] = useState("A1");

  const handleSubmit = async () => {
    try {
      await createCourse({
        title,
        description,
        language,
        level,
      });

      Alert.alert("Succès", "Cours créé !");
      router.push("/cours");

    } catch (error) {
      console.log("Erreur création cours:", error);
      Alert.alert("Erreur", "Impossible de créer le cours");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.title}>Créer un cours</Text>

        <Text style={styles.label}>Titre</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={styles.textArea}
          multiline
        />

        <Text style={styles.label}>Langue</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={language}
            onValueChange={(itemValue) => setLanguage(itemValue)}
          >
            <Picker.Item label="Anglais" value="EN" />
            <Picker.Item label="Français" value="FR" />
            <Picker.Item label="Espagnol" value="ES" />
            <Picker.Item label="Portugais" value="PT" />
            <Picker.Item label="Basque" value="EU" />
            <Picker.Item label="Arabe" value="AR" />
            <Picker.Item label="Japonais" value="JA" />
            <Picker.Item label="Chinois" value="ZH" />
            <Picker.Item label="Russe" value="RU" />
            <Picker.Item label="Allemand" value="DE" />
          </Picker>
        </View>

        <Text style={styles.label}>Niveau</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={level}
            onValueChange={(itemValue) => setLevel(itemValue)}
          >
            <Picker.Item label="A1" value="A1" />
            <Picker.Item label="A2" value="A2" />
            <Picker.Item label="B1" value="B1" />
            <Picker.Item label="B2" value="B2" />
            <Picker.Item label="C1" value="C1" />
            <Picker.Item label="Tous les niveaux" value="ALL" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Créer le cours</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
