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
import { studentsListStyles as styles } from "../../styles/studentsList.styles";

export default function StudentsList() {

  const [students, setStudents] = useState<User[]>([]);
  const [langues, setLangues] = useState<Langue[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
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
      const users = await getUsersByRole("ETUDIANT");
      const languesData = await getLangues();

      setStudents(users);
      setLangues(languesData);
    } catch (error) {
      console.log("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      await updateUser(selectedUser.id, {
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

  return (
    <>
      <ScrollView>
        {students.map(student => (
          <View key={student.id} style={styles.card}>

            <Text style={styles.name}>
              {student.firstName} {student.lastName}
            </Text>

            <Text style={styles.email}>
              {student.email}
            </Text>

            <View style={styles.actionsRow}>
              <TouchableOpacity onPress={() => openEditModal(student)}>
                <Text style={styles.editText}>Modifier</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDelete(student.id)}>
                <Text style={styles.deleteText}>Supprimer</Text>
              </TouchableOpacity>
            </View>

          </View>
        ))}
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
        Modifier étudiant
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