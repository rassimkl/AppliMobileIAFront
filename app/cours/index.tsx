import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import CourseCard from "../../components/CourseCard";
import DashboardLayout from "../../components/DashboardLayout";
import ProtectedPage from "../../components/ProtectedPage";
import { AuthContext } from "../../context/AuthContext";
import { courseStyles as styles } from "../../styles/course.styles";

import {
  deleteCourse,
  getCourses
} from "../../services/course.service";

export default function CoursPage() {

  const auth = useContext(AuthContext);
  const router = useRouter();

  const isAdmin = auth?.user?.role === "ADMIN";

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ALL");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.log("Erreur récupération cours :", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Filtrage dynamique (inchangé)
  const filteredCourses =
    selectedLanguage === "ALL"
      ? courses
      : courses.filter(
          (course) => course.language === selectedLanguage
        );

  const handleDelete = async (id: number) => {
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (error: any) {
      console.log("DELETE ERROR:", error);
    }
  };

return (
  <ProtectedPage allowedRoles={["ADMIN", "ETUDIANT"]}>
    <ImageBackground
      source={require("../../assets/images/vb2.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
      imageStyle={{ opacity: 0.8 }}
    >

      <DashboardLayout title="Cours">

        {isAdmin && (
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push("/cours/create")}
          >
            <Text style={styles.createButtonText}>
              + Créer un cours
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontWeight: "bold" }}>
            Filtrer par langue :
          </Text>

          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) =>
              setSelectedLanguage(itemValue)
            }
          >
            <Picker.Item label="Toutes les langues" value="ALL" />
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

        {loading ? (
          <ActivityIndicator size="large" />
        ) : filteredCourses.length === 0 ? (
          <Text>Aucun cours disponible</Text>
        ) : (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              language={course.language}
              onDelete={handleDelete}
            />
          ))
        )}

      </DashboardLayout>

    </ImageBackground>
  </ProtectedPage>
);
}
