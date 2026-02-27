import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import DashboardLayout from "../../components/DashboardLayout";
import ProtectedPage from "../../components/ProtectedPage";
import api from "../../services/api";
import { createCourse } from "../../services/course.service";
import { createCourseStyles as styles } from "../../styles/createCourse.styles";

export default function CreateCourse() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("A1");

  const [langues, setLangues] = useState<any[]>([]);
  const [langueId, setLangueId] = useState<number | undefined>(undefined);
  const [loadingLangues, setLoadingLangues] = useState(true);

  useEffect(() => {
    fetchLangues();
  }, []);

  const fetchLangues = async () => {
    try {
      const response = await api.get("/langues");
      setLangues(response.data);

      if (response.data.length > 0) {
        setLangueId(response.data[0].id);
      }

    } catch (error) {
      console.log("Erreur chargement langues :", error);
      Alert.alert("Erreur", "Impossible de charger les langues");
    } finally {
      setLoadingLangues(false);
    }
  };

  const handleSubmit = async () => {

    if (!title.trim() || !description.trim() || !langueId) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    try {
      await createCourse({
        title: title.trim(),
        description: description.trim(),
        langueId,
        level,
      });

      Alert.alert("Succès", "Cours créé !");
      router.replace("/cours");

    } catch (error: any) {
      console.log("Erreur backend :", error.response?.data);
      Alert.alert("Erreur", "Impossible de créer le cours");
    }
  };

  if (loadingLangues) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ProtectedPage allowedRoles={["ADMIN"]}>

      <ImageBackground
        source={require("../../assets/images/vb2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
        imageStyle={{ opacity: 0.8 }}
      >

        <DashboardLayout title="Créer un cours">

          <ScrollView contentContainerStyle={{ padding: 20 }}>
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
                  selectedValue={langueId}
                  onValueChange={(itemValue) =>
                    setLangueId(Number(itemValue))
                  }
                >
                  {langues.map((langue) => (
                    <Picker.Item
                      key={langue.id}
                      label={langue.name}
                      value={langue.id}
                    />
                  ))}
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
                  <Picker.Item label="Tous niveaux" value="ALL" />
                </Picker>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Créer le cours</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>

        </DashboardLayout>

      </ImageBackground>

    </ProtectedPage>
  );
}