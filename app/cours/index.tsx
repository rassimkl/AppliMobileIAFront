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

import {
  getLangues,
  Langue
} from "../../services/langue.service";

export default function CoursPage() {

  const auth = useContext(AuthContext);
  const router = useRouter();
  const isAdmin = auth?.user?.role === "ADMIN";

  const [courses, setCourses] = useState<any[]>([]);
  const [langues, setLangues] = useState<Langue[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ALL");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const coursesData = await getCourses();
      const languesData = await getLangues();

      setCourses(coursesData);
      setLangues(languesData);

    } catch (error) {
      console.log("Erreur récupération données :", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses =
    selectedLanguage === "ALL"
      ? courses
      : courses.filter(
          (course) => course.langueName === selectedLanguage
        );

  const handleDelete = async (id: number) => {
    try {
      await deleteCourse(id);
      fetchData();
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

          {/* 🔥 FILTRE DYNAMIQUE */}
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

              {langues.map((langue) => (
                <Picker.Item
                  key={langue.id}
                  label={langue.name}
                  value={langue.name}
                />
              ))}

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
                langueName={course.langueName}
                onDelete={handleDelete}
              />
            ))
          )}

        </DashboardLayout>

      </ImageBackground>
    </ProtectedPage>
  );
}