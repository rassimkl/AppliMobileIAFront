// components/admin/TeachersList.tsx

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import {
  deleteUser,
  getUsersByRole,
  updateUser,
  User
} from "../../services/user.service";

import {
  getLangues,
  Langue
} from "../../services/langue.service";

import { studentsEditModalStyles as modalStyles } from "../../styles/studentsEditModal.styles";
import { teachersListStyles as styles } from "../../styles/teachersList.styles";

export default function TeachersList() {

  const [teachers, setTeachers] = useState<User[]>([]);
  const [langues, setLangues] = useState<Langue[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const users = await getUsersByRole("ENSEIGNANT");
      const languesData = await getLangues();

      setTeachers(users);
      setLangues(languesData);
    } catch (error) {
      console.log("Erreur récupération enseignants:", error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (teacher: User) => {
    setSelectedTeacher(teacher);
    setFirstName(teacher.firstName);
    setLastName(teacher.lastName);
    setEmail(teacher.email);
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!selectedTeacher) return;

    try {
      await updateUser(selectedTeacher.id, {
        firstName,
        lastName,
        email,
        languages: selectedLanguages
      });

      setModalVisible(false);
      fetchData();

    } catch (error) {
      Alert.alert("Erreur", "Modification impossible");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      fetchData();
    } catch (error) {
      Alert.alert("Erreur", "Suppression impossible");
    }
  };

  const toggleLanguage = (id: number) => {
    if (selectedLanguages.includes(id)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== id));
    } else {
      setSelectedLanguages([...selectedLanguages, id]);
    }
  };

  if (loading) return <ActivityIndicator size="large" />;

  if (teachers.length === 0) {
    return <Text>Aucun enseignant trouvé.</Text>;
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {teachers.map((teacher) => {

          const isActive = teacher.enabled;

          return (
            <View key={teacher.id} style={styles.card}>

              <Text style={styles.name}>
                {teacher.firstName} {teacher.lastName}
              </Text>

              <Text style={styles.email}>
                {teacher.email}
              </Text>

              <View
                style={[
                  styles.badge,
                  isActive ? styles.badgeActive : styles.badgeInactive,
                ]}
              >
                <Text style={styles.badgeText}>
                  {isActive ? "ACTIF" : "DÉSACTIVÉ"}
                </Text>
              </View>

              {/* Actions */}
              <View style={{ flexDirection: "row", marginTop: 10 }}>

                <TouchableOpacity
                  onPress={() => openEditModal(teacher)}
                  style={{ marginRight: 20 }}
                >
                  <Text style={{ color: "#2563eb", fontWeight: "600" }}>
                    Modifier
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDelete(teacher.id)}
                >
                  <Text style={{ color: "#dc2626", fontWeight: "600" }}>
                    Supprimer
                  </Text>
                </TouchableOpacity>

              </View>

            </View>
          );
        })}
      </ScrollView>

      {/* 🔥 MODAL EDIT */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.card}>

            <Text style={modalStyles.title}>
              Modifier enseignant
            </Text>

            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Prénom"
              style={modalStyles.input}
            />

            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="Nom"
              style={modalStyles.input}
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              style={modalStyles.input}
            />

            <Text style={modalStyles.sectionTitle}>
              Langues
            </Text>

            <ScrollView style={{ maxHeight: 150 }}>
              {langues.map(langue => {

                const selected = selectedLanguages.includes(langue.id);

                return (
                  <TouchableOpacity
                    key={langue.id}
                    onPress={() => toggleLanguage(langue.id)}
                    style={[
                      modalStyles.languageItem,
                      selected
                        ? modalStyles.languageSelected
                        : modalStyles.languageUnselected
                    ]}
                  >
                    <Text
                      style={
                        selected
                          ? modalStyles.languageTextSelected
                          : modalStyles.languageTextUnselected
                      }
                    >
                      {langue.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={modalStyles.buttonPrimary}
              onPress={handleUpdate}
            >
              <Text style={modalStyles.buttonText}>
                Enregistrer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={modalStyles.buttonSecondary}
              onPress={() => setModalVisible(false)}
            >
              <Text style={modalStyles.buttonTextSecondary}>
                Annuler
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </>
  );
}