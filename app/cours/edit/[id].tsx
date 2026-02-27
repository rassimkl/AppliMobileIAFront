import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import DashboardLayout from "../../../components/DashboardLayout";
import ProtectedPage from "../../../components/ProtectedPage";

import api from "../../../services/api";
import {
  getCourseById,
  updateCourse
} from "../../../services/course.service";

import { editCourseStyles as styles } from "../../../styles/editCourse.styles";

export default function EditCourse() {

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");

  const [langues, setLangues] = useState<any[]>([]);
  const [langueId, setLangueId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [langueRes, courseRes] = await Promise.all([
        api.get("/langues"),
        getCourseById(Number(id))
      ]);

      setLangues(langueRes.data);

      const course = courseRes;

      setTitle(course.title);
      setDescription(course.description);
      setLangueId(course.langueId);
      setLevel(course.level);

    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger le cours");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {

    if (!title || !description || !langueId) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    try {
      await updateCourse(Number(id), {
        title,
        description,
        langueId,
        level,
      });

      Alert.alert("Succès", "Cours modifié !");
      router.replace("/cours");

    } catch (error) {
      Alert.alert("Erreur", "Impossible de modifier le cours");
    }
  };

  return (
    <ProtectedPage allowedRoles={["ADMIN"]}>

      <ImageBackground
        source={require("../../../assets/images/vb2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
        imageStyle={{ opacity: 0.8 }}
      >      

      <DashboardLayout title="Modifier le cours">

        {loading ? (
          <Text style={styles.loadingText}>Chargement...</Text>
        ) : (
          <ScrollView contentContainerStyle={{ padding: 20 }}>
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
                  <Picker.Item label="Tous les niveaux" value="ALL" />
                </Picker>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleUpdate}
              >
                <Text style={styles.buttonText}>
                  Mettre à jour
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        )}

      </DashboardLayout>

      </ImageBackground>
    </ProtectedPage>
  );
}