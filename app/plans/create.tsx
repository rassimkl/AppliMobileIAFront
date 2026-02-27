import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
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
import { AuthContext } from "../../context/AuthContext";
import { Course, getCourses } from "../../services/course.service";
import { createPlan } from "../../services/plan.service";
import { createPlanStyles as styles } from "../../styles/createPlan.styles";

export default function CreatePlanPage() {

  const router = useRouter();
  const auth = useContext(AuthContext);

  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState<number | undefined>(undefined);

  const [numberOfHours, setNumberOfHours] = useState("");
  const [type, setType] = useState("INDIVIDUAL");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.log("Erreur récupération cours:", error);
    }
  };

  const handleSubmit = async () => {

    if (!courseId) {
      Alert.alert("Erreur", "Veuillez sélectionner un cours");
      return;
    }

    if (!numberOfHours || !price) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    if (type === "GROUP" && (!maxParticipants || Number(maxParticipants) < 2)) {
      Alert.alert("Erreur", "Un plan collectif doit avoir au moins 2 participants");
      return;
    }

    try {
      await createPlan({
        courseId,
        numberOfHours: Number(numberOfHours),
        type,
        maxParticipants:
          type === "GROUP" ? Number(maxParticipants) : null,
        price: Number(price)
      });

      Alert.alert("Succès", "Plan créé !");
      router.replace("/plans");

    } catch (error) {
      Alert.alert("Erreur", "Impossible de créer le plan");
    }
  };

  return (
  <ProtectedPage allowedRoles={["ADMIN"]}>

      <ImageBackground
        source={require("../../assets/images/vb2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
        imageStyle={{ opacity: 0.8 }}
      >

    <DashboardLayout title="Créer un Plan">

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.card}>

          <Text style={styles.label}>Cours</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={courseId}
              onValueChange={(itemValue) => setCourseId(itemValue)}
            >
              <Picker.Item label="-- Sélectionner un cours --" value={undefined} />
              {courses.map((course) => (
                <Picker.Item
                  key={course.id}
                  label={`${course.title}`}
                  value={course.id}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Nombre d'heures</Text>
          <TextInput
            value={numberOfHours}
            onChangeText={setNumberOfHours}
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Type</Text>

          <View style={styles.typeContainer}>

            <TouchableOpacity
              onPress={() => setType("INDIVIDUAL")}
              style={[
                styles.typeButton,
                type === "INDIVIDUAL"
                  ? styles.typeButtonActive
                  : styles.typeButtonInactive
              ]}
            >
              <Text style={styles.typeText}>Individuel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setType("GROUP")}
              style={[
                styles.typeButton,
                type === "GROUP"
                  ? styles.typeButtonActive
                  : styles.typeButtonInactive
              ]}
            >
              <Text style={styles.typeText}>Collectif</Text>
            </TouchableOpacity>

          </View>

          {type === "GROUP" && (
            <>
              <Text style={styles.label}>Nombre maximum de participants</Text>
              <TextInput
                value={maxParticipants}
                onChangeText={setMaxParticipants}
                keyboardType="numeric"
                style={styles.input}
              />
            </>
          )}

          <Text style={styles.label}>Prix (€)</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            <Text style={styles.submitText}>
              Créer le plan
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

    </DashboardLayout>

    </ImageBackground>
  </ProtectedPage>
);
}