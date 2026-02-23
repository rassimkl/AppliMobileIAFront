import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { editCourseStyles as styles } from "../../../styles/editCourse.styles";

import {
  getCourseById,
  updateCourse
} from "../../../services/course.service";

export default function EditCourse() {

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const data = await getCourseById(Number(id));

      setTitle(data.title);
      setDescription(data.description);
      setLanguage(data.language);
      setLevel(data.level);

    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger le cours");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateCourse(Number(id), {
        title,
        description,
        language,
        level,
      });

      Alert.alert("Succès", "Cours modifié !");
      router.push("/cours");

    } catch (error) {
      Alert.alert("Erreur", "Impossible de modifier le cours");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.title}>Modifier le cours</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
