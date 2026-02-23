import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import DashboardLayout from "../../../components/DashboardLayout";
import ProtectedPage from "../../../components/ProtectedPage";

import {
  getPlanById,
  updatePlan
} from "../../../services/plan.service";

import { editPlanStyles as styles } from "../../../styles/editPlan.styles";

export default function EditPlanPage() {

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [numberOfHours, setNumberOfHours] = useState("");
  const [type, setType] = useState("INDIVIDUAL");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      const data = await getPlanById(Number(id));

      setNumberOfHours(String(data.numberOfHours));
      setType(data.type);
      setMaxParticipants(
        data.maxParticipants ? String(data.maxParticipants) : ""
      );
      setPrice(String(data.price));

    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger le plan");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {

    if (!numberOfHours || !price) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    if (type === "GROUP" && (!maxParticipants || Number(maxParticipants) < 2)) {
      Alert.alert("Erreur", "Un plan collectif doit avoir au moins 2 participants");
      return;
    }

    try {
      await updatePlan(Number(id), {
        numberOfHours: Number(numberOfHours),
        type,
        maxParticipants:
          type === "GROUP" ? Number(maxParticipants) : null,
        price: Number(price)
      });

      Alert.alert("Succès", "Plan modifié !");
      router.replace("/plans");

    } catch (error) {
      Alert.alert("Erreur", "Impossible de modifier le plan");
    }
  };

  return (
    <ProtectedPage allowedRoles={["ADMIN"]}>
      <DashboardLayout title="Modifier le Plan">

        {loading ? (
          <Text style={styles.loadingText}>Chargement...</Text>
        ) : (
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View style={styles.card}>

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
                  <Text style={styles.label}>
                    Nombre maximum de participants
                  </Text>
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
                onPress={handleUpdate}
                style={styles.submitButton}
              >
                <Text style={styles.submitText}>
                  Mettre à jour
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        )}

      </DashboardLayout>
    </ProtectedPage>
  );
}