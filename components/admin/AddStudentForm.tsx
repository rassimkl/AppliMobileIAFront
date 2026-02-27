import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { getLangues, Langue } from "../../services/langue.service";
import { createUser } from "../../services/user.service";
import { addStudentFormStyles as styles } from "../../styles/addStudentForm.styles";

export default function AddStudentForm() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [langues, setLangues] = useState<Langue[]>([]);
  const [selectedLangues, setSelectedLangues] = useState<number[]>([]);
  const [isLangueModalVisible, setLangueModalVisible] = useState(false);

  useEffect(() => {
    fetchLangues();
  }, []);

  const fetchLangues = async () => {
    try {
      const data = await getLangues();
      setLangues(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLangue = (id: number) => {
    if (selectedLangues.includes(id)) {
      setSelectedLangues(selectedLangues.filter(l => l !== id));
    } else {
      setSelectedLangues([...selectedLangues, id]);
    }
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    try {
      await createUser({
        email,
        password,
        firstName,
        lastName,
        role: "ETUDIANT",
        languages: selectedLangues,
      });

      Alert.alert("Succès", "Étudiant créé !");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setSelectedLangues([]);

    } catch (error) {
      Alert.alert("Erreur", "Création impossible");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un étudiant</Text>

      <TextInput placeholder="Prénom" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput placeholder="Nom" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />

      <Text style={{ marginTop: 15, fontWeight: "bold" }}>
  Langues :
</Text>

<TouchableOpacity
  style={styles.dropdownButton}
  onPress={() => setLangueModalVisible(true)}
>
  <Text style={styles.dropdownText}>
    {selectedLangues.length > 0
      ? `${selectedLangues.length} langue(s) sélectionnée(s)`
      : "Sélectionner les langues"}
  </Text>
</TouchableOpacity>

{/* MODAL */}
<Modal
  visible={isLangueModalVisible}
  transparent
  animationType="slide"
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>

      <FlatList
        data={langues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedLangues.includes(item.id);

          return (
            <TouchableOpacity
              style={[
                styles.modalItem,
                isSelected && styles.languageSelected
              ]}
              onPress={() => toggleLangue(item.id)}
            >
              <Text style={styles.modalItemText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        onPress={() => setLangueModalVisible(false)}
        style={styles.modalClose}
      >
        <Text style={styles.modalCloseText}>
          Valider
        </Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Créer</Text>
      </TouchableOpacity>
    </View>
  );
}